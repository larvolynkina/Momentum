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

function setLocalStorage() {
  localStorage.setItem('name', input.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

// Slider

function getRandomNum() {
  return Math.floor(Math.random() * (21 - 1)) + 1;
}

function setBg() {
  const timeOfDayforSlider = getTimeOfDay().slice(5);
  let bgNum = getRandomNum();
  if (bgNum < 10) {
    bgNum = `0${bgNum.toString()}`;
  }
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/larvolynkina/stage1-tasks/blob/assets/images/${timeOfDayforSlider}/${bgNum}.jpg')`;
}

setBg();
