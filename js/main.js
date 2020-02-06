/*------Constants------*/




/*------Variables (state)------*/

let dice = {
    dice1 : {
        currentRoll: 0,
        saved: false,    
    },
    dice2 : {
        currentRoll: 0,
        saved: false,    
    },
    dice3 : {
        currentRoll: 0,
        saved: false,    
    },
    dice4 : {
        currentRoll: 0,
        saved: false,    
    },
    dice5 : {
        currentRoll: 0,
        saved: false,    
    }
}

let players = {
    player1 : {
        turn: 1,
        roundScore: null,
        currentScore: 0,
        money: 10,
    },
    player2 : {
        turn: 1,
        roundScore: null,
        currentScore: 0,
        money: 10,
    }

}

let currentBet;

let betAmount;

let winner;

/*------Cached Element References------*/

let dice1 = document.getElementById("1");
let dice2 = document.getElementById("2");
let dice3 = document.getElementById("3");
let dice4 = document.getElementById("4");
let dice5 = document.getElementById("5");
let betbtn = document.getElementById("betbtn");
let roll = document.getElementById("roll");
let msg = document.querySelector("h1");
let bet = document.getElementById("bet");

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
    currentBet = 0;
    betAmount = 1;
    winner = null;
    turn = 1
    msg.textContent = "Let's play Threes! Place bets to start the game!";
    render();
}

function newRound() {
    currentBet = 0;
    betAmount = 1;
    render();
}

function placeBet() {
    if (winner !== null) init();
    //if player 1 score === player 2 score betAmount *= 2
    currentBet += (betAmount * 2);
    players.player1.money -= betAmount;
    console.log(players.player1.money);
    
    render();

}

function rollDice() {
    if (currentBet === 0) return;

    render();

}

function saveDice() {

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
    //if player 1 or player 2 money === 0
    //message "sorry (player), you're out of money! (other player) wins the game!"
    bet.textContent = currentBet;


}



init();