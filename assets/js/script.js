// Creating questions

var quiz = [{
  question: "1. Which of these is not a JavaScript Type?",
  answers: [{
          correct: true,
          display: "Function"
      },
      {
          correct: false,
          display: "String"
      },
      {
          correct: false,
          display: "Number"
      },
      {
          correct: false,
          display: "Boolean"
      }
  ]
},
{
  question: "2. What is the company who developed JavaScript?",
  answers: [{
          correct: false,
          display: "Apple"
      },
      {
          correct: false,
          display: "Google"
      },
      {
          correct: false,
          display: "Microsoft"
      },
      {
          correct: true,
          display: "Netscape"
      }
  ]
},
{
  question: "3. Which of these is a loop structure in JavaScript?",
  answers: [{
          correct: false,
          display: "var"
      },
      {
          correct: true,
          display: "for"
      },
      {
          correct: false,
          display: "this"
      },
      {
          correct: false,
          display: "let"
      }
  ]
},
{
  question: "4. What is the result of 1+2+”3” in JavaScript?",
  answers: [{
          correct: false,
          display: "6"
      },
      {
          correct: true,
          display: "33"
      },
      {
          correct: false,
          display: "9"
      },
      {
          correct: false,
          display: "123"
      }
  ]
},
{
  question: " _______ is an actions that can be performed on object.",
  answers: [{
          correct: false,
          display: "Array"
      },
      {
          correct: true,
          display: "Method"
      },
      {
          correct: false,
          display: "Property"
      },
      {
          correct: false,
          display: "Function"
      }
  ]
}
];

// Variables for timeCounter 
var timeCounter = 0; 
var countdownInterval = null;

var bodyContainerEl = document.getElementById("body");
bodyContainerEl.addEventListener("click", clickAction);
//bodyContainerEl.addEventListener("keypress", keyPressHandler);

var contentContainerEl = document.getElementById("content-container");

var timerEl = document.getElementById("timer");

var highScores = [];
var inQuiz = false;

getSavedScores();
quizRules();


// Presenting the rules
function quizRules() {
  var contentHolderEl = createContentHolder();
  
  var headingEl = document.createElement("h1");
  headingEl.innerText = "JavaScript Quiz";
  headingEl.className = "rule-text";
  
  var rule1El = document.createElement("p");
  rule1El.innerText = "Are you ready for our quiz?";
  rule1El.className = "rule-text";
  
  var rule2El = document.createElement("p");
  rule2El.innerText = "You have just 1 minute to answer 5 questions.";
  rule2El.className = "rule-text";
  
  var rule3El = document.createElement("p");
  rule3El.innerText = "You loose 10 seconds for each wrong answer.";
  rule3El.className = "rule-text";
  
  var rule4El = document.createElement("p");
  rule4El.innerText = "Good luck!";
  rule4El.className = "rule-text";
  
  var buttonContainerEl = document.createElement("p");
  buttonContainerEl.className = "rule-text";
  
  var startQuizButtonEl = document.createElement("button");
  startQuizButtonEl.innerText = "Start Quiz";
  startQuizButtonEl.className = "start-quiz";
  
  buttonContainerEl.appendChild(startQuizButtonEl);
  
  contentHolderEl.appendChild(headingEl);
  contentHolderEl.appendChild(rule1El);
  contentHolderEl.appendChild(rule2El);
  contentHolderEl.appendChild(rule3El);
  contentHolderEl.appendChild(rule4El);
  contentHolderEl.appendChild(buttonContainerEl);
  
  contentContainerEl.appendChild(contentHolderEl);
  }
  
// Clear container to the next question
function clearContainer() {
  var contentHolderEl = document.getElementById("content-holder");
  if (contentHolderEl) {
    contentContainerEl.removeChild(contentHolderEl);
  }
  }
  
  // Click actions
  function clickAction(event) {
  var target = event.target;
  
  switch (target.className) {
    case "btn-answer":
        handleAnswer(target);
        break;
  
    case "btn-clear":
        highScores = [];
        clearContainer();
        saveScore();
        showScore();
        break;
  
    case "display-score":
        // disable if user taking quiz
        if (!inQuiz) {
            clearContainer();
            showScore()} 
            
        break;
  
    case "btn-back":
        clearContainer();
        quizRules();
        break;
  
    case "start-quiz":
        clearContainer();
        startQuiz();
        break;
  
    case "submit-button":
        nameHighScore();
        break;
  
    default:
        break;
  }
  }

  // Countdown to 0 seconds
function countdown() {
  if (timeCounter > 0) {
    timeCounter--;
    displayTimer();
  } else {
    clearContainer();
    endQuiz();
  }
  }

  // Create the content holder for the center screen
function createContentHolder() {
  var contentHolderEl = document.createElement("div");
  contentHolderEl.id = "content-holder";
  contentHolderEl.className = "content-holder";
  
  return contentHolderEl;
  }

  // Create the quiz question for the index in quiz
function createQuizQuestion(index) {
  var contentHolderEl = createContentHolder();
  
  var contentEl = document.createElement("h2");
  contentEl.className = "content";
  
  contentHolderEl.appendChild(contentEl);
  
  var quizItem = quiz[index];
  contentEl.textContent = quizItem.question;
  
  //Loop for the questions
  for (var i = 0; i < quizItem.answers.length; i++) {
    const answer = quizItem.answers[i];
    var answerDivEl = document.createElement("div");
    answerDivEl.className = "button-container";
    var answerEl = document.createElement("button");
  
    answerEl.className = "btn-answer";
    answerEl.textContent = (i + 1) + ")  " + answer.display;
    answerEl.setAttribute("data-index", index);
  
    if (answer.correct === true) {
        answerEl.setAttribute("data-correct", "true");
    }
  
    answerDivEl.appendChild(answerEl);
    contentEl.appendChild(answerDivEl);
  }
  
  contentContainerEl.appendChild(contentHolderEl);
  }
  

  // Display the timer
function displayTimer() {
  timerEl.textContent = " " + timeCounter;
  }

  // End the quiz
function endQuiz() {
  clearInterval(countdownInterval);
  
  // Insert name for high score
  var contentHolderEl = createContentHolder();
  
  var inputHeaderTextEl = document.createElement("h1");
  inputHeaderTextEl.innerText = "That's all";
  contentHolderEl.appendChild(inputHeaderTextEl);
  
  var inputNormalTextEl = document.createElement("p");
  inputNormalTextEl.innerText = "Result " + timeCounter + " points.";
  contentHolderEl.appendChild(inputNormalTextEl);
  
  var inputHolderEl = document.createElement("p");
  inputNormalTextEl.appendChild(inputHolderEl);
  
  var labelEl = document.createElement("label");
  labelEl.innerText = "Insert yor name: ";
  labelEl.setAttribute("for", "input-field");
  inputHolderEl.appendChild(labelEl);
  
  var nameInputEl = document.createElement("input");
  nameInputEl.className = "input-field";
  nameInputEl.name = "input-field";
  nameInputEl.id = "input-field";
  inputHolderEl.appendChild(nameInputEl);
  
  var submitBtnEl = document.createElement("button");
  submitBtnEl.className = "submit-button";
  submitBtnEl.id = "submit-button";
  submitBtnEl.innerText = "Submit";
  inputHolderEl.appendChild(submitBtnEl);
  
  contentContainerEl.appendChild(contentHolderEl);
  
  nameInputEl.focus();
  }
  
  
  // Saved scores at local Storage
function getSavedScores() {
  var savedScores = window.localStorage.getItem("high-scores");
  if (savedScores) {
    highScores = JSON.parse(savedScores);
  }
  }

  // Handle an answer button
function handleAnswer(buttonEl) {
  var index = buttonEl.getAttribute("data-index");
  var resultEl = document.createElement("p");
  resultEl.className = "result";
  //Correct or wrong answer
  if (buttonEl.hasAttribute("data-correct")) {
    resultEl.textContent = "CORRECT!";
  } 
  // User loses 10 seconds for incorrect answer.
  else {
    resultEl.textContent = "WRONG!";
    timeCounter -= 10; 
    if (timeCounter <= 0) {
        timeCounter = 0;
    }
  
    displayTimer();
  }
  
  var contentHolderEl = document.getElementById("content-holder");
  contentHolderEl.appendChild(resultEl);
  
  setTimeout(function () {
    clearContainer();
  
    var currIndex = parseInt(index) + 1;
    if (currIndex < quiz.length && timeCounter) {
        createQuizQuestion(currIndex);
    } else {
        endQuiz();
    }
  }, 1000);
  
  
  }

  // Save score
function saveScore() {
  var saveScores = JSON.stringify(highScores);
  window.localStorage.setItem("high-scores", saveScores);
  console.log(saveScores);
  }

  // Insert name in Hight Score    
function nameHighScore() {
  var contentHolderEl = document.getElementById("content-holder")
  if (contentHolderEl) {
    var inputFieldEl = document.getElementById("input-field");
    if (inputFieldEl) {
        var input = inputFieldEl.value;
        if (input) {
            clearContainer();
            var tempScores = [];
  
            var currScore = {
                initials: input,
                score: timeCounter
            }
  
            var inserted = false;
            if (!highScores.length) {
                tempScores.push(currScore);
            } else {
                // Insert highest score 
                for (var i = 0; i < highScores.length; i++) {
                    if (!inserted && currScore.score >= highScores[i].score) {
                        inserted = true;
                        tempScores.push(currScore);
                    }
                    tempScores.push(highScores[i]);
                }
  
                if (!inserted) {
                    tempScores.push(currScore);
                }
            }
  
            highScores = tempScores;
            inQuiz = false;
  
            saveScore();
            showScore();
        } 
    }
  }
  }
  
// Show high scores
function showScore() {
  var contentHolderEl = createContentHolder();
  
  var highScoresTitleEl = document.createElement("h2");
  highScoresTitleEl.textContent = "High scores";
  
  contentHolderEl.appendChild(highScoresTitleEl);
  
  // Insert hight score
  for (var i = 0; i < highScores.length; i++) {
    var lastScoreEl = document.createElement("div");
    lastScoreEl.className = "high-score";
    lastScoreEl.textContent = (i + 1) + ":" + highScores[i].initials.trim() + " - " + highScores[i].score;
  
    contentHolderEl.appendChild(lastScoreEl)
    console.log(lastScoreEl);
  }
  
  var btnHolderEl = document.createElement("div");
  
  //Buttons inside Hight score
  var backBtnEl = document.createElement("button");
  backBtnEl.className = "btn-back";
  backBtnEl.innerText = "Back";
  btnHolderEl.appendChild(backBtnEl);
  
  var clearScoreEl = document.createElement("button");
  clearScoreEl.className = "btn-clear";
  clearScoreEl.innerText = "Clear high scores";
  btnHolderEl.appendChild(clearScoreEl);
  
  contentHolderEl.appendChild(btnHolderEl);
  
  contentContainerEl.appendChild(contentHolderEl);
  }

// Start the quiz
function startQuiz() {
  inQuiz = true;
  
  //1 minute for the quiz
  timeCounter = 60; 
  displayTimer();
  
  countdownInterval = setInterval(countdown, 1000);
  createQuizQuestion(0);
  }