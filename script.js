import { handleNavLinks } from "./utils.js";

// DOM elements
const navLinks = document.querySelectorAll(".nav-links");
const main = document.querySelector(".main");
const targets = main.querySelectorAll("section");

// Observer options
const options = {
  root: main,
  rootMargin: "-10px 0px -90%",
  // threshold: 0.5,
};

// Ovserver constructor
const observer = new IntersectionObserver((entries, observer) => {
  handleNavLinks(entries, observer, navLinks, targets);
}, options);

// Observer target assignment
targets.forEach(target => observer.observe(target));
