const screens = document.querySelectorAll('.screen')
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn')
const gameContainer = document.querySelector('.game-container')
const startBtn = document.querySelector('.btn-start')
const timeEl = document.querySelector('.time')
const scoreEl = document.querySelector('.score')
const messageEl = document.querySelector('.message')

let seconds = 0;
let score = 0;
let selected_insect = {}

// moving pages up, with css classlist
startBtn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

// getting the values from selected insect, img source and img name
chooseInsectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // getting img from clicked button
        const img = btn.querySelector('img')
        // getting src from clicked image
        const src = img.getAttribute('src')
        // getting alt from clicked image
        const alt = img.getAttribute('alt')
        // add src and alt into an object
        selected_insect = { src, alt }

        // move page up and start the game
        screens[1].classList.add('up')
        setTimeout(() => {
            createInsect()
        }, 2000);
        startGame()
    })
})

// when game starts, count time
function startGame() {
    setInterval(() => {
        increaseTime()
    }, 1000);
}

// time increase function
function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s

    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    // call function getRandomLocation() and with destructuring get x and y axis
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `
    <img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)"
    >
    `
    // when insect ic slicked, call catchInsect()
    // insect.addEventListener('click', catchInsect)

    insect.addEventListener('click', () => {
        catchInsect(insect)
    })

    gameContainer.appendChild(insect)
}

function getRandomLocation() {
    // get width and height of screen
    const width = window.innerWidth
    const height = window.innerHeight
    // get random number for x and y axis, minus img width from css, so its not go off the screen
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

// when insect is clicked
function catchInsect(insect) {
    // console.log(123)
    // checking to see if insect is passed
    // console.log(insect)

    increaseScore()
    // add class from css to animate scale down and remove insect
    insect.classList.add('caught')
    setTimeout(() => {
        insect.remove()
    }, 2000);

    // add more insects every time one is clicked
    addInsects()
}

// increasing score after selecting insect
function increaseScore() {
    score++

    // show and remove message
    if (score > 25) {
        messageEl.classList.add('visible')
    }
    if (score > 32) {
        messageEl.classList.remove('visible')
    }

    scoreEl.innerHTML = `Score: ${score}`
}

// add more insects every time one is clicked
function addInsects() {
    setTimeout(() => {
        createInsect()
    }, 1000);

    setTimeout(() => {
        createInsect()
    }, 1500);
}