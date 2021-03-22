import { character, cursors, status } from "../scenes/play1"

const movementSprite = (game) => {
  character.body.setVelocity(0);
  if (status.minigame != "active") {
    if (cursors.left.isDown) {
      character.setVelocityX(-90);
      character.anims.play("left", true);
      game.x = 1;
    } else if (cursors.right.isDown) {
      character.setVelocityX(90);

      character.anims.play("right", true);
      game.x = 2;
    } else if (cursors.down.isDown) {
      character.setVelocityY(90);

      character.anims.play("down", true);
      game.x = 3;
    } else if (cursors.up.isDown) // && character.body.touching.down 
    {
      character.setVelocityY(-90);
      character.anims.play("up", true);
      game.x = 4;
    } else {
      character.setVelocityX(0);
      if (game.x === 1) {
        character.anims.play("leftend");
      }
      else if (game.x === 2) {
        character.anims.play("rightend");
      }
      else if (game.x === 3) {
        character.anims.play("downend");
      }
      else if (game.x === 4) {
        character.anims.play("upend");
      }
      //character.anims.play("turn");
      }
  } else {
      character.setVelocityX(0);
      if (game.x === 1) {
        character.anims.play("leftend");
      }
      else if (game.x === 2) {
        character.anims.play("rightend");
      }
      else if (game.x === 3) {
        character.anims.play("downend");
      }
      else if (game.x === 4) {
        character.anims.play("upend");
      }
  }
}

export { movementSprite };