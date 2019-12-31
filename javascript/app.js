const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const $ = id => document.getElementById(id)
const display = $('display')
const input = $('input')
const timer = $('timer')
const start = $('start')
const score = $('score')
let points = 0

start.addEventListener('click', function() {
    render()
    this.disabled = true
    input.focus()
})

input.addEventListener('input', () => {
    const arrayQuote = display.querySelectorAll('span')
    const inputValue = input.value.split('')
    let correct = true
    arrayQuote.forEach((span, index) => {
        const character = inputValue[index]
        if (character == null) {
            span.classList.remove('correct')
            span.classList.remove('incorrect')
            correct = false
        } else if (character === span.innerText) {
            span.classList.add('correct')
            span.classList.remove('incorrect')
        } else {
            span.classList.remove('correct')
            span.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) {
        render()
        points++
        score.innerHTML = points
    }
})

function randomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function render() {
    const quote = await randomQuote()
    display.innerHTML = ''
    quote.split('').forEach(character => {
        const span = document.createElement('span')
        span.innerText = character
        display.appendChild(span)
    })
    input.value = null
    Timer()
}

let counter
function Timer() {
    timer.innerText = 0
    counter  = new Date()
    setInterval(() => {
        timer.innerText = time()
    }, 1000)
}

function time() {
    return Math.floor((new Date() - counter) / 1000)
}

function getRandomIntInclusive() {
    const min = Math.ceil(0);
    const max = Math.floor(list.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
