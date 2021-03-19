import { character } from "../scenes/play1"

const spriteFrame = (game) => {
  game.anims.create({
    key: "left",
    frames: game.anims.generateFrameNumbers("character", { start: 5, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: "turn",
    frames: [{ key: "character", frame: 0 }],
    frameRate: 20,
  });

  game.anims.create({
    key: "right",
    frames: game.anims.generateFrameNumbers("character", { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: 'down',
    frames: game.anims.generateFrameNumbers("character", { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  game.anims.create({
    key: 'up',
  frames: game.anims.generateFrameNumbers("character", { start: 13, end: 15 }),
    frameRate: 10,
    repeat: -1
  });

  game.anims.create({
    key: 'upend',
  frames: game.anims.generateFrameNumbers("character", { start: 12 }),
    frameRate: 20,
  });

  game.anims.create({
    key: 'downend',
  frames: game.anims.generateFrameNumbers("character", { start: 0 }),
    frameRate: 20,
  });

  game.anims.create({
    key: 'leftend',
  frames: game.anims.generateFrameNumbers("character", { start: 4 }),
    frameRate: 20,
  });

  game.anims.create({
    key: 'rightend',
  frames: game.anims.generateFrameNumbers("character", { start: 8 }),
    frameRate: 20,
  });
};

export { spriteFrame }