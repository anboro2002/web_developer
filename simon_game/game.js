var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).keydown( function(){                                    /* Detectare apasare prima tasta */
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted=true;
        $(".linkDiv").hide();
    }
})

$(".btn").click(function(){                                         /* functie pentru apasare de user */
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){                                 /* verificare trecere level */
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to restart");
        startOver();
    }
}

function nextSequence(){                                            /* functie pentru apasare random*/
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){                                           /* functie pentru sunet */
    var audio = new Audio("sounds/"+ name+ ".mp3");
    audio.play();
}

function animatePress(currentColour){                               /* functie pentru animarea butonului apasat*/
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){                                               /* resetare joc */
    level = 0;
    gamePattern = [];
    gameStarted=false;
}
