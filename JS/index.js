let app = document.querySelector(".app");
let quiz = document.querySelector(".quiz");
let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let choice = document.querySelectorAll(".answerChoice");
let btnContainer = document.querySelector(".btnContainer");
let nextButton = document.querySelector(".next");
let restartButton = document.querySelector(".restart");
let boardButton = document.querySelector(".board");
let btn = document.createElement("button");
let scoreNum = document.querySelector(".score");
let numCont = document.querySelector(".numContainer");
let addName = document.querySelector(".formBtn");
let form = document.querySelector(".inputForm");
let userInput = document.querySelector(".input");
let list = document.querySelector(".list");
let start = document.querySelector(".start");

let curr = 0;
let score = 0;
let userScores = [];
let called = false;

const questions = [
  {
    question: "Which is NOT a valid way to declaire a variable in JavaScript?",
    answers: [
      {
        text: "Let",
        correct: false,
      },
      {
        text: "Const",
        correct: false,
      },
      {
        text: "Var",
        correct: false,
      },
      {
        text: "Def",
        correct: true,
      },
    ],
  },
  // {
  //   question: "question2 ",
  //   answers: [
  //     { text: "a", correct: true },
  //     { text: "b", correct: false },
  //     { text: "c", correct: false },
  //     { text: "d", correct: false },
  //   ],
  // },
  // {
  //   question: "question3 ",
  //   answers: [
  //     { text: "a", correct: false },
  //     { text: "b", correct: false },
  //     { text: "c", correct: true },
  //     { text: "d", correct: false },
  //   ],
  // },
  // {
  //   question: "question4 ",
  //   answers: [
  //     { text: "a", correct: true },
  //     { text: "b", correct: true },
  //     { text: "c", correct: false },
  //     { text: "d", correct: false },
  //   ],
  // },
];

function startQuiz() {
  curr = 0;
  score = 0;
  scoreNum.textContent = score;
  nextButton.style.display = "none";
  restartButton.style.display = "none";
  boardButton.style.display = "none";
  form.style.display = "none";
  list.style.display = "none";
  question.textContent = "";
  form.reset()
  // console.log(localStorage);
  // called = false;

  start.style.justifyContent = "center";
  start.style.alignItems = "center";
  start.style.display = "flex";

  start.addEventListener("click", displayQuestion);

  // displayQuestion();
}

function displayQuestion() {
  let currentQuestion = questions[curr].question;
  let questionNum = curr + 1;
  start.style.display = "none";

  question.textContent = `${questionNum}) ${currentQuestion} `;

  questions[curr].answers.forEach((answer) => {
    btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("answerChoice");
    answers.appendChild(btn);

    btn.dataset.correct = answer.correct;
    btn.addEventListener("click", select);
  });
}

function select(e) {
  let selected = e.target;

  if (selected.dataset.correct === "true") {
    score += 25;
    scoreNum.textContent = score;
    selected.style.backgroundColor = "green";
    nextButton.style.justifyContent = "center";
    nextButton.style.alignItems = "center";
    nextButton.style.display = "flex";
  } else if (selected.dataset.correct === "false") {
    score -= 5;
    scoreNum.textContent = score;
    selected.style.backgroundColor = "red";
  }

  nextButton.addEventListener("click", nextQuestion);
  console.log(curr);
}

function nextQuestion() {
  if (curr < questions.length) {
    resetAnswers();
    displayQuestion(curr++);
  }
}

function resetAnswers() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
  finalScore();
}

function finalScore() {
  question.textContent = `Your score is ${score}.`;
  boardButton.style.justifyContent = "center";
  boardButton.style.alignItems = "center";
  boardButton.style.display = "flex";
  boardButton.addEventListener("click", leaderBoard);
  nextButton.style.display = "none";
}

function leaderBoard() {
  question.textContent = "Leaderboard";
  // question.style.backgroundColor = 'red'
  form.style.display = "flex";
  list.style.display = "block";
  boardButton.style.display = "none";

  if (called === false) {
    addName.addEventListener("click", function (e) {
      e.preventDefault();
      let newItem = document.createElement("li");
      newItem.textContent = `${userInput.value}:  ${score}`;
      list.appendChild(newItem);
      addToLocal();
      addName.style.display = "none";

      restartButton.style.justifyContent = "center";
      restartButton.style.alignItems = "center";
      restartButton.style.display = "flex";
      boardButton.style.display = "none";
      restartButton.addEventListener("click", startQuiz);
      called = true;
    });
  } else {
    restartButton.style.display = "none";
    addName.style.justifyContent = "center";
    addName.style.alignItems = "center";
    addName.style.display = "flex";
    addName.addEventListener("click", function (e) {
      e.preventDefault();
      restartButton.style.justifyContent = "center";
      restartButton.style.alignItems = "center";
      restartButton.style.display = "flex";
    });

    boardButton.style.display = "none";
    restartButton.addEventListener("click", startQuiz);
  }
}

function addToLocal() {
  localStorage.setItem("user", userInput.value);
}

startQuiz();
