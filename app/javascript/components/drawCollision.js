const drawCollisionShapes = (game, graph, object, coordinates) => {
  graph.clear();
  // Loop over each tile and visualize its collision shape (if it has one)
  object.forEachTile((tile) => {
    var tileWorldX = tile.getLeft();
    var tileWorldY = tile.getTop();
    var collisionGroup = tile.getCollisionGroup();

    if (!collisionGroup || collisionGroup.objects.length === 0) { return; }

      // The group will have an array of objects - these are the individual collision shapes
      var objects = collisionGroup.objects;
      for (var i = 0; i < objects.length; i++)
      {
          var object = objects[i];
          var objectX = tileWorldX + object.x;
          var objectY = tileWorldY + object.y;

          // When objects are parsed by Phaser, they will be guaranteed to have one of the
          // following properties if they are a rectangle/ellipse/polygon/polyline.
          if (object.rectangle) {
              game.platforms.create(objectX, objectY, "ground").setSize(object.width, object.height).setOffset(16, 16).visible = false;
              coordinates.push({ x:objectX, y:objectY, w:object.width, h:object.height });
          } else if (object.ellipse) {
              // Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center
              // origin
              graph.strokeEllipse(
                objectX + object.width / 2, objectY + object.height / 2,
                object.width, object.height
              );
          } else if (object.polygon || object.polyline) {
              var originalPoints = object.polygon ? object.polygon : object.polyline;
              var points = [];
              for (var j = 0; j < originalPoints.length; j++) {
                var point = originalPoints[j];
                points.push({
                  x: objectX + point.x,
                  y: objectY + point.y
                });
              }
              graph.strokePoints(points);
          }
      }
  });
}

export { drawCollisionShapes }