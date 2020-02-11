/*------Constants------*/
const dieValues = ["&#9856","&#9857","&#9858","&#9859","&#9860","&#9861"];



/*------Variables (state)------*/

let dice = {
    die1: {
        id: 0,
        currentRoll: 0,
        saved: false,
    },
    die2: {
        id: 1,
        currentRoll: 0, 
        saved: false,
    },
    die3: {
        id: 2,
        currentRoll: 0, 
        saved: false,
    },
    die4: {
        id: 3,
        currentRoll: 0, 
        saved: false,
    },
    die5: {
        id: 4,
        currentRoll: 0, 
        saved: false,
    }
}

let players = [
    {player: 1, roundScore: null, currentScore: 0, money: 10},
    {player: -1, roundScore: null, currentScore: 0, money: 10}
]

let currentBet;

let betAmount;

let winner;

let roundWinner;

let currentScore;

let savedValues;

let previousBet;

let hasPlacedBet;

let hasSavedDice;

let previousWinner;


/*------Cached Element References------*/

const diceElements = {
    die1: document.getElementById("0"),
    die2: document.getElementById("1"),
    die3: document.getElementById("2"),
    die4: document.getElementById("3"),
    die5:document.getElementById("4")
};

const betbtn = document.getElementById("betbtn");
const roll = document.getElementById("roll");
const msg = document.querySelector("h1");
const betElement = document.getElementById("bet");
const currentScoreElement = document.getElementById("current-score");
const playerOneScore = document.getElementById("player-one-score");
const playerTwoScore = document.getElementById("player-two-score");
const playerOneMoney = document.getElementById("player-one-money");
const playerTwoMoney = document.getElementById("player-two-money");

/*------Event Listeners------*/
betbtn.addEventListener("click", placeBet);
roll.addEventListener("click", rollDice);
diceElements.die1.addEventListener("click", saveDice);
diceElements.die2.addEventListener("click", saveDice);
diceElements.die3.addEventListener("click", saveDice);
diceElements.die4.addEventListener("click", saveDice);
diceElements.die5.addEventListener("click", saveDice);


/*------Functions------*/

function init() {
    winner = null;
    msg.textContent = "Let's play Threes! Place bets to start the game!";
    players[0].money = 10;
    players[1].money = 10;
    previousWinner = 1;
    newRound();
}

function clearScores() {
    for (let die in dice) {
        dice[die]["saved"] = false;
        dice[die]["currentRoll"] = 0;
    };
    hasSavedDice = true;
    savedValues = [];
    currentScore = 0;
    if (isTieGame()) {
        players[0].roundScore = null;
        players[1].roundScore = null;
        hasPlacedBet = false;
        turn *= -1
        renderDice();
        renderScores();
    }

}

function newRound() {
    clearScores();
    hasSavedDice = true;
    hasPlacedBet = false;
    roundWinner = 0;
    currentBet = 0;
    betAmount = 1;
    turn = previousWinner;
    players[0].roundScore = null;
    players[1].roundScore = null;
    render();
}

function newTurn() {
    clearScores();
    turn *= -1;
    render();
    //initilized when player 1's turn is finished
}

function placeBet() {
    if (hasPlacedBet === true) return;
    if (winner !== null) { 
        init();
        return;
    }
    previousBet = currentBet;
    hasPlacedBet = true;
    currentBet += (betAmount * 2);
    for (let player of players) {
        player.money -= betAmount;
    };
    
    render();
}
    

function rollDice() {
    if (currentBet !== previousBet + (betAmount * 2)) return;
    if (hasSavedDice === false) {
        msg.textContent = "You must save at least one die!";
        return;
    }
    hasSavedDice = false;
    for (let die in dice) {
        if (dice[die]["saved"] === false) {
        dice[die]["currentRoll"] = Math.floor(Math.random() * 6 + 1);
        }
        
    }
    render();
}

 



function saveDice() {
    if (currentBet === 0) return;
    if (dice.die1.currentRoll === 0) return;
    hasSavedDice = true;
    savedValues = [];
    for (let die in dice) {
        if (dice[die]["id"] === parseInt(event.target.id)) {
            if (dice[die]["saved"] === true) return;
            dice[die]["saved"] = true;
            savedValues.push(dice[die]["currentRoll"]);
        }
    }
    calculateCurrentScore();
    renderDice();
    isTurnOver();

}

function calculateCurrentScore() {
    for (let i = 0; i < savedValues.length; i++) {
        if (savedValues[i] === 3) {
            currentScore += 0;
        }
        else {
            currentScore += savedValues[i];
        }
    }
    renderScores();
}

function calculateRoundScore() {
    return (turn === 1 ? players[0].roundScore = currentScore : players[1].roundScore = currentScore); 
}

function isGameOver() {
    if (players[0].money === 0) {
        winner = -1
        render();
    }
    if (players[1].money === 0) {
        winner = 1
        render();
    }
    else {
        return;
    }
}

function isTurnOver() {
    savedDice = 0
    for (let die in dice) {
        if (dice[die]["saved"] === true) {
            savedDice += 1;
        }
    }
    if (savedDice === 5) {
        calculateRoundScore();
        render();
        isRoundOver();
    }
}

function isRoundOver() {
    if (players[0].roundScore !== null && players[1].roundScore !== null) {
        if (isTieGame()) {
            tieGame();
        }
        else {
        render();
        checkRoundWinner();
        isGameOver();
        newRound();
        }
    }
    else {
        newTurn();
    }
}

function isTieGame() {
    if ((players[0].roundScore === players[1].roundScore) && (players[0].roundScore !== null && players[1].roundScore !== null)) {
        return true;
    }
    else {
        return false;
    }
}

function tieGame() {
        betAmount *= 2;
        renderMessage();
        clearScores();
}

function checkRoundWinner() {
    if (players[0].roundScore < players[1].roundScore) {
        players[0].money += currentBet;
        roundWinner = 1;
        previousWinner = 1;
    }
    else {
        players[1].money += currentBet;
        roundWinner = -1;
        previousWinner = -1;
    }
    renderRoundWinMessage();
}

function render() {
    if (winner !== null) {
        betbtn.textContent = "Reset";
    }
    if (winner === null) {
        betbtn.textContent = "Bet";
    }
    renderScores();
    renderMessage();
    renderDice();
}

function renderMessage() {
    if (winner !== null) {
        return (winner === 1 ? msg.textContent = "Sorry Player 2, you're out of money! Player 1 wins the game!" : msg.textContent = "Sorry Player 1, you're out of money! Player 2 wins the game!");
    }

    else if (isTieGame()) {
        msg.textContent = "Tie Scores! Try again, but double your bets! Winner of the round takes it all!";
    }

    else if (currentBet !== 0) {
        return (turn === 1 ? msg.textContent = "Player 1, roll the dice!" : msg.textContent = "Player 2, roll the dice!");
    }
    else {
        return;
    }
}

function renderRoundWinMessage() {
    if (roundWinner !== 0) {
        return (roundWinner === 1 ? msg.textContent = `Player 1 wins this round! You win $${currentBet}!` : msg.textContent = `Player 2 wins this round! You win $${currentBet}!`);
        }  
}


function renderDice() {
    if (dice.die1.currentRoll !== 0) {
        diceElements.die1.innerHTML = dieValues[dice.die1.currentRoll - 1];
        diceElements.die2.innerHTML = dieValues[dice.die2.currentRoll -1];
        diceElements.die3.innerHTML = dieValues[dice.die3.currentRoll -1];
        diceElements.die4.innerHTML = dieValues[dice.die4.currentRoll -1];
        diceElements.die5.innerHTML = dieValues[dice.die5.currentRoll -1];
    }
    else {
        for (let die in diceElements) {
            diceElements[die].innerHTML = "";
        }
    }

   //is it possible to turn this into a for... in loop or multiple ternary statements?
   //any way to clean it up and make it less redundant
    if (dice.die1.saved === true) {
        diceElements.die1.classList.add("highlight"); }
    else {
        diceElements.die1.classList.remove("highlight");
    }
    if (dice.die2.saved === true) {
        diceElements.die2.classList.add("highlight"); }
    else {
        diceElements.die2.classList.remove("highlight");
    }
    if (dice.die3.saved === true) {
        diceElements.die3.classList.add("highlight"); }
    else {
        diceElements.die3.classList.remove("highlight");
    }
   
    if (dice.die4.saved === true) {
        diceElements.die4.classList.add("highlight"); }
    else {
        diceElements.die4.classList.remove("highlight");
    }
    if (dice.die5.saved === true) {
        diceElements.die5.classList.add("highlight"); }
    else {
        diceElements.die5.classList.remove("highlight");
    }
        
}

function renderScores() {
    bet.textContent = `$${currentBet}`;
    currentScoreElement.textContent = currentScore;
    playerOneScore.textContent = players[0].roundScore;
    playerTwoScore.textContent = players[1].roundScore;
    playerOneMoney.textContent = players[0].money;
    playerTwoMoney.textContent = players[1].money;

}



init();