class Dfs {
  constructor(luffyPos, foodPos, images, grid, dim) {
    this.startPos = luffyPos;
    this.currPos = luffyPos;
    this.targetPos = foodPos;
    this.images = images;
    this.grid = grid;
    this.dim = dim;
    this.stack = [];  
    this.visited = [];
    this.path = [];
    this.parents = new Map();
    
    this.stack.push(luffyPos);
    this.visited.push({col: luffyPos[0], row: luffyPos[1]});
    this.parents.set(`${this.currPos[0]},${this.currPos[1]}`, null);
  }
  
  run() {
    while(this.stack.length !== 0) {
      this.currPos = this.stack.pop();
      let currX = this.currPos[0];
      let currY = this.currPos[1];
      
      if(this.isTarget(this.currPos)) {
        let pos = this.currPos;
        
        while(pos !== null) {
          this.path.push({col: pos[0], row: pos[1]});
          // let posKey = `${pos[0]},${pos[1]}`;
          let parent = this.parents.get(`${pos[0]},${pos[1]}`);
          if(parent !== null) { pos = parent.split(",").map(Number); }
          else { pos = parent; }
        }

        this.path.push({col: this.startPos[0], row: this.startPos[1]});   
        this.path.reverse();
        let retPath = this.path;
        let retVisit = this.visited;
        this.path = [];
        this.visited = [];
        this.stack = [];
        this.parents.clear();
        return {
          path: retPath,
          explored: retVisit
        }
      }
      
      let currNeighbors = this.getNeighbors(this.currPos);
      
      for(let neighbor of currNeighbors) {
        let nX = neighbor[0];
        let nY = neighbor[1];
        let visitNode = false;
        for(let node of this.visited)
          if(node.col === nX && node.row === nY)
            visitNode = true;
        
        if(!visitNode) {
          this.parents.set(`${nX},${nY}`, `${currX},${currY}`);
          this.stack.push(neighbor);
          this.visited.push({col: neighbor[0], row: neighbor[1]});
        }
      }
    }
    return ;
  }
  
  isTarget(nodePos) {
    return (nodePos[0] === this.targetPos[0]) && (nodePos[1] === this.targetPos[1]);
  }
  
  getNeighbors(nodePos) {
    let neighbors = [];
    let nX = nodePos[0];
    let nY = nodePos[1];
    
    if(nX > 0)
      if(this.grid[nX-1][nY] !== this.images[2])
        neighbors.push([nX-1, nY]);
    if(nX < 9)
      if(this.grid[nX+1][nY] !== this.images[2])
        neighbors.push([nX+1, nY]);
    if(nY > 0)
      if(this.grid[nX][nY-1] !== this.images[2])
        neighbors.push([nX, nY-1]);
    if(nY < 9)
      if(this.grid[nX][nY+1] !== this.images[2])
        neighbors.push([nX, nY+1]);
      
    return neighbors;
  }
}