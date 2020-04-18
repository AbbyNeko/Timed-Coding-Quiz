
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

var questionIndex = 0;

var answerChoices = [
    {'a': 'a. decimal', 'b': 'b. string', 'c': 'c. boolean', 'd': 'd. object'},
    {'a': 'a. variable that is placed within a script tag', 'b': 'b. variable that can be accessed by any function', 'c': 'c. any variable that is placed nearby', 'd': 'd. variable that is declared within a function'},
    {'a': 'a. any number between 0 and 100', 'b': 'b. any number between 0 and 20', 'c': 'c. any number between 0 and 1', 'd': 'd. any number between 0 and 50s'},
    {'a': 'a. 22', 'b': 'b. "22"', 'c': 'c. 4', 'd': 'd. "4"'},
    {'a': 'a. for(var i = 0; i < 12; i) { ... }', 'b': 'b. for(var i = 1; i <= 12; i++) { ... }', 'c': 'c. for(var i = 0; i < 5; i++) { ... }', 'd': 'd. for(var i = 0; i < 11; i++) { ... }'}
];

var answers = [
    "a",
    "d",
    "c",
    "b",
    "b"
];

var userAnswers = [];

//Starts Timer and shows first question
function startQuiz() {

    //resetting variables in case of restart
    minutesCounter = 0;
    secondsCounter = 0;
    minutesLeft = 10; //10 min quiz
    secondsLeft = 0;
    score = 0;

    //hide start button and initial instructions
    $(".start-quiz-btn").hide();
    $(".initial-instructions").hide();

    //shows Timer and starts interval. Stops interval at 10 minutes.
    $(".timer").show();

    updateQuizContent();
    $("ul#answer-choices").show();

    quizTimer = setInterval(function(){

        //keeps track of seconds passed
        secondsCounter++;

        if(secondsCounter == 1 && minutesLeft == 10) {
            minutesLeft--;
        }else if(secondsCounter == 60) {
            minutesCounter++;
            minutesLeft--;
            secondsCounter = 0;
        }

        secondsLeft = 60 - secondsCounter;

        updateTimer();

    }, 1000);


}


//updates Timer display
function updateTimer() {

    //updates minutes span
    $("#minutes").text(minutesLeft);

    //updates second span
    if(secondsLeft < 10) {
        $("#seconds").text("0"+secondsLeft);
    } else {
        $("#seconds").text(secondsLeft);
    }

}

//Penalizes user with 30 seconds less.
function decreaseTime() {

}

function updateQuizContent() {

    //show question div
    $("#question").text(questions[questionIndex]);

    //select answer set
    var answerSet = answerChoices[questionIndex];

    //add question
    for(choice in answerSet) {
        $(".choice[value="+ choice +"]").text(answerSet[choice]);        
    }

}

//Show Results page
function showResults() {

    //clear timer

    //hide timer


    //hide question and answer choices


    //show results content and score

}

//Event Listener for Answer Choices
//Checks answer and displays correct one. Calls decreaseTime function if answer is wrong.

$(".choice").on("click", function() {

    var answerChosen = this.value;

    //push answer to userAnswer array to keep track of choices
    userAnswers.push(answerChosen);

    var alert = '';

    //show answer div
    if(answerChosen == answers[questionIndex]) {
        alert = $(".correct-answer");
        score++;
    } else {
        alert = $(".incorrect-answer");
    }

    alert.show();

    //set interval to have alert fade out after 1.5 secs
    var fadeOutTimer = setInterval(function() {

        alert.fadeOut('slow');

        //update quiz to next question
        questionIndex++;
        updateQuizContent();

        clearInterval(fadeOutTimer);

    }, 1500);

    //If on last question, go to Results page
    if(questionIndex == 9) {
        showResults();
    }


});

//Event Listener for saving score and initials
$(".submit-score").on("click", function(){

    //Saves score and initials
    
    
    //gets local storage array highScores and populates Scoreboard page


});