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
    url: "https://x.com/sen_sen_sen_sen/status/2086058979239878765"
  },
  {
    id: 2,
    name: "自撮り B",
    url: "https://x.com/sen_sen_sen_sen/status/2085727678150398070"
  },
  {
    id: 3,
    name: "自撮り C",
    url: "https://x.com/sen_sen_sen_sen/status/2083887643583205425"
  },
  {
    id: 4,
    name: "自撮り D",
    url: "https://x.com/sen_sen_sen_sen/status/2083537136092078495"
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

let roundNumber = 1;

round.textContent = `ROUND ${roundNumber}`;

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
// 勝敗処理
// ============================

function choose(winner) {

  // まだ次の自撮りがある場合
  if (currentIndex < randomizedSelfies.length) {

    message.textContent =
      `「${winner.name}」が勝ち残り！`;

    setTimeout(() => {

      // 次の自撮り
      const nextSelfie =
        randomizedSelfies[currentIndex];

      // 勝者 VS 次の自撮り
      currentA = winner;
      currentB = nextSelfie;

      // 次の自撮りへ
      currentIndex++;

      // ROUNDを進める
      roundNumber++;

      round.textContent =
        `ROUND ${roundNumber}`;

      message.textContent = "";

      // 表示更新
      showPost(choiceA, currentA);
      showPost(choiceB, currentB);

    }, 700);

  } else {

    // ============================
    // 全員登場 → 優勝
    // ============================

    round.textContent = "WINNER";

    message.textContent =
      `👑 ${winner.name} が優勝！`;
  }
}

// ============================
// クリック
// ============================

choiceA.addEventListener("click", () => {
  choose(currentA);
});

choiceB.addEventListener("click", () => {
  choose(currentB);
});