var counter;

const interactionObject = (game, items, character, status) => {
  game.input.keyboard.on("keydown-SPACE", () => {
    counter = 0;
    items.forEach ((item) => {
      var distBetween = Phaser.Math.Distance.Between(
        character.x,
        character.y,
        item.x,
        item.y
      );
      if (distBetween < 30 && counter < 1 && status.minigame != "active") {
        const end = () => {
          status.minigame = "none";
        }
        status.minigame = "active";
        item.minigame(game, end);
        counter++;
      }
    });
  
  });
}

export { interactionObject };