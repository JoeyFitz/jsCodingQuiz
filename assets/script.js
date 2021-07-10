//Assignment Code
var score = 0;
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very helpful tool during development and debugging used for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];
var questionNumber = 0;
var mainSection = document.getElementById("wrapper");
var questionsDiv = document.getElementById("questionsDiv");
var ulCreate = document.createElement("choicesUL");
var startQuiz = document.getElementById("startQuiz");
var timer = document.getElementById("timer");
var secondsRemaining = 75;
var penaltyTime = 10;

// Starts the countdown timer and provides user a readout in top right corner of the screen
startQuiz.addEventListener("click", function () {
        timerInterval = setInterval(function () {
            secondsRemaining--;
            timer.textContent = "Time Remaining: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                quizComplete();
                timer.textContent = "Time's up!";
            }
        }, 1000);

    render(questionNumber);
});

function render(questionNumber) {
    // Clear out existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionNumber].question;
        var userChoices = questions[questionNumber].choices;
        // Append question portion
        questionsDiv.textContent = userQuestion;
    }
    // New 'for each' for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare choices with answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionNumber].answer) {
            score++;
            createDiv.textContent = "Correct! The answer was " + questions[questionNumber].answer;
        // Incorrect condition 
        } else {
            // Leave score but take 10 seconds off the timer
            secondsRemaining = secondsRemaining - penaltyTime;
            createDiv.textContent = "Incorrect. The answer was " + questions[questionNumber].answer;
        }
    }
    // Set question number
    questionNumber++;

    if (questionNumber >= questions.length) {
        // All done will append last page with user stats
        quizComplete();
        createDiv.textContent = "Quiz completed! " + "You got " + score + "/" + questions.length + " correct!";
    } else {
        render(questionNumber);
    }
    questionsDiv.appendChild(createDiv);
}

function quizComplete() {
    questionsDiv.innerHTML = "";
    timer.innerHTML = "";

    // Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsRemaining >= 0) {
        var timeRemaining = secondsRemaining;
        var createP2 = document.createElement("p");
        clearInterval(timerInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

    // Create a label for where the user will input initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);

    // Create the input element for user to add their initials to the scoreboard
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    // Create a submit button to add user's initials to the scoreboard
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (initials === null) {
            console.log("No initials were entered.");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Load highscores page
            location.replace("./highscores.html");
        }
    });
}