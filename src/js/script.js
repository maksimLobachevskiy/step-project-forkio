"use strict";

document.body.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("top-menu__burger")) {
    document.querySelector(".top-menu__burger").classList.toggle("active");
    document.querySelector(".top-menu__menu").classList.toggle("show");
  } else if (
    !target.classList.contains("top-menu__burger") &&
    !target.classList.contains("top-menu__menu")
  ) {
    document.querySelector(".top-menu__burger").classList.remove("active");
    document.querySelector(".top-menu__menu").classList.remove("show");
  }
});
