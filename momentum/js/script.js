import playList from './playList.js';

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
    url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=193b021fd8d76c22e00563035b5f6d2d&units=metric`;
    getWeather();
  }
}
window.addEventListener('load', getLocalStorage);

// Quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
function getRandomNumQuotes() {
  return Math.floor(Math.random() * (102 - 0)) + 0;
}
let quoteNumber = getRandomNumQuotes();

function getQuotes() {
  fetch('quotes.json')
    .then((res) => res.json())
    .then((data) => {
      quoteNumber = getRandomNumQuotes();
      quote.textContent = `"${data.quotes[quoteNumber].quote}"`;
      author.textContent = data.quotes[quoteNumber].author;
    });
}

getQuotes();

changeQuoteBtn.addEventListener('click', getQuotes);

// Audio

const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListUl = document.querySelector('.play-list');
const audio = new Audio();
audio.volume = 0.5;
let isPlay = false;
let playNum = 0;

playList.forEach((track) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = track.title;
  playListUl.append(li);
});

const trackTitleOver = document.querySelector('#track');
const trackTitle = document.querySelectorAll('.play-item');

trackTitleOver.textContent = `${playNum + 1}. ${playList[playNum].title}`;

let pauseTime = 0;

function playAudio() {
  if (isPlay === false) {
    audio.src = playList[playNum].src;
    trackTitle[playNum].classList.add('item-active');
    audio.currentTime = pauseTime;
    audio.play();
    isPlay = true;
    playBtn.classList.add('pause');
  } else {
    pauseTime = audio.currentTime;
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('pause');
    trackTitle[playNum].classList.remove('item-active');
  }
}

playBtn.addEventListener('click', playAudio);

const playPrev = () => {
  pauseTime = 0;
  if (isPlay === true) {
    isPlay = false;
  }
  trackTitle[playNum].classList.remove('item-active');
  playNum -= 1;
  if (playNum < 0) {
    playNum = 3;
  }
  playAudio();
  trackTitle[playNum].classList.add('item-active');
  updateDuration();
  trackTitleOver.textContent = `${playNum + 1}. ${playList[playNum].title}`;
};

playPrevBtn.addEventListener('click', playPrev);

const playNext = () => {
  pauseTime = 0;
  if (isPlay === true) {
    isPlay = false;
  }
  trackTitle[playNum].classList.remove('item-active');
  playNum += 1;
  if (playNum === 4) {
    playNum = 0;
  }
  playAudio();
  trackTitle[playNum].classList.add('item-active');
  updateDuration();
  trackTitleOver.textContent = `${playNum + 1}. ${playList[playNum].title}`;
};

playNextBtn.addEventListener('click', playNext);

const volume = document.querySelector('.volume-header input');
const muteBtn = document.querySelector('.muteButton');

const durationFullTime = document.querySelector('#duration');
const durationRange = document.querySelector('#progress');
const durationStart = document.querySelector('#timer');
const durationPlayer = document.querySelector('.duration-player');
durationFullTime.textContent = playList[playNum].duration;

function calculateDuration() {
  const res = playList[playNum].duration.split(':');
  return +res[0] * 60 + +res[1];
}
let durationCalc = calculateDuration();

function calculateDurationStart() {
  let trackMinutes = Math.floor(Math.round(audio.currentTime) / 60);
  if (trackMinutes < 10) {
    trackMinutes = trackMinutes.toString().padStart(2, '0');
  }
  let trackSeconds = Math.round(audio.currentTime) % 60;
  if (trackSeconds < 10) {
    trackSeconds = trackSeconds.toString().padStart(2, '0');
  }
  return [trackMinutes, trackSeconds].join(':');
}

function updateDuration() {
  durationFullTime.textContent = playList[playNum].duration;
  durationCalc = calculateDuration();
}

durationStart.textContent = calculateDurationStart();

audio.addEventListener('timeupdate', () => {
  durationRange.style.width = `${(100 * audio.currentTime) / durationCalc}%`;
  durationStart.textContent = calculateDurationStart();
});

durationPlayer.addEventListener('click', (e) => {
  const durationPosition = Math.round((e.offsetX * 100) / 120);
  audio.currentTime = Math.round((durationCalc * durationPosition) / 100);
});

let currentVolume = volume.value;

function muteOn() {
  currentVolume = volume.value;
  audio.volume = 0;
  muteBtn.classList.add('active');
  muteBtn.removeEventListener('click', muteOn);
  muteBtn.addEventListener('click', muteOff);
}

function muteOff() {
  audio.volume = currentVolume;
  volume.value = currentVolume;
  muteBtn.classList.remove('active');
  muteBtn.removeEventListener('click', muteOff);
  muteBtn.addEventListener('click', muteOn);
}

muteBtn.addEventListener('click', muteOn);

volume.addEventListener('input', () => {
  audio.volume = volume.value;
  if (muteBtn.classList.contains('active')) {
    muteOff();
  }
});

trackTitle.forEach((track, index) => {
  track.addEventListener('click', () => {
    if (track.classList.contains('item-active')) {
      playAudio();
      track.classList.remove('item-active');
    } else {
      if (isPlay === true) {
        pauseTime = 0;
      } else if (isPlay === false && index !== playNum) {
        pauseTime = 0;
      }
      isPlay = false;
      trackTitle[playNum].classList.remove('item-active');
      track.classList.add('item-active');
      playNum = index;
      playAudio();
      updateDuration();
      trackTitleOver.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    }
  });
});

audio.addEventListener('ended', () => {
  playNext();
});
