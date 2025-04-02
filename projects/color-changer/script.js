const body = document.querySelector("body");
const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", event => {
    body.removeAttribute("class");

    switch (event.target.id) {
      case "grey":
        body.classList.add("theme-grey");
        break;

      case "cyan":
        body.classList.add("theme-cyan");
        break;

      case "purple":
        body.classList.add("theme-purple");
        break;

      case "tomato":
        body.classList.add("theme-tomato");
        break;

      case "green":
        body.classList.add("theme-green");
        break;

      case "blue":
        body.classList.add("theme-blue");
        break;

      case "orange":
        body.classList.add("theme-orange");
        break;

      case "black":
        localStorage.removeItem("theme");
        break;

      default:
        break;
    }
    localStorage.setItem("theme", body.classList.value);
  });
});
