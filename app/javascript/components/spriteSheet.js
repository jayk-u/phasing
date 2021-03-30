var perso;

const spriteSheet = (game, sprites, counter) => {
  sprites.forEach((sprite) => {
    if (sprite.counter === counter) {
      perso = game.add.image(innerWidth / 2, innerHeight / 2 - 50, sprite.character);
      perso.setDisplaySize(230, 420);
    }
  });
}

export { spriteSheet, perso }