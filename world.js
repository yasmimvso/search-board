const OBSTACLE = 1;
const FLOOR_GRAY = 3; //3
const GRASS = 4; //4
const WATER = 6; //6
class World {
  
  constructor(imagens, luffy, food, tipo, dim, goinMary) {
    
    this.imagens = imagens;
    this.luffyImg = luffy;
    this.goingMary = goinMary;
    this.foodImg = food;
    this.tipo = tipo;
    this.dim = dim;
    this.result = new Grid(imagens, luffy, food, this.dim);
    this.path = [];
    this.visited = [];
    this.visitedToDraw = [];
    this.fronteirToDraw = [];
    this.pathToDraw = [];
   
    
    
    this.allExploredDrawn = false;
    
    
    const { grid, luffyPos, foodPos,weightGrid,OBSTACLE,FLOOR_GRAY,GRASS,WATER } = this.result.returnGrid();
    this.grid = grid;
    this.weightGrid = weightGrid;
    this.luffyPos = luffyPos;
    this.foodPos = foodPos;
    
    this.edges = [ [-1, 0], [0, -1],[1, 0],[0, 1],];
    
    this.InfoBySearchAlgorithm(tipo);
    this.mov = new Mov(this.imagens, this.luffyPos, this.luffyImg, this.foodPos, this.path, this.grid, this.dim, this.goingMary);
    
  }

    run() {
     this.result.drawGrid();

     if(this.visited.length && !this.allExploredDrawn){
       this.drawExplored();
       // this.drawFrontier();
      }
      else{
        this.drawPath();
        if (this.mov) {
        this.mov.move();
        let result = this.mov.draw();
        
        if(!result) this.reStart();
         }
      }
    }
  
     reStart(){
       
      this.result = new Grid(this.imagens, this.luffyImg, this.foodImg, this.dim);
      
      this.path = [];
      this.visited = [];
      this.visitedToDraw = [];
      this.pathToDraw = [];
      this.fronteirToDraw = [];
      this.allExploredDrawn = false;
      
      const { grid, luffyPos, foodPos,weightGrid,OBSTACLE,FLOOR_GRAY,GRASS,WATER } = this.result.returnGrid();
      this.grid = grid;
      this.luffyPos = luffyPos;
      this.weightGrid = weightGrid;
      this.foodPos = foodPos;
      this.InfoBySearchAlgorithm(this.tipo);
      
      
      this.mov = new Mov(this.imagens, this.luffyPos, this.luffyImg, this.foodPos, this.path, this.grid, this.dim, this.goingMary);
     }
  
   InfoBySearchAlgorithm(tipo) {
     
     let instance;
     
     if(tipo == "bfs"){
        instance = new Bfs(this.luffyPos, this.foodPos, this.imagens, this.grid, this.dim);
      }
     else if(tipo == "dfs"){
       instance = new Dfs(this.luffyPos, this.foodPos, this.imagens, this.grid, this.dim);
     }
     else if(tipo == "aPlus"){
       instance = new AStar(this.luffyPos, this.foodPos, this.imagens, this.grid, this.weightGrid, this.dim);
     }
     else if(tipo == "greedy"){
       instance = new Greedy(this.luffyPos, this.foodPos, this.imagens, this.grid, this.dim);
      }
     else {
        instance = new UniCost(this.luffyPos, this.foodPos, this.imagens, this.grid,this.weightGrid, this.dim);
     }
     
    const result = instance.run();

    if (result === undefined || result === null) {
      this.reStart();
    }
    else{
      const {path, explored} = result;
      this.path = path;
      this.visited = Array.from(explored);
      this.startExploredDrawing();
    }
  }
  
   isValid(col,row){
     return col >= 0 && col < this.grid.length && row >= 0 && row < this.grid[0].length; 
    }


   startExploredDrawing() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.visited.length) {
        this.visitedToDraw.push(this.visited[index]);
        index++;
      } else {

        clearInterval(interval);
        this.allExploredDrawn = true;
        
        if (this.mov) {
          this.mov.startMoving();
        }
        this.drawPathWithDelay();
      }
    }, 100);
  }
  
  drawPathWithDelay() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.path.length) {
        let node = this.path[index];
        this.pathToDraw.push(node); 
        index++;
      }
    }, 100); 
  }
  
  alreadyVisited(col, row) {
    return this.fronteirToDraw.find((cell) => {
      return cell.col === col && cell.row === row;
    });
  }
  
  drawExplored() {
      // fill(255, 255, 0);
      noStroke();
    for (let cell of this.visitedToDraw) {
      
        for (const mov of this.edges) {
        const x = cell.col + mov[0];
        const y = cell.row + mov[1];
        if (this.isValid(x, y) && !this.alreadyVisited(x, y)) {
           fill(189, 83, 107);
           ellipse((x + 0.5) * (this.dim[0] / 10), (y + 0.5) * (this.dim[1] / 10), 20);
         }
       }
      
      this.fronteirToDraw.push(cell);
       if(cell.col != this.luffyPos[0] || cell.row != this.luffyPos[1]){
         fill(255, 255, 0);
         ellipse((cell.col + 0.5) * (dim[0] / 10), (cell.row + 0.5) * (dim[1] / 10), 20);
      }
      
   // Cor para as fronteiras
     // noStroke();
     }
    // this.drawFrontier();
  }


  drawFrontier() {
     fill(189, 83, 107); // Cor para as fronteiras
     // noStroke();
    this.fronteirToDraw.forEach((cell)=>{
      for (const mov of this.edges) {
        const x = cell.col + mov[0];
        const y = cell.row + mov[1];
        if (this.isValid(x, y) && !this.alreadyVisited(x, y)) {
          setTimeout(() => {
            console.log("entrei aqui");
            ellipse((x + 0.5) * (this.dim[0] / 10), (y + 0.5) * (this.dim[1] / 10), 20);
          }, 100); 
        }
      }
    })
  }


  drawPath() {
    fill(255, 0, 0);
    noStroke();
    for (let node of this.pathToDraw) {
      // para não printar nem na posição do luffy nem na posição destino
      if((node.col != this.luffyPos[0] || node.row != this.luffyPos[1]) && (node.col != this.foodPos[0] || node.row != this.foodPos[1])){
         ellipse((node.col + 0.5) * (dim[0] / 10), (node.row + 0.5) * (dim[1] / 10), 20);
      }
     
    }
  
  }
  
}
