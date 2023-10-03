(() => {
    console.log('entered timer.js');

    const timerContainer = document.getElementById('timer')

    function showTime() {
        var now = new Date()
        timerContainer.innerText = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        requestAnimationFrame(showTime)
    }

    showTime()
})()