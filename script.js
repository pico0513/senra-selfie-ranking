const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");

// ==================================================
// 自撮りデータ
// ==================================================

const selfies = [
  {
    id: 1,
    name: "夜叉 北海道",
    url: "https://x.com/sen_sen_sen_sen/status/2029564054923354125"
  },
  {
    id: 2,
    name: "夜叉 秋田",
    url: "https://x.com/sen_sen_sen_sen/status/2030283244814651560"
  },
  {
    id: 3,
    name: "夜叉 岩手",
    url: "https://x.com/sen_sen_sen_sen/status/2030958425916760553"
  },
  {
    id: 4,
    name: "夜叉 茨城",
    url: "https://x.com/sen_sen_sen_sen/status/2033195016043258228"
  },
  {
    id: 5,
    name: "夜叉 高知",
    url: "https://x.com/sen_sen_sen_sen/status/2035342123948732843"
  },
  {
    id: 6,
    name: "夜叉 香川",
    url: "https://x.com/sen_sen_sen_sen/status/2035694140978339870"
  },
  {
    id: 7,
    name: "夜叉 石川",
    url: "https://x.com/sen_sen_sen_sen/status/2037904075862466586"
  },
  {
    id: 8,
    name: "夜叉 福井",
    url: "https://x.com/sen_sen_sen_sen/status/2038250190445175190"
  },
  {
    id: 9,
    name: "夜叉 岡山",
    url: "https://x.com/sen_sen_sen_sen/status/2039698699992051862"
  },
  {
    id: 10,
    name: "夜叉 滋賀",
    url: "https://x.com/sen_sen_sen_sen/status/2040413743784566908"
  },
  {
    id: 11,
    name: "夜叉 奈良",
    url: "https://x.com/sen_sen_sen_sen/status/2040793776952836361"
  },
  {
    id: 12,
    name: "夜叉 岐阜",
    url: "https://x.com/sen_sen_sen_sen/status/2041504228020265263"
  },
  {
    id: 13,
    name: "夜叉 静岡",
    url: "https://x.com/sen_sen_sen_sen/status/2042264523206537299"
  },
  {
    id: 14,
    name: "夜叉 群馬",
    url: "https://x.com/sen_sen_sen_sen/status/2043314680152948822"
  },
  {
    id: 15,
    name: "夜叉 大分",
    url: "https://x.com/sen_sen_sen_sen/status/2045485889196044461"
  },
  {
    id: 16,
    name: "夜叉 東京1日目",
    url: "https://x.com/sen_sen_sen_sen/status/2048043422343397687"
  },
  {
    id: 17,
    name: "夜叉 東京2日目",
    url: "https://x.com/sen_sen_sen_sen/status/2048360987070537974"
  }
];

// ==================================================
// ランダムシャッフル
// ==================================================

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}

// ==================================================
// ゲーム状態
// ==================================================

let players = shuffle(selfies);

let winners = [];

let matchIndex = 0;

let roundNumber = 1;

let currentA = null;
let currentB = null;

// ==================================================
// X投稿を表示
// ==================================================

function showPost(button, selfie) {

  const box = button.querySelector(".post-box");

  box.innerHTML = `
    <p>${selfie.name}</p>

    <blockquote class="twitter-tweet">
      <a href="${selfie.url}"></a>
    </blockquote>
  `;

  /*
    Xの公式ウィジェットが読み込まれた後でも
    確実に再描画する
  */

  if (
    window.twttr &&
    window.twttr.widgets
  ) {
    window.twttr.widgets.load(box);
  }
}

// ==================================================
// ラウンド開始
// ==================================================

function startRound() {

  winners = [];

  matchIndex = 0;

  round.textContent =
    `ROUND ${roundNumber}`;

  showNextMatch();
}

// ==================================================
// 次の対戦
// ==================================================

function showNextMatch() {

  // ------------------------------------------
  // ラウンド終了
  // ------------------------------------------

  if (matchIndex >= players.length) {

    players = winners;

    // 1人だけになったら優勝
    if (players.length === 1) {

      currentA = players[0];
      currentB = null;

      round.textContent = "WINNER";

      message.textContent =
        `👑 ${players[0].name} が優勝！`;

      showPost(choiceA, players[0]);

      choiceB.style.display = "none";

      return;
    }

    // 次のラウンド
    roundNumber++;

    startRound();

    return;
  }

  // ------------------------------------------
  // 奇数人数の場合
  // ------------------------------------------

  if (
    matchIndex === players.length - 1 &&
    players.length % 2 === 1
  ) {

    // 最後の1人は不戦勝
    winners.push(players[matchIndex]);

    matchIndex++;

    showNextMatch();

    return;
  }

  // ------------------------------------------
  // 対戦相手を設定
  // ------------------------------------------

  currentA = players[matchIndex];

  currentB = players[matchIndex + 1];

  showPost(choiceA, currentA);

  showPost(choiceB, currentB);
}

// ==================================================
// 勝者を選ぶ
// ==================================================

function choose(winner) {

  // 二重クリック防止
  choiceA.disabled = true;
  choiceB.disabled = true;

  message.textContent =
    `「${winner.name}」が勝ち残り！`;

  setTimeout(() => {

    // 勝者を保存
    winners.push(winner);

    // 次の対戦へ
    matchIndex += 2;

    message.textContent = "";

    choiceA.disabled = false;
    choiceB.disabled = false;

    showNextMatch();

  }, 500);
}

// ==================================================
// クリック
// ==================================================

choiceA.addEventListener("click", () => {

  if (currentA) {
    choose(currentA);
  }

});

choiceB.addEventListener("click", () => {

  if (currentB) {
    choose(currentB);
  }

});

// ==================================================
// ゲーム開始
// ==================================================

startRound();