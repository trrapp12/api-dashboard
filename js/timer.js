(() => {
    console.log('entered timer.js');

    const timerContainer = document.getElementById('timer');
    const cubeContainer = document.getElementById('scene');
    const pomodorroContainer = document.getElementById('pomodorro')
    const onePomodorro = 25 * 60 * 1000;
    let endTime;

    cubeContainer.addEventListener("click", (evt) => {
        if(evt.target.closest('#scene')) {
            console.log('flipping card')
            document.getElementById('cube').classList.toggle('is-flipped')
        }
    })

    function showTime() {
        var now = new Date()
        // timerContainer.innerText = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        timerContainer.innerText = now.toLocaleTimeString("en-US", { hour12: false })
        requestAnimationFrame(showTime)
    }

    function countdown () {
        let starttime = Date.now();
        let timeRemaining = endTime - starttime;

        if (timeRemaining <= 0 ) {
            clearInterval(intervalId)
        } else {
            let minutes = Math.floor(timeRemaining / 60000);
            let seconds = Math.floor((timeRemaining % 60000) / 1000);
            console.log(seconds)
            pomodorroContainer.textContent = (`${minutes}${seconds < 10 ? '0' : ''}:${seconds}`);
        }

    }

   pomodorroContainer.addEventListener('click', ()=> {
    if (!endTime) {
        endTime = Date.now() + onePomodorro;
        intervalId = setInterval(countdown, 1000)
    }
   })

    showTime()
})()