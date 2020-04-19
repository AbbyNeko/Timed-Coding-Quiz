
var quizTimer;
var minutesLeft = 5; //5 min quiz
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


//Starts Timer and shows first question
function startQuiz() {

    //resetting variables in case of restart
    minutesLeft = 5; //5 min quiz
    secondsLeft = 0;
    score = 0;

    //hide start button and initial instructions
    $(".start-quiz-btn").hide();
    $(".initial-instructions").hide();

    //Hide these elements just in case of restart
    $(".scoreboard-pg").hide();
    $(".quiz-results").hide();

    //shows Timer and starts interval. Stops interval at 5 minutes.
    $(".timer").show();

    updateQuizContent();
    $("ul#answer-choices").show();
    $(".reminder").show();

    quizTimer = setInterval(function(){

        if(secondsLeft == 0 && minutesLeft == 5) {
            secondsLeft = 60 - 1;
            minutesLeft--;
        }else {
            secondsLeft--;
        }
        
        if(secondsLeft < 0) {
            minutesLeft--;
            secondsLeft = 60 + secondsLeft;
        }

        updateTimer();

        //If time runs out, run showResults()
        if(minutesLeft == 0 && secondsLeft == 0) {
            showResults();
            clearInterval(quizTimer);
        } 

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

    //console.log('about to penalize. seconds left - '+secondsLeft);

    secondsLeft = secondsLeft - 30;

    if(secondsLeft < 0) {
        secondsLeft = 60 + secondsLeft;
        minutesLeft--;
    }

   // console.log('minutes left - '+minutesLeft+', seconds left - '+secondsLeft);

}

//Updates question and answer choices
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
    $("#minutes").empty();
    $("#seconds").empty();

    //hide timer
    $(".timer").hide();


    //hide question and answer choices
    $("#question").hide();
    $("#answer-choices").hide();
    $(".reminder").hide();

    //show results content and score
    $("#show-score").text("Your final score is "+score+"/5");
    $(".quiz-results").show()

}

//Event Listener for Answer Choices
//Checks answer and displays correct one. Calls decreaseTime function if answer is wrong.

$(".choice").on("click", function() {

    var answerChosen = this.value;

    var alert = '';

    //show answer div
    if(answerChosen == answers[questionIndex]) {
        alert = $(".correct-answer");
        score++;
    } else {
        alert = $(".incorrect-answer");
        //decrease time as penalty
        decreaseTime();
    }

    alert.show();

    //console.log("question # "+questionIndex+", score - "+score);

    //set interval to have alert fade out after 1.5 secs
    var fadeOutTimer = setInterval(function() {

        alert.fadeOut('slow');

        //update quiz to next question
        questionIndex++;
        
        //If on last question, go to Results page
        if(questionIndex == 4) {
            alert.hide();
            showResults();
        } else {
            updateQuizContent();
        }

        clearInterval(fadeOutTimer);

    }, 1500);


});

//Event Listener for saving score and initials
$(".submit-score").on("click", function(evt){

    evt.preventDefault();
    //hide results content
    $(".quiz-results").hide();
    
    //gets local storage array highScores and populates Scoreboard page
    var savedScores = localStorage.getItem("highScores");

    if(savedScores) {
        savedScores = JSON.parse(savedScores);
    } else {
        savedScores = [];
    }

    //Saves score and initials
    var scoreObj = {};
    scoreObj.initials = $("#initials").val();
    scoreObj.score = score;
     
    savedScores.push(scoreObj);

    localStorage.setItem("highScores", JSON.stringify(savedScores));

    //Add individal scores and users to ul
    var userList = '';
    var scoreList = '';

    for(var i = 0; i < savedScores.length; i++) {
        userList += "<li><strong>"+ savedScores[i].initials +"</strong></li>";
        scoreList += "<li>"+ savedScores[i].score +"</li>";
    }

    $(".score-list").html(scoreList);
    $(".user-list").html(userList);

    //shows scores list
    $(".scoreboard-pg").show();


});