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
    url: "https://x.com/sen_sen_sen_sen/status/2086058979239878765?"
  },
  {
    id: 2,
    name: "自撮り B",
    url: "https://x.com/sen_sen_sen_sen/status/2085727678150398070?"
  },
  {
    id: 3,
    name: "自撮り C",
    url: "https://x.com/sen_sen_sen_sen/status/2083887643583205425?"
  },
  {
    id: 4,
    name: "自撮り D",
    url: "https://x.com/sen_sen_sen_sen/status/2083537136092078495?"
  }
];

// ============================
// ランダムシャッフル
// ============================

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}

// ============================
// ゲーム開始
// ============================

const randomizedSelfies = shuffle(selfies);

let currentIndex = 2;

let currentA = randomizedSelfies[0];
let currentB = randomizedSelfies[1];

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

  message.textContent =
    `「${winner.name}」が勝ち残り！`;

  setTimeout(() => {

    message.textContent = "";

    // 次の自撮りがあるか確認
    if (currentIndex < randomizedSelfies.length) {

      const nextSelfie =
        randomizedSelfies[currentIndex];

      // 勝者 VS 次の自撮り
      currentA = winner;
      currentB = nextSelfie;

      currentIndex++;

      round.textContent =
        `ROUND ${currentIndex - 1}`;

      showPost(choiceA, currentA);
      showPost(choiceB, currentB);

    } else {

      // 全員登場したら優勝
      round.textContent = "WINNER";

      message.textContent =
        `👑 ${winner.name} が優勝！`;
    }

  }, 700);
}

// ============================
// ボタンを押したとき
// ============================

choiceA.addEventListener("click", () => {
  choose(currentA);
});

choiceB.addEventListener("click", () => {
  choose(currentB);
});