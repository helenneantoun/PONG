//variáveis de dimensões da Bola:
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro/2;

//variáveis de velocidade da Bola:
let velXBola = 6;
let velYBola = 6;

//variáveis de dimensões da Raquete:
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//variáveis da Raquete do Oponente:
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velYRaqueteOponente;

//variáveis de movimento da Minha Raquete:
let w = 87;
let s = 83;

//variáveis da biblioteca (p5.collide2d):
let colidir = false

//placar do jogo:
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo:
let trilha;
let meuPonto;
let oponentePonto;
let raquetada;

function preload() {
  trilha = loadSound ("Space Ambience.wav");
  meuPonto = loadSound ("Meu Ponto.wav");
  oponentePonto = loadSound ("Oponente Ponto.wav");
  raquetada = loadSound ("Pong.wav");
}

//inicia programa (setup) e define dimensões de pixels (createCanvas): 
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//draw executa chamada de funções continuamente nas linhas de códigos:
function draw() {
  background(0); //desenha o fundo
  mostraBola(); //forma a bola
  movimentoBola(); //move a bola
  configColisaoBorda(); //verifica colisão da bola com as bordas
  mostraRaquete(xRaquete, yRaquete); //forma minha raquete
  mostraRaquete(xRaqueteOponente, yRaqueteOponente); //forma raquete do oponente
  movimentoMinhaRaquete(); //move a minha raquete
  movimentoRaqueteOponente(); //move automatico a raquete do oponente
  //multiplayer();//move com setas (cima e baixo) a raquete do oponente
  //configColisaoRaquete(); //afere a colisão da bola com raquetes
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);           //afere colisão das raquetes por via da biblioteca do GitHub
  incluirPlacar(); //posiciona os placares do Pong
  marcarPonto(); //armazena as pontuações
}

function mostraBola() {
   circle (xBola, yBola, diametro);
}

function movimentoBola() {
  xBola += velXBola;
  yBola += velYBola;
}

function configColisaoBorda() {
  if(xBola + raio > width || 
     xBola - raio < 0) {
    velXBola *= -1; 
  }
  if(yBola + raio > height || 
     yBola - raio < 0) {
    velYBola *= -1;
  }
}

//refatoração na forma das raquetes em função única:
function mostraRaquete(x, y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentoMinhaRaquete() {
  if (keyIsDown(w) && yRaquete > 0) {
    yRaquete -= 10;
  }
  if (keyIsDown(s) && yRaquete < height - hRaquete) {
    yRaquete += 10;
  }
}

//refatoração no movimento da raquete do oponente. aplicação de função polinomial de 1º grau para ter possibilidade de marcação de pontos:
function movimentoRaqueteOponente() {
  //quanto maior a porcentagem (20% ou 0.2) maior chance de colisão na raquete
  velYRaqueteOponente = (yBola - yRaqueteOponente - wRaquete / 2) * 0.2;
  yRaqueteOponente += velYRaqueteOponente;
}

function multiplayer() {
  if (keyIsDown (UP_ARROW) && yRaqueteOponente > 0) {
    yRaqueteOponente-=10;
  }
  if (keyIsDown (DOWN_ARROW) && yRaqueteOponente < height - hRaquete) {
    yRaqueteOponente += 10
  }
}

function configColisaoRaquete() {
  if(xBola - raio < xRaquete + wRaquete
    && yBola - raio < yRaquete + hRaquete
    && yBola + raio > yRaquete) {
    velXBola *= -1;
  }
}

//refatoração na colisão da bola com as raquetes em função única:
function colisaoRaqueteBiblioteca(x, y) {
  colidir =
  collideRectCircle(x, y, wRaquete, hRaquete, xBola, yBola, raio);
  if(colidir) {
    velXBola *= -1;
    raquetada.play();
  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  rect(450, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosOponente, 470, 26);
}

function marcarPonto() {
  if (xBola > 590) {
    meusPontos += 1;
    meuPonto.play ();
  }
  if (xBola <10) {
    pontosOponente += 1;
    oponentePonto.play();
  }
}



