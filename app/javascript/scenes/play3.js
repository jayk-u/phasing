import { game } from "../channels/game"
import { debugInteraction } from "../components/debugInteraction"
import { drawCollisionShapes } from "../components/drawCollision"
import { timerBox } from "../components/timerBox"
import { timerLoseScreenDisplay } from "../components/timerDisplay"
import { borderInventory } from "../components/inventoryDisplay"
import { interactionObject } from "../components/interactionWithObject"
import { cameraSettings } from "../components/cameraSettings"
import { sound } from "../components/soundSettings"
import { leaveGame } from "../components/buttonExit"
import { movementSprite } from "../components/spriteMovement"
import { spriteFrame } from "../components/spriteFrame"
import { camera, hideNPC } from "../components/cameraOpacity"
import { characterCounter } from "../scenes/login"
import { displayLoseScreen } from "../components/displayLoseEvent"
import { detectCharacter } from "../components/characterDetection"
import { sortDepth } from "../components/characterDepth"
import { objectDetection } from "../components/objectDetection"
import { loadingScreen } from "../components/loadingscreen"

var status = {};

var beginningMins;
var beginningSecs;


class Play3 extends Phaser.Scene {
    constructor () {
        super("Play3");
    }
    begin () {
        status.minigame = "none";
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
        status.countDoor = 0;
        beginningMins = 3;
        beginningSecs = 30;
    }

    preload () {
        const gameAssets = document.getElementById("game-assets").dataset;
        //Map
        this.load.tilemapTiledJSON('map3', gameAssets.map3Json);
        this.load.image('dilapilatedcity', gameAssets.map3Png);
        //End map

        // Sprite
    if (characterCounter === 1) {
        this.load.spritesheet("character1", gameAssets.character1Sprite, {
        frameWidth: 32,
        frameHeight: 48,
      });
      } else if (characterCounter === 2) {
        this.load.spritesheet("character2", gameAssets.character2Sprite, {
          frameWidth: 32,
          frameHeight: 48,
        });
      } else if (characterCounter === 3) {
        this.load.spritesheet("character3", gameAssets.character7Sprite, {
          frameWidth: 32,
          frameHeight: 48,
        });
      } else if (characterCounter === 4) {
        this.load.spritesheet("character4", gameAssets.character8Sprite, {
          frameWidth: 32,
          frameHeight: 48,
        });
      }
      //End Sprite
  
      this.load.spritesheet("character6", gameAssets.character6Sprite, {
        frameWidth: 32,
        frameHeight: 48,
      });

      loadingScreen(this);
    }

    create () {
        this.begin();
        this.cameras.main.fadeIn(1000)
        this.add.rectangle(0, 0, 10000, 10000, 0x000000, 0.2).setDepth(10);
        this.map = this.make.tilemap({ key: 'map3', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage("city", 'tiles2');
        this.bridge = this.map.createLayer('bridge', this.tileset, 0, 0).setDepth(0);
        this.water = this.map.createLayer('water', this.tileset, 0, 0).setDepth(0);
        this.gangplank = this.map.createLayer('gangplank', this.tileset, 0, 0).setDepth(1);
        this.groundabovewater = this.map.createLayer('ground above water', this.tileset, 0, 0).setDepth(2);
        this.plant1 = this.map.createLayer('plant1', this.tileset, 0, 0).setDepth(3);
        this.plant2 = this.map.createLayer('plant2', this.tileset, 0, 0).setDepth(4);
        this.stairs = this.map.createLayer('stairs', this.tileset, 0, 0).setDepth(2);
        this.railsup = this.map.createLayer('railsup', this.tileset, 0, 0).setDepth(1);
        this.railsdown = this.map.createLayer('railsdown', this.tileset, 0, 0).setDepth(4);
        this.railsup2 = this.map.createLayer('rails up bis', this.tileset, 0, 0).setDepth(2);
        this.groundobjects = this.map.createLayer('ground objects', this.tileset, 0, 0).setDepth(2);
        this.building = this.map.createLayer('building', this.tileset, 0, 0).setDepth(4);
        this.rooftop = this.map.createLayer('rooftop', this.tileset, 0, 0).setDepth(5);
        this.boat = this.map.createLayer('boat', this.tileset, 0, 0).setDepth(2);
        this.roof = this.map.createLayer('roof', this.tileset, 0, 0).setDepth(6);
        this.decoration = this.map.createLayer('decoration', this.tileset, 0, 0).setDepth(7);
        this.decorationroof = this.map.createLayer('decoration roof', this.tileset, 0, 0).setDepth(8);

        shapeGraphics = this.add.graphics();

        cursors = this.input.keyboard.createCursorKeys();
        cameraSettings(this, character);
        timerBox(this, status);
        borderInventory(this, status);
    }

    update () {
        movementSprite(this, character, cursors, characterCounter, status);
        if (status.inventory != "" && status.inventory != "none") {
            status.borderBox.visible = true;
            status.inventoryBox.visible = true;
          } else {
            status.borderBox.visible = false;
            status.inventoryBox.visible = false;
          }
      
          if(status.won === true) {
            musique.stop();
          }
      
          objectDetection(this, character, items, status);
      
          sortDepth(this.floorObjects, character);
          sortDepth(this.decorationRooftop, character);
      
          camera(this, this.plant1, character);
          camera(this, this.bridge, character);
          camera(this, this.plant2, character);
          camera(this, this.groundabovewater, character);
          camera(this, this.building, character);
          camera(this, this.groundobjects, character);
          camera(this, this.roof, character);
          camera(this, this.rooftop, character);
          camera(this, this.decoration, character);
          camera(this, this.decorationroof, character);
          camera(this, this.boat, character);
          camera(this, this.railsup, character);
          camera(this, this.railsup2, character);
          camera(this, this.railsdown, character);
          camera(this, this.gangplank, character);
          camera(this, this.stairs, character);
          camera(this, this.water, character);
    }
}

export { Play3 }