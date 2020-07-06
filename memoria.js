class AudioController {
    constructor() {
        this.bgMusic = new Audio("calma2.mp3");
        this.flipSound = new Audio("virada.wav");
        this.matchSound = new Audio("par.wav");
        this.victorySound = new Audio("vitoria.wav");
        this.gameOverSound = new Audio("gameover.wav");
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class jogo {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.tempoRestante = totalTime;
        this.timer = document.getElementById("tempo-restante")
        this.ticker = document.getElementById("viradas");
        this.audioController = new AudioController();
    }

    comecarJogo() {
        this.totalClicks = 0;
        this.tempoRestante = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.comecarTempo();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.tempoRestante;
        this.ticker.innerText = this.totalClicks;
    }
    comecarTempo() {
        return setInterval(() => {
            this.tempoRestante--;
            this.timer.innerText = this.tempoRestante;
            if(this.tempoRestante === 0)
                this.gameOver();
        }, 1000); // << de quanto em quanto tempo diminui o tempo, 1000ms = 1s;
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById("game-over-text").classList.add("visible");
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById("victory-text").classList.add("visible");
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add("visible");

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }
    getCardType(card) {
        return card.getElementsByClassName("card-value")[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

ready();

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new jogo(100, cards); // jogo(X, cards) sendo X o tempo estipulado para acabar o jogo

    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible");
            game.comecarJogo();
        });
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });
}