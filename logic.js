//Variables to Shorten text
var startButton = document.getElementById('startbtn')
var nextButton = document.getElementById('nextbtn')
var finishEarlyButton = document.getElementById('finishEarlyBtn')
var introSection = document.getElementById('intro')
var questionSection = document.getElementById('Question-Section')
var questionElement = document.getElementById('question')
var answerButtons = document.getElementById('Answer-Section')
var scoreboard = document.getElementById('Score-Container')
var seeScoreBtn = document.getElementById('seeScore')
var restartBtn = document.getElementById('restart')

var shuffledQuestions, currentQuestionIndex
var score = 0


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
    finishEarlyButton.classList.remove('hide')
    introSection.classList.add('hide')
    setNextQuestion()
}

function restart() {
    restartBtn.addEventListener("click", function() {
        
        console.log('Started')
        startButton.classList.add('hide')
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionSection.classList.remove('hide')
        nextButton.classList.remove('hide')
        finishEarlyButton.classList.remove('hide')
        introSection.classList.add('hide')
        scoreboard.classList.add('hide')
        score = 0
        
        setNextQuestion()
        
        //startButton.innerText = 'Restart'
        //score = 0
        //startButton.classList.remove('hide')
        //seeScoreBtn.classList.remove('hide')
        //console.log("Is this RESTARTING?")
    })
}

restart()

function resetQuestions() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild
        (answerButtons.firstChild)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        score += 1
        element.classList.add('correct')
        console.log("is this working?")
    } else {
        element.classList.add('wrong')
        score -= 1
        console.log("is this wrong?")
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

seeScoreBtn.addEventListener("click", function() {
    scoreQuestion()
})

function scoreQuestion () {
    scoreboard.classList.remove('hide')
    questionSection.classList.add('hide')

    }

function setNextQuestion() {
    
    resetQuestions()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    console.log(score)
    
}

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


function selectAnswer(userPick) {
    var selectedButton = userPick.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        //startButton.innerText = 'Click to Finish'
        //score = 0
        startButton.classList.remove('hide')
        seeScoreBtn.classList.remove('hide')
        questionSection.classList.add('hide')
        

    }
    
    
}

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

