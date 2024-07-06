
class UniCost {
  constructor(luffyPos, foodPos, images, grid,weightGrid, dim) {
    this.luffyPos = { col: luffyPos[0], row: luffyPos[1] };
    this.foodPos = { col: foodPos[0], row: foodPos[1] }; // temos em coluna e linha
    this.images = images;
    this.grid = grid;
    this.weightGrid = weightGrid;
    this.dim = dim;
    this.frontier = new PriorityQueue2(); // fila de prioridade ordenada por custo acumulado
    this.explored = new Set(); // Conjunto para nós já explorados
    this.parent = new Map(); // Mapa para rastrear o caminho de volta
    this.costSoFar = new Map(); // Mapa para rastrear o custo acumulado
    this.visitedToDraw = [];
    this.visited = [];

    this.initUniCost();
  }
  
  

  initUniCost() {
    this.frontier.enqueue(this.luffyPos, 0);
    this.visited.push(this.luffyPos);
    this.parent.set(`${this.luffyPos.col},${this.luffyPos.row}`, null);
    this.costSoFar.set(`${this.luffyPos.col},${this.luffyPos.row}`, 0);
  }

  run() {
    while (this.frontier.size() > 0) {
      let current = this.frontier.dequeue();
      let keyC = `${current.col},${current.row}`;

      if (current.col === this.foodPos.col && current.row === this.foodPos.row) {
        return this.reconstructPath(current);
      }

      this.explored.add(keyC);
      
      let neighbors = this.getNeighbors(current.col, current.row);
      
      for (let neighbor of neighbors) {
        let neighborKey = `${neighbor.col},${neighbor.row}`;
     
        let newCost = this.costSoFar.get(keyC) + this.weightGrid[neighbor.row][neighbor.col];
        if (!this.costSoFar.has(neighborKey) || newCost < this.costSoFar.get(neighborKey)) {
          this.costSoFar.set(neighborKey, newCost);
            let priority = newCost;
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

  isValid(col, row) {
    return col >= 0 && col < 10 && row >= 0 && row < 10; // 10 é a dimensão que setamos para o jogo
  }

  getNeighbors(col, row) {
    const neighbors = [];
    const directions = [
      [-1, 0], // cima
      [1, 0],  // baixo
      [0, -1], // esquerda
      [0, 1]   // direita
    ];
    
    for (const [dx, dy] of directions) {
      
      const newRow = row + dx;
      const newCol = col + dy;
      //console.log(this.weightGrid[newRow][newCol]);
      if (this.isValid(newCol, newRow) && this.grid[newCol][newRow] != this.images[2]) {
        neighbors.push({ col: newCol, row: newRow });
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
    console.log(this.explored);
    return {
      path: path,
      explored: Array.from(this.explored).map(this.parseExploredString)
    };
  }

  parseExploredString(exploredString) {
    const [col, row] = exploredString.split(',').map(Number);
    return { col, row };
  }
}

class PriorityCost {
      constructor() {
    this.queue = [];
  }

  enqueue(element, cost) {
    this.queue.push({ element, cost });
    this.queue.sort((a, b) => a.cost - b.cost);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}