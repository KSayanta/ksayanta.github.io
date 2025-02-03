const body = document.querySelector("body");
const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", event => {
    body.removeAttribute("class");

    switch (event.target.id) {
      case "grey":
        body.classList.add("btn-grey");
        break;

      case "cyan":
        body.classList.add("btn-cyan");
        break;

      case "purple":
        body.classList.add("btn-purple");
        break;

      case "tomato":
        body.classList.add("btn-tomato");
        break;

      case "green":
        body.classList.add("btn-green");
        break;

      case "blue":
        body.classList.add("btn-blue");
        break;

      case "orange":
        body.classList.add("btn-orange");
        break;

      case "black":
        body.classList.add("btn-black");
        localStorage.removeItem("theme");
        break;

      default:
        break;
    }
    localStorage.setItem("theme", body.classList.value);
  });
});
