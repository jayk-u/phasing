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

const hideNPC = (game, layout, npc, character) => {
  game.origin = layout.getTileAtWorldXY(character.x, character.y) || game.origin
  game.npcOrigin = layout.getTileAtWorldXY(npc.x, npc.y) || game.npcOrigin
  if (!game.origin || !game.npcOrigin) return;
  var dist = Phaser.Math.Distance.Chebyshev(
      game.origin.x,
      game.origin.y,
      game.npcOrigin.x,
      game.npcOrigin.y,
  );
  if (dist === 1) {
    npc.setAlpha(1);
  } else {
    npc.setAlpha(1 - 0.3 * dist);
  };
};

export { camera, hideNPC };