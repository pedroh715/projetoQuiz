const allQuestions = {
        "results": [
            {
                "id": 1,
                "category": "Mitologia",
                "type": "multiple",
                "difficulty": " ",
                "question": "De acordo com o folclore algonquiano, como alguém se transforma em um Wendigo?",
                "answer": "Participando de canibalismo.",
                "choices": [
                    "Mutilação excessiva de cadáveres de animais.",
                    "Realizando um ritual envolvendo assassinato.",
                    "Beber o sangue de muitos animais mortos.",
                    "Participando de canibalismo."
                ]
            },
            {
                "id": 2,
                "category": "Conhecimentos gerais",
                "type": "multiple",
                "difficulty": "easy",
                "question": "Em que um funâmbulo anda?",
                "answer": "Uma corda apertada",
                "choices": [
                    "Vidro quebrado",
                    "Bolas",
                    "Na lua",
                    "Uma corda apertada"
                ]
            },
            {
                "id": 3,
                "category": "História",
                "type": "multiple",
                "difficulty": "easy",
                "question": "O colapso da União Soviética ocorreu em que ano?",
                "answer": "1991",
                "choices": [
                    "1992",
                    "1891",
                    "1990",
                    "1991"
                ]
            },
            {
                "id": 4,
                "category": "Entretenimento: jogos de tabuleiro",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Quantos pontos vale o bloco Z no Scrabble?",
                "answer": "10",
                "choices": [
                    "8",
                    "5",
                    "6",
                    "10"
                ]
            },
            {
                "id": 5,
                "category": "Entretenimento: Video Games",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Qual filme de terror teve uma sequência na forma de videogame lançado em 20 de agosto de 2002?",
                "answer": "O enigma de outro mundo",
                "choices": [
                    "Uma noite alucinante",
                    "Jogos mortais",
                    "Alien - O 8.º Passageiro",
                    "O enigma de outro mundo"
                ]
            },
            {
                "id": 6,
                "category": "Geografia",
                "type": "multiple",
                "difficulty": "hard",
                "question": "Qual é a montanha mais alta do Canadá?",
                "answer": "Monte Logan",
                "choices": [
                    "Monte Tremblant",
                    "Montanha Whistler",
                    "Montanha Azul",
                    "Monte Logan"
                ]
            },
            {
                "id": 7,
                "category": "Entretenimento: Animes e Mangá",
                "type": "multiple",
                "difficulty": "hard",
                "question": "Em Hunter x Hunter, os membros da família de Killua conhecidos por ser?",
                "answer": "Assassinos",
                "choices": [
                    "Bandidos",
                    "Caçadores",
                    "Ninjas",
                    "Assassinos"
                ]
            },
            {
                "id": 8,
                "category": "Entretenimento: Animes e Mangá",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Em Pokémon: Chronicles, por que Misty tinha medo de Gyarados?",
                "answer": "Ela rastejou para dentro de sua boca como um bebê.",
                "choices": [
                    "Ela achou isso assustador..",
                    "Ela foi gravemente ferida por isso.",
                    "Faz parte do Bug.",
                    "Ela rastejou para dentro de sua boca como um bebê."
                ]
            },
            {
                "id": 9,
                "category": "Entretenimento: Video Games",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Qual desses personagens NÃO é um chefe em Crash Bash?",
                "answer": "Ripper Roo",
                "choices": [
                    "Papu Papu",
                    "Irmãos Komodo",
                    "Nitros Oxide",
                    "Ripper Roo"
                ]
            },
            {
                "id": 10,
                "category": "Entretenimento: Música",
                "type": "multiple",
                "difficulty": "medium",
                "question": "Qual álbum o Gorillaz lançou em 2017?",
                "answer": "Humanz",
                "choices": [
                    "Plastic Beach",
                    "The Fall",
                    "Demon Days",
                    "Humanz"
                ]
            }
        ]
    }

const {results} = allQuestions

let btnA = document.querySelector('#b0')
let btnB = document.querySelector('#b1')
let btnC = document.querySelector('#b2')
let btnD = document.querySelector('#b3')
let allButtons = Array.from(document.getElementsByClassName('quest'))

let questao = document.querySelector('.pergunta')
let pts = document.querySelector('#pontos')
var alt = [0, 1, 2, 3]
var randomNumber, aux

let questAtual = document.querySelector('#numQuest')
let maxQuest = document.querySelector('#maxQuest')

let questCount = 0
let score = 0
let questDisponiveis = []
let questSort = {}
let acertouQuestao = false

const correctAnswerSound = document.querySelector('#correctAudio')
const incorrectAnswerSound = document.querySelector('#incorrectAudio')
 
start = () => {
    questCount = 0
    score = 0
    questDisponiveis = [...results]
    novaQuestao()
}  

novaQuestao = () => {
    if (questDisponiveis.length === 0 || questCount >= results.length) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/proj-quiz/end/end.html')
    }
    
    console.log(score)
    questCount++
    questAtual.textContent = questCount
    maxQuest.textContent = results.length

    let sorteio = Math.floor(Math.random() * questDisponiveis.length)
    questSort = questDisponiveis[sorteio]
    questao.textContent = questSort.question

    for (let i = alt.length; i;) {
        randomNumber = Math.random() * i-- | 0
        tmp = alt[randomNumber]
        alt[randomNumber] = alt[i]
        alt[i] = tmp
    }

    btnA.textContent = questSort.choices[alt[0]]
    btnB.textContent = questSort.choices[alt[1]]
    btnC.textContent = questSort.choices[alt[2]]
    btnD.textContent = questSort.choices[alt[3]]

    questDisponiveis.splice(sorteio, 1)
    acertouQuestao = true
     
}
let pontuar

allButtons.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acertouQuestao) return
        acertouQuestao = false
        const selectAlt = e.target
        const addClasse = selectAlt.textContent == questSort.answer ? 'correta' : 'incorreta'

        if (selectAlt.textContent == questSort.answer) {
            pontuar = setInterval(() => { animacao() }, 100)
            correctAnswerSound.currentTime = 1.5
            correctAnswerSound.play()
        } else {
            incorrectAnswerSound.play()
        }

        selectAlt.classList.add(addClasse)
        
        setTimeout(() => {
            selectAlt.classList.remove(addClasse)
            clearInterval(pontuar)
            novaQuestao()
        }, 1000)
    })
})

function animacao() {
    score++
    pts.textContent = score
    
}

start()