"use strict";

document.body.addEventListener("click", (e) => {
  const target = e.target;
  const burger = document.querySelector(".header-bar__burger");
  const menu = document.querySelector(".header-bar__menu");

  if (target.classList.contains("header-bar__burger")) {
    burger.classList.toggle("active");
    menu.classList.toggle("show");
  } else if (
    !target.classList.contains("header-bar__burger") &&
    !target.classList.contains("header-bar__menu")
  ) {
    burger.classList.toggle("active");
    menu.classList.toggle("show");
  }
});
