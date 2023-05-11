class Timer {

    constructor(duration, onTimerEnd) {
        this.duration = duration;
        this.onTimerEnd = onTimerEnd;
        this.timer = null;
    }

    start() {
        let startTime = Date.now();
        this.timer = setInterval(() => {
            let elapsedTime = Date.now() - startTime;
            let timeLeft = this.duration - elapsedTime;
            if (timeLeft <= 0) {
                clearInterval(this.timer);
                this.onTimerEnd();
            } else {
                this.updateTime(timeLeft);
            }
        }, 1000);
    }

    updateTime(timeLeft) {
        let minutes = Math.floor(timeLeft / 1000 / 60);
        let seconds = Math.floor(timeLeft / 1000) % 60;
        let display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        document.getElementById('timer').textContent = display;
    }
}

let timer = new Timer(1 * 60 * 1000, onTimerEnd);

function onTimerEnd() {
    const reloadButton = document.createElement('button');
    reloadButton.innerText = 'Reiniciar';
    reloadButton.addEventListener('click', () => {
        removePopup(popup);
        location.reload();
    });

    const message = document.createElement('div');
    message.innerHTML = `
        <h2>Se acabo el tiempo</h2>
    `;
    message.appendChild(reloadButton);

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.appendChild(message);
    document.body.appendChild(popup);

    lowlightCells();
}
function removePopup(popup) {
    popup.parentNode.removeChild(popup);
}
function lowlightCells() {
    for (let cell of this.cells) {
        cell.classList.add('colorWhite');
    }
}

timer.start();