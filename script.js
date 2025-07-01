const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
const figureParts = document.querySelectorAll(".figure-part");
const hintButton = document.getElementById("hint-button");
const hintText = document.getElementById("hint-text");
const scoreDisplay = document.getElementById("score");

let score = 0;
const words = ["application", "programming", "interface", "wizard", "element", "prototype", "callback", "undefined", "arguments", "settings", "selector", "container", "instance", "response", "console", "constructor", "token", "function", "return", "length", "type", "node"];
const hints = {
  application: "A program designed for end users.",
  programming: "The process of writing computer software.",
  interface: "A shared boundary for interaction.",
  wizard: "A helpful UI feature guiding steps.",
  element: "A building block in HTML.",
  prototype: "Initial model of a product.",
  callback: "Function passed as an argument.",
  undefined: "A variable without an assigned value.",
  arguments: "Inputs passed to a function.",
  settings: "Configuration options.",
  selector: "Used to target HTML in CSS.",
  container: "Holds other elements.",
  instance: "An individual occurrence of an object.",
  response: "Output from a request.",
  console: "Used for logging/debugging.",
  constructor: "Special method to create objects.",
  token: "Security or authorization string.",
  function: "A reusable block of code.",
  return: "Sends back a value from a function.",
  length: "Property that counts elements.",
  type: "Data classification (e.g., string, number).",
  node: "An item in a DOM tree."
};

let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `${selectedWord.split("").map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`).join("")}`;
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    score++;
    scoreDisplay.innerText = `🏆 Score: ${score}`;
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}${wrongLetters.map(letter => `<span>${letter}</span>`)}`;
  figureParts.forEach((part, index) => {
    part.style.display = index < wrongLetters.length ? "block" : "none";
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

window.addEventListener("keypress", (e) => {
  if (playable) {
    const letter = e.key.toLowerCase();
    if (letter >= "a" && letter <= "z") {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
          wordElement.classList.add("correct-flash");
          setTimeout(() => wordElement.classList.remove("correct-flash"), 200);
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElement();
          wrongLettersElement.classList.add("wrong-flash");
          setTimeout(() => wrongLettersElement.classList.remove("wrong-flash"), 200);
        } else {
          showNotification();
        }
      }
    }
  }
});

playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
  hintText.innerText = "";
});

hintButton.addEventListener("click", () => {
  hintText.innerText = hints[selectedWord] || "No hint available.";
});

displayWord();
