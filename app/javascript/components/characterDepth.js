const sortDepth = (layer, character) => {
  var counter = 0;

  layer.forEachTile ((tile) => {
    if (tile.getCollisionGroup()) {
      var distBetween = Phaser.Math.Distance.Between(
        character.x,
        character.y,
        tile.pixelX,
        tile.pixelY
      );
      if (character.y >= tile.pixelY && distBetween <= 50 && counter === 0) {
        character.setDepth(1.5)
        counter = 1;
      } else if (character.y < tile.pixelY && distBetween <= 50 && counter === 0) {
        character.setDepth(0.1)
        counter = 1;
      }
    }
  });
};

export { sortDepth }