const url = "https://www.thecolorapi.com";

// DOM elements
const clrForm = document.getElementById("form-clr-input");
const clrContainerNL = document.querySelectorAll(".color-container > *");
const toolTip = document.getElementById("tooltip");

// Event listners
window.addEventListener("DOMContentLoaded", reset);
clrForm.addEventListener("submit", handleSubmit);
clrContainerNL.forEach(elm => {
  elm.addEventListener("click", handleClick);
});

// Handler functions
function reset() {
  clrForm.reset();
}

function handleSubmit(e) {
  e.preventDefault();

  const clrSeedVal = clrForm.querySelector("#color-input").value.slice(1);
  const clrScheme = clrForm.querySelector("#color-values").value;
  const endpoint = `/scheme?hex=${clrSeedVal}&mode=${clrScheme}`;

  fetch(url + endpoint)
    .then(res => res.json())
    .then(data => {
      data.colors.forEach((elm, idx) => {
        clrContainerNL[idx].style.backgroundColor = elm.hex.value;
        clrContainerNL[idx].querySelector("p").textContent = elm.hex.value;
      });
    });
}

function handleClick(e) {
  navigator.clipboard.writeText(e.target.innerText);

  toolTip.style.left = `${e.clientX - toolTip.clientWidth / 2}px`;
  toolTip.style.top = e.clientY + "px";
  toolTip.removeAttribute("aria-disabled");
  toolTip.classList.add("animate");

  setTimeout(() => {
    toolTip.setAttribute("aria-disabled", "true");
    toolTip.classList.remove("animate");
  }, 400);
}
