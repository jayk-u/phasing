import { status } from "../scenes/play2";
import { textbox } from '../components/textBox';
import { character, upBridge, downBridge } from "../scenes/play2";
import { phaser } from "../channels/game"

var key;
var next;
var alpha;
var digicode;
var inputNumber;
var electricity;
var generator;
var warehouse;
var scratchticket;
var brush;
var blanknote;
var noteText;
var rt;
var map;
var fuel;
var containers;
var containerNumber;
var random = Math.round(Math.random() * 10000);

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
  const destroyMinigame = () => {
    if (!game.active) {
      warehouse.destroy();
      if (rt) rt.setVisible(false);
      if (brush) { brush.destroy() };
      if (blanknote) blanknote.setVisible(false);
      if (noteText) noteText.setVisible(false);
      end();
    }
  };

  if (status.unlockedContainer) {
    textbox(game, ["Seems like criminals do come back to the crime scene."], end)
  } else if (status.electricity) {
      textbox(game, ["Now, what do we have here...?", "Those papers look pretty dusty.", "Another man's forgetfulness is my blessing - or so goes the saying."], destroyMinigame);
      warehouse = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "warehouse").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(6).setInteractive();
      warehouse.on('pointerdown', (pointer, x, y) => {
        if (x > 570 && x < 707 && y > 418 && y < 571) {
          if (blanknote && noteText && status.scratchticket === true && rt) {
            blanknote.setVisible(true);
            noteText.setVisible(true);
            rt.setVisible(true);
          } else {
          status.scratchticket = true;
          blanknote = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "blanknote").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(7);
          noteText = game.add.text(
            game.cameras.main.scrollX + innerWidth / 2.2,
            game.cameras.main.scrollY + innerHeight / 2.4,
            random,
            {
              fontFamily: "Arial",
              color: "#000000",
              font: "25px",
              wordWrap: { width: 110 },
            }
          )
          .setOrigin(0)
          .setDepth(7);
          status.rt = true;
          rt = game.add.renderTexture(game.cameras.main.scrollX + innerWidth / 2.43, game.cameras.main.scrollY + innerHeight / 3, innerWidth/7.7, innerHeight/5).setDepth(8).setInteractive();
          for (var y = 0; y < 2; y++)
          {
            for (var x = 0; x < 2; x++)
            {
              rt.draw('scratchticket', x * 512, y * 512);
            }
          }
          brush = game.add.circle(0, 0, 5, 0xffffff).setVisible(false);
          rt.on('pointermove', (pointer, x, y) => {
            if (pointer.isDown) {
              rt.erase(brush, x, y);
            } 
          })
        }
      }
      });
  } else {
    textbox(game, ["My less-than-lawful instincts are tingling.", "I need some thievery done."], end);
  }
}
const minigameRoofLadder = (game, end) => {
  // 300x 615y

  const fade = () => {

    phaser.sound.sounds.find(sound => sound.key === 'ladder').play();
    game.cameras.main.fadeOut(1000)
    game.cameras.main.once("camerafadeoutcomplete", () => {
      if (character.x <= 285) {
        character.setPosition(310, 615);
        status.roofTop = false;
        game.rooftopUpperWalls.setDepth(2);
        game.physics.world.colliders.add(status.bridgeCollision);
        game.physics.world.removeCollider(status.hiddenCollision);
      } else {
        character.setPosition(270, 615);
        status.roofTop = true;
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
      "Hey.\nRound - Diamond - Star - Rectangle - Explosion.\nIf you're half as good as you're made to be, you'll understand.",
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
    phaser.sound.sounds.find(sound => sound.key === 'ladder').play();
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
  // console.log(random.toString())

  const pointFuel = () => {
    fuel.x = innerWidth / 3.15;
    fuel.y = innerHeight / 3;
    fuel.setDisplaySize(40, 40);
    fuel.ignoreDestroy = true;
    fuel.setScrollFactor(0);
    status.inventory = "Fuel";
  }

  const destroyMinigame = () => {
    if (!game.active) {
      if (status.containers) {
        if (containers.getChildren()) while (containers.getChildren()[0]) containers.getChildren()[0].destroy()
        game.input.keyboard.off('keydown-RIGHT')
        game.input.keyboard.off('keydown-LEFT')
        game.input.keyboard.off('keydown-DOWN')
        game.input.keyboard.off('keydown-UP')
        game.input.keyboard.off('keydown-ENTER')
        containers.destroy();
        status.containers = false;
      }
      game.input.keyboard.off("keyup-BACKSPACE")
      if (fuel) fuel.off("pointerdown", pointFuel), fuel.destroy();
      if (digicode) digicode.destroy();
      if (inputNumber) inputNumber.destroy();
      status.fuel = false;
      end();
    }
  }
  const Container = (game, end, destroyMinigame) => {
    var i = 0;
    containerNumber = 0;
    status.containers = true;
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
          if (status.inventory != "Fuel" && status.fuel === false ) {
            fuel = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "fuel").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(6).setInteractive();
            status.fuel = true;
          }
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
  if (!status.unlockedContainer) {
    textbox(game, ["90% of dockmen passwords start and end with 00."], destroyMinigame)
    digicode = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "digicode").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(6).setInteractive();
    inputNumber = game.add.text(
      game.cameras.main.scrollX + innerWidth / 2.1 - 70,
      game.cameras.main.scrollY + innerHeight / 2.3 - 70,
      "",
      {
        fontFamily: "Arial",
        color: "#FFFFFF",
        font: "25px",
        stroke: "#000000",
        strokeThickness: 3,
        wordWrap: { width: 110 },
      }
    )
    .setOrigin(0)
    .setDepth(10);
    if (status.password != "") status.password = "";
    game.input.keyboard.on("keyup-BACKSPACE", () => {
      status.backspaceDigicode = false;
      if (status.password === "") {
        status.password = "";
      } else if (status.password.length > 0 && status.password != "UNLOCKED" && status.password != "ERROR" && status.backspaceDigicode != true) {
        status.password = status.password.substring(0, status.password.length - 1);
        status.backspaceDigicode = true;
      }
      inputNumber.setText(status.password);
    })

    digicode.on("pointerdown", (pointer, x, y) => {
      inputNumber.setTint(0xFFFFFF).setDepth(9);
      if (x > 98 && x < 173 && y > 256 && y < 332) {
        status.password += "1"
      } else if (x > 173 && x < 256 && y > 256 && y < 332) {
        status.password += "2"
      } else if (x > 256 && x < 335 && y > 256 && y < 332) {
        status.password += "3"
      } else if (x > 98 && x < 173 && y > 338 && y < 412) {
        status.password += "4"
      } else if (x > 173 && x < 256 && y > 338 && y < 412) {
        status.password += "5"
      } else if (x > 256 && x < 335 && y > 338 && y < 412) {
        status.password += "6"
      } else if (x > 98 && x < 173 && y > 412 && y < 500) {
        status.password += "7"
      } else if (x > 173 && x < 256 && y > 412 && y < 500) {
        status.password += "8"
      } else if (x > 256 && x < 335 && y > 412 && y < 500) {
        status.password += "9"
      } else if (x > 173 && x < 256 && y > 500 && y < 587) {
        status.password += "0"
      }
      if (status.password === random.toString()) {
        status.unlockedContainer = true;
        inputNumber.setTint(0x88cc00, 0x00ff2a, 0x66ff19, 0x80ff66);
        status.password = "UNLOCKED";
        if (blanknote) blanknote.destroy();
        if (noteText) noteText.destroy();
        if (rt) rt.destroy();
        status.scratchticket = false;
        status.rt = false;

        phaser.sound.sounds.find(sound => sound.key === 'digitalUnlock').play();
        game.time.delayedCall(1000, () => {
          digicode.destroy();
          inputNumber.destroy();
          Container(game, end, destroyMinigame, pointFuel);
          status.minigame = "active";
          status.password = "";
        })
      }
      else if (status.password === "0000") {
        status.password = "ERROR";
        phaser.sound.sounds.find(sound => sound.key === 'digitalLock').play();
        inputNumber.setTint(0xff6666, 0xff4019, 0xb30000, 0xe60000)
        game.time.delayedCall(1000, () => {
          status.password = "";
        })
        textbox(game, ["...", "Looks like I'm up against an expert."], destroyMinigame)
      }
      else if (status.password.length > 3 && !status.unlockedContainer) {
        status.password = "ERROR";
        phaser.sound.sounds.find(sound => sound.key === 'digitalLock').play();
        inputNumber.setTint(0xff6666, 0xff4019, 0xb30000, 0xe60000)
        game.time.delayedCall(1000, () => {
          status.password = "";
        })
      }
      inputNumber.setText(status.password);

    })
  } else {
    Container(game, end, destroyMinigame, pointFuel);
  }
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
  if (status.inevitable === true) {
    textbox(game, ["I love the smell of napalm in the evening."], destroyMinigame)
  }
  else if (status.inventory === "Fuel") {
    textbox(game, ["Time for some good old-fashioned fireworks!"], destroyMinigame)
    fuel.on("pointerdown", () => {
      fuel.ignoreDestroy = false;
      fuel.destroy();
      status.inventory = "";
      phaser.sound.sounds.find(sound => sound.key === 'engine').play();
      textbox(game, ["Yeeeeehaw!"], fadeOut)
      game.cameras.main.once("camerafadeoutcomplete", () => {
        game.redBoat.setVisible(false);
        var blackRect = game.add.rectangle(innerWidth/2, innerHeight/2, innerWidth/2, innerHeight/2, '#ff0000').setScrollFactor(0).setDepth(4);
        fadeIn();
        game.cameras.main.once("camerafadeincomplete", () => {
          phaser.sound.sounds.find(sound => sound.key === 'engine').stop();
          phaser.sound.sounds.find(sound => sound.key === 'boatExplosion').play();
          textbox(game, ["BOOM!"], fadeOut, 5);
          game.cameras.main.once("camerafadeoutcomplete", () => {
            blackRect.destroy();
            character.setPosition(400, 1260).setVisible(false);
            fadeIn()
            game.cameras.main.once("camerafadeincomplete", () => {
              textbox(game, ["Hey! What was that?", "Let's check it out!"], fadeOut)
              game.cameras.main.once("camerafadeoutcomplete", () => {
                status.inevitable = true;
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
    phaser.sound.sounds.find(sound => sound.key === 'manhole').play();
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
  } else if (status.roofTop === false){
    textbox(game, ["Hey, who would leave that open?", "Criminals nowadays don't even have to try.", "Let's try this out."], fade);
  } else {
    textbox(game, ["I'm not jumping from there."], end);
  }
}

const minigameBridgeEnd = (game, end) => {
  status.timer = "stop";

  textbox(game, ["So long, nerds!"]);
  status.won = true;
  game.cameras.main.fadeOut(4000, 255, 255, 255);
  game.cameras.main.once("camerafadeoutcomplete", () => {
    alpha = 0;
    game.cameras.main.fadeIn(4000, 255, 255, 255);
    var video = game.add.video(innerWidth / 2, innerHeight / 2, "wonEvent");
    video.on('play', () => {
      video.setPaused(false)
      const onBegin = () => {
        video.setAlpha(alpha)
        alpha += 0.1
        if (alpha >= 1) beginEvent.destroy()
      }
      var beginEvent = game.time.addEvent({
        delay: 100,
        callback: onBegin, 
        callbackScope: game, 
        loop: true
      });
    })
    video.play(false, 0, 5).setAlpha(0);
    video.setInteractive();
    video.setDisplaySize(innerWidth / 2, innerHeight / 2.5).setDepth(10);
      video.setScrollFactor(0);
      video.on('complete', () => {
        game.cameras.main.fadeOut(4000, 0, 0, 0);
      })
    game.cameras.main.once("camerafadeoutcomplete", () => {
      game.scene.stop();
      game.scene.start('Outro2');
    });
  })
};

const minigameGenerator = (game, end) => {
  // 40x 430y

  if (status.electricity) {
    phaser.sound.sounds.find(sound => sound.key === 'buzz').play()
  } else {
    if (!phaser.sound.sounds.find(sound => sound.key === 'static')) 
    phaser.sound.sounds.find(sound => sound.key === 'static').play();
  }

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
      phaser.sound.sounds.find(sound => sound.key === 'static').stop();
      phaser.sound.sounds.find(sound => sound.key === 'buzz').play();
      textbox(game, ["That's it!", "Should I ever get bored of the criminal life...", "I'd always have work as an electrician, ah!"], destroyMinigame);
      status.electricity = true;
      game.warehouseOpened.setVisible(true);
      game.warehouseClosed.setVisible(false);
    }
  }

  const destroyMinigame = () => {
    if (!game.active) {
      generator.destroy();
      if (electricity) electricity.destroy();
      if (phaser.sound.sounds.find(sound => sound.key === 'buzz')) phaser.sound.sounds.find(sound => sound.key === 'buzz').stop();
      if (phaser.sound.sounds.find(sound => sound.key === 'static')) phaser.sound.sounds.find(sound => sound.key === 'static').stop();
      end();
    }
  };

  if (status.electricity) {
    textbox(game, ["That was... electrifying."], end)
  } else {
    textbox(game, ["Uh?", "Power is out...", "No wonder I couldn't charge my phone.", "If I remember correctly I just need to connect the green line..."], destroyMinigame)

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
