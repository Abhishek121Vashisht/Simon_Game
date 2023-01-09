var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userChosenColour;
var started=false;
var level=0;
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
});
$(".pbt").click(function(){
    if(!started)
    {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
    }
  });
function nextSequence()
{
    userClickedPattern=[];
    level=level+1;
    $("#level-title").text("Level " + level);
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    // $("#"+currentColour).addClass("pressed").delay(100).removeClass("pressed");
    $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press On Play Button To Restart");
   
    setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
  }
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
// nextSequence();
// console.log(randomNumber);
// $("#randomChosenColour");