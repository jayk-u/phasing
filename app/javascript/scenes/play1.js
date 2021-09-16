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
import { camera } from "../components/cameraOpacity"
import { characterCounter } from "../scenes/login"
import { displayLoseScreen } from "../components/displayLoseEvent"
import { objectDetection } from "../components/objectDetection"
import { minigameSofa, minigameKitchenTree, minigameBathPlant, minigameWindbreak, minigameKey, minigameBathtub, minigameBathsink, minigameAltar, minigameBonsai, minigameCattree, minigameComputer, minigameSink, minigameRoomLibrary, minigameKettle, minigameFish, minigameHallway, minigameMicrowave, minigameLivingLibrary, minigameSaber, minigameDoor, minigameTV, minigameFreezer } from "../channels/play1interactions";
import { loadingScreen } from "../components/loadingscreen"

var musique;
var character;
var cursors;
var items;
var shapeGraphics;
var coordinates;
var countDoor = 0;

var beginningMins;
var beginningSecs;

//Status
var status = {};


class Play1 extends Phaser.Scene {

  constructor ()
  {
    super("Play1");
  }

  begin () {
    status.won = false;
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
    status.countDoor = 0;
    beginningMins = 1;
    beginningSecs = 45;
    coordinates = [];
    this.x = 3;
  }


  preload()
  {
    const gameAssets = document.getElementById("game-assets").dataset;

    // Minigames
    this.load.setCORS('anonymous');
    this.load.image("tv", gameAssets.tvImg);
    this.load.image("redBtn", gameAssets.redbtnImg);
    this.load.image("computer", gameAssets.computerImg);
    this.load.image("ring", gameAssets.ringImg);
    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);
    this.load.video("loseEvent1", 'https://breakingout.s3.eu-west-3.amazonaws.com/loss.mp4', 'loadeddata', false);
    this.load.video("wonEvent", 'https://breakingout.s3.eu-west-3.amazonaws.com/youwon.mp4', 'loadeddata', false);
    this.load.audio("digitalLock", gameAssets.digitallockMp3);
    this.load.audio("digitalUnlock", gameAssets.digitalunlockMp3);
    this.load.audio("click", gameAssets.clickMp3);
    this.load.audio("door", gameAssets.doorMp3);
    //end minigames

    //Map
    this.load.tilemapTiledJSON('map1', gameAssets.map1Json);
    this.load.image('tiles1', gameAssets.map1Png);
    //End map

    // this.load.image('ground', gameAssets.platformPng);
    
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
   
    //End Sprite

    this.load.image('exit', gameAssets.exitImg);

    //Endscreen
    // this.load.image('playAgain', gameAssets.playagainPng);
    // this.load.image('winscreen', gameAssets.winscreenPng);
    // this.load.image('lossScreen', gameAssets.lossscreenPng);
    this.load.audio('door', gameAssets.doorMp3);
    //End endscreen

    // Overlay
    const loginAssets = document.getElementById("login").dataset;

    this.load.image("settings", loginAssets.settingsBtn);
    // this.load.video("overlay", loginAssets.overlayVid, false, true);
    // this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);

    const introAssets = document.getElementById("intro").dataset;

    this.load.image("mute", introAssets.muteImg);
    //End overlay

    loadingScreen(this)

  };

  create()
  {
    this.begin();
    this.cameras.main.fadeIn(1000)

    // var video = this.add.video(0, 0, "overlay");
    // video.setDisplaySize(innerWidth*2, innerHeight*2);

    // video.setBlendMode(Phaser.BlendModes.SCREEN);
    // video.play(true);
    // console.log(counterScene);
    // if (counterScene === 0) {
    //   blankState = this.scene;
    //   counterScene++;
    // }

    localStorage.setItem('status', status.text);

    this.platforms = this.physics.add.staticGroup();
    this.map = this.make.tilemap({ key: 'map1', tileWidth: 16, tileHeight: 16 });  //
    // this.layer = this.map.createLayer('ground');  // set layer name
    // this.layer.resizeWorld();
    this.tileset = this.map.addTilesetImage("MainTileMap", 'tiles1');
    this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);
    this.layer = this.map.createLayer('Main Map', this.tileset, 0, 0);
    // this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0);
    this.objectBottom = this.map.createLayer("bottom", this.tileset, 0, 0);
    this.extraObj = this.map.createLayer("extra_obj", this.tileset, 0, 0);
    this.objectTop = this.map.createLayer("top", this.tileset, 0, 0);
    spriteFrame(this, characterCounter);
    character = this.physics.add.sprite(460, 323, `character${characterCounter}`, 0).setSize(15, 2).setOffset(9, 43).setDepth(1);
    this.transparent = this.map.createLayer("transparent", this.tileset, 0, 0).setDepth(2);
    // console.log(testRect);
    // this.collision1 = this.map.createLayer('collision_1', this.tileset, 0, 0);
    // this.collision2 = this.map.createLayer('collision_2', this.tileset, 0, 0);
    // this.collision3 = this.map.createLayer('collision_3', this.tileset, 0, 0);
    // this.collision4 = this.map.createLayer('collision_4', this.tileset, 0, 0);
    // this.collision5 = this.map.createLayer('collision_5', this.tileset, 0, 0);
    // this.collision6 = this.map.createLayer('collision_6', this.tileset, 0, 0);

    // this.walls.setCollisionByExclusion([0, -1, 1]);
    // this.collision1.setCollisionByExclusion([0, -1, 1]);
    // this.collision2.setCollisionByExclusion([0, -1, 1]);
    // this.collision3.setCollisionByExclusion([0, -1, 1]);
    // this.collision4.setCollisionByExclusion([0, -1, 1]);
    // this.collision5.setCollisionByExclusion([0, -1, 1]);
    // this.collision6.setCollisionByExclusion([0, -1, 1]);
    // this.objectBottom.setCollisionByExclusion([0, -1, 1]);

    // character.body.setSize(15, 1);
    // character.setBounce(0.2);
    // character.setCollideWorldBounds(true);
    this.walls.setCollisionFromCollisionGroup();
    this.extraObj.setCollisionFromCollisionGroup();
    this.objectBottom.setCollisionFromCollisionGroup();
    this.objectTop.setCollisionFromCollisionGroup();
    this.transparent.setCollisionFromCollisionGroup();
    // this.secretDoor.setCollisionFromCollisionGroup();
    shapeGraphics = this.add.graphics();

    // drawCollisionShapes(shapeGraphics, this.secretDoor);
    drawCollisionShapes(this, shapeGraphics, this.extraObj);
    drawCollisionShapes(this, shapeGraphics, this.objectBottom);
    drawCollisionShapes(this, shapeGraphics, this.objectTop);
    // drawCollisionShapes(shapeGraphics, this.objectBottom);
    // drawCollisionShapes(shapeGraphics, this.objectTop);

    // this.physics.world.collide(character, this.layer)
    this.physics.add.collider(this.walls, character);
    this.physics.add.collider(this.extraObj, character);
    this.physics.add.collider(this.platforms, character);
    this.physics.add.collider(this.transparent, character);
    // this.physics.add.collider(this.secretDoor, character);
    // this.physics.add.collider(character, this.objectTop);
    // this.physics.add.collider(this.objectBottom, character);

    cursors = this.input.keyboard.createCursorKeys();
    cameraSettings(this, character);
    timerBox(this, status);
    borderInventory(this, status);

    //SETTINGS
    musique = this.sound.add('music');
    sound(this, innerWidth/1.5 - 47, innerHeight/3.05, 35, 35, musique);
    leaveGame(this, musique);
    //END SETTINGS

    items = [
      {x: 400, y: 188, name: 'kitchen-tree', minigame: minigameKitchenTree},
      {x: 400, y: 197, name: 'kitchen-tree', minigame: minigameKitchenTree},
      {x: 304, y: 101, name: 'stove', minigame: minigameSink},
      {x: 336, y: 101, name: 'stove', minigame: minigameSink},
      {x: 400, y: 101, name: 'microwave', minigame: minigameMicrowave},
      {x: 115, y: 183, name: 'sofa', minigame: minigameSofa},
      {x: 116, y: 207, name: 'sofa', minigame: minigameSofa},
      {x: 116, y: 227, name: 'sofa', minigame: minigameSofa},
      {x: 207, y: 217, name: 'cat-tree', minigame: minigameCattree},
      {x: 207, y: 229, name: 'cat-tree', minigame: minigameCattree},
      {x: 40, y: 208, name: 'television', minigame: minigameTV},
      {x: 111, y: 133, name: 'living-library', minigame: minigameLivingLibrary},
      {x: 143, y: 132, name: 'living-library', minigame: minigameLivingLibrary},
      {x: 207, y: 133, name: 'bonsai', minigame: minigameBonsai},
      {x: 239, y: 101, name: 'fridge', minigame: minigameFreezer},
      {x: 641, y: 209, name: 'bath-plant', minigame: minigameBathPlant},
      {x: 722, y: 204, name: 'windbreak', minigame: minigameWindbreak},
      {x: 816, y: 175, name: 'baththub', minigame: minigameBathtub},
      {x: 559, y: 133, name: 'computer', minigame: minigameComputer},
      {x: 527, y: 133, name: 'bookshelf', minigame: minigameRoomLibrary},
      {x: 431, y: 325, name: 'hallway', minigame: minigameHallway},
      {x: 461, y: 295, name: 'door', minigame: minigameDoor},
      {x: 591, y: 249, name: 'aquarium', minigame: minigameFish},
      {x: 336, y: 148, name: 'kettle', minigame: minigameKettle},
      {x: 47, y: 147, name: 'saber', minigame: minigameSaber}
    ];
    //   character.anims.stop();
    interactionObject(this, items, character, status);
    // debugInteraction(this, this.objectTop, character);
    // debugInteraction(this.objectBottom);
    // debugInteraction(this.secretDoor);
    var door = this.sound.add("door");
    var button = this.sound.add("click");
    var digicodeLocked = this.sound.add("digitalLock");
  }

  update ()
  {
    movementSprite(this, character, cursors, characterCounter, status);
    timerLoseScreenDisplay(this, beginningSecs, beginningMins, status, musique, displayLoseScreen, "loseEvent1", "Here you are, officer!");

      //Inventory
    if (status.computerStatus === 'Unlocked' && status.countDoor < 1) {
      this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0).setDepth(0);
      status.countDoor = 1;
    } else if (status.countDoor === 1) {
      camera(this, this.secretDoor, character);
    }

    if (status.inventory != "" && status.inventory != "none") {
      status.borderBox.visible = true;
      status.inventoryBox.visible = true;
    } else {
      status.borderBox.visible = false;
      status.inventoryBox.visible = false;
    }

    if (status.won === true) musique.stop();

    objectDetection(this, character, items, status);

    camera(this, this.walls, character);
    camera(this, this.objectBottom, character);
    camera(this, this.objectTop, character);
    camera(this, this.extraObj, character);
    camera(this, this.layer, character);
    camera(this, this.transparent, character);
  };
};
export { Play1, status, coordinates, musique, character, cursors };
