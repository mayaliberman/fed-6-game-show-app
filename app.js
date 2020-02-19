const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector(".btn__reset");
let missed = 0;
const phrases = [
  "A bird in the hand is worth two in the bush",
  "A piece of cake",
  "A fish out of water",
  "All you need is love",
  "Make my day"
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
    if (char !== " ") {
      li.className = "letter";
    }
    ul.appendChild(li);
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

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
  } else if (missed > 4) {
    overlay.style.display = "flex";
    overlay.className = "lose";
    title.textContent = "You Lost!";
  } 
}

startButton.addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
 
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
