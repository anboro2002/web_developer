/* names */

var playerName1 = Prompt("Player 1:");
var playerName2 = Prompt("Player 2:");

/* random dice */

var randomNumber1 = Math.floor(Math.random() * 6) +1;
var randomNumber2 = Math.floor(Math.random() * 6) +1;

var randomDiceImage1 = "./images/dice"+randomNumber1+".png";
var randomDiceImage2 = "./images/dice"+randomNumber2+".png";

document.querySelector(".img1").setAttribute("src",randomDiceImage1);
document.querySelector(".img2").setAttribute("src",randomDiceImage2);


/* Win / Draw message */

if(randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML = "🚩 "+playerName1+" Wins!";
} else if(randomNumber2 > randomNumber1){
    document.querySelector("h1").innerHTML = playerName2 + " Wins! 🚩";
} else if(randomNumber1 === randomNumber2){
    document.querySelector("h1").innerHTML = ("Draw");
}


/* Play button (refresh page) */

document.querySelector(".btn").addEventListener("click", function(){
    location.reload();
});

