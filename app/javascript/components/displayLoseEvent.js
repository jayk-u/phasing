const displayLoseScreen = (game) => {
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