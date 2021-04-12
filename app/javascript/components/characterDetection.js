import { status, musique } from "../scenes/play2"

const detectEvent = (game, npc, loseEvent) => {
  status.minigame = 'active'
  npc.setVelocityX(0);
  npc.setVelocityY(0);
  npc.anims.play(`${npc.anims.currentAnim.key}end`);
  npc.anims.stop();

  var exclamationBorder = game.add.graphics();

  exclamationBorder.fillStyle(0x000000);
  exclamationBorder.fillRect(
    npc.x + innerWidth / 80 - 1,
    npc.y - innerHeight / 40 - 1,
    innerWidth / 400 + 2,
    innerHeight / 60 + 2
  );

  var exclamation = game.add.graphics();

  exclamation.fillStyle(0xFFFFFF);
  exclamation.fillRect(
    npc.x + innerWidth / 80,
    npc.y - innerHeight / 40,
    innerWidth / 400,
    innerHeight / 60
  );

  var pointBorder = game.add.graphics();

  pointBorder.fillStyle(0x000000);
  pointBorder.fillRect(
    npc.x + innerWidth / 80 - 1,
    npc.y - innerHeight / 100 - 1,
    innerWidth / 400 + 2,
    innerHeight / 220 + 2
  );

  var point = game.add.graphics();

  point.fillStyle(0xFFFFFF);
  point.fillRect(
    npc.x + innerWidth / 80,
    npc.y - innerHeight / 100,
    innerWidth / 400,
    innerHeight / 220
  );

  loseEvent(game, status, musique);
}

const detectCharacter = (game, layout, npc, character, loseEvent) => {

  game.origin = layout.getTileAtWorldXY(character.x, character.y) || game.origin
  game.npcOrigin = layout.getTileAtWorldXY(npc.x, npc.y)
  if (!game.origin || !game.npcOrigin) return;
  var dist = Phaser.Math.Distance.Chebyshev(
      game.origin.x,
      game.origin.y,
      game.npcOrigin.x,
      game.npcOrigin.y,
  );
  if (dist < 2) {
    if ((game.origin.x > game.npcOrigin.x && npc.frame.name >= 8 && npc.frame.name <= 11)
    || (game.origin.x < game.npcOrigin.x && npc.frame.name >= 4 && npc.frame.name <= 7)
    || (game.origin.y > game.npcOrigin.y && npc.frame.name >= 0 && npc.frame.name <= 3)
    || (game.origin.y < game.npcOrigin.y && npc.frame.name >= 12 && npc.frame.name <= 15)) {
      detectEvent(game, npc, loseEvent)
    }
  };
};

export { detectCharacter }