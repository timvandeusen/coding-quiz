let countdownTimer = document.querySelector(".timer");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
var startPageEl = document.querySelector("#startPageEl");
var questionsEl = document.querySelector("#questions"); 
let questionEl = document.querySelector("#question");
let questionCount = 0;
var yesOrNoEl = document.querySelector("#yesorno");
var endEl = document.querySelector("#end");
let initials = document.querySelector("#initials");
var highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];
var answerButton = document.querySelectorAll("button[type='button']");
var answer1Button = document.querySelector("#answer1");
var answer2Button = document.querySelector("#answer2");
var answer3Button = document.querySelector("#answer3");
var answer4Button = document.querySelector("#answer4");
var submitScoreButton = document.querySelector("#submit-score");
var goBackButton = document.querySelector("#goback");
var clearScoreButton = document.querySelector("#clearscores");
var viewHighScoresButton = document.querySelector("#view-high-scores-button");
let highscoresVisible = false;
var score = 0;
var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: 1
    },
    {  
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: 2
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: 3
    },
    {  
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: 3
    }
];

function setTime() {
    let timerInterval = setInterval(function() {
      secondsLeft--;
      countdownTimer.textContent = `Time:${secondsLeft}s`;
      if (secondsLeft === 0 || questionCount === questions.length) {
        clearInterval(timerInterval);
        questionsEl.style.display = "none";
        endEl.style.display = "block";
        
      }
    }, 1000);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var startQuizButton = document.querySelector("#start-quiz");
  
    function startQuiz() {
      if (startPageEl) {
        startPageEl.style.display = "none"; 
      } else {
        console.error("startPageEl is not found.");
      }
  
      if (questionsEl) {
        questionsEl.style.display = "block"; 
      } else {
        console.error("questionsEl is not found.");
      }
  
      questionsEl.style.display = "block";
      startQuizButton.style.display = "none"; 
      questionCount = 0;
      setTime();
      setQuestion(questionCount);
    }
  
    if (startQuizButton) {
      startQuizButton.addEventListener("click", startQuiz);
    } else {
      console.error("startQuizButton is not found.");
    }
  
    goBackButton.addEventListener("click", function() {
        if (startQuizButton) {
            startQuizButton.style.display = "block";
        } else {
            console.error("startQuizButton is not found.");
        }
        startPageEl.style.display = "block";
        questionsEl.style.display = "none";
        highscoresEl.style.display = "none";
        endEl.style.display = "none";
        score = 0; 
        questionCount = 0; 
        secondsLeft = 75;
        countdownTimer.textContent = `Time: ${secondsLeft}s`;
        questionCount = 0;
    });
  
    function setQuestion(id) {
      if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        yesOrNoEl.innerHTML = "";
        answer1Button.textContent = questions[id].answers[0];
        answer2Button.textContent = questions[id].answers[1];
        answer3Button.textContent = questions[id].answers[2];
        answer4Button.textContent = questions[id].answers[3];
      }
    }
  
    function checkAnswer(event) {
      event.preventDefault();
  
      let p = document.createElement("p");

      if (yesOrNoEl) {
        yesOrNoEl.style.display = "block";
      } else {
        console.error("yesOrNoEl is not found in the HTML.");
      }
  
      setTimeout(function() {
        if (p) {
          p.style.display = "none";
        }
      }, 1000);
  
      console.log("Correct Answer: " + questions[questionCount].correctAnswer);
      console.log("Selected Answer: " + event.target.value);
  
      if (questions[questionCount].correctAnswer === parseInt(event.target.value)) {
        p.textContent = "Correct!";
        score++;
      } else {
        secondsLeft -= 10;
        p.textContent = "Wrong!";
      }
  
      questionCount++;
  
      if (questionCount < questions.length) {
        setQuestion(questionCount);
      } else {
        questionsEl.style.display = "none";
        document.getElementById("final").style.display = "block";
        scoreEl.textContent = score;
      }
    }
  
    function addScore(event) {
        event.preventDefault();
      
        endEl.style.display = "none";
        highscoresEl.style.display = "block";
        let init = initials.value.toUpperCase();
        scoreList.push({ initials: init, score: score });
        score = 0; 
        scoreList = scoreList.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          } else {
            return -1;
          }
        });
        scoreListEl.innerHTML = "";
        for (let i = 0; i < scoreList.length; i++) {
          let li = document.createElement("li");
          li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
          scoreListEl.append(li);
        }
        storeScores();
        displayScores();
      
        initials.style.display = "block";
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
      scoreListEl.innerHTML = "";
    }
  
    answerButton.forEach((item) => {
      item.addEventListener("click", checkAnswer);
    });
    submitScoreButton.addEventListener("click", function (event) {
      addScore(event);
      startQuizButton.style.display = "block";
      questionCount = 0;
      questionsEl.style.display = "none";
      document.getElementById("final").style.display = "block";
    });

    startQuizButton.style.display = "block";
    questionCount = 0;
    questionsEl.style.display = "none";
  
    if (endEl) {
        endEl.style.display = "block";
      } else {
        console.error("endEl is not found.");
      }
      clearScoreButton.addEventListener("click", clearScores);
      viewHighScoresButton.addEventListener("click", function () {
        if (!highscoresVisible) {
          highscoresEl.style.display = "block";
          goBackButton.style.display = "none";
          clearScoreButton.style.display = "none";
          highscoresVisible = true;
        } else {
          highscoresEl.style.display = "none";
          goBackButton.style.display = "block";
          clearScoreButton.style.display = "block";
          highscoresVisible = false;
        }
      });
    });
