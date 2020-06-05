//Variables to Shorten text
var startButton = document.getElementById('startbtn')
var nextButton = document.getElementById('nextbtn')
var finishEarlyButton = document.getElementById('finishEarlyBtn')
var introSection = document.getElementById('intro')
var questionSection = document.getElementById('Question-Section')
var questionElement = document.getElementById('question')
var answerButtons = document.getElementById('Answer-Section')
var scoreboard = document.getElementById('Score-Container')
var userScore = document.getElementById('Score')
var seeScoreBtn = document.getElementById('seeScore')
var restartBtn = document.getElementById('restart')
var finishbtn = document.getElementById('finishbtn')
var userAnswer = ""

var shuffledQuestions, currentQuestionIndex
var score = 0

var userName = document.getElementById('scoreboard-input')
var leaderboard = document.getElementById('leaderboard')
var leaderboardUsers = document.getElementById('leaderboardUsers')
var users = [];

init();

function init() {
    var storedUsers = JSON.parse(localStorage.getItem("Users"))
    if (storedUsers !== null) {
        users = storedUsers;

        renderUsers();
    }
}

function renderUsers() {
    leaderboardUsers.innerHTML = "";

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        var li = document.createElement("li");
        li.textContent = user;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "Complete";

        li.appendChild(button);
        leaderboardUsers.appendChild(li);
    }
}

function storeUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

leaderboard.addEventListener("submit", function() {
    event.preventDefault();

    var userText = userName.value.trim();

    if (userText === "") {
        return
    }

    users.push(userText);
    userName.value = "";

    storeUsers()
    renderUsers()
})












// User Starts the game by clicking the Start Button that executes the "Start Quiz Function"
startButton.addEventListener('click', startQuiz)

// When the Next Button is clicked, the "setNextQuestion Function" is Executed and Question Index is increased.
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// This is the Function that Transitions from the Intro Screen to the Actual Quiz, it sorts the Classes of the items that are to be on the Screen.
function startQuiz() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionSection.classList.remove('hide')
    nextButton.classList.remove('hide')
    introSection.classList.add('hide')
    setNextQuestion()
}

// This is my Restart Function that is written to restart the Quiz from whever the user is, The main aim of it its to reset all the values
// and Classes like "hide" for the scoring, it is super important to reset the score and UserAnswer.
function restart() {
    restartBtn.addEventListener("click", function() {
        
        // Alerts the Console that a new Quiz has started, for easier Development
        console.log('Started')
        startButton.classList.add('hide')
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionSection.classList.remove('hide')
        nextButton.classList.remove('hide')
        introSection.classList.add('hide')
        scoreboard.classList.add('hide')
        score = 0
        userAnswer = NaN
        
        setNextQuestion()
        
    })
}

// This calls the Restart Function but only executes when the Restart Button is Clicked.
restart()

// This Function gets the next set of Questions ready.
function resetQuestions() {
    // TO BE REMOVED
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    // Removes all childenren before setting new.
    while (answerButtons.firstChild) {
        answerButtons.removeChild
        (answerButtons.firstChild)
    }
}

// this function detects if the element pressed is correct. if it is, it applies correct class, if wrong it applies the "wrong" class
// TO BE REMOVED FOR DEV PURPOSES
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        userAnswer = true
        element.classList.add('correct')

    } else {
        element.classList.add('wrong')
        userAnswer = false
    }
}

//  Supplemental Function to setStatusClass TO ALSO BE REMOVED
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// This is the Event Listener for the Function : ScoreQuestion
seeScoreBtn.addEventListener("click", function() {
    scoreQuestion()
})

// the scoreQuestion Function Hides elements and reveals the scoreboard to the HTML, For the Scoring system i had to include a IF
// Statement at the end of this function to get the final score
function scoreQuestion () {
    scoreboard.classList.remove('hide')
    questionSection.classList.add('hide')
    seeScoreBtn.classList.add('hide')
    if (userAnswer == true) {
        score += 1
    }
    userScore.innerText = score;
}

// setNextQuestion Calls the resetQuestions function then the showQuestion function but with a bit of Maths to shuffle the order
// of the questions, The scoring system is done here. the get a score the user must have this function called while the userAnswer
// Variable is set to true
function setNextQuestion() {
    resetQuestions()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if (userAnswer == true) {
        score += 1
    }
    console.log(score)
}

// This Function updates the HTML with new buttons that contain the Relevant information and data, like which button gives a correct value.
function showQuestion(question) {

    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

// This function lets JavaScript know which button is clicked and if it is the Correct one or not using Dataset.
function selectAnswer(userPick) {
    var selectedButton = userPick.target
    var correct = selectedButton.dataset.correct
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        })
    setStatusClass(document.body, correct)
    // This If statement is how the Program knows where to finish, this code checks if the questions are running out, if so the code
    // is Executed
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        seeScoreBtn.classList.remove('hide')
    }
    
    
}
// This is my Questions array! all questions are treated as objects, with their answers but only the correct one(s) will have the true value!
var questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
        
    },
    {
        question: 'What is 4 + 4',
        answers: [
            {text: '2', correct: false},
            {text: '8', correct: true}
        ]
        
    },
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
        
    },
    {
        question: 'What is 4 + 2',
        answers: [
            {text: '4', correct: false},
            {text: '6', correct: true}
        ]
        
    }
    
]

