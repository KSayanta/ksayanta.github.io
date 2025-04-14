const url = "https://www.thecolorapi.com";

// DOM elements
const clrForm = document.getElementById("form-clr-input");
const clrContainerNL = document.querySelectorAll(".color-container > *");

// Event listners
window.addEventListener("DOMContentLoaded", resetColor);
clrForm.addEventListener("submit", handleSubmit);
clrContainerNL.forEach(elm => {
  elm.addEventListener("click", copyToClipboard);
});

// Handler functions
function resetColor() {
  const a = document.getElementById("color-input");
  a.value = a.attributes.value.value;
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

function copyToClipboard(ctx) {
  console.log(ctx.clientX, ctx.clientY);
  navigator.clipboard.writeText(ctx.target.innerText);
}
