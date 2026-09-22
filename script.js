// ==================================================
// センラさん自撮り選手権
// ==================================================

const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");

const game = document.querySelector(".game");


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
// シャッフル
// ==================================================

function shuffle(array) {

  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1));

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

let gameFinished = false;


// ==================================================
// X投稿を表示
// ==================================================

function showPost(button, selfie) {

  const box =
    button.querySelector(".post-box");

  box.innerHTML = `
    <p>${selfie.name}</p>

    <blockquote class="twitter-tweet">
      <a href="${selfie.url}"></a>
    </blockquote>
  `;

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

  if (players.length === 1) {

    finishGame(players[0]);

    return;
  }

  winners = [];

  matchIndex = 0;

  round.textContent =
    `ROUND ${roundNumber}`;

  // ラウンド開始時は必ずこれ
  message.textContent =
    "どっちの自撮りが好き？";

  choiceB.style.display = "";

  showNextMatch();
}


// ==================================================
// 次の対戦
// ==================================================

function showNextMatch() {

  if (matchIndex >= players.length) {

    players = winners;

    if (players.length === 1) {

      finishGame(players[0]);

      return;
    }

    roundNumber++;

    startRound();

    return;
  }


  // 奇数人数の場合
  if (
    matchIndex === players.length - 1 &&
    players.length % 2 === 1
  ) {

    winners.push(
      players[matchIndex]
    );

    matchIndex++;

    showNextMatch();

    return;
  }


  currentA =
    players[matchIndex];

  currentB =
    players[matchIndex + 1];


  showPost(
    choiceA,
    currentA
  );

  showPost(
    choiceB,
    currentB
  );
}


// ==================================================
// 勝者を選ぶ
// ==================================================

function choose(winner, selectedButton) {

  if (gameFinished) {
    return;
  }


  // 二重クリック防止
  choiceA.disabled = true;
  choiceB.disabled = true;


  // 選んだカードを黄色くする
  selectedButton.classList.add("selected");


  // 選んだ直後は名前を表示
  message.textContent =
    `✨ ${winner.name} ✨`;


  setTimeout(() => {

    selectedButton.classList.remove("selected");


    // 勝者を保存
    winners.push(winner);


    // 次の対戦へ
    matchIndex += 2;


    choiceA.disabled = false;
    choiceB.disabled = false;


    // 次の対戦を表示
    showNextMatch();

    // 次の対戦では必ず質問に戻す
    if (!gameFinished) {

      message.textContent =
        "どっちの自撮りが好き？";

    }

  }, 900);
}


// ==================================================
// 優勝画面
// ==================================================

function finishGame(winner) {

  gameFinished = true;

  currentA = winner;
  currentB = null;


  game.classList.add("winner-mode");


  round.textContent =
    "👑 WINNER 👑";


  message.textContent =
    "あなたが選んだ自撮りは……";


  showPost(
    choiceA,
    winner
  );


  const box =
    choiceA.querySelector(".post-box");


  const name =
    document.createElement("div");

  name.className =
    "winner-name";

  name.textContent =
    `👑 ${winner.name} 👑`;


  box.insertBefore(
    name,
    box.firstChild
  );


  choiceB.style.display = "none";

  document.querySelector(".vs").style.display =
    "none";


  const restartButton =
    document.createElement("button");

  restartButton.className =
    "restart-button";

  restartButton.type =
    "button";

  restartButton.textContent =
    "🔄 もう一度遊ぶ";


  restartButton.addEventListener(
    "click",
    restartGame
  );


  game.appendChild(
    restartButton
  );
}


// ==================================================
// もう一度遊ぶ
// ==================================================

function restartGame() {

  players = shuffle(selfies);

  winners = [];

  matchIndex = 0;

  roundNumber = 1;

  currentA = null;

  currentB = null;

  gameFinished = false;


  game.classList.remove(
    "winner-mode"
  );


  choiceB.style.display = "";

  document.querySelector(".vs").style.display =
    "";


  const restartButton =
    document.querySelector(
      ".restart-button"
    );

  if (restartButton) {
    restartButton.remove();
  }


  startRound();
}


// ==================================================
// クリック
// ==================================================

choiceA.addEventListener(
  "click",
  () => {

    if (
      currentA &&
      !gameFinished
    ) {

      choose(
        currentA,
        choiceA
      );

    }

  }
);


choiceB.addEventListener(
  "click",
  () => {

    if (
      currentB &&
      !gameFinished
    ) {

      choose(
        currentB,
        choiceB
      );

    }

  }
);


// ==================================================
// ゲーム開始
// ==================================================

startRound();