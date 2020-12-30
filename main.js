/**
 * Mini Game AmongUs
 * @author Arlesson
 */

//Elementos HTML
const controlButtons = document.querySelectorAll(".button");
const screenButtons = document.querySelectorAll(".button-screen");
const scoreText = document.getElementById("score");
const turnText = document.getElementById("turn");

//Variáveis de controle
let screenButtonBoard = [], playerButton = [];
let testPosition = 0, position = 0, turn = 1, score = 0, working = false, interval;

//Adicionando eventos
controlButtons.forEach(button => {
  button.addEventListener("click", () => {
    getButtonControl(event.target.id);
  });
});

//Pega o botão digitado pelo jogador
function getButtonControl(value) {
  if(!working) {
    playerButton.push(Number.parseInt(value));
    testPlayerSequency();
  }
}

//Escolhe qual parte irá acender
function getButtonScreen() {
  let indexOfButton = Math.floor(Math.random() * 9);
  screenButtonBoard.push(indexOfButton);
}

//Controla quando acende e quando apaga
function turnOn() {
  working = true;
  screenButtons[screenButtonBoard[position]].classList.add("button-screen-on");
  setTimeout(turnOff,700);
}

function turnOff() {
  screenButtons[screenButtonBoard[position]].classList.remove("button-screen-on");
  position++;
  
  if(position < screenButtonBoard.length) {
    setTimeout(turnOn,1000);
  } else {
    position = 0;
    working = false;
  }
}

//Atualiza as informações da partida e pontos
function actualizeScoreAndTurn() {
  scoreText.innerHTML = `Pontuação: ${score}`;
  turnText.innerHTML = `Rodada: ${turn}`;
}

//Testa a sequência de botões digitados pelo player
function testPlayerSequency() {
  if(playerButton[testPosition] === screenButtonBoard[testPosition]) {
    testPosition++;
    if(testPosition == screenButtonBoard.length) {
      window.alert("Você acertou");
      testPosition = 0;
      score += 50;
      turn++;
      start();
    }
    
  } else {
    window.alert("Você errou");
    reset();
  }
}

//Reseta tudo, quando o player erra
function reset() {
  position = 0;
  turn = 1;
  score = 0;
  screenButtonBoard = [];
  actualizeScoreAndTurn();
  setTimeout(start,1500);
}

//Da início ao turno
function start() {
  actualizeScoreAndTurn();
  playerButton = [];
  getButtonScreen();
  turnOn();
}