var currentQuestion=0;
var score = 0;
var startPage = document.getElementById("start-screen")
var questionPage = document.getElementById("questions")
var questionTitle = document.getElementById("question-title")
var choices = document.getElementById("choices")
var feedback = document.getElementById("feedback")
var endScreen = document.getElementById("end-screen")
var timer = document.getElementById("time")
var secondsLeft = 45;

function displayQuestion(){
    questionTitle.innerHTML= questions[currentQuestion].question
    choices.innerHTML=""
    for(var i=0; i< questions[currentQuestion].options.length ; i++){
        var button = document.createElement("button")
        button.setAttribute("value",questions[currentQuestion].options[i])

        button.textContent = questions[currentQuestion].options[i]
        button.addEventListener("click", showFeedback)
        choices.appendChild(button)
    }
}

function showFeedback(event){
 console.log(currentQuestion);
 if(currentQuestion < questions.length){
    if (event.target.value === questions[currentQuestion].answer){
        feedback.innerHTML = "correct"
        score ++
     }
     else{
        feedback.innerHTML = "incorrect"
     }
   
    displayQuestion()
    currentQuestion++
    if(currentQuestion === questions.length){
        questionPage.remove()
        endScreen.classList.remove("hide")  
    }
 }
}

var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft + " seconds left.";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
     
    }
   

  }, 1000);






function startQuiz(){
    startPage.remove()
    displayQuestion()
}

startPage.addEventListener("click", startQuiz)
