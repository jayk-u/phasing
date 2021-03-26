const camera = (game, layout, character) => {
  game.origin = layout.getTileAtWorldXY(character.x, character.y) || game.origin
  layout.forEachTile(tile => {
    if (!game.origin) return
    var dist = Phaser.Math.Distance.Chebyshev(
        game.origin.x,
        game.origin.y,
        tile.x,
        tile.y,
    );
    if (dist === 1) {
      tile.setAlpha(1);
    } else {
      tile.setAlpha(1 - 0.3 * dist);
    }
  });
}

export { camera };