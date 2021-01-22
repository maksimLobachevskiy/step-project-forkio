"use strict";

document.body.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("header-bar__burger")) {
    document.querySelector(".header-bar__burger").classList.toggle("active");
    document.querySelector(".header-bar__menu").classList.toggle("show");
  } else if (
    !target.classList.contains("header-bar__burger") &&
    !target.classList.contains("header-bar__menu")
  ) {
    document.querySelector(".header-bar__burger").classList.remove("active");
    document.querySelector(".header-bar__menu").classList.remove("show");
  }
});
