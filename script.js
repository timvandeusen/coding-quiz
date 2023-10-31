let countdownTimer = document.querySelector("timer");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
var startPageEl = document.querySelector("#intro");
var questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
var yesNo = document.querySelector("#yesno");
var endEl = document.querySelector("#end");
let initials = document.querySelector("#initials");
var highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];
var startQuizButton = document.querySelector("#start");
var ansBtn = document.querySelectorAll("button.answerButton")
var answer1Button = document.querySelector("#answer1");
var answer2Button = document.querySelector("#answer2");
var answer3Button = document.querySelector("#answer3");
var answer4Button = document.querySelector("#answer4");
var submitScoreButton = document.querySelector("#submit-score");
var goBackButton = document.querySelector("#goback");
var clearScoreButton = document.querySelector("#clearscores");
var viewHighScoresButton = document.querySelector("#view-high-scores");
var questions = [ 
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "answer2"
    },
    {  
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "answer1"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "answer3"
    },
    {  
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "answer2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "answer3"
    }
];
  startTimer();

function startQuiz() {
    startPageEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}
function checkAnswer(event) {
    event.preventDefault();
    yesNo.style.display = "block";
    let p = document.createElement("ul");
    yesNo.appendChild(ul);
}
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);

function addScore(event) {
    event.preventDefault();
 endEl.style.display = "none";
    highscoresEl.style.display = "block";
    let init = initials.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }
    storeScores();
    displayScores();
}
function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}
function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}
startBtn.addEventListener("click", startQuiz);
ansBtn.forEach(item => {
    item.addEventListener("click", checkAnswer);
});
submitScoreButton.addEventListener("click", addScore);
goBackButton.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    startPageEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `timer:${secondsLeft}s`;
});
clearScoreButton.addEventListener("click", clearScores);
viewHighScoresButton.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});
