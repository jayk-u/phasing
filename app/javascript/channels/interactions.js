import { status } from "../scenes/play"
// var redBtn
var next;

const gameAssets = document.getElementById("game-assets").dataset;

const minigameDoor = (game, end) => {

  const destroyMinigame = () => {
    keylock.destroy();
    end();
  }

  game.load.image("keylock", gameAssets.keylockImg);
  if (status.computerStatus == "Unlocked") {
    textbox(game, ["It's open!", "Let's go!"]);
    game.cameras.main.fadeOut(4000, 255, 255, 255);
    game.cameras.main.once("camerafadeoutcomplete", (camera) => {
      var graph = game.add.graphics()
      graph.fillStyle(0)
      graph.fillRect(0,0, 10000, 10000)
      game.cameras.main.fadeIn(4000, 255, 255, 255)
      var winscreen = game.add.image(game.cameras.main.scrollX + innerWidth/2.35, game.cameras.main.scrollY + innerHeight/2.6, 'winscreen').setOrigin(0,0);
      winscreen.setDisplaySize((innerWidth+innerHeight)/12, (innerWidth+innerHeight)/10.5);
    })
  } else if (status.inventory == "Key") {
    var keylock = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "keylock").setDepth(4);
    keylock.setDisplaySize((innerWidth+innerHeight)/16, (innerWidth+innerHeight)/16);
    textbox(game, ["The key doesn't seem to fit..."], destroyMinigame);
  } else {
    var keylock = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "keylock").setDepth(4);
    keylock.setDisplaySize((innerWidth+innerHeight)/16, (innerWidth+innerHeight)/16);
    textbox(game, ["A door.", "It's locked..."], destroyMinigame);
  }
}

const minigameTV = (game, end) => {

  if (endStatus === "true") {destroyMinigame()}

  const destroyMinigame = () => {
    text.destroy();
    mask.destroy();
    graphics.destroy();
    tv.destroy();
    end();
  }

  var content = [ "Good evening, officer. It took you more time than I thought to find me.",
  "You won't have enough time to figure this out so let me help you: there's absolutely nothing in this place you could use against me.",
  "I would suggest you to find a way to leave this place as soon as you can.",
  "Otherwise, I suppose I already have my next victim.",
]

    game.load.image("tv", gameAssets.tvImg);
    var tv = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, 'tv').setDisplaySize((innerWidth+innerHeight)/8, (innerWidth+innerHeight)/12);

    var graphics = game.make.graphics();

    graphics.fillRect(game.cameras.main.scrollX + innerWidth/2.4, game.cameras.main.scrollY + innerHeight/2.6, (innerWidth+innerHeight)/13, (innerWidth+innerHeight)/26);

    var mask = new Phaser.Display.Masks.GeometryMask(game, graphics);

    var text = game.add.text(game.cameras.main.scrollX + innerWidth/2.4, game.cameras.main.scrollY + innerHeight/2.6, content, { fontFamily: 'Arial', color: '#FFFFFF', font: "12px", wordWrap: { width: 100 } }).setOrigin(0);

    text.setMask(mask);

    game.input.keyboard.on('keydown-UP', (event) => {
      text.y += -10;
      text.y = Phaser.Math.Clamp(text.y, -400, 300)
    });

    game.input.keyboard.on('keydown-DOWN', (event) => {
      text.y += 10;
      text.y = Phaser.Math.Clamp(text.y, -400, 300)
    });

    textbox(game, ["There's something displayed on the screen...",
    "Looks like a message... to me?"], destroyMinigame)

}

const minigameFreezer = (game, end) => {
  textbox(game, ["Fridge full of packed meat. And nothing else."], end)
}

const minigameRoomLibrary = (game, end) => {
  if (status.library != "Unlocked") {
    const destroyMinigame = () => {
      keylock.destroy();
      end();
    }

    game.load.image("keylock", gameAssets.keylockImg);

    var keylock = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "keylock").setDepth(4);
    keylock.setDisplaySize((innerWidth+innerHeight)/16, (innerWidth+innerHeight)/16)
    keylock.setInteractive();

    if (status.inventory && status.inventory != "" && status.inventory != "none") {
      textbox(game, ["I need the right tools..."], destroyMinigame)
      key.on('pointerdown', () => {
        key.ignoreDestroy = false;
        key.destroy();
        keylock.destroy();
        textbox(game, ["Yes!"], destroyMinigame);
        status.inventory = "none";
        status.library = "Unlocked";
    });
    } else {
      textbox(game,
        ["This bookshelf has smoked glassdoors, I can't see the books behind.",
        "There's a small lock there, I need a key to open it."
      ], destroyMinigame)

    }
  } else {
    textbox(game, [
      'French comics here. I think they call these "band dessin" or something like this.',
      "Tintin... what a weird name... ",
      "Hey, that one with the two weirdos with a funny moustache and the small dog looks fun!",
    ], end)
  }
}

const minigameHallway = (game, end) => {
  textbox(game, ["Many, many shoes. Even some for women. This makes no sense, he lives alone.",
  "... maybe from his victims."], end)
}

const minigameKettle = (game, end) => {
  textbox(game, [
    "The kettle is still hot, he was preparing some tea.",
    "But why two cups?",
  ], end)
}

const minigameMicrowave = (game, end) => {
  textbox(game, ["Empty."], end)
}

const minigameSink = (game, end) => {
  game.load.image("ring", gameAssets.ringImg);

  const destroyMinigame = () => {
    ring.destroy();
    end();
  }

  if (status.inventory == "Ring") {
    textbox(game, ["My precious..."], end)
  } else {
    ring = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "ring").setDepth(4);
    ring.setDisplaySize((innerWidth+innerHeight)/18, (innerWidth+innerHeight)/18)
    ring.setInteractive();
    if (status.inventory && status.inventory != "" && status.inventory != "none") {
      textbox(game, [
        "The sink is full of clean plates.",
        "Wait, is that... a ring? He must have dropped it while doing the dishes... ",
        "My hands are full right now, I'll come back later.",
      ], destroyMinigame)
    } else if (status.inventory == "Ring") {
      textbox(game, ["My precious..."], end)
    } else {
      textbox(game, [
        "The sink is full of clean plates.",
        "Wait, is that... a ring? He must have dropped it while doing the dishes...",
      ], destroyMinigame)

      ring.on('pointerdown', () => {
        ring.x = innerWidth/3.1;
        ring.y = innerHeight/3;
        ring.setDisplaySize(40,40)
        ring.ignoreDestroy = true;
        ring.setScrollFactor(0)
        status.inventory = "Ring"
      });
    }
  }

}

const minigameBonsai = (game, end) => {
  game.load.image("redBtn", gameAssets.redbtnImg);
  var redBtnText;
  var redBtn;
  var btn;
  const destroyMinigame = () => {
    redBtn.destroy();
    redBtnText.destroy();
    // tbox.destroy();
    end();
  }

  if (status.computerStatus == "On") {
    textbox(game, ["This sounded like something booting up!"], end)
  } else if (status.inventory == "Ring") {
    textbox(game, ["This bonsai is in fantastic shape. He probably spent hours working on it.", "There's a hole at the bottom, it's ring shaped."])
    ring.on("pointerdown", () => {
      ring.ignoreDestroy = false
      ring.destroy()
      status.inventory = "";
      btn = "red"
      redBtn = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "redBtn").setDepth(4);
      redBtnText = game.add.text(game.cameras.main.scrollX + innerWidth/2.22, game.cameras.main.scrollY + innerHeight/2.5, "Don't press ENTER!", {color: '#000000', font: "11.5px", wordWrap: {width: (innerWidth)/19, height: (innerHeight)/5 }}).setDepth(4);
    })
    let increment = 0;
    game.input.keyboard.on("keydown-SPACE", () => {
      if (btn == "red") {
        if (increment < 2) {
          textbox(game, [
            ["The ring fits perfectly!"],
            ["A small hidden door opened on the bottom of the altar, with a big red button in there." ]
          ][increment])
        }
        increment += 1;
        game.input.keyboard.on("keydown-ENTER", () => {
          if (status.computerStatus != "On" && status.computerStatus != "Unlocked") {
            status.computerStatus = "On"
            textbox(game, [ "*click*",
            "I can hear a small whir close to me.",
            ], destroyMinigame)
          }
        })
      }
    })
  } else {
    textbox(game, ["This bonsai is in fantastic shape. He probably spent hours working on it.", "There's a hole at the bottom, it's ring shaped."], end)
  }
}

const minigameKitchenTree = (game, end) => {
  textbox(game, ["This plant has known brighter days."], end)
}

const minigameSofa = (game, end) => {
  textbox(game, ["I don't think this is the right time for a break."], end)
}

const minigameBathPlant = (game, end) => {
  textbox(game, ["That one too needs to be watered."], end)
}

const minigameWindbreak = (game, end) => {
  textbox(game, ["A weird way to get some privacy."], end)
}

const minigameCattree = (game, end) => {

  game.load.image("key", gameAssets.keyImg);

  const destroyMinigame = () => {
    key.destroy();
    end();
  }

  if (status.inventory == "Key") {
    textbox(game, ["I already got the key.", "Let's hurry!"], end)
  } else if (status.inventory && status.inventory != "") {
    key = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "key").setDepth(4);
    key.setDisplaySize((innerWidth+innerHeight)/18, (innerWidth+innerHeight)/18)
    textbox(game, ["I can't carry anything else..."], destroyMinigame)
  } else {
    textbox(game, [
      "A huge cat tree lies in the middle of the room. But I haven't seen any cat around or any sign of one living here.",
      "Wait... there's something in there. A small golden key!"
    ], destroyMinigame)

    key = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "key")
    key.setDisplaySize((innerWidth+innerHeight)/18, (innerWidth+innerHeight)/18)
    key.setInteractive();

    key.on('pointerdown', () => {
      key.x = innerWidth/3.1;
      key.y = innerHeight/3;
      key.setDisplaySize(40,40);
      key.ignoreDestroy = true;
      key.setScrollFactor(0);
      status.inventory = "Key";
  });
  }
}

const minigameLivingLibrary = (game, end) => {
  textbox(game, [
    "Only medical related books here.",
    "But according to my investigation so far, this guy never worked in this field. ",
    "He's a very simple office worker.",
  ], end)
}

const minigameComputer = (game, end) => {
  game.load.image("computer", gameAssets.computerImg);
  
  const destroyMinigame = () => {
    if (inputText) {inputText.visible = false;}
    computer.destroy();
    end();
  }
  var computer = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, 'computer').setDisplaySize((innerWidth+innerHeight)/10, (innerWidth+innerHeight)/10).setDepth(4);

  if (status.computerStatus == "Unlocked") { textbox(game, ["The computer is unlocked.", "I need to hurry!"], destroyMinigame) }
  else if (status.computerStatus == "On") {
    textbox(game, [
      "Locked by a password.",
      "But I can still see the wallpaper: it looks like an old drunk sailor and a small white dog.",
      ])
    var input = "Enter password: "
    var inputText = game.add.text(game.cameras.main.scrollX + innerWidth/2.22, game.cameras.main.scrollY + innerHeight/2.5, input, {color: '#FFFFFF', font: "11.5px", wordWrap: {width: (innerWidth)/19, height: (innerHeight)/5 }}).setDepth(4);
    game.input.keyboard.on("keyup", (event) => {
      if (next.scene != game.scene.scene) {
        if ((input != "Enter password: " || event.key != "e") && (event.keyCode <= 90 && event.keyCode >= 65)  || event.key == "Backspace" ) {
          if (event.key == "Backspace") {
            input = "Enter password: "
          } else if (input.length > 23) {
            input = "Enter password: ERROR"
            inputText.setTint(0xFF6666, 0xFF4019, 0xB30000, 0xE60000)
            game.input.keyboard.once("keydown-SPACE", () => {
              destroyMinigame();
            })
          } else {
            input = input.concat(event.key.toUpperCase())
          }
          inputText.setText(input)
          if (input == "Enter password: TINTIN") {
            status.computerStatus = "Unlocked"
            inputText.setTint(0x88CC00, 0x00FF2A, 0x66FF19, 0x80FF66)
            textbox(game, [
              "Found it! There's only one icon on the desktop...",
              '"Main control lock", this must be the thing! Quick!',
            ], destroyMinigame)
          }
        }
      }
    })
  } else {
    textbox(game, ["It's off. Pressing the power button doesn't do anything."], destroyMinigame)
  }
}

const minigameAltar = (game, end) => {
  if (status.inventory = "Ring") {
    textbox(game, [
      "The ring fits perfectly!",
      "A small hidden door opened on the bottom of the altar, with a big red button in there.",
      "*click*",
      "I can hear a small whir close to me.",
    ], end)
  } else {
    (textbox(game, [
      "A small shrine to honor the ancients.",
      "There's a hole at the bottom, it's ring shaped.",
    ], end))
  }
}

const minigameFish = (game, end) => {
  textbox(game, [
    "There's a small fish in there. He even has a castle to sleep in.",
    "Looks like he gets a better paycheck than me. I won't call my place a castle.",
  ], end)
}

const minigameBathsink = (game, end) => {
  textbox(game, [
    "This part of the appartment is really, really clean. Compared to the other rooms which are a bit dusty.",
    "This is unexpected.",
  ], end)
}

const minigameBathtub = (game, end) => {
  textbox(game, [
    "The bathtub is absolutely huge, compared to the rest of the furniture. Two people could easily fit.",
    "It's not as well-maintained as the rest of the bathroom, there are some marks on the sides...",
    "... oh GOD, THIS IS BLOOD!",
  ], end)
}

const minigameSaber = (game, end) => {
  textbox(game, [
    "Old japanese katanas, they look really expensive. ",
    "The table below has a locked drawer... There's something written on one of the blades.",
    '"Pay respect to the oldest."',
  ], end)
}

const textbox = (game, string, destroy) => {
  var content = string
  var border = game.add.graphics();
  var textBoxCounter = 0
  

  border.fillStyle(0xFFFFFF);
  border.fillRect(game.cameras.main.scrollX + (innerWidth/3.27 - 3.0), game.cameras.main.scrollY + (innerHeight/1.67 - 3.0), innerWidth/2.68 + 6.0, innerHeight/15.08 + 6.0);

  var graphics = game.add.graphics();

  graphics.fillStyle(0x000000);
  graphics.fillRect(game.cameras.main.scrollX + innerWidth/3.27, game.cameras.main.scrollY + innerHeight/1.67, innerWidth/2.68, innerHeight/15.08);
  var text = game.add.text(game.cameras.main.scrollX + innerWidth/3.275 + 6, game.cameras.main.scrollY + innerHeight/1.675 + 6, string[0], {color: '#FFFFFF', font: "12px", wordWrap: {width: innerWidth/2.69, height: 40 }})
  if (string.length != 1) {next = game.add.text(game.cameras.main.scrollX + innerWidth/1.505, game.cameras.main.scrollY + innerHeight/1.54, "...", {color: '#FFFFFF', font: "6px"} )}

  const incrementCounter = () => {
    textBoxCounter += 1
    if (textBoxCounter == string.length - 1) {
      next.destroy();
    }
    if (string.length > textBoxCounter) {
      text.setText(string[textBoxCounter])
    } else {
      graphics.destroy();
      border.destroy();
      text.destroy();
      if (next) {next.destroy()}
      if (destroy) {destroy()};
      game.input.keyboard.off("keydown-SPACE", incrementCounter)
    }
  }
  game.input.keyboard.on("keydown-SPACE", incrementCounter)
}

export { minigameSofa, minigameKitchenTree, minigameBathPlant, minigameWindbreak, minigameBathtub, minigameBathsink, minigameAltar, minigameBonsai, minigameCattree, minigameComputer, minigameSink, minigameRoomLibrary, minigameKettle, minigameFish, minigameHallway, minigameMicrowave, minigameLivingLibrary, minigameSaber, minigameDoor, minigameTV, minigameFreezer }
