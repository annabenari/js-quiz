
let questionPage = document.getElementById("questions");
let timer = document.getElementById("time");
let choices = document.getElementById("choices");
let submitButton = document.getElementById('submit');
let startButton = document.getElementById('start');
let initialsElement = document.getElementById('initials');
let feedback = document.getElementById("feedback");
let answer1 = document.getElementById("answer1")
let answer2 = document.getElementById("answer2")
let answer3 = document.getElementById("answer3")
let endScreen = document.getElementById("end-screen");
let startScreen = document.getElementById("start-screen");
let questionTitle = document.getElementById("question-title")
let finalScore = document.getElementById("final-score")

//// Game variables
let questionIndex = 0;
let time = questions.length * 10;
let timerID;
let score = 0;
let currentQuestion;

//// Handlers

// Reduces the timer by 1 second everytime the interval is triggered
// if the time has run out it ends the quiz
function timerCountdown() {
 if (time > 0) {
   time--
   timer.textContent = time;
 } else {
   time = 0;
   timer.textContent = time;
   endQuiz();
 }
}

// handles a click on a question answer. If it's correct if moves on to the next
// question. If it's wrong it reduces the timer
function questionOptionClick(event) {
 if (event.target.textContent === currentQuestion.answer) {
   feedback.textContent = "Correct!";
   score++;
   displayQuestion();
 } else {
   time -= 4;
   if (time <= 0) {
     time = 0;
     endQuiz();
   }
   timer.textContent = time;
   feedback.textContent = "Incorrect";
 }
}

// Saves the high score to storage
function saveHighScore() {
 let initials = initialsElement.value.trim();
 console.log(initials);

 if (initials !== "") {
   let highScore = JSON.parse(localStorage.getItem("highscores")) || [];
   let newScore = {
     score: score,
     initials: initials,
   }

   highScore.push(newScore);
   localStorage.setItem("highscores", JSON.stringify(highScore));

   window.location.href = ("highscores.html")
 }
}

// Checks whether a keypress in the inital submition box is the enter keypress
// if it is it saves the highscore
function checkForEnter(event) {
 if (event.key === "enter") saveHighScore();
}


//// Game logic

// Starts the quiz by hiding the starScreen and showing the questions
function startQuiz() {
 startScreen.setAttribute("class", "hide")
 questionPage.removeAttribute("class");
 timerID = setInterval(timerCountdown, 1000)
 timer.textContent = time;
 displayQuestion();
}

// Displays the next question
function displayQuestion() {
 if (questionIndex == questions.length) endQuiz();
 currentQuestion = questions[questionIndex++];
 questionTitle.textContent = currentQuestion.title
 answer1.textContent = currentQuestion.options[0]
 answer2.textContent = currentQuestion.options[1]
 answer3.textContent = currentQuestion.options[2]
}

// Ends the quiz by hiding the questions and showing the end screen
function endQuiz() {
 clearInterval(timerID);
 endScreen.removeAttribute("class")
 questionPage.setAttribute("class", "hide")
 finalScore.textContent = score;
}

// Register handlers
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
initialsElement.addEventListener("keyup", checkForEnter);

answer1.addEventListener("click", questionOptionClick)
answer2.addEventListener("click", questionOptionClick)
answer3.addEventListener("click", questionOptionClick)
