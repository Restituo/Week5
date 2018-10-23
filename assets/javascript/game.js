var gameArray = [
    {
        question: "What is the primary stat for warrior?",
        choices: ["Str","Dex", "Int", "Luk"],
        correct: 0
    },
    {
        question: "Which one of these mobs have a different shape?",
        choices: ["Green Snail", "Blue Snail", "Red Snail", "All the Same"],
        correct: 0
    },
    {
        question: "Which town is considered the rogue town?",
        choices: ["Henesy", "Kerning City", "El Nath", "Ellinia"],
        correct: 1
    },
    {
        question: "How much leather does it take to make a work glove?",
        choices: ["5","10","15","20"],
        correct: 2
    },
    {
        question: "Who do you have to beat to gain the third job advancement?",
        choices: ["The other team","Your job instructor", "Your job instructor's dark side", "Your job instructor's brother"],
        correct: 2
    },
    {
        question: "In Maple Island, who is the NPC you talk to that gives you an apple?",
        choices: ["Roger", "Pia", "Chief Stan", "Peter"],
        correct: 0
    },
    {
        question: "How much exp does Crimson Barlog gives you?",
        choices: ["1000","2000","4000","3500"],
        correct: 3
    },
    {
        question: "What is the amount of exp you need to get to  lvl 250?",
        choices: ["1,904,756,827", "594,667,050,452", "679,245,072,786", "650,378,595,225"],
        correct: 3
    },
    {
        question: "Which monster drops the Scroll for Cape for HP 100%?",
        choices: ["Green Snail", "Orange Mushroom", "Blue Snail", "Pig"],
        correct: 2
    }
    
]

var gifArray = ["correct.gif","incorrect.gif","no.gif"];
var finishArray = ["finished.gif"];
//reference to current 
var currentQ = 0;
//score
var correctA;
var incorrectA;
var noA;
//timer stuff
var seconds;
var timer;
var answered;
//user click stuff
var userA;
var index;

var messages = 
    {
        correct: "Yes, that's right!",
	    incorrect: "No, that's not it.",
	    endTime: "Out of time!",
        finished: "Alright! Let's see how well you did."
    };
//start game
$("#startBtn").on("click", function(){
	$(this).hide();
    newGame();
});

//initializes game
function newGame(){
    $("#finalMessage").empty();
    $("#correctNum").empty();
    $("#incorrectNum").empty();
    $("#unanswerNum").empty();
    $("#restart").empty();
    
    currentQ = 0;
    correctA = 0;
    incorrectA = 0;
    noA = 0;

    newQuestion();
}
//question page
function newQuestion(){
    //clears old unwanted stuff
    $("#message").empty();
    $("#correctAnswer").empty();
    $("#pic").empty();
    answered = true;

    /*gets new question*/
    $("#questionLeft").html("<h3>"+"Question: " + (currentQ+1) + " of "+ gameArray.length+"</h3>");
    $("#question").html("<h2>"+ gameArray[currentQ].question + "</h2>");
    
    for (var i=0; i<gameArray[currentQ].choices.length; i++){   

        var a = $("<button>");
        var b = gameArray[currentQ].choices[i];
         
        a.addClass("theButton");
        a.data("index", i);
        a.text(b);
        $("#answers").append(a);
    }
    //start timer
    countdown();
    
    $(".theButton").on("click", function(){
        index = $(this).data("index");
        checkAnswer();
        clearInterval(time);
        playKeySound();
    });
}
//timer
function countdown(){
    seconds = 5;
    $("#time").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

//minus time
function showCountdown(){
    seconds--;
	$("#time").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		checkAnswer();
	}
}

//answer page
function checkAnswer(){
    //clears old unwanted stuff
    $("#questionLeft").empty();
    $("#question").empty();
    $("#answers").empty();
    $("#time").empty();

    var gameIndex = gameArray[currentQ].correct;
    var correctIndex = gameArray[currentQ].choices[gameArray[currentQ].correct];

    

    //check answer
    if( (index == gameIndex)&& (answered ==true)){
        correctA++;
        $("#message").html("<h3>"+ messages.correct + "</h3>");
        $("#pic").html('<img src = "assets/images/'+ gifArray[0] +' " width = "400px">');
    }
    else if((index != gameIndex)&& (answered ==true)){
        incorrectA++;
        $("#message").html("<h3>"+messages.incorrect+"</h3>");
        $("#correctAnswer").html("<h3> The correct answer is : "+correctIndex+"</h3>");
        $("#pic").html('<img src = "assets/images/'+ gifArray[1] +' " width = "400px">');
    }
    else{
        noA++;
        $("#message").html("<h3>"+messages.endTime+"</h3>");
        $("#correctAnswer").html("<h3> The correct answer is : "+correctIndex+"</h3>");
        $("#pic").html('<img src = "assets/images/'+ gifArray[2] +' " width = "400px">');
        answered = true;
    }
    
   

    //timer for next page
    if (currentQ == gameArray.length-1){
        setTimeout(results,5000);
    }
    else{
        currentQ++;
        setTimeout(newQuestion,5000);
    }
}

//shows number of correct,incorrect, and unanswer. Ask for new game
function results(){
    //clears old unwanteded stuff
    $("#message").empty();
    $("#correctAnswer").empty();
    $("#pic").empty();
    $("#time").empty();

    $("#finalMessage").html("<h2>"+ messages.finished+"</h2>" ) ;
    $("#correctNum").html("<h3>You answered "+ correctA+ " questions right!!!</h3>");
    $("#incorrectNum").html("<h3>You answered "+ incorrectA+ " questions wrong!!!</h3>");
    $("#unanswerNum").html("<h3>You did not answer " + noA+ " questions!!!");
    $("#pic").html('<img src = "assets/images'+finishArray[1]+' "width = 400px">');
    $("#restart").html("<h4>CLICK HERE TO RESTART THE GAME</h3>");
}

//reset game
$("#restart").on("click", function(){
    newGame();
});
//play sound on click
function playKeySound(){
    var keySound = new Audio('./assets/Click.wav');
    keySound.play();
}

