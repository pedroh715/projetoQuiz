const name = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')


const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const maxHighScores = 5


console.log(highScores)

finalScore.innerText = mostRecentScore

name.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !name.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: name.value
    }

    highScores.push(score)
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
}