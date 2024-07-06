class Greedy{
  constructor(luffyPos, foodPos, images, grid, dim){
    
    this.luffyPos = {col: luffyPos[0], row: luffyPos[1]}; 
    this.foodPos = {col: foodPos[0], row: foodPos[1]}; // temos em coluna e linha
    this.images = images;
    this.grid = grid;
    this.dim = dim;
    this.frontier = new PriorityQueue(); // fila de prioridade ordenada por funcao de avaliacao heuristica
    this.explored = new Set();// Conjunto para nós já explorados
    this.parent = new Map();  // Mapa para rastrear o caminho de volta
    this.visitedToDraw = [];
    this.visited = [];
    
    this.initGreedy();

  }
  
  
  initGreedy() {
    this.frontier.enqueue(this.luffyPos,0);
    this.visited.push(this.luffyPos);
    this.parent.set(`${this.luffyPos.col},${this.luffyPos.row}`, null);
  }
  
  heuristic(foodPos,nextPos) {
    return abs(foodPos.row - nextPos.row) + abs(foodPos.col -   nextPos.col);
  }
  
  run(){
    while (this.frontier.size() > 0) {
      let current = this.frontier.dequeue();
      let keyC = `${current.col},${current.row}`;
      
         if (current.col === this.foodPos.col && current.row === this.foodPos.row) {
            return this.reconstructPath(current);
        }
      
       this.explored.add(keyC);
      
      let neighbors = this.getNeighbors(current); 
      
        for (let neighbor of neighbors) {
          let neighborKey = `${neighbor.col},${neighbor.row}`;
          if (!this.parent.has(neighborKey)) {
            let priority = this.heuristic(this.foodPos,neighbor);
            this.frontier.enqueue(neighbor, priority);
            this.parent.set(neighborKey, current);
            if (neighbor.col === this.foodPos.col && neighbor.row === this.foodPos.row) {
              return this.reconstructPath(neighbor);
            }
          }
        }
      
    }
  }

    isInFrontier(node) {
      return this.frontier.contains(node);
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
     print(this.explored)
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

