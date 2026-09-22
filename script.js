const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");


// ============================
// 自撮りデータ
// ============================

const selfies = [
  {
    id: 1,
    name: "自撮り A",
    url: "https://x.com/sen_sen_sen_sen/status/2086058979239878765?s=46&t=3QDuhHeWnptfsbN4j88JCw"
  },
  {
    id: 2,
    name: "自撮り B",
    url: "https://x.com/sen_sen_sen_sen/status/2085727678150398070?s=46&t=3QDuhHeWnptfsbN4j88JCw"
  },
  {
    id: 3,
    name: "自撮り C",
    url: "https://x.com/sen_sen_sen_sen/status/2083887643583205425?s=46&t=3QDuhHeWnptfsbN4j88JCw"
  },
  {
    id: 4,
    name: "自撮り D",
    url: "https://x.com/sen_sen_sen_sen/status/2083537136092078495?s=46&t=3QDuhHeWnptfsbN4j88JCw"
  }
];


// ============================
// 現在の対戦
// ============================

let currentA = selfies[0];
let currentB = selfies[1];


// ============================
// X投稿を表示
// ============================

function showPost(button, selfie) {

  const box = button.querySelector(".post-box");

  box.innerHTML = `
    <p>${selfie.name}</p>

    <blockquote class="twitter-tweet">
      <a href="${selfie.url}"></a>
    </blockquote>
  `;

  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load(box);
  }
}


// 最初の2枚を表示
showPost(choiceA, currentA);
showPost(choiceB, currentB);


// ============================
// 選択処理
// ============================

function choose(winner) {

  message.textContent = `${winner.name} が勝ち残り！`;

  setTimeout(() => {

    message.textContent = "";

    // 次の自撮り
    const nextIndex = selfies.findIndex(
      selfie => selfie.id === winner.id
    ) + 2;

    const nextSelfie = selfies[nextIndex];

    // まだ対戦相手がいる場合
    if (nextSelfie) {

      currentA = winner;
      currentB = nextSelfie;

      round.textContent = `ROUND ${nextIndex - 1}`;

      showPost(choiceA, currentA);
      showPost(choiceB, currentB);

    } else {

      // 最後まで勝ち残った
      round.textContent = "WINNER";

      message.textContent =
        `👑 ${winner.name} が一番好きな自撮り！`;

    }

  }, 800);
}


choiceA.addEventListener("click", () => {
  choose(currentA);
});

choiceB.addEventListener("click", () => {
  choose(currentB);
});