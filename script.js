const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");

let currentRound = 1;

// テスト用のX投稿URL
const posts = {
  A: "https://x.com/X/status/123456789",
  B: "https://x.com/X/status/987654321"
};

function showPost(button, url) {
  const box = button.querySelector(".post-box");

  box.innerHTML = `
    <blockquote class="twitter-tweet">
      <a href="${url}"></a>
    </blockquote>
  `;

  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load(box);
  }
}

showPost(choiceA, posts.A);
showPost(choiceB, posts.B);

function choose(choice) {

  message.textContent = `「${choice}」を選びました！`;

  currentRound++;

  setTimeout(() => {
    round.textContent = `ROUND ${currentRound}`;
    message.textContent = "";
  }, 700);
}

choiceA.addEventListener("click", () => {
  choose("左の投稿");
});

choiceB.addEventListener("click", () => {
  choose("右の投稿");
});