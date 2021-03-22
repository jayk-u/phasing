const debugInteraction = (game, layout, egyptian) => {
  game.input.keyboard.on("keyup-SPACE", () => {
    console.log(egyptian);
    game.findCoordinates = layout.getTileAtWorldXY(egyptian.x, egyptian.y) || game.findCoordinates
    layout.forEachTile(tile => {
      var tileWorldX = tile.getLeft();
      var tileWorldY = tile.getTop();
      if (!game.findCoordinates) return
      var collisionGroup = tile.getCollisionGroup();
      if (!collisionGroup || collisionGroup.objects.length === 0) { return; }
      tile.getCollisionGroup().objects.forEach((object) => {
        var objectCenterX = object.x + tileWorldX + object.width / 2;
        var objectCenterY = object.y + tileWorldY + object.height / 2;
        var distBetween = Phaser.Math.Distance.Between(
          egyptian.x,
          egyptian.y,
          objectCenterX,
          objectCenterY
        );
        if (distBetween < 30) {

          // console.log("Object Position",objectCenterX, objectCenterY);
          // console.log("Distance to Object", distBetween);
          // console.log("Egyptian position", egyptian.x, egyptian.y);
          const testLine = game.add.graphics()
          testLine.lineStyle(1, 0xFFFFFF, 1.0).setDepth(1);
          testLine.beginPath();
          testLine.moveTo(egyptian.x, egyptian.y);
          testLine.lineTo(objectCenterX, objectCenterY).setDepth(1);
          testLine.closePath();
          testLine.strokePath();
        }
      })
    });
  });
}

export { debugInteraction }