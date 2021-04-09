const cameraSettings = (game, character) => {
  game.cameras.main.setBounds(0, 0, 3000, 3000);
  game.cameras.main.zoom = 2.5;
  game.cameras.main.startFollow(character);
}

export { cameraSettings };