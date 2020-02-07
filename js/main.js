/*------Constants------*/




/*------Variables (state)------*/

let dice = {
    dice1: {
        currentRoll: 0,
        saved: false
    },
    dice2: {
        currentRoll: 0, 
        saved: false,
    },
    dice3: {
        currentRoll: 0, 
        saved: false
    },
    dice4: {
        currentRoll: 0, 
        saved: false,
    },
    dice5: {
        currentRoll: 0, saved: false
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

const dice1 = document.getElementById("0");
const dice2 = document.getElementById("1");
const dice3 = document.getElementById("2");
const dice4 = document.getElementById("3");
const dice5 = document.getElementById("4");
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
dice1.addEventListener("click", saveDice);
dice2.addEventListener("click", saveDice);
dice3.addEventListener("click", saveDice);
dice4.addEventListener("click", saveDice);
dice5.addEventListener("click", saveDice);


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
    }
    
    render();
 }
    
    



function rollDice() {
    if (currentBet === 0) return;

    render();

}

function saveDice() {
    console.log("click");

}

function isGameOver() {
    
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



init();