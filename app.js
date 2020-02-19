const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector(".btn__reset");
let missed = 0;
const phrases = [
  "A bunch of fives",
  "A piece of cake",
  "A fish out of water",
  "All you need is love",
  "Make my day", 
  'Fancy-pants'
];

function getRandomPhraseAsArray(arr) {
  const gamePhrase = arr[Math.floor(Math.random() * arr.length)];
  console.log(gamePhrase);
  return gamePhrase.toLowerCase().split("");
}

function addPhraseToDisplay(arr) {
  for (let char of arr) {
    const ul = phrase.firstElementChild;
    const li = document.createElement("li");
    li.textContent = char;
    li.style.marginTop = '10px'
    if (char !== " ") {
      li.className = "letter";
    } else {
        li.style.paddingLeft = '10px'
    }
    ul.appendChild(li);
  }
}

function checkLetter(button) {
  const letter = button.textContent;
  const lis = document.querySelectorAll(".letter");
  let match = null;
  for (let char of lis) {
    if (letter === char.textContent) {
      char.className += "   show";
      match = letter;
    }
  }
  return match;
}

function checkWin() {
  const lettersList = document.querySelectorAll(".letter");
  const showLetters = document.querySelectorAll(".show");
  const overlay = document.getElementById("overlay");
  const title = document.querySelector("#overlay h2");

  if (lettersList.length === showLetters.length) {
    overlay.style.display = "flex";
    overlay.className = "win";
    title.textContent = "You Won!";
    //RESTARTING THE GAME
    restartGame();
  } else if (missed > 4) {
    overlay.style.display = "flex";
    overlay.className = "lose";
    title.textContent = "You Lost!";
    //RESTARTING THE GAME
    restartGame();
  }
}

startButton.addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  missed = 0;
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});

qwerty.addEventListener("click", e => {
  const key = e.target;
  key.className = "chosen";
  if (key.className === "chosen") {
    key.setAttribute("disabled", "");
  }
  const chosenLetter = checkLetter(key);
  if (chosenLetter === null) {
    missed++;
    const heart = document.querySelector(".tries");
    if (heart) {
      heart.remove();
    }
  }
  checkWin();
});

function restartGame() {
    const lis = document.querySelectorAll("#phrase ul li");
    const scoreboard = document.querySelector("#scoreboard ol");
    const numOfHeartLeft = scoreboard.children.length;
    for (let li of lis) {
      li.remove();
    }
    for (let i = 0; i < (5-numOfHeartLeft); i++) {
      const heart = document.createElement("li");
      heart.className = "tries";
      heart.innerHTML =
        '<img src="images/liveHeart.png" height="35px" width="30px"></img>';
      scoreboard.appendChild(heart);
    }

    const keys = document.querySelectorAll(".keyrow button");
    for (let key of keys) {
      key.classList.remove("chosen");
      key.disabled = false;
    }

}
