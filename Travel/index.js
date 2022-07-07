console.log(
  "1. Слайдер изображений в секции destinations +50;\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50;\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету. +25;\nИтоговая оценка - 100 баллов."
);

const siteNavigation = document.getElementById("site-navigation");
const burgerMenu = document.querySelector(".burger-menu");
const mainNav = document.querySelector(".main-nav");
burgerMenu.addEventListener("click", function () {
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
  const clickClose = e.target.closest("div");
  if (clickClose !== burgerMenu && e.target !== siteNavigation) {
    closeMenu();
  }
});

const popularList = document.querySelector(".popular-list");
const popularLinksItems = document.querySelectorAll(".popular-links-item");
const dot1 = document.getElementById("item1");
const dot2 = document.getElementById("item2");
const dot3 = document.getElementById("item3");

//mobile slider

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

  dot1.addEventListener("click", function () {
    dot1.classList.add("active");
    dot2.classList.remove("active");
    dot3.classList.remove("active");
    offset = 0;
    indexOfLink = 0;
    popularList.style.left = 0 + "%";
  });

  dot2.addEventListener("click", function () {
    dot2.classList.add("active");
    dot1.classList.remove("active");
    dot3.classList.remove("active");
    offset = -100;
    indexOfLink = 1;
    popularList.style.left = -100 + "%";
  });

  dot3.addEventListener("click", function () {
    dot3.classList.add("active");
    dot1.classList.remove("active");
    dot2.classList.remove("active");
    offset = -200;
    indexOfLink = 2;
    popularList.style.left = -200 + "%";
  });
  //desctop slider
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
    } else {
      popularLinksItems[indexOfRound].classList.add("active-desctop");
    }
  });

  dot1.addEventListener("click", function () {
    dot1.classList.add("active-desctop");
    dot2.classList.remove("active-desctop");
    dot3.classList.remove("active-desctop");
    popularList.style.left = -37 + "%";
    indexOfLinkLeft = 0;
    indexOfLinkRight = 2;
    offsetDesctop = -37;
    indexOfRound = 0;
  });

  dot2.addEventListener("click", function () {
    dot2.classList.add("active-desctop");
    dot1.classList.remove("active-desctop");
    dot3.classList.remove("active-desctop");
    popularList.style.left = -97 + "%";
    indexOfLinkLeft = 1;
    indexOfLinkRight = 3;
    offsetDesctop = -97;
    indexOfRound = 1;
  });

  dot3.addEventListener("click", function () {
    dot3.classList.add("active-desctop");
    dot1.classList.remove("active-desctop");
    dot2.classList.remove("active-desctop");
    popularList.style.left = -157 + "%";
    indexOfLinkLeft = 2;
    indexOfLinkRight = 4;
    offsetDesctop = -157;
    indexOfRound = 2;
  });
}

//Pop-up

const loginBtn = document.querySelectorAll(".click-btn");
const loginPopup = document.querySelector(".login-popup");
const overlay = document.querySelector(".overlay");

const closeLoginPopup = () => {
  loginPopup.classList.toggle("active");
  overlay.classList.toggle("active");
};

loginBtn.forEach((item) =>
  item.addEventListener("click", function () {
    loginPopup.classList.toggle("active");
    overlay.classList.toggle("active");
  })
);

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

const loginPopupChildren = loginPopup.children;
const createAccount = loginPopupChildren;
const loginPopupArr = Array.from(loginPopupChildren);
const loginPopupCopy = loginPopup.innerHTML;

const openRegister = () => {
  for (let i = 0; i < 3; i++) {
    createAccount[1].remove();
  }
  createAccount[2].remove();
  createAccount[0].innerHTML = "Create account";
  btnLoginPopup.innerHTML = "Sign Up";
  const ThirdChild = createAccount[3];
  ThirdChild.childNodes[1].innerHTML = "Already have an account?";
  ThirdChild.childNodes[3].innerHTML = "Log in";
  loginPopupFooter.removeEventListener("click", openRegister);
  loginPopupFooter.addEventListener("click", closeRegister);
};

const closeRegister = () => {
  loginPopup.innerHTML = loginPopupCopy;
  loginPopupChildren[7].replaceWith(loginPopupArr[7]);
  loginPopupChildren[4].replaceWith(loginPopupArr[4]);
  btnLoginPopup.innerHTML = "Sign In";
  const EightChild = loginPopupChildren[7];
  EightChild.childNodes[1].innerHTML = "Don’t have an account?";
  EightChild.childNodes[3].innerHTML = "Register";
  loginPopupFooter.addEventListener("click", openRegister);
};

loginPopupFooter.addEventListener("click", openRegister);
