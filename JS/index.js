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
let startPage = document.querySelector(".startPage");
let timerCont = document.querySelector(".timer");

let curr = 0;
let score = 0;
let userScores = [];
let called = false;
let timeup = false;

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
  {
    question: "Which means equal and value and in type? ",
    answers: [
      { text: "===", correct: true },
      { text: "=", correct: false },
      { text: "==", correct: false },
      { text: "||", correct: false },
    ],
  },
  {
    question: "Which method removes from the end of an array",
    answers: [
      { text: ".pop", correct: false },
      { text: ".unshift()", correct: false },
      { text: ".pop()", correct: true },
      { text: ".unshift", correct: false },
    ],
  },
  {
    question: "Which of these is an Object",
    answers: [
      { text: "{}", correct: true },
      { text: "[]", correct: true },
      { text: "''", correct: false },
      { text: "()", correct: false },
    ],
  },
];

function startQuiz() {
  curr = 0;
  score = 0;
  scoreNum.textContent = score;
  timeLeft = 60
  timerCont.textContent = ''
  btnContainer.appendChild(nextButton);
  btnContainer.removeChild(nextButton);
  btnContainer.removeChild(restartButton);
  btnContainer.appendChild(boardButton);
  btnContainer.removeChild(boardButton);
  quiz.removeChild(list);
  quiz.removeChild(form);
  question.textContent = "";
  form.reset();
  startPage.appendChild(start);
  start.addEventListener("click", displayQuestion);
  start.addEventListener("click", countdown);
}

function displayQuestion() {
  let currentQuestion = questions[curr].question;
  let questionNum = curr + 1;
  if (startPage.children.length === 1) {
    startPage.removeChild(start);
  }

  question.textContent = `${questionNum}) ${currentQuestion} `;
  questions[curr].answers.forEach((answer) => {
    btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("answerChoice");
    answers.appendChild(btn);
    btn.dataset.correct = answer.correct;
    btn.addEventListener("click", select);
  });

  if (
    btnContainer.children[0] === boardButton ||
    btnContainer.children[1] === boardButton
  ) {
    btnContainer.removeChild(boardButton);
  }
}

function countdown() {
  let seconds = setInterval(function () {
    if (timeLeft > 0) {
      timerCont.textContent = `${timeLeft} seconds`;
      timeLeft--;
    } else {
      clearInterval(seconds);
      timerCont.textContent = ''
      while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
      }
      finalScore();
    }
  }, 1000);
}

function select(e) {
  let selected = e.target;
  btnContainer.appendChild(nextButton);
  if (selected.dataset.correct === "true") {
    score += 25;
    scoreNum.textContent = score;
    selected.style.backgroundColor = "green";
    btnContainer.appendChild(nextButton);
  } else if (selected.dataset.correct === "false") {
    score -= 5;
    timeLeft = timeLeft -= 10;
    scoreNum.textContent = score;
    selected.style.backgroundColor = "red";
  }
  nextButton.addEventListener("click", nextQuestion);
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
  btnContainer.appendChild(boardButton);
  btnContainer.appendChild(nextButton)
  btnContainer.removeChild(nextButton);
  boardButton.addEventListener("click", leaderBoard);
}

function leaderBoard() {
  question.textContent = "Leaderboard";
  quiz.insertBefore(list, btnContainer);
  quiz.appendChild(form);
  form.appendChild(userInput);
  form.appendChild(addName);
  btnContainer.removeChild(boardButton);

  if (called === false) {
    addName.addEventListener("click", function (e) {
      e.preventDefault();
      form.removeChild(userInput);
      form.removeChild(addName);
      let newItem = document.createElement("li");
      newItem.textContent = `${userInput.value}:  ${score}`;
      list.appendChild(newItem);
      addToLocal();
      btnContainer.appendChild(restartButton);
      restartButton.addEventListener("click", startQuiz);
      called = true;
    });
  }
}

function addToLocal() {
  localStorage.setItem("user", userInput.value);
}

startQuiz();
