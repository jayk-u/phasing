import Phaser from "phaser"
import { Waiting } from "../scenes/waiting"
import { Login } from "../scenes/login"
import { Intro } from "../scenes/intro"
import { Play } from "../scenes/play"

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
  scene: [Waiting, Login, Intro, Play]
};

const game = new Phaser.Game(config);



export { game }
