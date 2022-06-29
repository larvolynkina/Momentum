console.log(
  "Вёрстка валидная +10;\nВёрстка семантическая +20;\nВёрстка соответствует макету +48;\nТребования к css + 12;\nИнтерактивность, реализуемая через css +20.\nИтоговая оценка - 100 баллов."
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
