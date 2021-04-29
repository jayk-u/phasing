const sortDepth = (layer, character) => {

  layer.forEachTile ((tile) => {
    if (tile.getCollisionGroup()) {
      var distBetween = Phaser.Math.Distance.Between(
        character.x,
        character.y,
        tile.pixelX,
        tile.pixelY
      );
      var counter = 0;
      if (character.y >= tile.pixelY && distBetween <= 50 && counter === 0) {
        console.log(tile.pixelY)
        character.setDepth(1.5)
        counter = 1;
      } else if (character.y < tile.pixelY && distBetween <= 40 && counter === 0) {
        console.log("up")
        character.setDepth(0)
        counter = 1;
      }
    }
  });
};

export { sortDepth }