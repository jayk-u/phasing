import { status } from "../scenes/tutorial";
import { textbox } from '../components/textBox';


var key;
var next;
const gameAssets = document.getElementById("game-assets").dataset;


const beginningInstructions = (game, end) => {
  textbox(game, ["Welcome to Breaking Out!\n...Press space to continue!", "Breaking Out is an Escape Game in which you'll have to find clues, solve problems and memorize information in order to complete levels!", "For starters, move with directional arrows and interact with space.", "Let's try it out on this drawer!"], end);
}

const minigameShelves = (game, end) => {
  if (status.inventory == "Key") {
    textbox(game, ["Hey.", "Was that a lock on the", "D", "O", "O", "R","?"], end)
  } else {
    const dispKey = () => {
      game.load.image("key", gameAssets.keyImg);
  
      key = game.add
        .image(
          game.cameras.main.scrollX + innerWidth / 2.1,
          game.cameras.main.scrollY + innerHeight / 2.3,
          "key"
        )
        .setDepth(4);
      key.setDisplaySize(
        (innerWidth + innerHeight) / 18,
        (innerWidth + innerHeight) / 18
      );
      key.setInteractive();
  
      const destroyMinigame = () => {
        key.destroy();
        end();
      };
      textbox(game, ["Looks like you're already full of skill, finding an object so soon!", "Use your mouse and click on the item to grab it into your inventory.", "Come on, try it out!"]);
      key.on("pointerdown", () => {
        key.x = innerWidth / 3.1;
        key.y = innerHeight / 3;
        key.setDisplaySize(40, 40);
        key.ignoreDestroy = true;
        key.setScrollFactor(0);
        status.inventory = "Key";
        key.disableInteractive();
        textbox(game, ["Good job!", "Now what to do with this...", "Hey, was that a lock on the door?"], destroyMinigame)
      });
    }
    textbox(game, ["Congrats!\nYou managed to interact with the shelves!", "Now, had this been a real level you would either have been presented a description of the shelves or a problem to solve.", "Perhaps, you might even have found an object on those shelves... Hey! Look at that!"], dispKey);
  }
}

const minigameDoor = (game, end) => {

  const destroyMinigame = () => {
    keylock.destroy();
    end();
  };

  game.load.image("keylock", gameAssets.keylockImg);

  var keylock = game.add
      .image(
        game.cameras.main.scrollX + innerWidth / 2.1,
        game.cameras.main.scrollY + innerHeight / 2.3,
        "keylock"
      )
      .setDepth(4);
    keylock.setDisplaySize(
      (innerWidth + innerHeight) / 16,
      (innerWidth + innerHeight) / 16
    );

  if (status.inventory == "Key") {
    textbox(game, ["You took my clue like a champ!", "Looks like I don't have much left to teach you...", "Don't get too full of yourself! You still don't know you have to click on the key to interact with this lock!"]);
    key.setInteractive();
    key.on("pointerdown", () => {
      key.ignoreDestroy = false;
      key.destroy();
      keylock.destroy();
      status.inventory = "none";
      status.library = "Unlocked";
      key.disableInteractive();
      textbox(game, ["Alright you're good, I'll give you that.", "Be careful however, sometimes your inventory can't interact with the item in front of you and clicking away will yield no results!", "Ah, and before you go, sometimes you'll have to press other keys, however those are relative to the mysteries so you'll have to find out by yourself!"], destroyMinigame);
    });
  } else if (status.library == "Unlocked" || status.library == "end") {
    keylock.setVisible(false)
    textbox(game, ["There's nothing beyond this", "Only one way to leave tutorial..."], destroyMinigame);
    status.library = "end";
  } else {
    textbox(game, ["A lock.", "Nothing interesting here.", "...", "I swear!", "...", "Just move on already okay?"], destroyMinigame)
  }
  
}

const endingInstructions = (game, end) => {
  textbox(game, ["You didn't see that coming, uh?", "It's as you've seen: you've got a timer so complete the levels before it reaches 0...\nIf you can!"], end)
}

export {
  beginningInstructions,
  minigameShelves,
  minigameDoor,
  endingInstructions,
};

