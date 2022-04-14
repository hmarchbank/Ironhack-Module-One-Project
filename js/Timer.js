class Timer {
    constructor(minutes, seconds) {
      this.currentTime = 119
      this.intervalId = null
      this.secondsEl = seconds
      this.seconds = 0
      this.minutesEl = minutes
      this.minutes = 0
    }
  
    start() {
      this.intervalId = setInterval( () => {
        this.currentTime--
        
        this.minutes = Math.floor(this.currentTime/60)
          
        this.seconds = (this.currentTime % 60).toString()

          if (this.seconds.length === 2) {
                this.secondsEl.textContent = this.seconds
          } else {
            this.secondsEl.textContent = `0${this.seconds}`
          }
        this.minutesEl.textContent = `0${this.minutes}`

        if (this.currentTime === 0){
            clearInterval(this.intervalId)
        }
      }, 1000)
    }

}