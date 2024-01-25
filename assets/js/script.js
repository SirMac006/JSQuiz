const questions = [
  {
      question: "What is JavaScript?",
      choices: ["A programming language", "A fruit", "A car brand"],
      correctAnswer: "A programming language"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    choices: ["var", "let", "const", "all of the above"],
    correctAnswer: "all of the above"
},
{
    question: "What does the DOM stand for?",
    choices: ["Document Object Model", "Data Object Model", "Digital Object Model"],
    correctAnswer: "Document Object Model"
},
{
    question: "What is the purpose of the 'addEventListener' method in JavaScript?",
    choices: ["To handle user clicks", "To modify the DOM", "To create variables"],
    correctAnswer: "To handle user clicks"
},
{
    question: "Which symbol is used for multi-line comments in JavaScript?",
    choices: ["//", "/*", "#", "--"],
    correctAnswer: "/*"
},
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const timerElement = document.getElementById("time");
const endScreen = document.getElementById("end-screen");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const finalScoreElement = document.getElementById("final-score");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  /*Initialize quiz state*/
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;

/*Show quiz container and hide start screen*/
  startBtn.style.display = "none";
  quizContainer.style.display = "block";

  /* Start timer*/
  timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;

  if
   (timeLeft <= 0 || currentQuestionIndex === questions.length) {
          endQuiz();
      }
  }, 1000);

  /*Display first question*/
  displayQuestion();
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;

  choicesContainer.innerHTML = "";
  currentQuestion.choices.forEach(function(choice) {
      const choiceBtn = document.createElement("button");
      choiceBtn.textContent = choice;
      choiceBtn.addEventListener("click", function() {
          checkAnswer(choice);
      });
      choicesContainer.appendChild(choiceBtn);
  });
}

function checkAnswer(choice) {
  const currentQuestion = questions[currentQuestionIndex];

  if (choice === currentQuestion.correctAnswer) {
      score++;
  } else {
      timeLeft -= 10; /*Subtract 10 seconds for incorrect answer*/
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      displayQuestion();
  } else {
      endQuiz();
  }
}

function endQuiz() {
  /*Stop the timer*/
  clearInterval(timerInterval);

  quizContainer.style.display = "none";
  endScreen.style.display = "block";

  finalScoreElement.textContent = score;

  initialsForm.addEventListener("submit", function(event) {
      event.preventDefault();
      saveScore();
  });
}
  function saveScore() {
    const initials = initialsInput.value;

    /*Save the score and initials to localStorage*/
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });

    /*Sorts high scores in descending order*/
    highScores.sort((a, b) => b.score - a.score);

    /*Keep only the top 5 high scores */
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    /*shows high scores page*/
   window.location.href = "highscores.html";
}