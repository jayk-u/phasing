var interogation;
var counter;

const objectDetection = (game, character, items, status) => {
  counter = 0;
  items.forEach ((item) => {
    if (counter === 0) {
      var distBetween = Phaser.Math.Distance.Between(
        character.x,
        character.y,
        item.x,
        item.y
      );
    }
    if (distBetween < 30 && status.minigame != "active") {
      if (interogation) interogation.destroy();
      interogation = game.add.text(
        character.x + innerWidth / 120,
        character.y - innerHeight / 30,
        "?",
        {
          fontFamily: "Arial",
          color: "#E0BBA6",
          font: "15px",
          stroke: "#000000",
          strokeThickness: 3,
          wordWrap: { width: 110 },
        }
      )
      .setOrigin(0)
      .setDepth(10);
      counter = 1;
    } else if (interogation && distBetween > 30) {
      interogation.destroy();
      counter = 0;
    }
  });
}

export { objectDetection };