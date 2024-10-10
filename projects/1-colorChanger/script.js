const body = document.querySelector("body");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    switch (event.target.id) {
      case "grey":
        body.style.backgroundColor = "#ddd";
        break;

      case "cyan":
        body.style.backgroundColor = "cyan";
        break;

      case "purple":
        body.style.backgroundColor = "purple";
        break;

      case "tomato":
        body.style.backgroundColor = "tomato";
        break;

      case "green":
        body.style.backgroundColor = "greenyellow";
        break;

      case "blue":
        body.style.backgroundColor = "blue";
        break;

      case "orange":
        body.style.backgroundColor = "orange";
        break;

      case "black":
        body.style.backgroundColor = "#222";
        break;

      default:
        break;
    }
  });
});
