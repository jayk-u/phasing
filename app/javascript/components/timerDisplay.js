const timerLoseScreenDisplay = (game, beginningSecs, beginningMins, status, musique, displayLoseScreen) => {
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
    displayLoseScreen(game, status, musique);
    // status.timer = "stop";
    // game.cameras.main.fadeOut(3000);
    // status.end = true;
    // // Textbox;
    // endBorder = game.add.graphics();

    // endBorder.fillStyle(0xFFFFFF);
    // endBorder.fillRect(game.cameras.main.scrollX + (innerWidth/3.27 - 3.0), game.cameras.main.scrollY + (innerHeight/1.67 - 3.0), innerWidth/2.68 + 6.0, innerHeight/15.08 + 6.0);

    // endGraphics = game.add.graphics();

    // endGraphics.fillStyle(0x000000);
    // endGraphics.fillRect(game.cameras.main.scrollX + innerWidth/3.27, game.cameras.main.scrollY + innerHeight/1.67, innerWidth/2.68, innerHeight/15.08);
    // endText = game.add.text(game.cameras.main.scrollX + innerWidth/3.275 + 6, game.cameras.main.scrollY + innerHeight/1.675 + 6, endContent, {color: '#FFFFFF', font: "12px", wordWrap: {width: innerWidth/2.69, height: 40 }})
    // // End Textbox

    // status.minigame = "active";
  }
}

export { timerLoseScreenDisplay };