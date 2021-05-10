var unmute;
var mute;

const sound = (game, musique) => {
  unmute = game.add.image(innerWidth/1.5 -47, innerHeight/3.05, "volume").setInteractive().setDepth(2).setScrollFactor(0);
  unmute.setDisplaySize(35,35);
  unmute.setVisible(true);

  mute = game.add.image(innerWidth/1.5 - 47, innerHeight/3.05, "mute").setInteractive().setDepth(2).setScrollFactor(0);
  mute.setDisplaySize(35,35);
  mute.setVisible(false);
  musique.setVolume(0.3);
  musique.play();
  unmute.on("pointerup", () => {
    musique.pause();
    mute.setVisible(true);
    unmute.setVisible(false);
  });


  mute.on("pointerup", () => {
    unmute.setVisible(true);
    mute.setVisible(false);
    musique.resume();
  });
}

export { sound };