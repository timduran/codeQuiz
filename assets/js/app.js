var startBtn = document.getElementById('start')
var questionContainer = document.getElementById('questions')
var scoreEl = document.getElementById('score')
var questionTitle = document.getElementById('questionTitle');
var choicesEl = document.getElementById('choices');
var timeEl = document.getElementById('time');

var currentQuestionInd = 0;
var timerId;




const questions = [

  { //1 
    question: "What is Javascript file extension?", choices: [
      '.Java',
      '.exe',
      '.zip',
      '.js',
    ],
    answer: '.js'
  },
  { // 2
    question: "What are variables used for in JavaScript Programs?",
    choices: [
      "Storing numbers, dates, or other values",
      "Varying randomly",
      "Causing high-school algebra flashbacks",
      "None of the above",
    ],
    answer: "Varying randomly"
  },
  {// 3
    question: "What is the difference between const and let?",
    choices: [
      "Const can be reassigned and so can let",
      "Const cannot be reassigned but let can",
      "Neither can be reassigned",
      "Both can be reassigned",
    ],
    answer: "Const cannot be reassigned but let can"
  },
  {// 4 
    question: "Which of the following attribute can hold the JavaScript version?",
    choices: [
      "LANGUAGE",
      "SCRIPT",
      "VERSION",
      "None of the above",
    ],
    answer: "LANGUAGE"
  },
]
var time = questions.length * 15;
var currentQuestion = questions[currentQuestionInd];


// const questions = ''


// Start Game 
const newGame = () => {
  startBtn.style.display = "none"
  // document.getElementById('button1').style.display = "block"
  // document.getElementById('button2').style.display = "block"
  // document.getElementById('button3').style.display = "block"
  // document.getElementById('button4').style.display = "block"
  timerId = setInterval(clockTick, 1000)
  timeEl.textContent = time;
  getQuestion()
}

const getQuestion = () => {
  // variable for current question
  var currentQuestion = questions[currentQuestionInd];
  questionTitle.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute('class', 'choice')
    choiceBtn.setAttribute('value', choice);

    choiceBtn.textContent = i + 1 + '. ' + choice;

    choiceBtn.addEventListener('click', questionClick)

    choicesEl.appendChild(choiceBtn)
  })
}

// Clock tick function
const clockTick = () => {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}


// Question Click Function
const questionClick = (event) => {
  event.preventDefault();
  // console.log(event.target.value)
  if (event.target.value !== questions[currentQuestionInd].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timeEl.textContent = time;
  }

  currentQuestionInd++;
  if (currentQuestionInd === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// Make a highscore page where highscores are displayd
// Retrieve highscores from localstorage using localStorage.getItem and print them to page
// Make a function to save a highscore when submit initials button is clicked and do localStorage.setItem
// var newScore = {
//   score: time,
//   initials: initials
// }
// var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
// window.localStorage


const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);



saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();


  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score)
};

localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("/");
};


// const highscore = () => {
//   var newScore = {
//     score: time,
//     initials: initials
//   }
//   var highscore = JSON.parse(window.localStorage.getItem('highscores')) || [];
//   window.localStorage.setItem('highscores', JSON.stringify(highscores))
// }


// quizEnd function
const quizEnd = () => {
  clearInterval(timerId);
  var endScreen = document.getElementById('endScreen');
  endScreen.removeAttribute('class');

  var finalScore = document.getElementById('finalScore');
  finalScore.textContent = time;

  questionContainer.setAttribute('class', 'hide')
}

startBtn.addEventListener('click', newGame);