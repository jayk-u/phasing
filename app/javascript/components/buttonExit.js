var exit;

const leaveGame = (game, musique) => {
  exit = game.add.image(innerWidth/1.5, innerHeight/3.05, 'exit').setInteractive().setDepth(2).setScrollFactor(0);
  exit.setDisplaySize(35,35);

  exit.on("pointerup", () => {
    game.scene.stop();
    game.scene.start('Login');
    musique.stop();
  });
}

export { leaveGame };