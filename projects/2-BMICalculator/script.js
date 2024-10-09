function removeBMICategoryAttr() {
  const bmiCategoriesDT = document.querySelectorAll("#bmi-category dl dt");
  bmiCategoriesDT.forEach((dt) => {
    dt.removeAttribute("class", "bmi-highlight-style");
    dt.nextElementSibling.removeAttribute("class", "bmi-highlight-style");
  });
}

const form = document.querySelector("#bmi-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const height = parseInt(document.querySelector("#height").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const result = document.querySelector("#bmi-output");

  const bmi = (weight / ((height * height) / 10000)).toFixed(2);

  switch (true) {
    case bmi < 18.5:
      removeBMICategoryAttr();
      const underweight = document.querySelector("#underweight");
      underweight.setAttribute("class", "bmi-highlight-style");
      underweight.nextElementSibling.setAttribute(
        "class",
        "bmi-highlight-style"
      );
      break;

    case bmi >= 18.5 && bmi <= 24.9:
      removeBMICategoryAttr();
      const normal = document.querySelector("#normal");
      normal.setAttribute("class", "bmi-highlight-style");
      normal.nextElementSibling.setAttribute("class", "bmi-highlight-style");
      break;

    case bmi >= 25 && bmi <= 29.9:
      removeBMICategoryAttr();
      const overweight = document.querySelector("#overweight");
      overweight.setAttribute("class", "bmi-highlight-style");
      overweight.nextElementSibling.setAttribute(
        "class",
        "bmi-highlight-style"
      );
      break;

    case bmi >= 30:
      removeBMICategoryAttr();
      const obese = document.querySelector("#obese");
      obese.setAttribute("class", "bmi-highlight-style");
      obese.nextElementSibling.setAttribute("class", "bmi-highlight-style");
      break;

    default:
      removeBMICategoryAttr();
      break;
  }

  result.setAttribute("class", "bmi-output-style");
  result.innerHTML = `Your BMI is ${bmi}`;
});
