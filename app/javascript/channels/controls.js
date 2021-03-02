
function defineControls() {
  const controldefiners = document.querySelectorAll(".controlKeys")
  controldefiners.forEach(definer => {
    definer.addEventListener("click", () => {
      definer.innerHTML = "Define new key..."
      document.addEventListener("keyup", (e) => {
        if (e.key == "Escape") {
          definer.innerHTML = controls[definer.previousElementSibling.innerHTML]
        } else {
          definer.innerHTML = e.key
          controls[definer.previousElementSibling.innerHTML] = e.key
        }
      },
      {once: true});
    })
  })
}

let controls =  {
  Upkey:'z',
  Downkey:'s',
  Leftkey:'q',
  Rightkey:'d',
  Interactkey:'e',
}

export { controls, defineControls };
