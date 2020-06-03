//Variables to Shorten text
var startButton = document.getElementById('startbtn')
var questionSection = document.getElementById('Question-Section')
var questionElement = document.getElementById('question')
var answersButtons = document.getElementById('Answer-Section')

var shuffledQuestions, currentQuestionIndex


//
startButton.addEventListener('click', startQuiz)

function startQuiz() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionSection.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {

}

function selectAnswer() {

}

var questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
        
    }
]