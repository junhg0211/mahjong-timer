let timerSpan;

let timerStart;
let timerDuration = 10000;

function addDuration(duration) {
    timerDuration += duration;
}

function padZero(number, length) {
    let zeroCount = Math.max(length - number.toString().length, 0);

    let result = "";
    for (let i = 0; i < zeroCount; i++) {
        result += '0';
    }
    result += number;

    return result;
}

function formatDuration(duration) {
    let abs = Math.abs(duration);
    let millisecond = abs % 1000;
    let second = Math.floor(abs / 1000);
    let formatted = `${second}.${padZero(millisecond, 3)}`;

    let negativeSign = duration < 0 ? '-' : '';

    return negativeSign + formatted;
}

function tick() {
    let now = new Date();
    let delta = now - timerStart;
    let duration = timerDuration - delta;

    timerSpan.innerText = formatDuration(duration);

    if (duration < 0) {
        timerSpan.style.color = "#f7f7f9";
        document.body.style.backgroundColor = "#b30202";
    } else {
        timerSpan.style.color = "#19191e";
        document.body.style.backgroundColor = "#f7f7f9";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    timerSpan = document.querySelector("#timer-span");

    timerStart = new Date();

    setInterval(tick);
});

function updateTimer() {
    timerStart = new Date();
}

document.addEventListener("mousedown", updateTimer);
document.addEventListener("click", updateTimer);
window.addEventListener("keydown", updateTimer);
