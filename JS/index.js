let app = document.querySelector(".app")
let quiz = document.querySelector(".quiz")
let question = document.querySelector(".question")
let answers = document.querySelector(".answers")
let choice = document.querySelectorAll(".answerChoice")
let nextContainer = document.querySelector(".nextContainer")
let nextButton = document.querySelector(".next")

choice.forEach((option) => {
    option.style.backgroundColor = 'red'
});
