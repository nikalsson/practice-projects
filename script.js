// object oriented version tutorial https://wsvincent.com/javascript-object-oriented-deck-cards/
// http://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript

// Define cards
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
let deck = new Array();

// Define count, used to keep track of the number of cards in the deck
let count = 0;

// Define the player and player's hand
let hand = new Array();

let player = {
  name: "Player",
  points: 0,
  hand: hand
};

// Define buttons on the page
const dealButton = document.getElementById('deal-card');


  
// Build a deck of cards
function makeDeck() {
  deck = []; // if a deck already exists, this will remove the contents
  for (let i = 0; i < suits.length; i++){
    for (let j = 0; j < values.length; j++){
      let card = { value : values[j], suit : suits[i] };
      deck.push(card);
    }
  }
  console.log("Made a deck!");
  return deck;
}

// Pick a random number in a deck of cards, 1-52
function pickRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;  
}

// Shuffle the deck, pick two random locations in the deck and exchange them, repeat 1000 times
function shuffle(arr) {
  for (let i = 0; i < 1000; i++) {
    let locationA = pickRandomInt(0, 51);
    let locationB = pickRandomInt(0, 51);
    
    // make a temporary placeholder and exchange the locations
    let temp = arr[locationA];
    arr[locationA] = arr[locationB];
    arr[locationB] = temp;
  }
  console.log(`Card locations changed 1000 times!`);
  return deck;
}

// Adjust the value of ace, value is either 1 or 14
function itsAnAce(){
  console.log('Ace drawn!');
  if (player.points <= 7){
    player.hand[player.hand.length-1].value = 14;
  } else {
    player.hand[player.hand.length-1].value = 1;
  }
}

// Draw one card for the player
function drawCard(){
    console.log(`Drawn card number ${count+1}`);
    var card = deck.pop()
    player.hand.push(card);
    
    // Check if the card is an ace, adjust the value
    if (card.value == 'A') {
      itsAnAce();
    }
    
    player.points += card.value;
    
    check();
    
    console.log(player.hand);
    count++;
}

// Start game, make deck, shuffle, deal two cards to player
function gameStart() {
  makeDeck();
  shuffle(deck);
  drawCard();
  drawCard();
}

gameStart();

// Check the points of player, if it is over 21 - end game
function check(){
  if (player.points > 21){
    console.log('LOST THE GAME, OVER 21!');
    endGame();
  } else {
    console.log('Player\'s points ' + player.points);
  }
}


// Ventti logic
// A = 1 or 14, J = 11, Q = 12, K = 13 - target is 21, >21 is bust
// All cards are open
// Start with two cards

function endGame(){
  dealButton.disabled = true;
}


// select the gameboard and add a card on it
document.getElementsByClassName('gameboard')

// Deal button
dealButton.addEventListener('click', function(){
  drawCard();
});





// for (let i = 0; i < 53; i++) {
//   console.log(drawCard(deck));
// }


// Draw a random card from the deck, no need because the deck is shuffled
// function drawCard(arr){
  // if (arr.length > 0) {
  //   let x = pickRandomInt(0, arr.length);
  //   console.log(arr.length);
  //   arr.splice(x, 1);
  //   console.log(`Drawn card index ${x}, it is ${arr[x].value} of ${arr[x].suit}`);
  // } else {
  //   console.log('empty deck!');
  // }  
// }