const rankList = document.getElementById('rankList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

console.log(highScores)

rankList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score} pontos</li>`
}).join("")