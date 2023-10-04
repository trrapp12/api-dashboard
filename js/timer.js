(() => {
    console.log('entered timer.js');

    const timerContainer = document.getElementById('timer')
    const cubeContainer = document.getElementById('scene')

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

    function pomoTimer() {
        const startTime = Date.now();
        const onePomodorro = 25 * 60 * 1000;
        const endTime = startTime + onePomodorro;
        console.log(startTime, onePomodorro, endTime)
        // const endTime = 
    }

    pomoTimer()

    showTime()
})()