const spriteFrame = (game, counter) => {
  game.anims.create({
    key: `left${counter}`,
    frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 5, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: `turn${counter}`,
    frames: [{ key: `character${counter}`, frame: 0 }],
    frameRate: 20,
  });

  game.anims.create({
    key: `right${counter}`,
    frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: `down${counter}`,
    frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  game.anims.create({
    key: `up${counter}`,
  frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 13, end: 15 }),
    frameRate: 10,
    repeat: -1
  });

  game.anims.create({
    key: `upend${counter}`,
  frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 12 }),
    frameRate: 20,
  });

  game.anims.create({
    key: `downend${counter}`,
  frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 0 }),
    frameRate: 20,
  });

  game.anims.create({
    key: `leftend${counter}`,
  frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 4 }),
    frameRate: 20,
  });

  game.anims.create({
    key: `rightend${counter}`,
  frames: game.anims.generateFrameNumbers(`character${counter}`, { start: 8 }),
    frameRate: 20,
  });
};

export { spriteFrame }