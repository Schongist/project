const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9]+@gmail\.com$/;

gmailButton.addEventListener('click', () =>{
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML= "OK"
        gmailResult.style.color= 'green'
    } else {
        gmailResult.innerHTML = "NOT OK"
        gmailResult.style.color = 'red'
    }
})

const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const moveChildBlock = () => {
    if (positionX < 448 && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX >= 448 && positionY < 448) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
    } else if (positionY >= 448 && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
    }

    // Добавляем рекурсивный вызов с requestAnimationFrame
    requestAnimationFrame(moveChildBlock);
};

// Начинаем движение
moveChildBlock();

const secondsDisplay = document.getElementById('secondsS');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let intervalId; // Переменная для хранения идентификатора интервала
let isRunning = false; // Переменная для хранения состояния таймера (запущен или остановлен)
let seconds = 0; // Переменная для хранения счетчика времени

// Функция, которая будет выполняться при нажатии на кнопку "Start"
const startTimer = () => {
    if (!isRunning) {
        intervalId = setInterval(() => {
            seconds++;
            secondsDisplay.textContent = seconds;
        }, 1000);
        isRunning = true;
    }
};

// Функция, которая будет выполняться при нажатии на кнопку "Stop"
const stopTimer = () => {
    clearInterval(intervalId);
    isRunning = false;
};

// Функция, которая будет выполняться при нажатии на кнопку "Reset"
const resetTimer = () => {
    clearInterval(intervalId);
    seconds = 0;
    secondsDisplay.textContent = seconds;
    isRunning = false;
};

// Назначаем обработчики событий
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);











