var next;

const textbox = (game, string, destroy) => {
  if (next) {
    next.destroy();
  }
  var content = string;
  var border = game.add.graphics().setDepth(5);
  var textBoxCounter = 0;

  border.fillStyle(0xffffff);
  border.fillRect(
    game.cameras.main.scrollX + (innerWidth / 3.27 - 3.0),
    game.cameras.main.scrollY + (innerHeight / 1.67 - 3.0),
    innerWidth / 2.68 + 6.0,
    innerHeight / 15.08 + 6.0
  );

  var graphics = game.add.graphics();

  graphics.fillStyle(0x000000).setDepth(5);
  graphics.fillRect(
    game.cameras.main.scrollX + innerWidth / 3.27,
    game.cameras.main.scrollY + innerHeight / 1.67,
    innerWidth / 2.68,
    innerHeight / 15.08
  );
  var text = game.add.text(
    game.cameras.main.scrollX + innerWidth / 3.275 + 6,
    game.cameras.main.scrollY + innerHeight / 1.675 + 6,
    string[0],
    {
      color: "#FFFFFF",
      font: "12px",
      wordWrap: { width: innerWidth / 2.69, height: 40 },
    }
  ).setDepth(5);
  if (string.length != 1) {
    next = game.add.text(
      game.cameras.main.scrollX + innerWidth / 1.505,
      game.cameras.main.scrollY + innerHeight / 1.54,
      "...",
      { color: "#FFFFFF", font: "6px" }
    ).setDepth(5);
  }

  const incrementCounter = () => {
    textBoxCounter += 1;
    if (textBoxCounter == string.length - 1) {
      next.destroy();
    }
    if (string.length > textBoxCounter) {
      text.setText(string[textBoxCounter]);
    } else {
      graphics.destroy();
      border.destroy();
      text.destroy();
      if (next) {
        next.destroy();
      }
      if (destroy) {
        destroy();
      }
      game.input.keyboard.off("keydown-SPACE", incrementCounter);
    }
  };
  game.input.keyboard.on("keydown-SPACE", incrementCounter);
};

export { textbox, next }