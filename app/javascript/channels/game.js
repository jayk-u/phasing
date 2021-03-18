import Phaser from "phaser"
import { Waiting } from "../scenes/waiting"
import { Login } from "../scenes/login"
import { Select } from "../scenes/select"
import { Tutorial } from "../scenes/tutorial"
import { Intro1 } from "../scenes/intro1"
import { Play1 } from "../scenes/play1"

var config = {
  type: Phaser.AUTO,
  width: innerWidth * 0.995,
  height: innerHeight * 0.973,
  parent: "phaser-example",
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      }
  },
  scene: [Waiting, Login, Select, Tutorial, Intro1, Play1]
};

const game = new Phaser.Game(config);

export { game }
