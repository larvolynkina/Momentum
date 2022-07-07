// console.log(
//   "1. Вёрстка соответствует макету. Ширина экрана 390px +48;\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. +15;\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22;\nИтоговая оценка - 75 баллов."
// );

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
  let clickClose = e.target.closest("div");
  if (clickClose !== burgerMenu && e.target !== siteNavigation) {
    closeMenu();
  }
});

const popularList = document.querySelector(".popular-list");
const popularLinksItems = document.querySelectorAll(".popular-links-item");
const dot1 = document.getElementById("item1");
const dot2 = document.getElementById("item2");
const dot3 = document.getElementById("item3");

if (window.innerWidth <= 390) {
  let offset = 0;
  let indexOfLink = 0;
  document.querySelector(".next").addEventListener("click", function () {
    popularLinksItems[indexOfLink].classList.remove("active");
    offset = offset - 100;
    indexOfLink = indexOfLink + 1;
    if (offset <= -300) {
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
    offset = offset + 100;
    indexOfLink = indexOfLink - 1;
    if (offset > 0) {
      offset = -200;
    }
    if (indexOfLink < 0) {
      indexOfLink = 2;
    }
    popularList.style.left = offset + "%";
    popularLinksItems[indexOfLink].classList.toggle("active");
  });

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
    popularList.style.left = -100 + "%";
  });

  dot3.addEventListener("click", function (e) {
    dot3.classList.toggle("active");
    dot1.classList.remove("active");
    dot2.classList.remove("active");
    popularList.style.left = -200 + "%";
  });
} else {
  let offsetDesctop = -97;
  let indexOfLinkLeft = 1;
  let indexOfLinkRight = 3;
  let indexOfRound = 1;
  popularList.addEventListener("click", function (e) {
    popularLinksItems[indexOfRound].classList.remove("active-desctop");
    if (e.target.closest("li") == popularList.children[indexOfLinkLeft]) {
      offsetDesctop = offsetDesctop + 60;
      if (offsetDesctop > 0) {
        offsetDesctop = -157;
        indexOfLinkLeft = 3;
        indexOfLinkRight = 5;
      }
      popularList.style.left = offsetDesctop + "%";
      indexOfLinkLeft = indexOfLinkLeft - 1;
      indexOfLinkRight = indexOfLinkRight - 1;
      indexOfRound -= 1;
      if (indexOfRound < 0) {
        indexOfRound = 2;
      }
      popularLinksItems[indexOfRound].classList.add("active-desctop");
    } else if (
      e.target.closest("li") == popularList.children[indexOfLinkRight]
    ) {
      offsetDesctop = offsetDesctop - 60;
      if (offsetDesctop < -200) {
        offsetDesctop = -37;
        indexOfLinkLeft = -1;
        indexOfLinkRight = 1;
      }
      popularList.style.left = offsetDesctop + "%";
      indexOfLinkRight = indexOfLinkRight + 1;
      indexOfLinkLeft = indexOfLinkLeft + 1;
      indexOfRound += 1;
      if (indexOfRound > 2) {
        indexOfRound = 0;
      }
      popularLinksItems[indexOfRound].classList.add("active-desctop");
    }
  });

  dot1.addEventListener("click", function (e) {
    dot1.classList.add("active-desctop");
    dot2.classList.remove("active-desctop");
    dot3.classList.remove("active-desctop");
    popularList.style.left = -37 + "%";
  });

  dot2.addEventListener("click", function (e) {
    dot2.classList.add("active-desctop");
    dot1.classList.remove("active-desctop");
    dot3.classList.remove("active-desctop");
    popularList.style.left = -97 + "%";
  });

  dot3.addEventListener("click", function (e) {
    dot3.classList.add("active-desctop");
    dot1.classList.remove("active-desctop");
    dot2.classList.remove("active-desctop");
    popularList.style.left = -157 + "%";
  });
}

const loginBtn = document.querySelector(".login");
const loginPopup = document.querySelector(".login-popup");
const overlay = document.querySelector(".overlay");

const closeLoginPopup = () => {
  loginPopup.classList.toggle("active");
  overlay.classList.toggle("active");
};

loginBtn.addEventListener("click", function (e) {
  loginPopup.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", function () {
  closeLoginPopup();
});

const btnLoginPopup = document.querySelector(".login-popup-btn");
const loginForm = document.querySelector(".login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginPopupFooter = document.querySelector(".login-popup-footer");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert(`Ваш E-mail: ${emailInput.value}\nВаш пароль: ${passwordInput.value}`);
});

let loginPopupChildren = loginPopup.children;
let createAccount = loginPopupChildren;
const loginPopupArr = Array.from(loginPopupChildren);
const loginPopupCopy = loginPopup.innerHTML;

const openRegister = () => {
  for (let i = 0; i < 3; i++) {
    createAccount[1].remove();
  }
  createAccount[2].remove();
  createAccount[0].innerHTML = "Create account";
  btnLoginPopup.innerHTML = "Sign Up";
  let ThirdChild = createAccount[3];
  ThirdChild.childNodes[1].innerHTML = "Already have an account?";
  ThirdChild.childNodes[3].innerHTML = "Log in";
  loginPopupFooter.removeEventListener("click", openRegister);
  loginPopupFooter.addEventListener("click", closeRegister);
};

const closeRegister = () => {
  loginPopup.innerHTML = loginPopupCopy;
  console.log(loginPopup);
  loginPopupChildren[7].replaceWith(loginPopupArr[7]);
  loginPopupChildren[4].replaceWith(loginPopupArr[4]);
  loginPopupFooter.addEventListener("click", openRegister);
};

loginPopupFooter.addEventListener("click", openRegister);
