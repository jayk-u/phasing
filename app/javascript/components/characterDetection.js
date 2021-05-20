import { status, musique } from "../scenes/play2"
import { phaser } from "../channels/game"

const detectEvent = (game, npc, loseEvent, videoLoseEvent ,endContent) => {
  phaser.sound.sounds.find(sound => sound.key === 'handcuffs').addMarker({name: "arrest", start: 2.5, config: {volume: 2}})
  phaser.sound.sounds.find(sound => sound.key === 'hey').addMarker({name: "voice", duration:0.5, start: 0, config: {volume: 2}})
  phaser.sound.sounds.find(sound => sound.key === 'hey').play('voice');
  phaser.sound.sounds.find(sound => sound.key === 'hey').once("complete", () => {
    phaser.sound.sounds.find(sound => sound.key === 'handcuffs').play('arrest');
  })
  status.minigame = 'active'
  npc.setVelocityX(0);
  npc.setVelocityY(0);
  if (npc.anims.currentAnim.key.substring(npc.anims.currentAnim.key.length - 3) != "end") npc.anims.play(`${npc.anims.currentAnim.key}end`);
  npc.anims.stop();

  var exclamationBorder = game.add.graphics().setDepth(4);

  exclamationBorder.fillStyle(0x000000);
  exclamationBorder.fillRect(
    npc.x + innerWidth / 80 - 1,
    npc.y - innerHeight / 40 - 1,
    innerWidth / 400 + 2,
    innerHeight / 60 + 2
  );

  var exclamation = game.add.graphics().setDepth(4);

  exclamation.fillStyle(0xFFFFFF);
  exclamation.fillRect(
    npc.x + innerWidth / 80,
    npc.y - innerHeight / 40,
    innerWidth / 400,
    innerHeight / 60
  );

  var pointBorder = game.add.graphics().setDepth(4);

  pointBorder.fillStyle(0x000000);
  pointBorder.fillRect(
    npc.x + innerWidth / 80 - 1,
    npc.y - innerHeight / 100 - 1,
    innerWidth / 400 + 2,
    innerHeight / 220 + 2
  );

  var point = game.add.graphics().setDepth(4);

  point.fillStyle(0xFFFFFF);
  point.fillRect(
    npc.x + innerWidth / 80,
    npc.y - innerHeight / 100,
    innerWidth / 400,
    innerHeight / 220
  );

  loseEvent(game, status, musique, endContent, videoLoseEvent);
}

const detectCharacter = (game, layout, npc, character, loseEvent, videoLoseEvent , endContent) => {

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
      detectEvent(game, npc, loseEvent, videoLoseEvent, endContent)
    }
  };
};

export { detectCharacter }