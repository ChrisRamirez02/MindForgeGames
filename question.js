const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the opposite of the word 'happy' ?",
        choice1: 'Joyful',
        choice2: 'Sad',
        choice3: 'Excited',
        choice4: 'Content',
        answer: 2,
    },
    {
        question: 'What is the verb in the sentence: She sings beautifully?',
        choice1: 'She',
        choice2: 'Sings',
        choice3: 'Beautifully',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'What do you call a word that means the same as another word?',
        choice1: 'Synonym',
        choice2: 'Same',
        choice3: 'Antonym',
        choice4: 'Opposite',
        answer: 1,
    },
    {
        question: 'Which punctuation mark is used at the end of a question?',
        choice1: 'Question mark',
        choice2: 'Exclamation',
        choice3: 'Clause',
        choice4: 'All of the above',
        answer: 1,
    },
    {
        question: 'What do you call a word that joins two sentences together?',
        choice1: 'Sentence',
        choice2: 'Pharagraph',
        choice3: 'Clause',
        choice4: 'Conjunction',
        answer: 4,
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
