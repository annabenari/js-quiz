var currentQuestion=0;
var score = 0;
var startPage = document.getElementById("start-screen")
var questionPage = document.getElementById("questions")
var questionTitle = document.getElementById("question-title")
var choices = document.getElementById("choices")
var feedback = document.getElementById("feedback")
var endScreen = document.getElementById("end-screen")
var timer = document.getElementById("time")
var submitbutton = doucment.getElementById('submit')
var endScreen = doucment.getElementById('end-screen')
var secondsLeft = 45;
var timerInterval;
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
        secondsLeft -= 4;
     }
   
    displayQuestion()
    currentQuestion++
    if(currentQuestion === questions.length){
        ResetGame();
    }
 }
}
function StartTimer() {

    timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft + " seconds left.";

    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
        ResetGame();
    }
   

  }, 1000);
}

function ResetGame() {
    questionPage.remove()
    endScreen.classList.remove("hide")  
    secondsLeft = 0; 
    timer.textContent = secondsLeft + " seconds left.";
    score = 0;
}


// function endGame(){
//     endScreen.textContent = score
// }


function startQuiz(){
    startPage.remove()
    displayQuestion()
    StartTimer();
}

function AddInitials()
{

}

startPage.addEventListener("click", startQuiz)
submitbutton.addEventListener("click", AddInitials)