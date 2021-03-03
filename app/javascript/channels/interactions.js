var inventory
var ring
const gameAssets = document.getElementById("game-assets").dataset;
const minigameKey = (game) => {

  if (inventory == "Key") {
    textbox(game, ["I already got the key.", "Let's hurry!"])
  } else if (inventory && inventory != "") {
    textbox(game, ["I can't carry anything else..."])
  } else {
    game.load.image("key", gameAssets.keyImg);
  
    var key = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "key")
    key.setDisplaySize((innerWidth+innerHeight)/18, (innerWidth+innerHeight)/18)
    key.setInteractive();
  
    key.on('pointerdown', () => {
      key.x = innerWidth/3.1;
      key.y = innerHeight/3;
      key.setDisplaySize(40,40)
      key.ignoreDestroy = true
      key.setScrollFactor(0)
      inventory = "Key"
  });
  
    textbox(game, ["This looks like a key.", "Could it be...?"])
  
    game.input.keyboard.on("keydown-ESC", () => {
      key.destroy();
    })
  }
  }

  const minigameDoor = (game) => {
    // game.scene.pause();
      game.load.image("keylock", gameAssets.keylockImg);
      game.load.image("key", gameAssets.keyImg);
  
    if (inventory && inventory != "" && inventory != "none") {
      textbox(game, ["A door.", "I need the right tools..."])
      key.on('pointerdown', () => {
        key.destroy();
        keylock.destroy();
        textbox(game, "Yes!")
        inventory = "none"
    });
    } else {
      textbox(game, ["The door is locked.", "I can't make it move."])
    
      var keylock = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "keylock")
      keylock.setDisplaySize((innerWidth+innerHeight)/16, (innerWidth+innerHeight)/16)
      keylock.setInteractive();
    
      game.input.keyboard.on("keydown-ESC", () => {
        keylock.destroy();
      })
    }
    }

const minigameTV = (game) => {
  textbox(game, ["There's something displayed on the screen, looks like a message... to me?"])

  var content = [ "Good evening, officer. It took you more time than I thought to find me.",
  "You won't have enough time to figure this out so let me help you: there's absolutely nothing in this place you could use against me.",
  "I would suggest you to find a way to leave this place as soon as you can.",
  "Otherwise, I suppose I already have my next victim.",
]

    game.load.image("tv", gameAssets.tvImg);
    var tv = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, 'tv').setDisplaySize((innerWidth+innerHeight)/8, (innerWidth+innerHeight)/12);

    var graphics = game.make.graphics();

    graphics.fillRect(game.cameras.main.scrollX + innerWidth/2.45, game.cameras.main.scrollY + innerHeight/2.5, (innerWidth+innerHeight)/13, (innerWidth+innerHeight)/26);

    var mask = new Phaser.Display.Masks.GeometryMask(game, graphics);

    var text = game.add.text(game.cameras.main.scrollX + innerWidth/2.45, game.cameras.main.scrollY + innerHeight/2.5, content, { fontFamily: 'Arial', color: '#FFFFFF', font: "12px", wordWrap: { width: 100 } }).setOrigin(0);

    text.setMask(mask);

    game.input.keyboard.on('keydown-UP', (event) => {
      text.y += -10;
      text.y = Phaser.Math.Clamp(text.y, -400, 300)
    });

    game.input.keyboard.on('keydown-DOWN', (event) => {
      text.y += 10;
      text.y = Phaser.Math.Clamp(text.y, -400, 300)
    });

    game.input.keyboard.on("keydown-ESC", () => {
      text.destroy();
      mask.destroy();
      graphics.destroy();
      tv.destroy();
    })
}

const minigameFreezer = (game) => {
  textbox(game, ["Fridge full of packed meat. And nothing else."])
}

const minigameRoomLibrary = (game) => {
  textbox(game, [
    'French comics here. I think they call these "band dessin" or something like this.',
    "Tintin... what a weird name... \nHey, that one with the two weirdos with a funny moustache and the small dog looks fun!",
  ])

}

const minigameHallway = (game) => {
  textbox(game, ["Many, many shoes. Even some for women. This makes no sense, he lives alone.",
  "... maybe from his victims."])
}

const minigameKettle = (game) => {
  textbox(game, [
    "The kettle is still hot, he was preparing some tea.",
    "But why two cups?",
  ])
}

const minigameMicrowave = (game) => {
  textbox(game, ["Empty."])
}

const minigameSink = (game) => {
  game.load.image("ring", gameAssets.ringImg);

  if (inventory == "Ring") {
    textbox(game, ["My precious..."])
  } else {
    ring = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "ring")
    ring.setDisplaySize((innerWidth+innerHeight)/18, (innerWidth+innerHeight)/18)
    ring.setInteractive();
  
    if (inventory && inventory != "" && inventory != "none") {
      textbox(game, [
        "The sink is full of clean plates.",
        "Wait, is that... a ring? He must have dropped it while doing the dishes... \nMy hands are full right now, I'll come back later.",
      ])
    } else if (inventory == "Ring") {
      textbox(game, ["My precious..."])
    } else {
      textbox(game, [
        "The sink is full of clean plates.",
        "Wait, is that... a ring? He must have dropped it while doing the dishes...",
      ])
      
      ring.on('pointerdown', () => {
        ring.x = innerWidth/3.1;
        ring.y = innerHeight/3;
        ring.setDisplaySize(40,40)
        ring.ignoreDestroy = true
        ring.setScrollFactor(0)
        inventory = "Ring"
      });
    }
    game.input.keyboard.on("keydown-ESC", () => {
      ring.destroy();
    })
  }

}

const minigameBonsai = (game) => {
  game.load.image("redBtn", gameAssets.redBtnImg);

  textbox(game, ["This bonsai is in fantastic shape. He probably spent hours working on it.", "There's a hole at the bottom, it's ring shaped."])
  ring.input.on("pointerdown", () => {
    ring.ignoreDestroy = false
    ring.destroy()
    inventory = "none"
    textbox(game, [
      "The ring fits perfectly!",
      "A small hidden door opened on the bottom of the altar, with a big red button in there."
    ])
    var redBtn = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, "redBtn")
    redBtn.input.on("pointerdown", () => {
      computerStatus = "On"
      textbox(game, [ "*click*",
      "I can hear a small whir close to me.",
      ])
    })
  })
  
}

const minigameKitchenTree = (game) => {
  textbox(game, ["This plant knew brighter days."] )
}

const minigameSofa = (game) => {
  textbox(game, ["I don't think this is the right time for a break."])
}

const minigameBathPlant = (game) => {
  textbox(game, ["That one too needs to be watered."])
}

const minigameWindbreak = (game) => {
  textbox(game, ["A weird way to get some privacy."])
}

const minigameCattree = (game) => {
  textbox(game, [
    "A huge cat tree lies in the middle of the room. But I haven't seen any cat around or any sign of one living here.",
  ])
}

const minigameLivingLibrary = (game) => {
  textbox(game, [
    "Only medical related books here.",
    "But according to my investigation so far, this guy never worked in this field. \nHe's a very simple office worker.",
  ])
}

const minigameComputer = (game) => {
  game.load.image("computer", gameAssets.computerImg);
  var computer = game.add.image(game.cameras.main.scrollX + innerWidth/2.1, game.cameras.main.scrollY + innerHeight/2.3, 'computer').setDisplaySize((innerWidth+innerHeight)/10, (innerWidth+innerHeight)/10);
  var computerStatus

  if (computerStatus == "Unlocked") { textbox(game, ["The computer is unlocked.", "I need to hurry!"]) }
  else if (computerStatus == "On") {
    textbox(game, [
      "Locked by a password.",
      "But I can still see the wallpaper: it looks like an old drunk sailor and a small white dog.",
      ])
    var input = "Enter password: "
    var inputText = game.add.text(game.cameras.main.scrollX + innerWidth/2.22, game.cameras.main.scrollY + innerHeight/2.5, input, {color: '#FFFFFF', font: "11.5px", wordWrap: {width: (innerWidth)/19, height: (innerHeight)/5 }})
    game.input.keyboard.on("keyup", (event) => {
      if ((input != "Enter password: " || event.key != "e") && (event.keyCode <= 90 && event.keyCode >= 65)  || event.key == "Backspace" ) {
        if (event.key == "Backspace") {
          input = "Enter password: "
        } else if (input.length > 23) {
          input = "Enter password: ERROR"
          inputText.setTint(0xFF6666, 0xFF4019, 0xB30000, 0xE60000)
        } else {
          input = input.concat(event.key.toUpperCase())
        }
        inputText.setText(input)
        if (input == "Enter password: TINTIN") {
          computerStatus = "Unlocked"
          inputText.setTint(0x88CC00, 0x00FF2A, 0x66FF19, 0x80FF66)
          textbox(game, [
            "Found it! There's only one icon on the desktop...",
            '"Main control lock", this must be the thing! Quick!',
          ])
        }
      }
    })
  } else {
    textbox(game, ["It's off. Pressing the power button doesn't do anything."])
  }
  game.input.keyboard.on("keydown-ESC", () => {
    inputText.visible = false;
    computer.destroy();
  })
}

const minigameAltar = (game) => {
  if (inventory = "Ring") {
    textbox(game, [
      "The ring fits perfectly! \nA small hidden door opened on the bottom of the altar, with a big red button in there.",
      "*click*\nI can hear a small whir close to me.",
    ])
  } else {
    (textbox(game, [
      "A small shrine to honor the ancients.",
      "There's a hole at the bottom, it's ring shaped.",
    ]))
  }
}

const minigameFish = (game) => {
  textbox(game, [
    "There's a small fish in there. He even has a castle to sleep in.",
    "Looks like he gets a better paycheck than me. I won't call my place a castle.",
  ])
}

const minigameBathsink = (game) => {
  textbox(game, [
    "This part of the appartment is really, really clean. Compared to the other rooms which are a bit dusty.",
    "This is unexpected.",
  ])
}

const minigameBathtub = (game) => {
  textbox(game, [
    "The bathtub is absolutely huge, compared to the rest of the furniture. Two people could easily fit. \nIt's not as well-maintained as the rest of the bathroom, there are some marks on the sides...",
    "... oh GOD, THIS IS BLOOD!",
  ])
}

const minigameSaber = (game) => {
  textbox(game, [
    "Old japanese katanas, they look really expensive. \nThe table below has a locked drawer... There's something written on one of the blades.",
    '"Pay respect to the oldest."',
  ])
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

  game.input.keyboard.on("keydown-ESC", () => {
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
  var text = game.add.text(game.cameras.main.scrollX + innerWidth/3.275 + 6, game.cameras.main.scrollY + innerHeight/1.675 + 6, string[0], {color: '#FFFFFF', font: "12px", wordWrap: {width: innerWidth/2.65, height: 40 }})

  if (string.length > 1) {
    game.input.keyboard.on("keydown-ENTER", () => {
      text.setText(string[1])
    })
  }

  game.input.keyboard.on("keydown-ESC", () => {
    graphics.destroy();
    border.destroy();
    text.destroy();
  })
}

export {minigameSofa, minigameKitchenTree, minigameBathPlant, minigameWindbreak, minigameKey, minigameBathtub, minigameBathsink, minigameAltar, minigameBonsai, minigameCattree, minigameComputer, minigameSink, minigameRoomLibrary, minigameKettle, minigameFish, minigameHallway, minigameMicrowave, minigameLivingLibrary, minigameSaber, minigameDoor, minigameTV, minigameFreezer }
