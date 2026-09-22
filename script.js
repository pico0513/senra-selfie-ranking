const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");

const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const message = document.getElementById("message");
const round = document.getElementById("round");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const game = document.querySelector(".game");


/* =========================
   自撮りデータ
========================= */

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


/* =========================
   シャッフル
========================= */

function shuffle(array) {

  const result = [...array];

  for (
    let i = result.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}


/* =========================
   ゲーム状態
========================= */

let players = [];

let winners = [];

let matchIndex = 0;

let roundNumber = 1;

let currentA = null;

let currentB = null;

let gameFinished = false;

let winCounts = {};


/* =========================
   進行状況
========================= */

const totalMatches =
  selfies.length - 1;

let completedMatches = 0;


function updateProgress() {

  const remainingMatches =
    totalMatches - completedMatches;

  const progress =
    (completedMatches / totalMatches) * 100;

  progressText.textContent =
    `優勝まであと ${remainingMatches} 回`;

  progressFill.style.width =
    `${progress}%`;
}


/* =========================
   勝利数リセット
========================= */

function resetWinCounts() {

  winCounts = {};

  selfies.forEach((selfie) => {

    winCounts[selfie.id] = 0;

  });

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
   ROUND演出
========================= */

function showRoundAnimation() {

  round.classList.remove(
    "round-change"
  );

  void round.offsetWidth;

  round.classList.add(
    "round-change"
  );

  setTimeout(() => {

    round.classList.remove(
      "round-change"
    );

  }, 800);
}


/* =========================
   WIN演出
========================= */

function showWinAnimation(
  selectedButton
) {

  selectedButton.classList.add(
    "win-animation"
  );

  const winLabel =
    document.createElement("div");

  winLabel.className =
    "win-label";

  winLabel.textContent =
    "✨ WIN! ✨";

  selectedButton.appendChild(
    winLabel
  );

  setTimeout(() => {

    selectedButton.classList.remove(
      "win-animation"
    );

    winLabel.remove();

  }, 900);
}


/* =========================
   ラウンド開始
========================= */

function startRound(
  isNewRound = false
) {

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


  if (isNewRound) {

    showRoundAnimation();

  }


  showNextMatch();
}


/* =========================
   次の対戦
========================= */

function showNextMatch() {

  if (
    matchIndex >= players.length
  ) {

    players = winners;


    if (players.length === 1) {

      finishGame(players[0]);

      return;
    }


    roundNumber++;


    startRound(true);


    return;
  }


  /*
   * 奇数の場合、
   * 最後の1人はそのまま次ROUNDへ
   */

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


  showWinAnimation(
    selectedButton
  );


  message.textContent =
    `✨ ${winner.name} ✨`;


  setTimeout(() => {

    selectedButton.classList.remove(
      "selected"
    );


    /*
     * 勝利数を記録
     */

    winCounts[winner.id]++;


    winners.push(winner);


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
   ランキング作成
========================= */

function createRanking() {

  const ranking =
    [...selfies].sort(
      (a, b) =>
        winCounts[b.id] -
        winCounts[a.id]
    );


  return ranking;
}


/* =========================
   ランキング表示
========================= */

function showRanking() {

  const ranking =
    createRanking();


  const rankingArea =
    document.createElement("section");

  rankingArea.className =
    "ranking-area";


  const title =
    document.createElement("h2");

  title.className =
    "ranking-title";

  title.textContent =
    "🏆 あなたの自撮りランキング";


  rankingArea.appendChild(
    title
  );


  let currentRank = 0;

  let previousWins = null;


  ranking.forEach(
    (selfie, index) => {

      /*
       * 前の人と勝ち数が違うときだけ
       * 順位を更新する
       */
      if (
        previousWins === null ||
        winCounts[selfie.id] !== previousWins
      ) {

        currentRank =
          index + 1;

      }


      previousWins =
        winCounts[selfie.id];


      const item =
        document.createElement("div");

      item.className =
        "ranking-item";


      /*
       * 1位のデザイン
       */

      if (currentRank === 1) {

        item.classList.add(
          "ranking-first"
        );

      }


      const rank =
        document.createElement("div");

      rank.className =
        "ranking-number";


      if (currentRank === 1) {

        rank.textContent =
          "🥇";

      } else if (currentRank === 2) {

        rank.textContent =
          "🥈";

      } else if (currentRank === 3) {

        rank.textContent =
          "🥉";

      } else {

        rank.textContent =
          `${currentRank}`;

      }


      const info =
        document.createElement("div");

      info.className =
        "ranking-info";


      const name =
        document.createElement("div");

      name.className =
        "ranking-name";

      name.textContent =
        selfie.name;


      const wins =
        document.createElement("div");

      wins.className =
        "ranking-wins";

      wins.textContent =
        `${winCounts[selfie.id]} 勝`;


      info.appendChild(
        name
      );

      info.appendChild(
        wins
      );


      item.appendChild(
        rank
      );

      item.appendChild(
        info
      );


      rankingArea.appendChild(
        item
      );

    }
  );


  game.appendChild(
    rankingArea
  );
}
        
        
/* =========================
   優勝画面
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
    "あなたのNo.1自撮りは……";


  progressText.textContent =
    "🎉 優勝決定！";


  progressFill.style.width =
    "100%";


  showPost(
    choiceA,
    winner
  );


  const box =
    choiceA.querySelector(
      ".post-box"
    );


  const name =
    document.createElement(
      "div"
    );


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
    .style.display =
    "none";


  /*
   * ランキング表示
   */

  showRanking();


  /*
   * 結果ボタン
   */

  const resultArea =
    document.createElement("div");

  resultArea.className =
    "result-buttons";


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


  const shareButton =
    document.createElement("button");


  shareButton.className =
    "share-button";


  shareButton.type =
    "button";


  shareButton.textContent =
    "𝕏 結果をシェア";


  shareButton.addEventListener(
    "click",
    () => {

      const text =
        `センラさん自撮り選手権、私のNo.1は「${winner.name}」でした📸✨`;

      const shareUrl =
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

      window.open(
        shareUrl,
        "_blank"
      );

    }
  );


  resultArea.appendChild(
    restartButton
  );

  resultArea.appendChild(
    shareButton
  );


  game.appendChild(
    resultArea
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


  resetWinCounts();


  game.classList.remove(
    "winner-mode"
  );


  choiceB.style.display = "";


  document.querySelector(".vs")
    .style.display =
    "";


  const rankingArea =
    document.querySelector(
      ".ranking-area"
    );


  if (rankingArea) {

    rankingArea.remove();

  }


  const resultArea =
    document.querySelector(
      ".result-buttons"
    );


  if (resultArea) {

    resultArea.remove();

  }


  updateProgress();

  startRound();
}


/* =========================
   STARTボタン
========================= */

startButton.addEventListener(
  "click",
  () => {

    startScreen.style.display =
      "none";

    gameScreen.classList.add(
      "active"
    );

    players =
      shuffle(selfies);

    winners = [];

    matchIndex = 0;

    roundNumber = 1;

    currentA = null;

    currentB = null;

    gameFinished = false;

    completedMatches = 0;


    resetWinCounts();


    updateProgress();

    startRound();

  }
);


/* =========================
   ゲームボタン
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
