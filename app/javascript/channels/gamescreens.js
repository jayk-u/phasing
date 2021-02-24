const screens = document.querySelectorAll(".gameScreen");

const waitingscreen = document.querySelector("#waitingScreen");

const login = document.querySelector("#login");

const intro = document.querySelector("#intro");

const game = document.querySelector("#game");

console.log(screens)

console.log(waitingscreen.style.display == "none")

if (waitingscreen.style.display != "none") {
  document.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {screenToDisplay(login)};
    console.log(waitingscreen.style.display == "none")
  })
}

const screenToDisplay = (screen) => {
  screens.forEach(s => {
      s.style.display = "none";
      screen.style.display = "block";
  })
}
