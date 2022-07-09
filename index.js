// array of hangman words 
const wordsData = [
    {
        id: 0,
        hint: "It's the name of another game",
        word: "quiz"
    },
    {
        id: 1,
        hint: "Another word for being annoying",
        word: "obnoxious"
    },
    {
        id: 2,
        hint: "An equipment used at river",
        word: "fishhook"
    },
    {
        id: 3,
        hint: "A sickness name or side effect",
        word: "syndrome"
    },
    {
        id: 4,
        hint: "A scientist word used in space",
        word: "galaxy"
    },
    {
        id: 5,
        hint: "An actor name",
        word: "johnson"
    },
    {
        id: 6,
        hint: "A series title",
        word: "theflash"
    },
    {
        id: 6,
        hint: "A mobile game",
        word: "pubgmobile"
    },
    {
        id: 7,
        hint: "A footballer name",
        word: "messi"
    },
    {
        id: 8,
        hint: "Most gross profit movie",
        word: "endgame"
    },
    {
        id: 9,
        hint: "Strongest avenger",
        word: "hulk"
    }
]

//  get data randomly 
const hint = document.querySelector(".hint span"),
randWord = Math.floor(Math.random() * wordsData.length)
hint.innerHTML = wordsData[randWord].hint

//  get length of word 
let wordsId = -1;
const word = document.querySelector(".guessWord div"),
lWord = wordsData[randWord].word.split('')
for (let x = 0; x < lWord.length; x++) {
    wordsId++
    const span = document.createElement("span")
    const spanText = document.createTextNode("_")
    span.appendChild(spanText)
    span.setAttribute("id", wordsId)
    word.appendChild(span)
}

//  remaining guesses 
const remainGuesses = document.querySelector(".remainGuess p span")
let remainGuess = 6

// play again 
const playAgain = document.querySelectorAll(".playAgain")

// get diagram Element 
const head = document.querySelector(".head"),
body = document.querySelector(".body"),
handOne = document.querySelector(".handOne"),
handTwo = document.querySelector(".handTwo"),
legOne = document.querySelector(".legOne"),
legTwo = document.querySelector(".legTwo");

// get emoji elements 
const happyFace = document.querySelector(".happyFace"),
eyebrow = document.querySelector(".eyebrow"),
sadFace = document.querySelector(".sadFace")

// get result elements 
const youKilledHim = document.querySelector(".youKilledHim"),
wordGuessed = document.querySelector(".wordGuessed"),
guessedIt = document.querySelector(".wordGuessed p span"),
hangman = document.querySelector(".hangman")


// letter clicked 
const alphaBtn = document.querySelectorAll(".keys button"),
btnContainer = document.querySelector(".keys"),
spanDash = document.querySelectorAll(".guessWord div span"),
missGuess = document.querySelector(".missedGuess span");
const alphaLocations = []
for (let x = 0; x < alphaBtn.length; x++) {
    alphaBtn[x].onclick = () => {
        const currentBtnClickedId = alphaBtn[x].getAttribute("id")
        let idx = lWord.indexOf(currentBtnClickedId.toLowerCase())
        while (idx != -1) {
            alphaLocations.push(idx)
            idx = lWord.indexOf(currentBtnClickedId.toLowerCase(), idx + 1)
        }
        showCorrectWordGuess()
        showWrongGuess(alphaBtn[x])
        reduceNumberOfGuesses(alphaBtn[x])
        hangMan(remainGuess)
        didPlayerGuessTheWord(spanDash)
        disableGuessButton(alphaBtn[x])
    }
}

// show correct guessed 
function showCorrectWordGuess() {
    for (let x = 0; x < alphaLocations.length; x++) {
        spanDash[alphaLocations[x]].innerHTML = lWord[alphaLocations[x]].toUpperCase()
    }
}

// show wrong guess 
function showWrongGuess(btnId) {
    const currentBtnClickedId = btnId.getAttribute("id")
    if (lWord.indexOf(currentBtnClickedId.toLowerCase()) == -1) {
        missGuess.innerHTML += `${currentBtnClickedId} `;
    }
}

// reduce number of guesses
function reduceNumberOfGuesses(btnId) {
    const currentBtnClickedId = btnId.getAttribute("id")
    if (lWord.indexOf(currentBtnClickedId.toLowerCase()) == -1) {
        let newGuess = remainGuess - 1
        remainGuess = newGuess
        remainGuesses.innerHTML = newGuess
    }
}

// hang man and display emoji
function hangMan(hangNum) {
    if (hangNum == 5) {
        head.style.display = "block"
    }
    else if (hangNum == 4) {
        body.style.display = "block"
        eyebrow.style.display = "block"
        sadFace.style.display = "none"
        happyFace.style.display = "none"
    }
    else if (hangNum == 3) {
        handOne.style.display = "block"
    }
    else if (hangNum == 2) {
        handTwo.style.display = "block"
        eyebrow.style.display = "none"
        sadFace.style.display = "block"
        happyFace.style.display = "none"
    }
    else if (hangNum == 1) {
        legOne.style.display = "block"
    }
    else if (hangNum == 0) {
        legTwo.style.display = "block"
        btnContainer.style.pointerEvents = "none"
        setTimeout(() => {
            youKilledHim.style.display = "block" 
            hangman.style.display = "none" 
        }, 700);
        eyebrow.style.display = "none"
        sadFace.style.display = "none"
        happyFace.style.display = "none"
    }
    else if (hangNum == 6) {
        eyebrow.style.display = "none"
        sadFace.style.display = "none"
        happyFace.style.display = "block"
    }
} 

// check if player guess the word 
function didPlayerGuessTheWord(elements) {
    let theWord = ''
    for (let x = 0; x < elements.length; x++) {
        theWord += elements[x].innerHTML;
    }
    if (theWord.toLowerCase() == lWord.join('')) {
        setTimeout(() => {
            wordGuessed.style.display = "block"
            guessedIt.innerHTML = theWord
            hangman.style.display = "none" 
        }, 700);
        eyebrow.style.display = "none"
        sadFace.style.display = "none"
        happyFace.style.display = "none"
    }
}

// disable button
function disableGuessButton(btn) {
    btn.classList.add("notActive")   
    btn.style.pointerEvents = "none"
}

// restart game 
for (let i = 0; i < playAgain.length; i++) {
    playAgain[i].onclick = () => {
        location.href = "index.html"
    }    
}

// Copyright 2022 21base 
