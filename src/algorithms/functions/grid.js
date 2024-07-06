class Grid{
  
  constructor(images, luffyImg, foodImg, dim, OBSTACLE,FLOOR_GRAY,GRASS,WATER){
     
     this.images = images;
     this.luffy =luffyImg;
     this.food = foodImg;
     this.dim = dim;
     this.grid = [];
     this.cols = 10;
     this.rows = 10;
     this.weightGrid = [];
     this.cellWidth = 0;
     this.cellHeight = 0;
     this.maxObstacles = 25; 
     this.obstacleCount = 0; 
     
     this.foodX = 0;
     this.foodY = 0;
     this.luffyX = 0;
     this.luffyY = 0;
     
     this.setGrid();
   }
   
    shuffleArray(array) {
     for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
     }
   }
   
   setGrid(){
   
     this.cellWidth = this.dim[0] / this.cols;
     this.cellHeight = this.dim[1] / this.rows;
 
      // Inicializar grid com imagens aleatórias
     let cells = [];
     for (let i = 0; i < this.cols; i++) {
       for (let j = 0; j < this.rows; j++) {
         if (cells.length < this.maxObstacles) {
           cells.push(this.images[2]); // Adiciona obstáculo
         } else {
           let randomImageIndex = floor(random(this.images.length - 1)); // Exclui imagem do obstáculo
           cells.push(this.images[randomImageIndex < 2 ? randomImageIndex : randomImageIndex + 1]);
         }
       }
     }
 
     // Embaralhar as células para distribuir os obstáculos
     this.shuffleArray(cells);
 
     // Transferir as células embaralhadas para o grid
     for (let i = 0; i < this.cols; i++) {
       this.grid[i] = [];
       for (let j = 0; j < this.rows; j++) {
         this.grid[i][j] = cells[i * this.rows + j];
       }
     }
 
     // Gerar posição aleatória para a comida
     do {
       this.foodX = floor(random(this.cols));
       this.foodY = floor(random(this.rows));
     } while (this.grid[this.foodX][this.foodY] === this.images[2]);
 
     //Gerar posição aleatória para o personagem
     do {
       this.luffyX = floor(random(this.cols));
       this.luffyY = floor(random(this.rows));
     } while (this.grid[this.luffyX][this.luffyY] === this.images[2]);
     
      //Grid de Pesos
     for (let i = 0; i < 10; i++) {
       
       this.weightGrid[i] = [];
       for (let j = 0; j < this.rows; j++) {
         if (this.grid[i][j] === this.images[0]) { //floor gray
           this.weightGrid[i][j] = FLOOR_GRAY;  
           }
         else if (this.grid[i][j] === this.images[1]) { //water
           this.weightGrid[i][j] = WATER;  
             } 
         else if (this.grid[i][j] === this.images[2]) { //obstacle
           this.weightGrid[i][j] = OBSTACLE;
         }
         else if (this.grid[i][j] === this.images[3]) {//grass
           this.weightGrid[i][j] = GRASS; 
         }
     }
   }
   }
   
   drawGrid(){
   
     // Desenhar grid com imagens
     for (let i = 0; i < this.cols; i++) {
       for (let j = 0; j < this.rows; j++) {
         let x = i * this.cellWidth;
         let y = j * this.cellHeight;
         image(this.grid[i][j], x, y, this.cellWidth, this.cellHeight);
       }
     }
 
     //Desenhar comida em posição aleatória (não em obstáculo)
     let foodXPos = this.foodX * this.cellWidth;
     let foodYPos = this.foodY * this.cellHeight;
     image(this.food, foodXPos, foodYPos, this.cellWidth, this.cellHeight);
 
 
     //Desenhar comida em posição aleatória (não em obstáculo)
     let luffyXPos = this.luffyX * this.cellWidth;
     let luffyYPos = this.luffyY * this.cellHeight;
     image(this.luffy, luffyXPos, luffyYPos, this.cellWidth, this.cellHeight);
   }  
   
 
   returnGrid() {
     return {
       grid: this.grid,
       luffyPos: [this.luffyX, this.luffyY],
       foodPos: [this.foodX, this.foodY],
       weightGrid: this.weightGrid
     };
   }
 }