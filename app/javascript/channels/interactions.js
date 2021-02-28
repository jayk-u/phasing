var minigame

const minigameSaber = (game) => {
  // game.scene.pause();
  box(game)
  textbox(game, "This is placeholder text.")
}

// const updateSaber = (game, char) => {
//   game.input.keyboard.on("keydown-ENTER", () => {
//     minigame = "none";
//   })
//   if (minigame != "none") {minigame = "active"}
//   while (minigame == "active") {
//     char.anims.stop();
//   }
// }

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
  graphics.fillRect(game.cameras.main.scrollX + innerWidth/3, game.cameras.main.scrollY + innerHeight/3, innerWidth/8, innerWidth/9);

  game.input.keyboard.on("keydown-ENTER", () => {
    graphics.destroy();
  })
}

const textbox = (game, string) => {
  var border = game.add.graphics();

  border.fillStyle(0xFFFFFF);
  border.fillRect(game.cameras.main.scrollX + (innerWidth/3.27 - 3.0), game.cameras.main.scrollY + (innerHeight/1.67 - 3.0), innerWidth/2.68 + 6.0, innerHeight/15.08 + 6.0);

  var graphics = game.add.graphics();

  graphics.fillStyle(0x000000);
  graphics.fillRect(game.cameras.main.scrollX + innerWidth/3.27, game.cameras.main.scrollY + innerHeight/1.67, innerWidth/2.68, innerHeight/15.08);
  var text = game.add.text(game.cameras.main.scrollX + innerWidth/3.275 + 3, game.cameras.main.scrollY + innerHeight/1.675 + 3, string, {color: '#FFFFFF', font: "12px", wordWrap: {width: innerWidth/2.65, height: 40 }})

  game.input.keyboard.on("keydown-ENTER", () => {
    graphics.destroy();
    border.destroy();
    text.destroy();
  })
}

export { minigameAquarium, minigameLibrary, minigameShower, minigameSaber, minigameFreezer }
