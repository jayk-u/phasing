import { game } from "../channels/game"
import { debugInteraction } from "../components/debugInteraction"
import { drawCollisionShapes } from "../components/drawCollision"
import { timerBox } from "../components/timerBox"
import { timerLooseScreenDisplay } from "../components/timerDisplay"
import { borderInventory } from "../components/inventoryDisplay"
import { interactionObject } from "../components/interactionWithObject"
import { cameraSettings } from "../components/cameraSettings"
import { sound } from "../components/soundSettings"
import { leaveGame } from "../components/buttonExit"
import { movementSprite } from "../components/spriteMovement"
import { spriteFrame } from "../components/spriteFrame"
import { camera } from "../components/cameraOpacity"
import { beginningInstructions, minigameShelves, minigameDoor, endingInstructions } from "../channels/tutorialInteractions";

var musique;
var character;
var cursors;
var shapeGraphics;
var coordinates;
var countDoor = 0;
var instructions = false

var beginningMins;
var beginningSecs;

const end = () => {
  status.minigame = "none"
}

//Status
var status = {};

class Tutorial extends Phaser.Scene {

  constructor ()
  {
    super("Tutorial");
    this.begin();
  }

  begin () {
    status.end = false;
    status.start = false;
    status.minigame = "none";
    status.computerStatus = "";
    status.inventory = "";
    status.library = "";
    status.timer = "";
    status.btn = "";
    status.fade = false
    status.s = 0;
    status.m = 0;
    status.ms = 0;
    status.endTimer = 0;
    status.then = 0;
    status.endTime = null;
    status.startTime = null;
    status.min = "";
    status.sec = "";
    status.milli = "";
    status.difference = 0;
    status.actualTime = "";
    beginningMins = 1;
    beginningSecs = 45;
    coordinates = [];  
  }

  preload()
  {
    const gameAssets = document.getElementById("game-assets").dataset;

    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);

    this.load.tilemapTiledJSON('map', gameAssets.map0Json);
    this.load.image('tiles', gameAssets.map0Png);
    this.load.image('exit', gameAssets.exitImg);
    this.load.spritesheet('character', gameAssets.policemanSprite, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.audio('door', gameAssets.doorMp3);

    const loginAssets = document.getElementById("login").dataset;

    this.load.image("settings", loginAssets.settingsBtn);
    this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);

    const introAssets = document.getElementById("intro").dataset;

    this.load.image("mute", introAssets.muteImg);
  };

  create()
  {
    localStorage.setItem('status', status.text)

    timerBox(this, status);

    this.platforms = this.physics.add.staticGroup();
    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage("office_tiles", 'tiles');
    this.walls = this.map.createLayer("wall", this.tileset, 0, 0);
    this.layer = this.map.createLayer('floor', this.tileset, 0, 0);
    this.objectBottom = this.map.createLayer("furniture", this.tileset, 0, 0);
    // this.extraObj = this.map.createLayer("extra_obj", this.tileset, 0, 0);
    // this.objectTop = this.map.createLayer("top", this.tileset, 0, 0);
    character = this.physics.add.sprite(50, 60, "character").setSize(15, 2).setOffset(9, 43).setDepth(1);
    // this.transparent = this.map.createLayer("transparent", this.tileset, 0, 0).setDepth(2);

    this.walls.setCollisionFromCollisionGroup();
    // this.extraObj.setCollisionFromCollisionGroup();
    this.objectBottom.setCollisionFromCollisionGroup();
    // this.objectTop.setCollisionFromCollisionGroup();
    // this.transparent.setCollisionFromCollisionGroup();
    shapeGraphics = this.add.graphics();

    spriteFrame(this);

    // drawCollisionShapes(this, shapeGraphics, this.extraObj, coordinates);
    drawCollisionShapes(this, shapeGraphics, this.objectBottom, coordinates);
    // drawCollisionShapes(this, shapeGraphics, this.objectTop, coordinates);

    this.physics.add.collider(this.walls, character);
    // this.physics.add.collider(this.extraObj, character);
    this.physics.add.collider(this.platforms, character);
    // this.physics.add.collider(this.transparent, character);

    cursors = this.input.keyboard.createCursorKeys();
    status.minigame = "active";
    // TIMER
    timerBox(this, status);
    borderInventory(this, status);
    //SETTINGS
    cameraSettings(this, character);
    musique = game.sound.add('music');
    sound(this, musique);
    leaveGame(this, musique);
    //END SETTINGS

    const items = [
      {x: 527, y: 133, name: 'bookshelf', minigame: minigameShelves},
      {x: 461, y: 280, name: 'door', minigame: minigameDoor},
      ];
    interactionObject(this, items, character, status);
    debugInteraction(this, this.objectBottom, character)
  };

  update ()
  {
    movementSprite(this, character, cursors, status);
      //Inventory
    if (status.library == "end") {
      timerLooseScreenDisplay(this, 5, 0, "", status, musique)
    }
    this.cameras.main.on("camerafadeoutcomplete", () => {
      endingInstructions(this, end)
    });
    if (status.computerStatus === 'Unlocked' && countDoor < 1) {
      this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0).setDepth(0);
      countDoor = 1;
    } else if (countDoor === 1) {
      camera(this, this.secretDoor, character);
    }

    if (status.inventory != "" && status.inventory != "none") {
      status.borderBox.visible = true;
      status.inventoryBox.visible = true;
    } else {
      status.borderBox.visible = false;
      status.inventoryBox.visible = false;
    }
    camera(this, this.walls, character);
    camera(this, this.objectBottom, character);
    // camera(this, this.objectTop, character);
    // camera(this, this.extraObj, character);
    camera(this, this.layer, character);
    // camera(this, this.transparent, character);

    if (!instructions) {
      beginningInstructions(this, end);
      instructions = true
    }
  };
};

export { Tutorial, status };
