//PascalCase followed
var lastbutton = null; //Last button that was clicked.
var score = 0; //Score, i.e. how many Cards are opened
var turns = 0; //Number of turns taken.
let isEnableClickTile = true;

const Cards = []; //Array to store the Cards.
//Setting the Cards.
for (let j = 0; j < 8; j++) {
  randoNum = Math.floor(Math.random() * 16) + 1; // Random number from 1 to 16.
  Cards.push(randoNum); //Push twice.
  Cards.push(randoNum);
}
Cards.sort(() => 0.5 - Math.random()); //Random shuffling of Cards.
Cards.push(Cards[0]); //Ignore the Card at 0th positon.
var style =
  "box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);transition-duration: 0.2s;cursor: pointer;border-radius: 8px;";
for (let f = 1; f <= 16; f++) {
  document.getElementById("button" + f).style = style;
  document.getElementById("button" + f).hover = "{color: green;}";
  // document.getElementById("button" + f).hover="background-color: white; color: black; border: 2px solid #4CAF50;"
  //Button formatting
}
function Buttonclicked(a) {
  if (!isEnableClickTile) {
    return;
  }
  //Function to be executed once button is clicked.
  //a is the parameter which tells which button is clicked.
  document.getElementById("button" + a).src = `./images/${Cards[a]}.png`; // Flip the Card over
  document.getElementById("button" + a).disabled = "disabled"; //Disable clicking the same Card.
  document.getElementById("button" + a).style =
    "opacity: 0.7;cursor: not-allowed;color:Blue";
  checkscore(a); //Check the Cards.
}

function checkscore(a) {
  if (lastbutton == null) {
    lastbutton = a;
    //If it is the first Card (from two Cards) to be chosen,
    //then set the value of lastbutton to the button pressed.
  } else {
    setClickableOnTiles(false);
    if (Cards[a] != Cards[lastbutton]) {
      //If they don't match.....
      temp = lastbutton;
      document.getElementById("button" + a).style =
        "transition-duration: 0.8s;background-color:Tomato;color:White;";
      document.getElementById("button" + temp).style =
        "transition-duration: 0.8s;background-color:Tomato;color:White;";
      //If invalid, then set the background background-color Orange.
      window.setTimeout(function () {
        document.getElementById("button" + a).src = `./images/question.png`;
        document.getElementById("button" + a).style = style;
        document.getElementById("button" + temp).style = style;
        document.getElementById("button" + temp).src = `./images/question.png`;
        document.getElementById("button" + temp).style = "";
        document.getElementById("button" + a).style = "";
        setClickableOnTiles(true);
      }, 1200);
      //With delay, flip them back. and enable clicking.

      lastbutton = null; //reset lastbutton.
    } else {
      //If they match....
      score = score + 1; //Increase the score.
      document.getElementById("button" + a).style =
        "transition-duration: 0.8s;background-color:lime;color:Blue;";
      document.getElementById("button" + lastbutton).style =
        "transition-duration: 0.8s;background-color:lime;color:Blue;";
      //Change their colours to green.
      document.getElementById("button" + lastbutton).style =
        "pointer-events:none;";
      document.getElementById("button" + a).style = "pointer-events:none;";
      //Disable them from further clicking.
      document.getElementById("score").innerHTML = "Score=" + score;
      //Display the score.
      setClickableOnTiles(true);
      lastbutton = null;
    }

    turns = turns + 1; //Increase number of turns.
    document.getElementById("Turns").innerHTML = "Turns taken=" + turns;
    //display the number of turns taken.
    if (score == (Cards.length - 1) / 2) {
      gameover(); //game over.
    }
  }
}

function gameover() {
  window.setTimeout(function () {
    alert("Game Over");
    //Alert that the game is over after a delay.
  }, 1000);
  document.getElementById("score").innerHTML = "Game over!";
  document.getElementById("Turns").innerHTML = "You took " + turns + " turns";
}

function setClickableOnTiles(isEnable) {
  const tiles = document.querySelectorAll("img.button");
  for (const tile of tiles) {
    if (isEnable) {
      tile.classList.remove("cursor-not-allowed");
    } else {
      tile.classList.add("cursor-not-allowed");
    }
  }
  isEnableClickTile = isEnable;
}
