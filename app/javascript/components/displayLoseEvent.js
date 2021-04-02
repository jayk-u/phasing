var endGraphics;
var endText;
var endBorder;
var endContent;
var start;
var again;
var lostscreen;

lostscreen = null;
start = 0;
again = "";

const displayLoseScreen = (game, status, musique) => {
  status.timer = "stop";
  game.cameras.main.fadeOut(3000);
  status.end = true;
  // Textbox
  endContent = "Here you are officer!";
  endBorder = game.add.graphics();

  endBorder.fillStyle(0xFFFFFF);
  endBorder.fillRect(game.cameras.main.scrollX + (innerWidth/3.27 - 3.0), game.cameras.main.scrollY + (innerHeight/1.67 - 3.0), innerWidth/2.68 + 6.0, innerHeight/15.08 + 6.0);

  endGraphics = game.add.graphics();

  endGraphics.fillStyle(0x000000);
  endGraphics.fillRect(game.cameras.main.scrollX + innerWidth/3.27, game.cameras.main.scrollY + innerHeight/1.67, innerWidth/2.68, innerHeight/15.08);
  endText = game.add.text(game.cameras.main.scrollX + innerWidth/3.275 + 6, game.cameras.main.scrollY + innerHeight/1.675 + 6, endContent, {color: '#FFFFFF', font: "12px", wordWrap: {width: innerWidth/2.69, height: 40 }})
  // End Textbox

  status.minigame = "active";

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
      endBorder.destroy();
      endGraphics.destroy();
      endText.destroy();
      game.add.rectangle(innerWidth/2, innerHeight/2, innerWidth/2, innerHeight/2, '#ff0000').setScrollFactor(0).setDepth(4);
      
    lostscreen = game.add.image(game.cameras.main.scrollX + innerWidth/2.33, game.cameras.main.scrollY + innerHeight/3,'lostscreen').setOrigin(0,0);
    lostscreen.setDisplaySize((innerWidth+innerHeight)/12, (innerWidth+innerHeight)/10.5);
    lostscreen.setDepth(10);

    again = game.add.image(game.cameras.main.scrollX + innerWidth/2.45, game.cameras.main.scrollY + innerHeight/1.95, 'playAgain').setOrigin(0,0).setDepth(11).setInteractive();
    again.setDisplaySize((innerWidth+innerHeight)/9, (innerWidth+innerHeight)/11);

    again.on("pointerup", () => {
      game.scene.restart();
      game.begin();
      musique.destroy();
    });
      game.cameras.main.fadeIn(10);
      status.fade = true;
    }
  });
}

export { displayLoseScreen } 