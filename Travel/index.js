console.log(
  "1. Вёрстка соответствует макету. Ширина экрана 390px +48;\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. +15;\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22;\nИтоговая оценка - 75 баллов."
);

const burgerMenu = document.querySelector(".burger-menu");
const mainNav = document.querySelector(".main-nav");
burgerMenu.addEventListener("click", function (e) {
  mainNav.classList.toggle("main-nav-active");
  burgerMenu.classList.toggle("active");
});

function closeMenu() {
  burgerMenu.classList.remove("active");
  mainNav.classList.remove("main-nav-active");
}

const navLinks = document.querySelectorAll(".nav-list-item");
navLinks.forEach((n) => n.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  const click = e.composedPath().includes(mainNav);
  if (!click && mainNav.classList.contains("active")) {
    closeMenu();
  }
});
