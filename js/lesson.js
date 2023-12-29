const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'OK'
        phoneSpan.style.color = 'green'
    } else {
        phoneSpan.innerHTML = 'NOT OK'
        phoneSpan.style.color = 'red'

    }
})

// TAB SLIDER

const tabsContentCards = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const tabsItemsParent = document.querySelector('.tab_content_items')

let currentSlide = 0
let intervalId

const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showSlide = (slideIndex) => {
    if (slideIndex < 0 || slideIndex >= tabsContentCards.length) {
        return
    }
    hideTabsContentCards()

    tabsContentCards[slideIndex].style.display = 'block'
    tabsItems[slideIndex].classList.add('tab_content_item_active')
    currentSlide = slideIndex
}

const changeSlide = () => {
    currentSlide++
    if (currentSlide >= tabsContentCards.length) {
        currentSlide = 0
    }
    showSlide(currentSlide)
}

intervalId = setInterval(changeSlide, 3000)

tabsItemsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('tab_content_item')) {
        const slideIndex = Array.from(tabsItems).findIndex(item => item === target)
        showSlide(slideIndex)
        clearInterval(intervalId)
        intervalId = setInterval(changeSlide, 3000)
    }
})


const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hideTabsContentCards()
showTabsContentCards()

tabsItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hideTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

// CONVERTER
const converter = (element, targetElement, type, targetElement2) => {
    element.oninput = () => {
        const reguest = new XMLHttpRequest();
        reguest.open('GET','../data/converter.json' );
        reguest.setRequestHeader('Content-type', 'application/json');
        reguest.send();

        reguest.onload = () => {
            const data = JSON.parse (reguest.response);
            switch (type) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    targetElement2.value = (element.value / data.eur).toFixed(2);
                    break;
                case 'usd':
                    targetElement.vaule = (element.vaule * data.usd).toFixed(2);
                    targetElement2.vaule = (element.vaule / data.eur).toFixed(2);
                    break;
                case 'eur':
                    targetElement.vaule = (element.vaule * data.eur).toFixed(2);
                    targetElement2.vaule = (element.vaule * data.usd).toFixed(2);

                    break;
                default:
                    break;
            }
            element.vaule === '' && (targetElement.vaule = '');
            element.vaule === '' && (targetElement2.vaule = '');
        };
    };
};




const somInput = document.getElementById('som')
const usdInput = document.getElementById('usd')
const eurInput = document.getElementById('eur')

converter(somInput, usdInput, 'som', eurInput);
converter(usdInput, somInput, 'usd', eurInput);
converter(eurInput, somInput, 'eur', usdInput);

// CARD SWITCHER
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 0;
const fetchCard = () => {
    if (count === 0) {
        count = 200;
    } else if (count === 201) {
        count = 1;
    }

    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
        <p> ${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}"> ${data.completed}</p>
        <span>${data.id}</span>
        `
        })
}

btnNext.onclick = () => {
    count++;
    fetchCard();
}

btnPrev.onclick = () => {
    count--;
    fetchCard();
}
fetchCard();

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data));

// optional chaining - ?.

const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
cityNameInput.oninput = (event) => {
    fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
.then(response => response.json())
        .then(data => {
            city.innerHTML = data?.name ? data?.name : 'Город не найден...'
            temp.innerHTML = data.main ?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
        })
}















