let app = document.querySelector(".app");
let quiz = document.querySelector(".quiz");
let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let choice = document.querySelectorAll(".answerChoice");
let nextContainer = document.querySelector(".nextContainer");
let nextButton = document.querySelector(".next");
let btn = document.createElement("button");
let scoreNum = document.querySelector('.score')
let numCont = document.querySelector('.numContainer')

let curr = 0;
let score = 0;

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
    question: "question2 ",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
      { text: "d", correct: false },
    ],
  },
  {
    question: "question3 ",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: false },
      { text: "c", correct: true },
      { text: "d", correct: false },
    ],
  },
  {
    question: "question4 ",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: true },
      { text: "c", correct: false },
      { text: "d", correct: false },
    ],
  },
];

function startQuiz() {
  curr = 0;
  score = 0;

  // nextButton.style.display = "none";
  displayQuestion();
}

function displayQuestion() {
  let currentQuestion = questions[curr].question;
  // console.log(currentQuestion)
  let questionNum = curr + 1;
  // console.log('question number ', questionNum)
  nextButton.style.display = "none";
  question.textContent = `${questionNum}) ${currentQuestion} `;

  // console.log(questions[curr].answers)
  questions[curr].answers.forEach((answer) => {
    btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("answerChoice");
    answers.appendChild(btn);

    btn.dataset.correct = answer.correct;
    // console.log(btn, btn.dataset.correct);
    // console.log(btn.classList)
    btn.addEventListener("click", select);
  });
}

function select(e) {
  let selected = e.target;
  // scoreNum.innerHTML = score

  if (selected.dataset.correct === "true") {
    // console.log("u got it");
    score += 25;
    scoreNum.textContent = score
    selected.style.backgroundColor = "green";
    nextButton.style.justifyContent = "center";
    nextButton.style.alignItems = "center";
    nextButton.style.display = "flex";
  } else if (selected.dataset.correct === "false") {
    // console.log("nope");
    score -= 5;
    scoreNum.textContent = score
    selected.style.backgroundColor = "red";
  }

  nextButton.addEventListener("click", nextQuestion);
}

function nextQuestion() {
  // console.log(questions[curr]);
  if (curr < questions.length) {
    resetAnswers();
    displayQuestion((curr ++));
  } else startQuiz();
}

function resetAnswers() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }
}

startQuiz();
