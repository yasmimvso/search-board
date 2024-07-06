class Mov {
  constructor(imagens, luffyPos, luffyImg, foodPos, path, grid, dim, goingMary) {
    this.images = imagens;
    this.luffyPos = createVector(luffyPos[0], luffyPos[1]);
    this.aux = luffyPos;
  
    this.luffyImg = luffyImg;
    this.goingMary = goingMary;
    this.foodPos = createVector(foodPos.col, foodPos.row);
    this.path = path.map(node => createVector(node.col, node.row));
    this.grid = grid;
    this.dim = dim;

    this.luffyHistory = []; // Array para armazenar histórico de posições do Luffy
    this.currentTargetIndex = 0;
    
    this.moving = false;
    
    // Inicializa a posição inicial no histórico
    this.luffyHistory.push(createVector(this.luffyPos.x, this.luffyPos.y));
  }

  verifyObstacle(node) {
    let cellType = this.grid[node.x][node.y];
    if (cellType === this.images[0]) { // Chão cinza
      return 0.30;
    } else if (cellType === this.images[3]) { // Chão verde
      return 0.07;
    } else { // Água
      return 0.02;
    }
  }
  
  startMoving() {
    this.moving = true;
  }

  stopMoving() {
    this.moving = false;
  }

  move() {
    if (this.path === null || this.path.length === 0 || !this.moving || this.currentNodeIndex >= this.path.length) {
      return;
    }
    
    const currentTarget = this.path[this.currentTargetIndex];
    
    const direction = p5.Vector.sub(currentTarget, this.luffyPos);
    direction.normalize();

    let agentSpeed = this.verifyObstacle(currentTarget);
    
    const velocity = p5.Vector.mult(direction, agentSpeed);

     this.luffyHistory.push(createVector(this.luffyPos.x , this.luffyPos.y));

    this.luffyPos.add(velocity);
    

    if (p5.Vector.dist(this.luffyPos, currentTarget) < agentSpeed) {
      this.currentTargetIndex++;

      if (this.currentTargetIndex >= this.path.length) {
        this.stopMoving();
      }
    }
    
  }

  draw() {
    const cellWidth = this.dim[0] / this.grid.length;
    const cellHeight = this.dim[1] / this.grid[0].length;


    for (let i = 0; i < this.luffyHistory.length; i++) {
      const { x, y } = this.luffyHistory[i];
   
 
      fill("#E3350D");
      image(this.goingMary, x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      
    }

    this.luffyHistory = [];
    return this.moving;
   
  }
}