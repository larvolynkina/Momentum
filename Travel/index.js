console.log(
  "1. Вёрстка соответствует макету. Ширина экрана 390px +48;\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. +15;\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22;\nИтоговая оценка - 75 баллов."
);

const siteNavigation = document.getElementById("site-navigation");
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

document.addEventListener("click", function (e) {
  if (
    e.target !== burgerMenu &&
    e.target !== siteNavigation &&
    e.target.classList.contains("burger-span") == false
  ) {
    closeMenu();
  }
});

if (window.innerWidth <= 390) {
  let offset = 0;
  const popularList = document.querySelector(".popular-list");
  const popularLinksItems = document.querySelectorAll(".popular-links-item");
  let indexOfLink = 0;

  document.querySelector(".next").addEventListener("click", function () {
    popularLinksItems[indexOfLink].classList.remove("active");
    offset = offset - 102;
    indexOfLink = indexOfLink + 1;
    if (offset < -300) {
      offset = 0;
    }
    if (indexOfLink > 2) {
      indexOfLink = 0;
    }
    popularList.style.left = offset + "%";
    popularLinksItems[indexOfLink].classList.toggle("active");
  });

  document.querySelector(".prev").addEventListener("click", function () {
    popularLinksItems[indexOfLink].classList.remove("active");
    offset = offset + 102;
    indexOfLink = indexOfLink - 1;
    if (offset > 0) {
      offset = -204;
    }
    if (indexOfLink < 0) {
      indexOfLink = 2;
    }
    popularList.style.left = offset + "%";
    popularLinksItems[indexOfLink].classList.toggle("active");
  });

  const dot1 = document.getElementById("item1");
  const dot2 = document.getElementById("item2");
  const dot3 = document.getElementById("item3");

  dot1.addEventListener("click", function (e) {
    dot1.classList.toggle("active");
    dot2.classList.remove("active");
    dot3.classList.remove("active");
    popularList.style.left = 0 + "%";
  });

  dot2.addEventListener("click", function (e) {
    dot2.classList.toggle("active");
    dot1.classList.remove("active");
    dot3.classList.remove("active");
    popularList.style.left = -102 + "%";
  });

  dot3.addEventListener("click", function (e) {
    dot3.classList.toggle("active");
    dot1.classList.remove("active");
    dot2.classList.remove("active");
    popularList.style.left = -204 + "%";
  });
}
