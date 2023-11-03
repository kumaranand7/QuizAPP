const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("nextButton");

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let quizData = [];

// Fetch the quiz data from the JSON file
fetch("quiz_data.json")
  .then((response) => response.json())
  .then((data) => {
    quizData = data;
    shuffleArray(quizData); // Shuffle the quiz questions
    loadQuestion();
  });

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  choicesElement.innerHTML = "";
  for (let i = 0; i < currentQuiz.options.length; i++) {
    const choice = document.createElement("div");
    choice.className = "choice";
    choice.textContent = currentQuiz.options[i];
    choice.addEventListener("click", () => checkAnswer(currentQuiz.options[i]));
    choicesElement.appendChild(choice);
  }
}

function checkAnswer(selectedAnswer) {
  const currentQuiz = quizData[currentQuestion];
  if (selectedAnswer === currentQuiz.answer) {
    score++;
    correctAnswers++;
  } else {
    wrongAnswers++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.textContent = "Quiz completed!";
  choicesElement.innerHTML = "";
  resultElement.innerHTML = `Your score: ${score} out of ${quizData.length}<br>`;
  resultElement.innerHTML += `Correct Answers: ${correctAnswers}<br>`;
  resultElement.innerHTML += `Wrong Answers: ${wrongAnswers}`;
  nextButton.style.display = "none";
}
