
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;


$(document).keypress(function() {
  if(!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});



function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  var newNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[newNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(120).fadeIn(120);
  var colourSound = new Audio("sounds/" + randomChosenColour +".mp3");
  colourSound.play();
  console.log("GAME: " + gamePattern);
}


$(".btn").click(function() {

  var currentResult = true;
  if (gameStarted === true) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("Level: " + level);
    console.log("USER: " + userClickedPattern);

    animatePress(userChosenColour);
    var colourSound = new Audio("sounds/" + userChosenColour +".mp3");
    colourSound.play();
    if (userClickedPattern.length <= level) {
      currentResult = Boolean(checkAnswer(userClickedPattern.length));
    }

    if (currentResult === true && userClickedPattern.length === level) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  }

});

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {$(".pressed").removeClass("pressed");}, 100);
}

function startGame() {
  $("body").keypress(function() {
    if (Boolean(gameStarted) === false) { gameStarted = true; }
    console.log("Game Started = " + Boolean(gameStarted));
    return gameStarted;
  });
}

function checkAnswer(currentLevel) {
  var correctPattern = true;
  var i = currentLevel - 1;
  //for (var i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      console.log((i + 1) + " Level success");
    } else {
      console.log((i + 1) + " Level wrong");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      correctPattern = false;
      gameStarted = false;
      gamePattern = [];
      userClickedPattern = [];
      level = 0;


      $('body').addClass("game-over");
      $("#level-title").text("Game Over!!");

      setTimeout(function() {$(".game-over").removeClass("game-over");}, 3000);
      setTimeout(function() {$("#level-title").text("Press Any Key to Start");}, 3000);
      //return correctPattern;
    }
  //}
  return correctPattern;


}

function gameOver() {

    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("#level-title").text("Press A Key to Start");
}
