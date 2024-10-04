const gameArea = document.getElementById('gameArea');
const playerCar = document.getElementById('playerCar');
const gameOverScreen = document.getElementById('gameOverScreen');
const gameOverMessage = document.getElementById('gameOverMessage');
let playerX = 125; // Posição inicial do carro no eixo X
let playerY = 400; // Posição inicial do carro no eixo Y (para movimentação vertical)
let obstacles = [];
let gameInterval;
let obstacleInterval;
let obstacleSpeed = 3; // Velocidade inicial dos obstáculos
const finishLineY = 0; // Posição final para vitória (chegada no topo)

// Função para mover o carro do jogador
document.addEventListener('keydown', moveCar);

function moveCar(e) {
  if (e.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 10; // Move para a esquerda
  } else if (e.key === 'ArrowRight' && playerX < 250) {
    playerX += 10; // Move para a direita
  } else if (e.key === 'ArrowUp' && playerY > 0) {
    playerY -= 10; // Move para frente (cima)
  } else if (e.key === 'ArrowDown' && playerY < 400) {
    playerY += 10; // Move para trás (baixo)
  }
  // @ts-ignore
  playerCar.style.left = playerX + 'px';
  // @ts-ignore
  playerCar.style.top = playerY + 'px';

  // Verifica se o jogador chegou ao final da corrida
  if (playerY <= finishLineY) {
    victory();
  }
}

// Função para criar obstáculos (carros)
function createObstacle() {
  let obstacle = document.createElement('img');
  obstacle.classList.add('obstacle');
  obstacle.src = 'src/img/obstaculo1_carro.png'; // Adicione uma imagem de carro obstáculo
  obstacle.style.left = Math.floor(Math.random() * 250) + 'px';
  // @ts-ignore
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);
}

// Função para mover os obstáculos
function moveObstacles() {
  obstacles.forEach((obstacle, index) => {
    let obstacleY = parseInt(obstacle.style.top.replace('px', '')) || -100;
    obstacleY += obstacleSpeed; // Aumentar gradualmente a velocidade
    obstacle.style.top = obstacleY + 'px';

    // Remover obstáculos que saem da tela
    if (obstacleY > 500) {
      // @ts-ignore
      gameArea.removeChild(obstacle);
      obstacles.splice(index, 1);
    }

    // Verificar colisão
    checkCollision(obstacle);
  });
}

// Função para verificar colisão entre o carro e os obstáculos
function checkCollision(obstacle) {
  // @ts-ignore
  const carRect = playerCar.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  if (
    carRect.x < obsRect.x + obsRect.width &&
    carRect.x + carRect.width > obsRect.x &&
    carRect.y < obsRect.y + obsRect.height &&
    carRect.height + carRect.y > obsRect.y
  ) {
    endGame();
  }
}

// Função para encerrar o jogo com a mensagem de "Game Over"
function endGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  showGameOverScreen('Game Over!');
}

// Função para mostrar a tela de vitória
function victory() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  showGameOverScreen('Você venceu!');
}

// Função para exibir a tela de "Game Over" ou "Vitória"
function showGameOverScreen(message) {
  // @ts-ignore
  gameOverMessage.textContent = message;
  // @ts-ignore
  gameOverScreen.style.display = 'flex';
}

// Função para reiniciar o jogo
function restartGame() {
  location.reload(); // Recarrega a página para reiniciar o jogo
}

// Função para aumentar gradualmente a dificuldade
function increaseDifficulty() {
  obstacleSpeed += 0.1; // Aumenta gradualmente a velocidade dos obstáculos
}

// Função principal do jogo
function startGame() {
  gameInterval = setInterval(() => {
    moveObstacles();
  }, 20);

  obstacleInterval = setInterval(() => {
    createObstacle();
  }, 3000); // Obstáculos a cada 3 segundos

  // Aumentar a dificuldade a cada 10 segundos
  setInterval(() => {
    increaseDifficulty();
  }, 10000);
}

startGame();
