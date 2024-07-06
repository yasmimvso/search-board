let world;
let images = [], img;
let luffy, goinMary;
let food;

let buttonBFS;
let buttonDFS;
let buttonA;
let buttonUC;
let buttonGREEDY;
let dim = [1000, 700];

let screen = 0;


function preload() {
  images[0] = loadImage('/images/floor.png'); //chão cinza
  images[1] = loadImage('/images/water.png'); //água
  images[2] = loadImage('/images/wall.png'); //obstáculo
  images[3] = loadImage('/images/grass.png'); //chão verde
  luffy = loadImage('/images/luffy2.png');
  food = loadImage('https://i.imgur.com/iQamKmr.png');
  img = loadImage('https://i.imgur.com/fphYXVx.png');
  goinMary = loadImage('https://i.imgur.com/uWQuKaw.png');
}

function setup() {
  
  createCanvas(dim[0], dim[1]);
  
  buttonBFS = createButton('BFS');
  buttonBFS.position(590, 400);
  buttonBFS.style('background-color', 'red');
  buttonBFS.style('color', 'white');
  buttonBFS.style('border', 'none'); // Remove as
  buttonBFS.style('padding', '10px 20px');
  buttonBFS.style('border-radius', '10px');
  buttonBFS.style('cursor', 'pointer');
  buttonBFS.style('font-weight', 'bold');
  buttonBFS.mouseOver(hoverEffect);
  buttonBFS.mouseOut(normalEffect);
  buttonBFS.mousePressed(() => changeScreen("bfs"));

  // Botão de busca DFS
  buttonDFS = createButton('DFS');
  buttonDFS.position(424, 350);
  buttonDFS.style('background-color', 'red');
  buttonDFS.style('color', 'white');
  buttonDFS.style('border', 'none'); // Remove as
  buttonDFS.style('padding', '10px 20px');
  buttonDFS.style('border-radius', '10px');
  buttonDFS.style('cursor', 'pointer');
  buttonDFS.style('font-weight', 'bold');
  buttonDFS.mouseOver(hoverEffect);
  buttonDFS.mouseOut(normalEffect);
  buttonDFS.mousePressed(() => changeScreen("dfs"));

  // Botão de busca GREEDY
  buttonGREEDY = createButton('GREEDY');
  buttonGREEDY.position(498, 350);
  buttonGREEDY.style('background-color', 'red');
  buttonGREEDY.style('color', 'white');
  buttonGREEDY.style('border', 'none'); // Remove as
  buttonGREEDY.style('padding', '10px 20px');
  buttonGREEDY.style('border-radius', '10px');
  buttonGREEDY.style('cursor', 'pointer');
  buttonGREEDY.style('font-weight', 'bold');
  buttonGREEDY.mouseOver(hoverEffect);
  buttonGREEDY.mouseOut(normalEffect);
  buttonGREEDY.mousePressed(() => changeScreen("greedy"));

  // Botão de busca custo uniforme
  buttonUC = createButton('UNIFORM-COST');
  buttonUC.position(368, 400);
  buttonUC.style('background-color', 'red');
  buttonUC.style('color', 'white');
  buttonUC.style('border', 'none'); // Remove as
  buttonUC.style('padding', '10px 20px');
  buttonUC.style('border-radius', '10px');
  buttonUC.style('cursor', 'pointer');
  buttonUC.style('font-weight', 'bold');
  buttonUC.mouseOver(hoverEffect);
  buttonUC.mouseOut(normalEffect);
  buttonUC.mousePressed(() => changeScreen("uniform"));

  // Botão de busca A*
  buttonA = createButton('A*');
  buttonA.position(520, 400);
  buttonA.style('background-color', 'red');
  buttonA.style('color', 'white');
  buttonA.style('border', 'none'); // Remove as
  buttonA.style('padding', '10px 20px');
  buttonA.style('border-radius', '10px');
  buttonA.style('cursor', 'pointer');
  buttonA.style('font-weight', 'bold');
  buttonA.mouseOver(hoverEffect);
  buttonA.mouseOut(normalEffect);
  buttonA.mousePressed(() => changeScreen("aPlus"));
}

// Função para aplicar o efeito de hover
function hoverEffect() {
  this.style('background-color', 'white');
  this.style('color', 'black');
}

// Função para reverter ao estilo normal
function normalEffect() {
  this.style('background-color', 'red');
  this.style('color', 'white');
}

function changeScreen(tipo) {
  console.log(images);
  world = new World(images, luffy, food, tipo, dim, goinMary);
  screen = 1;
}

function draw() {
  if (screen === 0) {
    background(img);
  } else {
    createCanvas(dim[0], dim[1]);
    background(255);
    buttonBFS.remove();
    buttonDFS.remove();
    buttonGREEDY.remove();
    buttonUC.remove();
    buttonA.remove();
    
    world.run();
  }
}
