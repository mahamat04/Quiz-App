const question  = document.getElementById('question');
const choices  = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the name of the Linux Kernel creator?",
        choice1: "Linux Torvalds",
        choice2: "Bill Gate",
        choice3: "Linus Torvalds",
        choice4: "Richard Stallman",
        answer: 3
    },
    {
        question: "When did the Linux Kernel release?",
        choice1: 1991,
        choice2: 1990,
        choice3: 2001,
        choice4: 1989,
        answer: 1
    },
    {
        question: "What is Linux?",
        choice1: "An operationg system",
        choice2: "A task manager",
        choice3: "A virtualization system",
        choice4: "A kernel",
        answer: 4
    },
    {
        question: "What is a terminal?",
        choice1: "A user interface with a shell",
        choice2: "A video game",
        choice3: "A text editor",
        choice4: "A graphical user interface",
        answer: 1
    },
    {
        question: "Which of the following is not a Unix shell?",
        choice1: "Bash",
        choice2: "Psh",
        choice3: "Ksh",
        choice4: "Zsh",
        answer: 2
    },
    {
        question: "What is a Shell?",
        choice1: "A command line interpreter",
        choice2: "A program interpreter",
        choice3: "A terminal",
        choice4: "A command line",
        answer: 1
    }
];

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || availableQuestions.length <= MAX_QUESTIONS)
    {
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply  = selectedAnswer == currentQuestion.answer? 'correct': 'incorrect';
        // console.log(classToApply)

        if(classToApply === 'correct'){
            incremenScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incremenScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();

