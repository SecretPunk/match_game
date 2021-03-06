$(document).ready(function() {

  MatchGame.renderCards(MatchGame.generateCardValues(), $("#game .row"));
});


/* MatchGame object */
var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {

  var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  return MatchGame.randomise(numbers);
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object. A 'div' is created for each value in the array cardValues. Then each
  of these card divs is given its own attributes for value, background colour
  and flipped status. Then, the function starts listening for card clicks.
*/

MatchGame.renderCards = function(cardValues, $game) {

  var colorArray = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)",
  "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)", "hsl(220, 85%, 65%)",
  "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)"];

  $game.data("flippedCards", []);

  $game.empty();

  for (var i = 0; i < cardValues.length; i++) {
    var $newCard = $("<div class =\"card col-3\"></div>");
    $newCard.data("value", cardValues[i]);
    $newCard.data("flipped", false);
    $newCard.data("color", colorArray[cardValues[i] - 1]);
    $game.append($newCard);
  }

  $(".card").click(function() {
    MatchGame.flipCard($(this), $game);
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  /* If card is already flipped, do nothing. Otherwise, change its background
  colour and flipped status, and show its number to the user. Then, add the card
  to the array of flipped cards. If there are now two flipped cards in the
  flippedCards array, compare them. If same, grey both the cards out.
  Otherwise, after a short delay, flip them back over and set their flipped
  status to false. After comparing the two flipped cards, empty the flippedCards
  array so a new pair can be clicked on and compared. Finally, after every flip,
  check if the user has flipped all 16 cards. If so, tell the user that they
  have won the game. */

  if ($card.data("flipped")) {
    return;
  }
  else {
    $card.css("background-color", $card.data("color"));
    $card.html($card.data("value"));
    $card.data("flipped", true);

    var flippedCards = $game.data("flippedCards");

    flippedCards.push($card);

    if (flippedCards.length == 2) {
      if (flippedCards[0].data("value") == flippedCards[1].data("value")) {
        for (var i = 0; i < flippedCards.length; i++) {
          flippedCards[i].css("background-color", "rgb(153, 153, 153)");
          flippedCards[i].css("color", "rgb(204, 204, 204)");
        }
      }
      else {
        setTimeout(function() {
          for (var j = 0; j < flippedCards.length; j++) {
            flippedCards[j].css("background-color", "rgb(32, 64, 86)");
            flippedCards[j].html("");
            flippedCards[j].data("flipped", false);
          }
        }, 500);
      }
      $game.data("flippedCards", []);
    }
  }
  MatchGame.checkWon();
};

/* Take an array, mix up its contents, return the mixed up array. */
MatchGame.randomise = function(orig_array) {

  var new_array = [];

  while (orig_array.length > 0) {
    var index = Math.round((Math.random() * (orig_array.length-1)));
    new_array.push(orig_array[index]);
    orig_array.splice(index, 1);
  }

  return new_array;
};

/* If every card's flipped status is true, then the game has been won. Show the
user an <h2> element, informing that the user has won the game. */
MatchGame.checkWon = function() {

  var flipped = 0;

  $(".card").each(function() {
    if ($(this).data("flipped") == true) {
      flipped++;
    }
  });

  setTimeout(function() {
    if (flipped == 16) {
      $("h2").css("display", "block");
    }
  }, 300);
};
