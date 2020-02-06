Unit 1 Game: Threes
define: 5 dice
define empty array for saved dice
define player score (null at beginning of game)
define currentScore
define player money (coins- 10 default)
define currentBet
define betAmount (resets on newRound)
Message: "Let's play 3's! Place bets to start the game!"

When player clicks "Place bet":
    if game is over, "Place bet" button will become "reset" button
        if player clicks "reset", run init()
    if player 1 score === player 2 score && score is not null
        betAmount  * 2
    One coin (per bet value) is removed from each player and placed in the bet pile, currentBet is increased by betAmount

Player turn:
 display message "Player One/Two begins!"

define saved (true/false) (defaults to true)
define diceRolled
    diceRolled = 5 - # of savedDice
define savedDice
player clicks roll dice
    saved = false
    if saved = false, message "You have to save at least one die!"
    display currentScore
        currentScore = sum of savedDice
    for die in diceRolled
        each die displays random value from 1-6
    player clicks between 1 and diceRolled dice to "save"
        saved = true
    if diceSaved = 5
        currentScore = player score
        message "(player score) is the score to beat!"
        switch to next player

isRoundOver/isGameOver:        

if player 1 score && player 2 score !== null:
    if player 1 score === player 2 score
        message "No winner! Bet again and go for a tie breaker!"
        turn goes to next player, new round is not initilized

    if player 1 score > player 2 score:
        message: "Player one wins this round!"
        player1 money += bet
        initilize new round
    
    if player 2 score > player 1 score:
        message: Player 2 wins this round!"
        palyer 2 money += bet
        initialize new round

    if player 1 or player 2 money === 0
        message "sorry (player), you're out of money! (other player) wins the game!"



            
    