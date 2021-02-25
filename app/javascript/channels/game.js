import Phaser from "phaser";
import { Waiting } from "../scenes/waiting";
import { Login } from "../scenes/login";
import { Game } from "../scenes/game";

var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Waiting, Login, Game],
  scale: {
    zoom: 3,
  },
};

const game = new Phaser.Game(config);
