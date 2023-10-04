(() => {
    console.log('entered timer.js');

    const timerContainer = document.getElementById('timer')

    function showTime() {
        var now = new Date()
        timerContainer.innerText = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
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