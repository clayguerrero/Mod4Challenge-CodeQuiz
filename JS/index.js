let app = document.querySelector(".app");
let quiz = document.querySelector(".quiz");
let question = document.querySelector(".question");
let answers = document.querySelector(".answers");
let choice = document.querySelectorAll(".answerChoice");
let nextContainer = document.querySelector(".nextContainer");
let nextButton = document.querySelector(".next");

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
];

function startQuiz() {
  curr = 0;
  score = 0;

  displayQuestion();
}

function displayQuestion() {
  let currentQuestion = questions[curr].question;
  // console.log(currentQuestion)
  let questionNum = curr + 1;
  // console.log('question number ', questionNum)
  question.textContent = `${questionNum}) ${currentQuestion} `;

  // console.log(questions[curr].answers)
    questions[curr].answers.forEach((answer) => {
        let btn = document.createElement('button')
        btn.textContent = answer.text
        btn.classList.add("answerChoice")
        answers.appendChild(btn)
  });
}

startQuiz();
