import { endingInstructions } from "../channels/tutorialInteractions";

var endGraphics;
var endText;
var endBorder;
var start;
var again;
var lossScreen;

start = 0;
again = "";

const displayLoseScreen = (game, status, musique, endContent) => {
  status.timer = 'stop'
  game.cameras.main.fadeOut(3000);
  // Textbox
  if (endContent) {
    endBorder = game.add.graphics();
  
    endBorder.fillStyle(0xFFFFFF);
    endBorder.fillRect(game.cameras.main.scrollX + (innerWidth/3.27 - 3.0), game.cameras.main.scrollY + (innerHeight/1.67 - 3.0), innerWidth/2.68 + 6.0, innerHeight/15.08 + 6.0);
  
    endGraphics = game.add.graphics();
  
    endGraphics.fillStyle(0x000000).setDepth(6);
    endGraphics.fillRect(game.cameras.main.scrollX + innerWidth/3.27, game.cameras.main.scrollY + innerHeight/1.67, innerWidth/2.68, innerHeight/15.08);
    endText = game.add.text(game.cameras.main.scrollX + innerWidth/3.275 + 6, game.cameras.main.scrollY + innerHeight/1.675 + 6, endContent, {color: '#FFFFFF', font: "12px", wordWrap: {width: innerWidth/2.69, height: 40 }}).setDepth(6);
  }
  // End Textbox

  if (status.end) {
    let doorsound = game.sound.add('door');
    doorsound.setVolume(0.5);
    doorsound.play();
    start = game.time.now;
    status.start = true;
  }
  status.end = false;
  if (status.start) {
    status.endTimer = game.time.now - start;
  }

  game.cameras.main.once("camerafadeoutcomplete", () => {
    if (!status.fade) {
      if (endContent) {
        endBorder.destroy();
        endGraphics.destroy();
        endText.destroy();
      }
      game.add.rectangle(innerWidth/2, innerHeight/2, innerWidth/2, innerHeight/2, '#ff0000').setScrollFactor(0).setDepth(6);
      
      lossScreen = game.add.image(game.cameras.main.scrollX + innerWidth/2.33, game.cameras.main.scrollY + innerHeight/3,'lossScreen').setOrigin(0,0);
      lossScreen.setDisplaySize(innerWidth/8, innerHeight/4);
      lossScreen.setDepth(10);

      again = game.add.image(game.cameras.main.scrollX + innerWidth/2.45, game.cameras.main.scrollY + innerHeight/1.95, 'playAgain').setOrigin(0,0).setDepth(11).setInteractive();
      again.setSize(innerWidth/6, innerHeight/4).setDisplaySize(again.width, again.height);

      again.on("pointerover", () => {
        again.setPosition(again.x - 10, again.y - 6)
        again.setDisplaySize(again.width + 20, again.height + 12)
      });

      again.on("pointerout", () => {
        again.setPosition(again.x + 10, again.y + 6)
        again.setDisplaySize(again.width, again.height)
      });

      const restart = () => {
        game.scene.restart();
        game.begin();
        musique.destroy();
      }

      again.on("pointerup", restart);

      game.input.keyboard.on("keydown-SPACE", restart);

      game.cameras.main.fadeIn(10);
      status.fade = true;
    }
  });
}

const fadeToSelectScene = (game, status) => {
  status.timer = "stop";
  game.cameras.main.fadeOut(2000);
  status.end = true;

  status.minigame = "active";

  // if (status.end) {
  //   start = game.time.now;
  //   status.start = true;
  // }
  // status.end = false;
  // if (status.start) {
  //   status.endTimer = game.time.now - start;
  // }

  game.cameras.main.once("camerafadeoutcomplete", () => {
    const end = () => {
      game.scene.stop();
      game.scene.start('Select');
    }
    game.add.rectangle(innerWidth/2, innerHeight/2, innerWidth/2, innerHeight/2, '#ff0000').setScrollFactor(0).setDepth(4);
    game.cameras.main.fadeIn(10);
    endingInstructions(game, end)
  });
}

export { displayLoseScreen, fadeToSelectScene } 