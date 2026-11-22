// 1. Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: "color"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "/* */",
            "#"
        ],
        answer: "//"
    },
    {
        question: "Which method is used to select an element by its ID in JavaScript?",
        options: [
            "document.querySelectorAll()",
            "document.getElementByClass()",
            "document.getElementById()",
            "document.findId()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: [
            "<break>",
            "<lb>",
            "<br>",
            "<newline>"
        ],
        answer: "<br>"
    }
];

// State variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;

// DOM Elements
const questionNumberEl = document.getElementById("question-number");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

// 2. Randomly shuffles the questions (Fisher-Yates algorithm)
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timer);
    timeLeft = TIME_LIMIT;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Helper when timer runs out
function handleTimeOut() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    disableOptions(currentQuestion.answer);
    feedbackEl.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;
    feedbackEl.className = "feedback incorrect";
    nextBtn.classList.remove("hidden");
}

// 4. Displays the current question and answer options
function displayQuestion() {
    // Reset UI state
    feedbackEl.className = "feedback hidden";
    nextBtn.classList.add("hidden");
    optionsContainerEl.innerHTML = "";

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQuestion.question;

    // Create buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => checkAnswer(option, button));
        optionsContainerEl.appendChild(button);
    });

    startTimer();
}

// 5. Checks whether the selected answer is correct and updates the score
function checkAnswer(selectedOption, selectedButton) {
    clearInterval(timer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "feedback correct";
    } else {
        selectedButton.classList.add("incorrect");
        feedbackEl.textContent = `Incorrect! The correct answer is: ${currentQuestion.answer}`;
        feedbackEl.className = "feedback incorrect";
    }

    scoreDisplayEl.textContent = `Current Score: ${score}`;
    disableOptions(currentQuestion.answer);
    nextBtn.classList.remove("hidden");
}

// Helper to disable buttons after answering and highlight the right answer
function disableOptions(correctAnswer) {
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });
}

// 6. Moves to the next question or finishes the quiz
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Helper to show final screen in the footer & main area
function endQuiz() {
    clearInterval(timer);
    questionNumberEl.textContent = "Quiz Completed!";
    timerEl.textContent = "Time Left: 0s";
    questionTextEl.textContent = "You have finished the quiz.";
    optionsContainerEl.innerHTML = "";
    feedbackEl.className = "feedback hidden";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");

    scoreDisplayEl.textContent = `Final Score: ${score} out of ${shuffledQuestions.length}`;
}

// 7. Starts/restarts the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplayEl.textContent = `Current Score: ${score}`;
    restartBtn.classList.add("hidden");

    shuffleQuestions();
    displayQuestion();
}

// Event Listeners
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Initialize quiz on page load
startQuiz();
