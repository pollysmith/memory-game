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



deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)
    ) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        console.log('open show was toggled');   
        if (toggledCards.length === 2) {
            console.log('2 cards!');
        }
    }
});

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

 
 /* 
 *  - if the list already has another card, check to see if the two cards match
 */
function checkForMatch() {
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className
    ) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        console.log('match!');
    } else {
        console.log('Not a match!');
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
    }, 1000);
}
};

deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (toggledCards.length === 2) {
        checkForMatch();
        console.log("checked for match");
        addMove();
        checkScore();
    };
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
        time++;
        console.log(time);
        const clock = document.querySelector('.clock');
        clock.innerHTML = time;
    }, 1000);
    
}



deck.addEventListener('click', function () {
    startClock();
    console.log('clock starts');
}, {once:true});

/*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */