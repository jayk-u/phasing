const movementSprite = (game, character, cursors, counter, status) => {
  character.body.setVelocity(0);
  if (status.minigame != `active${counter}`) {
    if (cursors.left.isDown) {
      character.setVelocityX(-90);
      character.anims.play(`left${counter}`, true);
      game.x = 1;
    } else if (cursors.right.isDown) {
      character.setVelocityX(90);

      character.anims.play(`right${counter}`, true);
      game.x = 2;
    } else if (cursors.down.isDown) {
      character.setVelocityY(90);

      character.anims.play(`down${counter}`, true);
      game.x = 3;
    } else if (cursors.up.isDown) // && character.body.touching.down 
    {
      character.setVelocityY(-90);
      character.anims.play(`up${counter}`, true);
      game.x = 4;
    } else {
      character.setVelocityX(0);
      if (game.x === 1) {
        character.anims.play(`leftend${counter}`);
      }
      else if (game.x === 2) {
        character.anims.play(`rightend${counter}`);
      }
      else if (game.x === 3) {
        character.anims.play(`downend${counter}`);
      }
      else if (game.x === 4) {
        character.anims.play(`upend${counter}`);
      }
      //character.anims.play(`turn${counter}`);
      }
  } else {
      character.setVelocityX(0);
      if (game.x === 1) {
        character.anims.play(`leftend${counter}`);
      }
      else if (game.x === 2) {
        character.anims.play(`rightend${counter}`);
      }
      else if (game.x === 3) {
        character.anims.play(`downend${counter}`);
      }
      else if (game.x === 4) {
        character.anims.play(`upend${counter}`);
      }
  }
}

export { movementSprite };