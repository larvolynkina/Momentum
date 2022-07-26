// 1. Time and Date
const time = document.querySelector('.time');
const dataElement = document.querySelector('.date');
let date = new Date();
let currentTime = date.toLocaleTimeString();
const dataOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};
let currentDate = date.toLocaleDateString('en-US', dataOptions);

const updateDate = () => {
  currentDate = date.toLocaleDateString('en-US', dataOptions);
  dataElement.textContent = currentDate;
};

// 2. Greetings

const greeting = document.querySelector('.greeting');
let hours = date.getHours();
const timeOfDay = [
  'Good morning',
  'Good afternoon',
  'Good evening',
  'Good night',
];
const getTimeOfDay = () => {
  if (hours >= 6 && hours < 12) {
    return timeOfDay[0];
  }
  if (hours >= 12 && hours < 18) {
    return timeOfDay[1];
  }
  if (hours >= 18 && hours < 24) {
    return timeOfDay[2];
  }
  return timeOfDay[3];
};

function showGreeting() {
  hours = date.getHours();
  greeting.textContent = `${getTimeOfDay()}`;
}

const updateTime = () => {
  date = new Date();
  currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showGreeting();
  updateDate();
  setTimeout(updateTime, 1000);
};

updateTime();

const input = document.querySelector('.name');

// Slider

function getRandomNum() {
  return Math.floor(Math.random() * (21 - 1)) + 1;
}
let bgNum = getRandomNum();

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

function setBg() {
  const timeOfDayforSlider = getTimeOfDay().slice(5);
  if (bgNum < 10) {
    bgNum = `0${bgNum.toString()}`;
  }
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/larvolynkina/momentum-images/main/images/${timeOfDayforSlider}/${bgNum}.webp`;
  img.addEventListener('load', () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  });
}

function getSlidePrev() {
  bgNum = +bgNum - 1;
  if (bgNum === 0) {
    bgNum = 20;
  }
  setBg();
}

function getSlideNext() {
  bgNum = +bgNum + 1;
  if (bgNum === 21) {
    bgNum = 1;
  }
  setBg();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

setBg();

// Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const inputCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
inputCity.value = 'Minsk';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=193b021fd8d76c22e00563035b5f6d2d&units=metric`;

async function getWeather() {
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404' || inputCity.value === '') {
    weatherDescription.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    if (data.cod === '404') {
      weatherError.textContent = `Error! city not found for '${inputCity.value}'!`;
    } else if (inputCity.value === '') {
      weatherError.textContent = `Error! Nothing to geocode for '${inputCity.value}'!`;
    }
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherError.textContent = '';
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
}
getWeather();

inputCity.addEventListener('change', () => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=193b021fd8d76c22e00563035b5f6d2d&units=metric`;
  getWeather();
});

function setLocalStorage() {
  localStorage.setItem('name', input.value);
  localStorage.setItem('city', inputCity.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    inputCity.value = localStorage.getItem('city');
    getWeather();
  }
}
window.addEventListener('load', getLocalStorage);
