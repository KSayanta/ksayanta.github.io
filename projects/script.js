// Theme State
const body = document.querySelector("body");
const theme = localStorage.getItem("theme");

// On Load
theme && body.classList.add(theme);
