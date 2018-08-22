/*
 * Create a list that holds all of your cards
 *
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const deck = document.querySelector(".deck");

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    console.log('Cards to shuffle', cardsToShuffle);
    const shuffledCards = shuffle(cardsToShuffle);
    console.log('shuffled cards', shuffledCards);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();


/*
 * set up the event listener for a card. If a card is clicked:
 */
document.addEventListener('click', function () {
    console.log('The document was clicked');
 }, true);



function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') && 
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    )
}

function toggleCard(card) {
    card.classList.toggle("open");
    card.classList.toggle("show");
}

/*push clickTarget onto toggledCards array*/

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}
/*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 */
let toggledCards = [];
let checkingForMatch = false;
 
 /* 
 *  - if the list already has another card, check to see if the two cards match
 */
function checkForMatch() {
    checkingForMatch = true;
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className
    ) {
        toggledCards = [];
        checkingForMatch = false;
    } else {
        console.log('Not a match!');
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
            checkingForMatch = false;
        }, 1000);
    }
};

deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (toggledCards.length === 2 && !checkingForMatch) {
        console.log("checked for match");
        addMove();
        checkScore();
    };
});


deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget) && toggledCards.length < 2 && !checkingForMatch
    ) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        console.log('open show was toggled');   
        if (toggledCards.length === 2) {
            checkForMatch();
            console.log('2 cards!');
            if (
                toggledCards[0].firstElementChild.className ===
                toggledCards[1].firstElementChild.className
            ) {
                toggledCards[0].classList.toggle('match');
                toggledCards[1].classList.toggle('match');
                console.log('match!');
                matched++;
                if (matched === TOTAL_PAIRS){
                    gameOver();
                    console.log('you win!');
                }            
            }
        }
    }
});
/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 */
let moves = 0;
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

/*stars*/
function checkScore() {
    if (moves === 16 || moves === 24)
    {hideStar();
    }
}

function hideStar(){
    const starList = document.querySelectorAll('.fa-star');
    for (star of starList) {
        if (star.style.display !== 'none') {
                star.style.display = 'none';
            break;
        }
    }
};

/*clock*/

let clockOff = true;
let time = 0;
let clockID;


function startClock() {
    clockID = setInterval(() => {
        clockOff = false;
        time++;
        console.log(time);
        const clock = document.querySelector('.clock');
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        if (seconds < 10) {
            clock.innerHTML = ((minutes)+":0"+(seconds))
        }
        else{
        clock.innerHTML = ((minutes)+":"+(seconds))
        }
    }, 1000);
    
}

deck.addEventListener('click', function () {
    startClock();
    console.log('clock starts');
}, {once:true});

function stopClock() {
    clearInterval(clockID);
}
/*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function toggleModal() {
     const modal = document.querySelector('.modal_background');
     modal.classList.toggle('hide');
 }

 function writeModalStats() {
     const timeStat = document.querySelector('.modal_time');
     const clockTime = document.querySelector('.clock').innerHTML;
     const movesStat = document.querySelector('.modal_moves');
     const starsStat = document.querySelector('.modal_stars');
     const stars = getStars();


     timeStat.innerHTML = 'Time = ' + clockTime; 
     movesStat.innerHTML = 'Moves = ' + moves;
     starsStat.innerHTML = 'Stars = ' + stars;
 }

 function getStars(){
    stars = document.querySelectorAll('.fa-star');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
};

document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
})

document.querySelector('.modal_close').addEventListener('click', () => {
    toggleModal();
})

document.querySelector('.modal_replay').addEventListener('click', () => {
    resetGame();
    toggleModal();

})

function resetGame() {
    resetClockandTime();
    resetMoves();
    resetStars();
    shuffleDeck();
    resetCards();
}

function resetClockandTime() {
    stopClock();
    document.querySelector('.clock').innerHTML = 0;
    clockOff = true;
}

function resetMoves() {
    moves =0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li'); 
    for (star of starList) {
        star.style.display = 'inline';
    }
}
document.querySelector('.restart').addEventListener('click', () => { 
    resetGame();
});

let matched = 0;
const TOTAL_PAIRS = 8;

function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}