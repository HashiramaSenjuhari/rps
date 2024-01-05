const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const playerImg = document.getElementById('player-img');
const computerImg = document.getElementById('computer-img');
const optionButtons = document.getElementById('option').querySelectorAll('button');
const winnerMessage = document.getElementById('winner-message');

let playerScore = 0;
let computerScore = 0;

function makeChoice(playerChoice) {
    if (playerScore < 5 && computerScore < 5) {
        const computerChoice = getComputerChoice();
        updateImages(playerChoice, computerChoice);

        const result = getWinner(playerChoice, computerChoice);
        updateScore(result);
        displayResult(result);

        if (playerScore === 5 || computerScore === 5) {
            hideOptions();
            displayWinner();
            showResetButton();
        }
    }
}

function hideOptions() {
    for (const button of optionButtons) {
        button.style.display = 'none';
    }
}

function displayWinner() {
    if (playerScore === 5) {
        winnerMessage.textContent = "Congratulations! You are the winner!";
    } else {
        winnerMessage.textContent = "Sorry! Computer is the winner!";
    }
}

function showResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again';
    resetButton.addEventListener('click', resetGame);
    winnerMessage.appendChild(resetButton);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    // Reset images
    playerImg.src = '';
    computerImg.src = '';

    // Show options
    for (const button of optionButtons) {
        button.style.display = 'inline-block';
    }

    // Clear winner message and reset scores in the HTML
    winnerMessage.textContent = '';
    playerScoreElem.textContent = '0';
    computerScoreElem.textContent = '0';
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateImages(playerChoice, computerChoice) {
    playerImg.src = `./img/${playerChoice}-hand.png`;
    computerImg.src = `./img/${computerChoice}-hand.png`;
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function updateScore(result) {
    if (result.includes('win')) {
        playerScore++;
    } else if (result.includes('Computer')) {
        computerScore++;
    }

    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
}
