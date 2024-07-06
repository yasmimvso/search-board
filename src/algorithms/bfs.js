

class Bfs{
  constructor(luffyPos, foodPos, images, grid, dim){
    
  // this.luffyPos,this.foodPos,this.imagens, [700,650]
    this.luffyPos = {col: luffyPos[0], row: luffyPos[1]}; 
    this.foodPos = foodPos; // temos em coluna e linha
    this.images = images;
    this.grid = grid;
    this.dim = dim;
    this.frontier = [];       // Fila FIFO para os nós a serem explorados
    this.explored = new Set();// Conjunto para nós já explorados
    this.parent = new Map();  // Mapa para rastrear o caminho de volta
    this.visitedToDraw = [];
    this.visited = [];
    
    this.initBfs();

  }
  
  
  initBfs() {
    this.frontier.push(this.luffyPos);
    this.visited.push(this.luffyPos);
    this.parent.set(`${this.luffyPos.col},${this.luffyPos.row}`, null);
  }
  
  run(){
      while (this.frontier.length > 0 ) {
        let current = this.frontier.shift(); 
      
        let keyC = `${current.col},${current.row}`;
        
        if (current.col === this.foodPos[0] && current.row === this.foodPos[1]) {
          return this.reconstructPath(current);
        }
        
        this.explored.add(keyC);
        // console.log("eplored vector: ", this.explored)
    
        let neighbors = this.getNeighbors(current); 
        
        for (let neighbor of neighbors) {
          let neighborKey = `${neighbor.col},${neighbor.row}`;
          if (!this.explored.has(neighborKey) && !this.isInFrontier(neighbor)) {
            this.frontier.push(neighbor);
            this.parent.set(neighborKey, current);
            if (neighbor.col === this.foodPos[0] && neighbor.row === this.foodPos[1]) {
              return this.reconstructPath(neighbor);
            }
          }
        }
      }
    }
  
    isInFrontier(node) {
      return this.frontier.some(n => n.col === node.col && n.row === node.row);
    }
  
  
   isValid(col,row){
     return col >= 0 && col < 10 && row >= 0 && row < 10; // 10 é a dimensão que setamos para o jogo
    }
  
   getNeighbors(node) {
      let neighbors = [];
      let deltas = [
        {col: 0, row: -1}, // cima
        {col: 1, row: 0},  // direita
        {col: 0, row: 1},  // baixo
        {col: -1, row: 0}  // esquerda
      ];
      
      for (let delta of deltas) {
        let newCol = node.col + delta.col;
        let newRow = node.row + delta.row;
        if (this.isValid(newCol, newRow) && this.grid[newCol][newRow] != this.images[2]) {
          // se eh diferete da barreira
          neighbors.push({col: newCol, row: newRow});
        }
      }
      return neighbors;
    }
  
   reconstructPath(goalNode) {
    let path = [];
    let current = goalNode;
    while (current != null) {
      path.push(current);
      current = this.parent.get(`${current.col},${current.row}`);
    }
    path.reverse();
     // console.log("EXPLORED", this.explored)
    return {
      path: path,
      explored:Array.from(this.explored).map(this.parseExploredString)
    }
  }
  
   parseExploredString(exploredString) {
    const [col, row] = exploredString.split(',').map(Number);
    return { col, row };
  }
  
}