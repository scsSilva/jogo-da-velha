const scorePlayer1 = document.getElementById("score_player_1");
const scorePlayer2 = document.getElementById("score_player_2");
const spaceElements = document.querySelectorAll(".space");

const players = [
  { id: 1, value: "X", score: 0 },
  { id: 2, value: "O", score: 0 },
];

const sequences = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 5, 8],
  [2, 4, 6],
  [6, 7, 8],
];

let player = players[0];
let sequencePlayer1 = [];
let sequencePlayer2 = [];

const verifySequence = (array) => {
  let exists = false;

  for (let i = 0; i < sequences.length; i++) {
    exists = sequences[i].every((element) => array.includes(element));
    if (exists) break;
  }

  return exists;
};

const alertScoreboard = () => {
  alert(
    `PLACAR\n\nPLAYER 1 (X) = ${players[0].score}\nPLAYER 2 (O) = ${players[1].score}`
  );
};

const reset = () => {
  sequencePlayer1 = [];
  sequencePlayer2 = [];
  player = players[0];

  spaceElements.forEach((item, index) => {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  });
};

const drawMove = (item) => {
  const elementLetter = document.createElement("p");
  elementLetter.textContent = player.value;
  elementLetter.classList.add("letter");
  item.appendChild(elementLetter);
};

spaceElements.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (player.id == 1) {
      const existsInSequencePlayer1 = sequencePlayer1.includes(index);
      const existsInSequencePlayer2 = sequencePlayer2.includes(index);

      if (
        existsInSequencePlayer1 == false &&
        existsInSequencePlayer2 == false
      ) {
        sequencePlayer1.push(index);

        drawMove(item);

        if (sequencePlayer1.length >= 3) {
          if (verifySequence(sequencePlayer1) == true) {
            player.score++;
            scorePlayer1.textContent = `${player.value} = ${player.score}`;
            alertScoreboard();
            reset();
          } else {
            player = players[1];
          }
        } else {
          player = players[1];
        }
      }
    } else {
      const existsInSequencePlayer1 = sequencePlayer1.includes(index);
      const existsInSequencePlayer2 = sequencePlayer2.includes(index);

      if (
        existsInSequencePlayer1 == false &&
        existsInSequencePlayer2 == false
      ) {
        sequencePlayer2.push(index);

        drawMove(item);

        if (sequencePlayer2.length >= 3) {
          if (verifySequence(sequencePlayer2) == true) {
            player.score++;
            scorePlayer2.textContent = `${player.value} = ${player.score}`;
            alertScoreboard();
            reset();
          } else {
            player = players[0];
          }
        } else {
          player = players[0];
        }
      }
    }
  });
});
