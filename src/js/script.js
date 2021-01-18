"use strict";
document.querySelector(".top-menu__burger").onclick = () => {
  document.querySelector(".top-menu__burger").classList.toggle("active");
  document.querySelector(".top-menu__menu").classList.toggle("show");
};
