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
  



// Quiz function
function startQuiz() {
  inQuiz = true;
  timeCounter = 60; 
  displayTimer();
  
  countdownInterval = setInterval(countdown, 1000);
  createQuizQuestion(0);
  }