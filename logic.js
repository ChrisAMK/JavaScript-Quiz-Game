//Variables to Shorten text
var startButton = document.getElementById('startbtn')
var nextButton = document.getElementById('nextbtn')
var finishButton = document.getElementById('finishbtn')
var introSection = document.getElementById('intro')
var questionSection = document.getElementById('Question-Section')
var questionElement = document.getElementById('question')
var answerButtons = document.getElementById('Answer-Section')

var shuffledQuestions, currentQuestionIndex


//
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startQuiz() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionSection.classList.remove('hide')
    nextButton.classList.remove('hide')
    finishButton.classList.remove('hide')
    introSection.classList.add('hide')
    
    setNextQuestion()
}

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
        element.classList.add('correct')
        console.log("is this working?")
    } else {
        element.classList.add('wrong')
        console.log("is this working?")
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function setNextQuestion() {
    resetQuestions()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
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
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
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
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
        
    }
]

