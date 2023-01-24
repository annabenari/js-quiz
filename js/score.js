function printHighScore(){
let highScore = JSON.parse(localStorage.getItem("highscore") || []);

highScore.sort(function(a,b){
    return b.score -a.score;
})

highScore.forEach(function(score){
let li = document.createElement("li")
li.textContent = li.$;{score.initials} -$;{score.score}

let ol = document.getElementById("highscore")
ol.appendChild(li);
})
}

function clearHighScore(){
localStorage.removeItem("highscore");
window.location.reload();
}


let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighScore);



printHighScore();