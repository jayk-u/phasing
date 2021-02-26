import Phaser from "phaser"
import { Waiting } from "../scenes/waiting"
import { Login } from "../scenes/login"
import { Play } from "../scenes/play"


var config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 950,
  parent: "phaser-example",
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 }
      }
  },
  scene: [Waiting, Login, Play]
};

const game = new Phaser.Game(config);

export { game }
