const rollBtn = document.getElementById('rollButton');
const resetBtn = document.getElementById('resetButton');
const dice = document.getElementById('dice');
const statusText = document.getElementById('gameStatus');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const wins1 = document.getElementById('wins1');
const wins2 = document.getElementById('wins2');
const p1 = document.getElementById('player1');
const p2 = document.getElementById('player2');

let currentPlayer = 1;
let scores = [0, 0];
let wins = [0, 0];
let gameOver = false;

function rollDice() {
  if (gameOver) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  dice.textContent = ['⚀','⚁','⚂','⚃','⚄','⚅'][roll - 1];
  scores[currentPlayer - 1] += roll;

  // Update scores on UI
  if (currentPlayer === 1) {
    score1.textContent = scores[0];
  } else {
    score2.textContent = scores[1];
  }

  // Show status message
  statusText.textContent = `Player ${currentPlayer} rolled a ${roll}. Total score: ${scores[currentPlayer - 1]}`;

  // Check for win
  if (scores[currentPlayer - 1] >= 20) {
    statusText.textContent += `\n🎉 Player ${currentPlayer} wins!`;
    wins[currentPlayer - 1]++;

    if (currentPlayer === 1) {
      wins1.textContent = wins[0];
    } else {                                                                           
      wins2.textContent = wins[1];
    }
    gameOver = true;
    confetti();
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  p1.classList.toggle('current-player', currentPlayer === 1);
  p2.classList.toggle('current-player', currentPlayer === 2);
}

function resetGame() {
  scores = [0, 0];
  score1.textContent = score2.textContent = '0';
  dice.textContent = '⚀';
  currentPlayer = 1;
  gameOver = false;
  statusText.textContent = `Player 1's turn`;
  p1.classList.add('current-player');
  p2.classList.remove('current-player');
}

rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', resetGame);
resetGame(); // initial setup
