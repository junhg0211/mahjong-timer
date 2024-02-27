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

function lerp(t, a, b) {
    return (b-a) * t + a;
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
        let durationRatio = duration / timerDuration;

        let r = lerp(durationRatio, 0xfc, 0xf7);
        let g = lerp(durationRatio, 0xba, 0xf7);
        let b = lerp(durationRatio, 0x03, 0xf9);

        timerSpan.style.color = "#19191e";
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
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
