import { status } from "../scenes/play2";
import { textbox } from '../components/textBox';
import { character, upBridge, downBridge } from "../scenes/play2";

var key;
var next;
var electricity;
var generator;
var map;
var fuel;
var containers;
var containerNumber;

const minigameMap = (game, end) => {
  // 125x 850y
  const destroyMinigame = () => {
    map.destroy();
    end();
  }
  map = game.add.image(game.cameras.main.scrollX + innerWidth / 2, game.cameras.main.scrollY + innerHeight / 2.3, "clueMap").setDisplaySize(innerWidth/3, innerHeight/2).setDepth(6).setInteractive();
  textbox(game, ["A map of the docks.", "Perhaps I should study this carefully...", "...", "Who am I kidding?", "I didn't become a criminal to study."], destroyMinigame);
  

  var graphics = game.make.graphics();

  graphics.fillRect(
    game.cameras.main.scrollX + innerWidth / 3.2,
    game.cameras.main.scrollY + innerHeight / 2.8,
    innerWidth / 1.5,
    innerHeight / 5
  );

  var mask = new Phaser.Display.Masks.GeometryMask(game, graphics);

  map.setMask(mask)
  
  game.input.keyboard.on("keydown-UP", () => {
    map.y += 20;
    map.y = Phaser.Math.Clamp(map.y, 700, 950);
  });

  game.input.keyboard.on("keydown-DOWN", () => {
    map.y += -20;
    map.y = Phaser.Math.Clamp(map.y, 700, 950);
  });
}

const minigameWareHouse = (game, end) => {
  textbox(game, ["Hola Chica"], end);
}
const minigameRoofLadder = (game, end) => {
  // 300x 615y

  const fade = () => {
    game.cameras.main.fadeOut(1000)
    game.cameras.main.once("camerafadeoutcomplete", () => {
      if (character.x <= 285) {
        character.setPosition(310, 615);
        game.rooftopUpperWalls.setDepth(2);
        game.physics.world.colliders.add(status.bridgeCollision);
        game.physics.world.removeCollider(status.hiddenCollision);
      } else {
        character.setPosition(270, 615);
        game.rooftopUpperWalls.setDepth(0);
        game.physics.world.removeCollider(status.bridgeCollision);
        if (!status.hiddenCollision) status.hiddenCollision = game.physics.add.collider(game.hiddenWalls, character);
        else game.physics.world.colliders.add(status.hiddenCollision);
      }
        
      game.cameras.main.fadeIn(1000);
      game.cameras.main.once("camerafadeincomplete", () => {
        if (status.roofLadderCount === 2) {textbox(game, ["For the record, people are usually very impressed with my parkouring skills."], end)}
        else if (status.roofLadderCount === 3) {textbox(game, ["I almost wish those policemen saw me."], end)}
      });
    });
  }

  if (status.roofLadderCount === 0) {
    textbox(game, ["A ladder.", "I don't have time to go parkouring.", "Fucking policemen."], end);
    status.roofLadderCount ++;
  } else if (status.roofLadderCount === 1) {
    textbox(game, ["I swear I don't have time!"], end);
    status.roofLadderCount ++;
  } else if (status.roofLadderCount === 2) {
    textbox(game, ["...Alright, if anyone asks, I'm on duty."], fade)
    status.roofLadderCount ++;
  } else if (status.roofLadderCount === 3) {
    textbox(game, ["It's parkour time!"], fade)
  };
};

const minigamePillar = (game, end) => {
  // 525x 555y
  textbox(game, ["This reminds me of the time I light-burned that guy's retina...", "...", "Those were the days."], end);
}

const minigameStreetPlants = (game, end) => {
  // 580x 555y && 715x 555y && 530x 650y && 50x 875y && 683x 875y

  const destroyMinigame = () => {
    note.destroy()
    noteText.destroy()
    end();
  }

  if (character.x <= 80) {
    var note = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "note").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(5);
    var noteText = game.add.text(
      game.cameras.main.scrollX + innerWidth / 2.3,
      game.cameras.main.scrollY + innerHeight / 2.85,
      "Hey.\nRound - Diamond - Pentagon - Square - Explosion.\nIf you're half as good as you're made to be, you'll understand.",
      {
        fontFamily: "Arial",
        color: "#000000",
        font: "11px",
        wordWrap: { width: 110 },
      }
    )
    .setOrigin(0)
    .setDepth(6);
    if (!status.read) {textbox(game, ["That's something else alright.", "Who...?", "Nevermind, I've got to get my game face on.", "It would hurt me to disappoint a fan."], destroyMinigame), status.read = true;}
    else textbox(game, ["What kind of code is this..."], destroyMinigame);
  } else {
    textbox(game, ["This plant has known brighter nights."], end);
  }
}

const minigameRamenDoor = (game, end) => {
  // 622x 495y
  textbox(game, ["I'm hungry."], end);
}

const minigameOfficeDoor = (game, end) => {
  //750x 495y
  textbox(game, ["I'm no mere thief.", "I won't go in breaking pots for currency.", "What kind of madman would do that anyways?"], end);
}

const minigameLightPillar = (game, end) => {
  // 270x 875y
  textbox(game, ["It's bright.", "But not as bright as me."], end);
}

const minigameTourismDoor = (game, end) => {
  // 210x 845y
  textbox(game, ["Knock knock.", `"Who's there?"`, "Police.", '"Police who?"', "Police force's Kyoto department open up you're under arrest!", "...", "Would have worked on me."], end);
}

const minigameSupermarketDoor = (game, end) => {
  // 545x 875y
  textbox(game, ["Maybe I should buy some snacks?"], end);
}

const minigameBuildingDoor = (game, end) => {
  // 715x 845y
  textbox(game, ["It's locked.", "...", "I had to make sure."], end);
}

const minigameDocksLadder = (game, end) => {
  // 750x 975y
  const fade = () => {
    game.cameras.main.fadeOut(1000)
    game.cameras.main.once("camerafadeoutcomplete", () => {
      character.y <= 940? (character.setPosition(755, 980), game.docksTop.setDepth(0), game.ladderTop.setDepth(0)) : (character.setPosition(755, 930), game.docksTop.setDepth(2), game.ladderTop.setDepth(2));
      game.cameras.main.fadeIn(1000);
      game.cameras.main.once("camerafadeincomplete", () => {
        textbox(game, ["Parkour!"], end)
      });
    });
  }
  textbox(game, ["I'm not touching this.", "Even criminals have pride.", "...", "Who am I kidding?"], fade);
}

const minigameContainer = (game, end) => {
  // 655x 990y
  var i = 0;

  const pointFuel = () => {
    fuel.x = innerWidth / 3.15;
    fuel.y = innerHeight / 3;
    fuel.setDisplaySize(40, 40);
    fuel.ignoreDestroy = true;
    fuel.setScrollFactor(0);
    status.inventory = "Fuel";
  }

  const destroyMinigame = () => {
    if (game.active === false) {
      while (containers.getChildren()[0]) containers.getChildren()[0].destroy()
      game.input.keyboard.off('keydown-RIGHT')
      game.input.keyboard.off('keydown-LEFT')
      game.input.keyboard.off('keydown-DOWN')
      game.input.keyboard.off('keydown-UP')
      game.input.keyboard.off('keydown-ENTER')
      if (fuel) fuel.off("pointerdown", pointFuel), fuel.destroy();
      end();
    }
  }
  containerNumber = 0;
  containers = game.add.group({ key: 'container', repeat: 25, setScale: { x: 0.09, y: 0.07 }, setDepth: {value: 5 } });
  Phaser.Actions.GridAlign(containers.getChildren(), {
    width: 5,
    height: 5,
    cellWidth: 47,
    cellHeight: 45.2,
    x: game.cameras.main.scrollX + innerWidth / 3.6,
    y: game.cameras.main.scrollY - innerHeight / 14,
  });
  containers.getChildren()[0].setScale(0.1, 0.08).setDepth(6)
  var tween = game.tweens.add({
    targets: containers.getChildren()[containerNumber],
    scaleX: 0.12,
    scaleY: 0.1,
    ease: 'Sine.easeInOut',
    duration: 300,
    delay: i * 50,
    repeat: -1,
    yoyo: true
    });

  i++;

  if (i % 12 === 0) i = 0;
  
  const zoomMove = (cases) => {
    tween.remove();
    i = 0;
    containers.getChildren()[containerNumber].setScale(0.09, 0.07).setDepth(5);
    containerNumber += cases
    if (containerNumber > 24 || containerNumber < 0) containerNumber -=5*cases
    containers.getChildren()[containerNumber].setScale(0.1, 0.08).setDepth(6);
    tween = game.tweens.add({
      targets: containers.getChildren()[containerNumber],
      scaleX: 0.12,
      scaleY: 0.1,
      ease: 'Sine.easeInOut',
      duration: 300,
      delay: i * 50,
      repeat: -1,
      yoyo: true
    })

    i++;

    if (i % 12 === 0) i = 0;
  };
  
  game.input.keyboard.on('keydown-RIGHT', () => {zoomMove(1)})
  game.input.keyboard.on('keydown-LEFT', () => {zoomMove(-1)})
  game.input.keyboard.on('keydown-DOWN', () => {zoomMove(5)})
  game.input.keyboard.on('keydown-UP', () => {zoomMove(-5)})
  game.input.keyboard.on('keydown-ENTER', () => {
    if (containerNumber == 13) {
      if (status.inventory === "Fuel") {textbox(game, ["I already completed this heist!"], destroyMinigame)}
      else {
        textbox(game, ["Looks like fuel.", "Reminds me of the good old days..."], destroyMinigame)
        if (status.inventory != "Fuel") fuel = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "fuel").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(6).setInteractive();
        fuel.on('pointerdown', pointFuel)
      }
    }
    else if (containerNumber == 3) {
      textbox(game, ["I wish my mother could see this.", "Those containers are so neatly stacked.", "Would have made up for all those times I did not clean my room."], destroyMinigame)
    }
    else if (containerNumber == 5) {
      textbox(game, ["I wonder if any docker forgot their lunch here.", "I'm hungry."], destroyMinigame)
    }
    else if (containerNumber == 10) {
      textbox(game, ["An hungry criminal is a dangerous criminal.", "Therefore, the state should collect criminal sustainment funds from the citizens.", "Safer streets, safer life.", "I would have made a great politician."], destroyMinigame)
    }
    else if (containerNumber == 17) {
      textbox(game, ["OH MY GOD WHAT IS THIS?!", "...", "Sike."], destroyMinigame)
    }
    else if (containerNumber == 24) {
      textbox(game, ["It's not empty.", "There's a note on the inside.", '"Your princess is in another castle."', "...", "Just kidding.", "It's empty."], destroyMinigame)
    }
    else textbox(game, ["It's empty."], destroyMinigame)
  })
  textbox(game, ["I wonder what's inside...?"], destroyMinigame);
}

const minigameStreetLamp = (game, end) => {
  //45x 995y && 275x 995y && 560x 995y && 720x 995y
  textbox(game, ["It's bright.", "I should probably avoid those.", "I don't have time to blind agents with my mad skills."], end);
}

const minigameBoat = (game, end) => {
  //115x 1000y
  const fadeIn = () => {
    game.cameras.main.fadeIn(1000);
  };
  const fadeOut = () => {
    game.cameras.main.fadeOut(1000);
  };
  const destroyMinigame = () => {
    if (!game.active) {end()}
  }
  if (status.inventory === "Fuel") {
    textbox(game, ["Time for some good old-fashioned fireworks!"], destroyMinigame)
    fuel.on("pointerdown", () => {
      fuel.ignoreDestroy = false;
      fuel.destroy();
      textbox(game, ["Yeeeeehaw!"], fadeOut)
      game.cameras.main.once("camerafadeoutcomplete", () => {
        game.redBoat.setVisible(false);
        var blackRect = game.add.rectangle(innerWidth/2, innerHeight/2, innerWidth/2, innerHeight/2, '#ff0000').setScrollFactor(0).setDepth(4);
        fadeIn();
        game.cameras.main.once("camerafadeincomplete", () => {
          textbox(game, ["BOOM!"], fadeOut, 5);
          game.cameras.main.once("camerafadeoutcomplete", () => {
            blackRect.destroy();
            character.setPosition(400, 1260).setVisible(false);
            fadeIn()
            game.cameras.main.once("camerafadeincomplete", () => {
              textbox(game, ["Hey! What was that?", "Let's check it out!"], fadeOut)
              game.cameras.main.once("camerafadeoutcomplete", () => {
                console.log(game.agent.rob)
                game.agent.rob.setVelocityY(-40).anims.play("up6");
                game.agent.tom.setPosition(340, 1240).anims.play("left6end").anims.stop();
                character.setPosition(115, 995).setVisible(true);
                fadeIn()
                game.cameras.main.once("camerafadeincomplete", () => {
                  textbox(game, ["Haha, boat goes BOOM!", "I love blowing things up.", "No time to lose though, let's get going!"], end)
                })
              })
            })
          })
        })
      })
    })
  } else {
    textbox(game, ["I wish I could boat-ride my way out of this.", "It'd probably make too much noise though...", "Would be funny.", "...At first."], end);
  }
}

const minigameManHole = (game, end) => {
  //120x 550y || 780x 890y
  const fade = () => {
    game.cameras.main.fadeOut(1000)
    game.cameras.main.once("camerafadeoutcomplete", () => {
      character.x <= 150 && character.x >= 100 ? (character.setPosition(780, 890), downBridge(game)) : (character.setPosition(120, 550), upBridge(game));
      game.cameras.main.fadeIn(1000);
      game.cameras.main.once("camerafadeincomplete", () => {
        if (status.manhole === "used") {
          textbox(game, ["Urgh, smells nasty."], end)
        } else {
          textbox(game, ["Where am I?", "Ah, still inside the lockdown...", "Can't blame a man for hoping."], end)
          status.manhole = "used"
        }
      });
    });
  };
  if (status.manhole === "used") {
    textbox(game, ["This is getting pretty handy."], fade)
  } else {
    textbox(game, ["Hey, who would leave that open?", "Criminals nowadays don't even have to try.", "Let's try this out."], fade);
  }
}

const minigameBridgeEnd = (game, end) => {
  status.timer = "stop";

  textbox(game, ["So long, nerds!"]);
  game.cameras.main.fadeOut(4000, 255, 255, 255);
  game.cameras.main.once("camerafadeoutcomplete", () => {
    var graph = game.add.graphics();
    graph.fillStyle(0);
    graph.fillRect(0, 0, 10000, 10000);
    game.cameras.main.fadeIn(4000, 255, 255, 255);
    var winscreen = game.add
      .image(
        game.cameras.main.scrollX + innerWidth / 2.35,
        game.cameras.main.scrollY + innerHeight / 2.9,
        "winscreen"
      )
      .setOrigin(0, 0)
      .setDepth(99);
    winscreen.setDisplaySize(
      (innerWidth + innerHeight) / 12,
      (innerWidth + innerHeight) / 10.5
    );
    game.cameras.main.fadeOut(4000, 0, 0, 0);
    game.cameras.main.once("camerafadeoutcomplete", () => {
      game.scene.stop();
      game.scene.start('Outro2');
    });
  })
};

const minigameGenerator = (game, end) => {
  // 40x 430y

  const pointGenerator = () => {
    generator.x = innerWidth / 3.15;
    generator.y = innerHeight / 3;
    generator.setDisplaySize(40, 40);
    generator.ignoreDestroy = true;
    generator.setScrollFactor(0);
    status.inventory = "generator";
  };

  const pathing = (direction) => {
    if (electricity.alpha != 0.99) {
      if (direction === `Arrow${combination[combinationIndex]}`) {
        alphaIncrement += 0.018
        alpha += alphaIncrement;
        combinationIndex ++;
      } else {
        alphaIncrement = 0;
        alpha = 0;
        combinationIndex = 0;
      }
      electricity.setAlpha(alpha);
    }
    if (electricity.alpha === 0.99 && !status.electricity) {
      textbox(game, ["That's it!", "Should I ever get bored of the criminal life...", "I'd always have work as an electrician, ah!"], destroyMinigame);
      status.electricity = true;
    }
  }

  const destroyMinigame = () => {
    if (!game.active) {
      generator.destroy();
      if (electricity) electricity.destroy();
      end();
    }
  };

  if (status.electricity) {
    textbox(game, ["That was... electrifying."], end)
  } else {
    textbox(game, ["Uh?", "Power is out...", "No wonder I couldn't charge my phone."], destroyMinigame)

    generator = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "generator").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(6);
    electricity = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "electricity").setDisplaySize(innerWidth/6, innerHeight/6).setDepth(6).setAlpha(0);
    var alpha = 0;
    var combination = ["Right", "Up", "Down", "Up", "Down", "Up", "Down", "Up", "Down", "Right"];
    var combinationIndex = 0;
    var alphaIncrement = 0;
    game.input.keyboard.on("keydown", (event) => {
      pathing(event.key)
    });
  }
}

export {
  minigameBoat,
  minigameBuildingDoor,
  minigameContainer,
  minigameDocksLadder,
  minigameLightPillar,
  minigameMap,
  minigameOfficeDoor,
  minigamePillar,
  minigameRamenDoor,
  minigameRoofLadder,
  minigameStreetLamp,
  minigameStreetPlants,
  minigameSupermarketDoor,
  minigameTourismDoor,
  minigameManHole,
  minigameBridgeEnd,
  minigameWareHouse,
  minigameGenerator,
};
