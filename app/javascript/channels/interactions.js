var inventory

const minigameSaber = (game) => {
  // game.scene.pause();

  if (inventory == "Occupied") {
    textbox(game, "I can't carry anything else...")
  } else {
    const gameAssets = document.getElementById("game-assets").dataset;
    game.load.image("keylock", gameAssets.keylockImg);
    game.load.image("key", gameAssets.keyImg);
  
    // var key = game.add.image(game.cameras.main.scrollX + innerWidth/2.3, game.cameras.main.scrollY + innerHeight/2.7, "key")
    // key.setDisplaySize(50,50)
  
    var keylock = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "keylock")
    keylock.setDisplaySize((innerWidth+innerHeight)/16, (innerWidth+innerHeight)/16)
    keylock.setInteractive();
  
    // box(game, keylock)
  
    keylock.on('pointerdown', (pointer, GameObject) => {
      keylock.x = innerWidth/3.1;
      keylock.y = innerHeight/3;
      keylock.setDisplaySize(40,40)
      keylock.ignoreDestroy = true
      keylock.setScrollFactor(0)
      inventory = "Occupied"
  });
  
    textbox(game, "This is placeholder text.")
  
    game.input.keyboard.on("keydown-ENTER", () => {
      keylock.destroy();
    })
  }
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

const box = (game, object) => {
  var container = game.add.container(game.cameras.main.scrollX + innerWidth/2.3, game.cameras.main.scrollY + innerHeight/2.7, [object]);
  container.setSize(innerWidth/8, innerWidth/9)
  // graphics.fillStyle(0xFFFFFF);
  // graphics.fillRect(game.cameras.main.scrollX + innerWidth/2.3, game.cameras.main.scrollY + innerHeight/2.7, innerWidth/8, innerWidth/9);

  
  container.setInteractive();
  game.input.setDraggable(container);
  console.log(container);

  game.input.on('dragstart', function (pointer, gameObject) {
    console.log(gameObject)
    gameObject.setTint(0xff0000);

});

  game.input.on('drag', (pointer, gameObject, dragX, dragY) => {

    console.log(pointer)
    gameObject.x = dragX;
    gameObject.y = dragY;

  });

  game.input.keyboard.on("keydown-ENTER", () => {
    container.destroy();
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
