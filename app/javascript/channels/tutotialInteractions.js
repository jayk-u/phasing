import { status } from "../scenes/tutorial";

const beginningInstructions = (game, end) => {
  textbox(game, ["Welcome to Breaking Out!", "Breaking Out is an Escape Game in which you'll have to find clues, solve problems and memorize information in order to complete levels!", "For starters, move with directional arrows and interact with space.", "Let's try it out on those shelves!"], end);
}

const minigameShelves = (game, end) => {
  textbox(game, ["Congrats!\nYou managed to interact with the shelves!", "Now, had this been a real level you would either have been presented a description of the shelves or a problem to solve.", "Perhaps, you might even have found an object on those shelves... Hey! Look at that!"], end);
  textbox(game, ["Looks like you're already full of skill, finding an object so soon!", "Use your mouse and click on the item to grab it into your inventory.", "Come on, try it out!"], end)
  textbox(game, ["Good job!\nNow what to do with this...", "Hey, is that a lock on the door?"], end)
}

const minigameDoor = (game, end) => {
  textbox(game, ["You took my clue like a champ!", "Looks like I don't have much left to teach you...", "Don't get too full of yourself! You still don't know you have to click on the key to interact with this lock!"], end);
  textbox(game, ["Alright you're good, I'll give you that.", "Be careful however, sometimes your inventory can't interact with the item in front of you and clicking away will yield no results!", "Ah, and before you go, sometimes you'll have to press other keys, however those are relative to the mysteries so you'll have to find out by yourself!"], end);
}

const endingInstructions = (game, end) => {
  textbox(game, ["You didn't see that coming, uh?", "It's as you've seen: you've got a timer so complete the levels before it reaches 0...\nIf you can!"], end)
}

const textbox = (game, string, destroy) => {
  if (next) {
    next.destroy();
  }
  var content = string;
  var border = game.add.graphics();
  var textBoxCounter = 0;

  border.fillStyle(0xffffff);
  border.fillRect(
    game.cameras.main.scrollX + (innerWidth / 3.27 - 3.0),
    game.cameras.main.scrollY + (innerHeight / 1.67 - 3.0),
    innerWidth / 2.68 + 6.0,
    innerHeight / 15.08 + 6.0
  );

  var graphics = game.add.graphics();

  graphics.fillStyle(0x000000);
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
  );
  if (string.length != 1) {
    next = game.add.text(
      game.cameras.main.scrollX + innerWidth / 1.505,
      game.cameras.main.scrollY + innerHeight / 1.54,
      "...",
      { color: "#FFFFFF", font: "6px" }
    );
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

export {
  beginningInstructions,
  minigameShelves,
  minigameDoor,
  endingInstructions,
};

