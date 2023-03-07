const username  = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore  = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScore = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = mostRecentScore;
const MAX_HIGH_SCORE = 5;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    // console.log(username.value);
})

SaveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScore.push(score)
    highScore.sort((x,y) => y.score - x.score);
    highScore.splice(5);


    localStorage.setItem('highScores', JSON.stringify(highScore));

    window.location.assign('/');
};