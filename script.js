
var quizTimer;
var minutesCounter = 0;
var secondsCounter = 0;

var minutesLeft = 10; //10 min quiz
var secondsLeft = 0;

var score = 0;

var questions = [
    "Which of the following are NOT data types you can use in Javascript?",
    "What is a local variable?",
    "What does Math.random() return?",
    "If var x = '2' + 2, what is the value of x?",
    "Which of the following code will log numbers 1 to 12?"
];

var answerChoices = [
    {'a': '', 'b': '', 'c': '', 'd': ''},
    {'a': '', 'b': '', 'c': '', 'd': ''},
    {'a': '', 'b': '', 'c': '', 'd': ''},
    {'a': '', 'b': '', 'c': '', 'd': ''},
    {'a': '', 'b': '', 'c': '', 'd': ''}
];

var answers = [
    "a",
    "d",
    "c",
    "b",
    "b"
];

//Starts Timer and shows first question
function startQuiz() {

    //hide start button and initial instructions
    $(".start-quiz-btn").hide();
    $(".initial-instructions").hide();

    //shows Timer and starts interval. Stops interval at 10 minutes.
    $(".timer").show();


    quizTimer = setInterval(function(){

        //keeps track of seconds passed
        secondsCounter++;

        if(secondsCounter == 60) {
            minutesCounter++;
            minutesLeft--;
            secondsCounter = 0;
        }

        secondsLeft = 60 - secondsCounter;

        updateTimer(minutesLeft, secondsLeft);

    }, 1000);

}

//Checks answer and displays correct one. Calls decreaseTime function if answer is wrong.
function gradeAnswer() {

}

//updates Timer display
function updateTimer() {

    //updates minutes span
    $("")

    //updates second span
    if(secondsLeft < 10) {

    } else {

    }

}

//Penalizes user with 30 seconds less.
function decreaseTime() {

}