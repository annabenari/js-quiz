let questionIndex=0;
let time = questions.length * 15;
let timerID;


//HTML
let questionPage = document.getElementById("questions");
let timer = document.getElementById("time");
let choices = document.getElementById("choices");
let submitButton = document.getElementById('submit');
let startButton = document.getElementById('start');
let initialsElement = document.getElementById('initials');
let feedback = document.getElementById("feedback");
let answer1= document.getElementById("answer1")
let answer2= document.getElementById("answer2")
let answer3= document.getElementById("answer3")



function quesionClick(){
if(this.value !== questions[currentQuestion].answer){
    time-= 15;
}
if(time< 0){
    time = 0;

    timer.textContent = time;
    feedback.textContent = "incorrect";
     
}else{
    feedback.textContent = "correct"
}

feedback.setAttribute("class", "feedback")

setTimeout(function(){
    feedback.setAttribute("class", "feedback hide")
}
,1000)

currentQuestion++;

if(currentQuestion === questions.length){
    quizEnd()
}else{
    displayQuestion();
}
}


function displayQuestion(){
let currentQuestion = questions[questionIndex];
let title = document.getElementById("question-title")
title.textContent = displayQuestion.title
answer1.textContent = currentQuestion.options[0]
answer2.textContent = currentQuestion.options[1]
answer3.textContent = currentQuestion.options[2]

questionIndex++;
// choices.innerHTML = "";
// currentQuestion.choices.foreach(function(choices,index){
// let choiceButton = document.createElement("button");

// choiceButton.setAttribute("class", "choices");
// choiceButton.setAttribute("value", choices);
// choiceButton.textContent = `${index+ 1}${choices}`;
// choiceButton.addEventListener("click", quesionClick)
// choices.append(choiceButton);
// })
}

function questionAnswer(){
    displayQuestion();
}

answer1.addEventListener("click", questionAnswer())


function quizEnd(){
clearInterval(timerID);

let endScreen = document.getElementById("end-screen");
endScreen.removeAtrribute("class")

let finalScore = document.getElementById("final-score");
finalScore.textContent = time;
questionPage.setAttribute("class", "hide");
}


function timerCountdown(){
    time--;
    timer.textContent = time;
    if(time <= 0){
        quizEnd();
    }
}

function startQuiz(){
    let startPage = document.getElementById("start-screen");
    // startPage.setAttribute("class", "hide");
    
    questionPage.removeAttribute("class");
    
    timer = setInterval(timerCountdown , 1000)

    timer.textContent = time;

    displayQuestion();
    console.log("test");
    }

function saveHighScore(){
let initials = initialsElement.value.trim();
console.log(initials);

if(initials !== ""){
    let highScore = JSON.parse(localStorage.getItem("highscores"))|| [];
    let newScore = {
        score: time,
        initials: initials,

    }

    highScore.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highScore));

    window.location.href = ("highscores.html")
}
}

function checkForEnter(event){
if(event.key === "enter");
saveHighScore();
}



startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
initialsElement.addEventListener("keyup" , checkForEnter);
