const minigameSaber = (game) => {
  game.scene.pause();
  box(game)
  game.input.keyboard.on("keydown-ESCAPE", () => {
    game.scene.resume();
  })
}

const minigameShower = () => {

}

const minigameFreezer = () => {

}

const minigameLibrary = () => {

}

const minigameAquarium = () => {

}

const box = (game) => {
  var graphics = game.add.graphics();

  graphics.fillStyle(0xFFFFFF);
  graphics.fillRect(100, 60, 300, 300);

  var text = game.add.text(180, 150, "You won!", {color: '#000000', font: "32px", wordWrap: {width: innerWidth - 120, height: 200 }})
}

export { minigameAquarium, minigameLibrary, minigameShower, minigameSaber, minigameFreezer }