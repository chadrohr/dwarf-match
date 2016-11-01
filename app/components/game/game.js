; (function () {
  angular.module('dwarfMatch')
    .component('gameComponent', {
      controller: GameController,
      templateUrl: 'app/components/game/game.html'
    })

  function GameController($timeout, GameService) {
    var gc = this

    gc.deck = GameService.getDeck()

    let card1 = null;
    let card2 = null;
    gc.attempts = 0;
    gc.pairs = 0;
    let victory = false;

    gc.selectCard = function (card) {
      if (card1 && card2){
        return
      }
      if (card.show != true) {
        card.show = true;
        if (card1 === null) {
          card1 = card;
          return;
        } else if (card2 === null) {
          card2 = card;
          if (gc.isMatch(card1, card2)) {
            card1 = null
            card2 = null
            gc.pairs++
            gc.checkVictory();
          }
          else {
            $timeout(function () {
              gc.attempts++
              gc.resetCards();
            }, 1000);
          }
        }
      }
    }
    gc.resetCards = function () {
      card1.show = false;
      card2.show = false;
      card1 = null;
      card2 = null;
    }
    gc.isMatch = function (card1, card2) {
      if (card1.title == card2.title) {
        return true
      } else {
        return false
      }
    }
    gc.checkVictory = function () {
      if (gc.pairs == gc.deck.length / 2) {
        gc.victory = true;
      } return;
    }
    gc.cheat = function () {
      gc.victory = true;
    }
    gc.reset = function(){

      gc.deck = GameService.getDeck()
    let card1 = null;
    let card2 = null;
    gc.attempts = 0;
    gc.pairs = 0;
    let victory = false;
    }
  }
} ())

    // This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    
    // Create two card variables. These will be responsible
    // for keeping track of our selections as we click cards.

    // Next we need to initate a few more variables on gc for later use
    // Let's add variables for tracking the number of guesses (pairs flipped),
    // for the total number of correct guesses (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names

    // Next write a selectCard function on gc that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md

    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts

    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md

    // Finally, write a local checkVictory function that will set gc.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at gc.deck. When you're done
    // refer back to readme.md

    // Bonus Challenge: Write a function on gc that can reset the game and add a button that calls it


