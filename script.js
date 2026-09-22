const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const game = document.querySelector(".game");

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

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [
      result[j],
      result[i]
    ];
  }

  return result;
}

let players = shuffle(selfies);
let winners = [];
let matchIndex = 0;
let roundNumber = 1;
let currentA = null;
let currentB = null;
let gameFinished = false;


/* =========================
   進行状況
========================= */

// 最初に必要な選択回数
const totalMatches = selfies.length - 1;

// 今までに終わった選択回数
let completedMatches = 0;


function updateProgress() {

  // 残り回数
  const remainingMatches =
    totalMatches - completedMatches;

  // 進行率
  const progress =
    (completedMatches / totalMatches) * 100;

  progressText.textContent =
    `優勝まであと ${remainingMatches} 回`;

  progressFill.style.width =
    `${progress}%`;
}


/* =========================
   X投稿を表示
========================= */

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


/* =========================
   ラウンド開始
========================= */

function startRound() {

  if (players.length === 1) {

    finishGame(players[0]);

    return;
  }

  winners = [];
  matchIndex = 0;

  round.textContent =
    `ROUND ${roundNumber}`;

  message.textContent =
    "どっちの自撮りが好き？";

  choiceB.style.display = "";

  showNextMatch();
}


/* =========================
   次の対戦
========================= */

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


  // 奇数の場合、最後の1人はそのまま次ROUNDへ
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


  updateProgress();
}


/* =========================
   選択
========================= */

function choose(
  winner,
  selectedButton
) {

  if (gameFinished) return;

  choiceA.disabled = true;
  choiceB.disabled = true;

  selectedButton.classList.add(
    "selected"
  );

  message.textContent =
    `✨ ${winner.name} ✨`;


  setTimeout(() => {

    selectedButton.classList.remove(
      "selected"
    );

    winners.push(winner);

    // 1回分進む
    completedMatches++;

    matchIndex += 2;

    choiceA.disabled = false;
    choiceB.disabled = false;

    updateProgress();

    showNextMatch();


    if (!gameFinished) {

      message.textContent =
        "どっちの自撮りが好き？";

    }

  }, 900);
}


/* =========================
   優勝
========================= */

function finishGame(winner) {

  gameFinished = true;

  currentA = winner;
  currentB = null;

  game.classList.add(
    "winner-mode"
  );

  round.textContent =
    "👑 WINNER 👑";

  message.textContent =
    "あなたが選んだ自撮りは……";

  progressText.textContent =
    "🎉 優勝決定！";

  progressFill.style.width =
    "100%";

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


  choiceB.style.display =
    "none";

  document.querySelector(".vs")
    .style.display = "none";


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


/* =========================
   もう一度遊ぶ
========================= */

function restartGame() {

  players =
    shuffle(selfies);

  winners = [];

  matchIndex = 0;

  roundNumber = 1;

  currentA = null;

  currentB = null;

  gameFinished = false;

  completedMatches = 0;

  game.classList.remove(
    "winner-mode"
  );

  choiceB.style.display = "";

  document.querySelector(".vs")
    .style.display = "";


  const restartButton =
    document.querySelector(
      ".restart-button"
    );

  if (restartButton) {
    restartButton.remove();
  }

  updateProgress();

  startRound();
}


/* =========================
   ボタン
========================= */

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


/* =========================
   ゲーム開始
========================= */

updateProgress();
startRound();