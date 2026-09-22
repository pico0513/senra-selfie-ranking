const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");

let currentRound = 1;

function choose(choice) {

  message.textContent = `「${choice}」を選びました！`;

  currentRound++;

  setTimeout(() => {
    round.textContent = `ROUND ${currentRound}`;
    message.textContent = "";
  }, 700);
}

choiceA.addEventListener("click", () => {
  choose("自撮り A");
});

choiceB.addEventListener("click", () => {
  choose("自撮り B");
});