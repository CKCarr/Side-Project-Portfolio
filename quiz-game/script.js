import { quizQuestions } from './quiz-questions.js';
console.log('Loaded questions:', quizQuestions);

// DOM Elements
/* Screens */
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
// start button
const startButton = document.getElementById("start-btn");
// question from array of questions
const questionText = document.getElementById("question-text");
// answer options list to show when question changes
const answersContainer = document.getElementById("answers-container");
// span updates progress bar and count as questions are answered 
const currentQuestionSpan = document.getElementById("current-question");
// total number of questions in array
const totalQuestionsSpan = document.getElementById("total-questions");
// score count updates based on correctly answered questions
const scoreSpan = document.getElementById("score");
// final score on results
const finalScoreSpan = document.getElementById("final-score");
// max score is total number of questions 
const maxScoreSpan = document.getElementById("max-score");
// update state based on score percentage
const resultMessage = document.getElementById("result-message");
// update state to clear score and start over from top of quiz questions
const restartButton = document.getElementById("restart-btn");
// update progress bar based on percentage of questions asked and answered 
const progressBar = document.getElementById("progress");

// const quizQuestions = [
//     {
//         question: "Which language is primarily used for web development?",
//         answers: [
//             { text: "HTML", correct: true },
//             { text: "Python", correct: false },
//             { text: "C", correct: false },
//             { text: "Java", correct: false },
//         ],
//     },
//     {
//         question: "Who invented the World Wide Web?",
//         answers: [
//             { text: "Bill Gates", correct: false },
//             { text: "Tim Berners-Lee", correct: true },
//             { text: "Steve Jobs", correct: false },
//             { text: "Mark Zuckerberg", correct: false },
//         ],
//     },
//     {
//         question: "What does CSS stand for?",
//         answers: [
//             { text: "Creative Style Sheets", correct: false },
//             { text: "Computer Styled Sections", correct: false },
//             { text: "Cascading Style Sheets", correct: true },
//             { text: "Colorful Style Syntax", correct: false },
//         ],
//     },
//     {
//         question: "What is the hardest natural substance on Earth?",
//         answers: [
//             { text: "Gold", correct: false },
//             { text: "Iron", correct: false },
//             { text: "Diamond", correct: true },
//             { text: "Quartz", correct: false },
//         ],
//     },
//     {
//         question: "Which keyword is used to declare a constant in JavaScript?",
//         answers: [
//             { text: "let", correct: false },
//             { text: "const", correct: true },
//             { text: "var", correct: false },
//             { text: "define", correct: false },
//         ],
//     },
//     {
//         question: "Which country consumes the most chocolate per capita?",
//         answers: [
//             { text: "Germany", correct: false },
//             { text: "Switzerland", correct: true },
//             { text: "USA", correct: false },
//             { text: "Belgium", correct: false },
//         ],
//     },
//     {
//         question: "What is a loop that never ends called?",
//         answers: [
//             { text: "While loop", correct: false },
//             { text: "For loop", correct: false },
//             { text: "Recursive loop", correct: false },
//             { text: "Infinite loop", correct: true },
//         ],
//     },
//     {
//         question: "Which animal can sleep for up to 3 years?",
//         answers: [
//             { text: "Bear", correct: false },
//             { text: "Snail", correct: true },
//             { text: "Frog", correct: false },
//             { text: "Bat", correct: false },
//         ],
//     },
//     {
//         question: "In Python, which symbol is used to comment a single line?",
//         answers: [
//             { text: "//", correct: false },
//             { text: "#", correct: true },
//             { text: "/*", correct: false },
//             { text: "<!--", correct: false },
//         ],
//     },
//     {
//         question: "Which fruit has its seeds on the outside?",
//         answers: [
//             { text: "Strawberry", correct: true },
//             { text: "Kiwi", correct: false },
//             { text: "Pomegranate", correct: false },
//             { text: "Apple", correct: false },
//         ],
//     },
// ];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // what is dataset? it's a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    // optimization check
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}
