const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = parseInt(localStorage.getItem('mostRecentScore')); // Parse score to integer

// Retrieve high scores from local storage or initialize an empty array
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGHSCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    // Check if the username already exists in highScores
    const existingUserIndex = highScores.findIndex(item => item.name === username.value);

    if (existingUserIndex !== -1) {
        // If the user already exists, update their existing score
        highScores[existingUserIndex].score += mostRecentScore;
    } else {
        // If the user doesn't exist, add their score as a new entry
        highScores.push({
            name: username.value,
            score: mostRecentScore
        });
    }

    // Sort the highScores array by score (highest to lowest)
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top MAX_HIGHSCORES scores
    highScores = highScores.slice(0, MAX_HIGHSCORES);

    // Update highScores in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Redirect to the home page
    window.location.assign('/mindforge.html');
};
