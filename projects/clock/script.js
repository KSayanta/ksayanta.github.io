const clock = document.querySelector("#clock")
const zone = document.querySelector("#zone")

setInterval(() => {
    clock.innerText = new Date().toLocaleTimeString();
}, 1000)

let date = new Date();
zone.innerHTML = `<strong>GMT </strong>${date.toTimeString().substring(12, 15)}:${date.toTimeString().substring(15, 17)}`;
