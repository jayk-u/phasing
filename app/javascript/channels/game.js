import Phaser from "phaser"
import { Waiting } from "../scenes/waiting"
import { Login } from "../scenes/login"
import { Intro } from "../scenes/intro"
import { Play } from "../scenes/play"

var config = {
  type: Phaser.AUTO,
  width: innerWidth,
  height: innerHeight,
  parent: "phaser-example",
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: true,
      }
  },
  scene: [Waiting, Login, Intro, Play]
};

const game = new Phaser.Game(config);



export { game }
