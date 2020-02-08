/*------Constants------*/




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

/*------Cached Element References------*/

const die1 = document.getElementById("0");
const die2 = document.getElementById("1");
const die3 = document.getElementById("2");
const die4 = document.getElementById("3");
const die5 = document.getElementById("4");
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
die1.addEventListener("click", saveDice);
die2.addEventListener("click", saveDice);
die3.addEventListener("click", saveDice);
die4.addEventListener("click", saveDice);
die5.addEventListener("click", saveDice);


/*------Functions------*/

function init() {
    winner = null;
    msg.textContent = "Let's play Threes! Place bets to start the game!";
    newRound();
}

function newRound() {
    currentBet = 0;
    betAmount = 1;
    turn = 1;

    render();
}

function placeBet() {
    if (winner !== null) init();
    if ((players[0].roundScore === players[1].roundScore) && (players[0].roundScore !== null && players[1].roundScore !== null)) {
        betAmount *= 2;
    };
    currentBet += (betAmount * 2);
    for (let player of players) {
        player.money -= betAmount;
    };
    
    render();
 }
    
    



function rollDice() {
    if (currentBet === 0) return;
    for (let die in dice) {
        if (dice[die]["saved"] === false) {
        dice[die]["currentRoll"] = Math.floor(Math.random() * 5 + 1);
        }
        
    }
    renderDice();
}

 



function saveDice() {
    if (currentBet === 0) return;
    if (dice.die1.currentRoll === 0) return;
    let clickedDie = parseInt(event.target.id);
    for (let die in dice) {
        if (dice[die]["id"] === clickedDie) {
            dice[die]["saved"] = true;
        }
    }
    
    renderDice();

}

function isGameOver() {
    //if player money ===0
}

function isRoundOver() {
    //if savedDice === 5 (or, iterate through dice and check that all are true)
}

function render() {
    if (winner !== null) {
        betbtn.textContent = "Reset";
    }
    if (winner === null) {
        betbtn.textContent = "Bet";
    }
    
    if (players[0].money === 0 || players[1].money === 0) {
        msg.textContent = `Sorry ?, you're out of money! Player ?${[winner]} wins the game! `
    }

    //if player 1 or player 2 money === 0
    //message "sorry (player), you're out of money! (other player) wins the game!"
    bet.textContent = currentBet;


}

function renderDice() {
    die1.textContent = dice.die1.currentRoll;
    die2.textContent = dice.die2.currentRoll;
    die3.textContent = dice.die3.currentRoll;
    die4.textContent = dice.die4.currentRoll;
    die5.textContent = dice.die5.currentRoll;
    if (dice.die1.saved === true) {
        die1.classList.add("highlight"); }
    if (dice.die2.saved === true) {
        die2.classList.add("highlight"); }
    if (dice.die3.saved === true) {
        die3.classList.add("highlight"); }
    if (dice.die4.saved === true) {
        die4.classList.add("highlight"); }
    if (dice.die5.saved === true) {
        die5.classList.add("highlight"); }
        
}



init();