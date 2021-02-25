import Phaser from "phaser"
import { Waiting } from "../scenes/waiting"
import { Login } from "../scenes/login"
import { Intro } from "../scenes/intro"

var config = {
  type: Phaser.AUTO,
  width: innerWidth,
  height: innerHeight,
  parent: "phaser-example",
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: [Waiting, Login, Intro]
};

var game = new Phaser.Game(config);

export {game}