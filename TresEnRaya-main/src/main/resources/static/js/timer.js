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
      // Aquí se debe llamar a una función que termine el juego
      
      alert('Se acabó el tiempo');
  }
  
  timer.start();