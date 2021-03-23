import { status, musique } from "../scenes/play1"

var endContent;
var endGraphics;
var endText;
var endBorder;
var start;
var again;
var lostscreen;
lostscreen = null;
start = 0;
again = "";

const timerLooseScreenDisplay = (game, beginningSecs, beginningMins) => {
  if (status.timer != "stop") {
    status.now = game.time.now;
    if (!status.startTime) {
      status.startTime = status.now;
    }
    if (!status.endTime) {
      status.endTime = (beginningSecs + beginningMins * 60)  * 1000;
    }
    if (status.timer != "stop") {
      status.ms = status.then - status.now;
    } else {
      status.ms = 0;
    }
      if (status.ms < 0) {
        status.then = status.now + 1000;
        status.s++;
      } else if ((beginningSecs + status.difference - status.s) < 0) {
        status.difference = 59 - beginningSecs;
        status.s = 0;
        status.m++;
      }
      if ((beginningMins - status.m) < 10) {
        status.min = "0" + Math.max(0,(beginningMins - status.m))
      } else {
        status.min = (beginningMins - status.m)
      };
      if ((beginningSecs + status.difference - status.s) < 10) {
        status.sec = "0" + Math.max(0,(beginningSecs + status.difference - status.s));
      } else {
        status.sec = (beginningSecs + status.difference - status.s)
      };
    if (Math.min(Math.trunc(status.ms/10),99) < 10) {
      status.milli = "0" + Math.max(Math.min(Math.trunc(status.ms/10),99),0)
    } else {
      status.milli = Math.min(Math.trunc(status.ms/10),99)
    }
  }
  status.time = status.min + ":" + status.sec + ":" + status.milli;
  status.actualTime.setText(status.time);
  if ((status.now) >= (status.endTime + status.startTime) && status.timer != "stop") {
    status.actualTime.setText("00:00:00");
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
  }

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
      var rect = game.add.rectangle(innerWidth/2, innerHeight/2, innerWidth/2, innerHeight/2, '#ff0000').setScrollFactor(0).setDepth(4);
      game.cameras.main.fadeIn(10);
      status.fade = true;
    }
  });
  if (status.endTimer > 2900) {
    endBorder.destroy();
    endGraphics.destroy();
    endText.destroy();
    // comment again
    // again = this.add.image(innerWidth/2, innerHeight/3+200, 'playAgain').setScrollFactor(0).setDepth(4).setInteractive();

    //new lost screen
    lostscreen = game.add.image(game.cameras.main.scrollX + innerWidth/2.33, game.cameras.main.scrollY + innerHeight/3,'lostscreen').setOrigin(0,0);
    lostscreen.setDisplaySize((innerWidth+innerHeight)/12, (innerWidth+innerHeight)/10.5);
    lostscreen.setDepth(10);

    again = game.add.image(game.cameras.main.scrollX + innerWidth/2.45, game.cameras.main.scrollY + innerHeight/1.95, 'playAgain').setOrigin(0,0).setDepth(11).setInteractive();
    again.setDisplaySize((innerWidth+innerHeight)/9, (innerWidth+innerHeight)/11);

    again.on("pointerup", (event) => {
      game.scene.stop();
      game.scene.start('Play1');
      game.begin();
      musique.destroy();
    });
  }
}

export { timerLooseScreenDisplay };