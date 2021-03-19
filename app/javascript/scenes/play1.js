import { Time } from "phaser";
import { game } from "../channels/game"
import { debugInteraction } from "../components/debugInteraction"
import { drawCollisionShapes } from "../components/drawCollision"
import { timerLooseScreenDisplay } from "../components/timer"
import { movementSprite } from "../components/spriteMovement"
import { spriteFrame } from "../components/spriteFrame"
import { camera } from "../components/cameraOpacity"
import { minigameSofa, minigameKitchenTree, minigameBathPlant, minigameWindbreak, minigameKey, minigameBathtub, minigameBathsink, minigameAltar, minigameBonsai, minigameCattree, minigameComputer, minigameSink, minigameRoomLibrary, minigameKettle, minigameFish, minigameHallway, minigameMicrowave, minigameLivingLibrary, minigameSaber, minigameDoor, minigameTV, minigameFreezer } from "../channels/interactions";

var musique;
var counter;
var character;
var cursors;
var shapeGraphics;
var coordinates;
var countDoor = 0;


//Timer
// var s;
// var m;
// var ms;
// var endTime;
var beginningMins;
var beginningSecs;
var timer;
var now;
//EndTimer

//Status
var status = {};

//Inventory
var borderBox;
var inventoryBox;
var t = 0;

class Play1 extends Phaser.Scene {

  constructor ()
  {
    super("Play1");
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

    beginningMins = 1;
    beginningSecs = 45;

    // then = 0;
    // mins = "";
    // sec = "";
    // milli = "";
    counter = 0;
    coordinates = [];
  }


  preload()
  {
    const gameAssets = document.getElementById("game-assets").dataset;

    this.load.image("tv", gameAssets.tvImg);
    this.load.image("redBtn", gameAssets.redbtnImg);
    this.load.image("computer", gameAssets.computerImg);
    this.load.image("ring", gameAssets.ringImg);
    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);
    this.load.tilemapTiledJSON('map', gameAssets.mapJson);
    this.load.image('tiles', gameAssets.mapPng);
    // this.load.image('ground', gameAssets.platformPng);
    this.load.image('exit', gameAssets.exitImg);
    this.load.spritesheet('character', gameAssets.policemanSprite, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image('playAgain', gameAssets.playagainPng);
    this.load.image('winscreen', gameAssets.winscreenPng);
    this.load.image('lostscreen', gameAssets.lostscreenPng);
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
    // console.log(counterScene);
    // if (counterScene === 0) {
    //   blankState = this.scene;
    //   counterScene++;
    // }

    localStorage.setItem('status', status.text);

    this.platforms = this.physics.add.staticGroup();
    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });  //
    // this.layer = this.map.createLayer('ground');  // set layer name
    // this.layer.resizeWorld();
    this.tileset = this.map.addTilesetImage("MainTileMap", 'tiles');
    this.walls = this.map.createLayer("Walls", this.tileset, 0, 0);
    this.layer = this.map.createLayer('Main Map', this.tileset, 0, 0);
    // this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0);
    this.objectBottom = this.map.createLayer("bottom", this.tileset, 0, 0);
    this.extraObj = this.map.createLayer("extra_obj", this.tileset, 0, 0);
    this.objectTop = this.map.createLayer("top", this.tileset, 0, 0);
    // const testRect = this.add.rectangle(460, 323, 50, 100, 0xFFFFFF);
    character = this.physics.add.sprite(460, 323, "character").setSize(15, 2).setOffset(9, 43).setDepth(1);
    this.transparent = this.map.createLayer("transparent", this.tileset, 0, 0).setDepth(2);
    // console.log(testRect);
    // this.collision1 = this.map.createLayer('collision_1', this.tileset, 0, 0);
    // this.collision2 = this.map.createLayer('collision_2', this.tileset, 0, 0);
    // this.collision3 = this.map.createLayer('collision_3', this.tileset, 0, 0);
    // this.collision4 = this.map.createLayer('collision_4', this.tileset, 0, 0);
    // this.collision5 = this.map.createLayer('collision_5', this.tileset, 0, 0);
    // this.collision6 = this.map.createLayer('collision_6', this.tileset, 0, 0);
    // this.collision1.visible = false;
    // this.collision2.visible = false;
    // this.collision3.visible = false;
    // this.collision4.visible = false;
    // this.collision5.visible = false;
    // this.collision6.visible = false;

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
    spriteFrame(this);
    // this.physics.world.collide(character, this.layer)
    this.physics.add.collider(this.walls, character);
    this.physics.add.collider(this.extraObj, character);
    this.physics.add.collider(this.platforms, character);
    this.physics.add.collider(this.transparent, character);
    // this.physics.add.collider(this.secretDoor, character);
    // this.physics.add.collider(character, this.objectTop);
    // this.physics.add.collider(this.objectBottom, character);

    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, 1000, 1000);
    this.cameras.main.zoom = 2.5;
    this.cameras.main.startFollow(character);

    //Timer
    var chrono = this.add.graphics();
    chrono.fillStyle(0x000000);
    chrono.fillRect(innerWidth/1.75, innerHeight/1.57, 100, 50).setScrollFactor(0)

    timer = this.add.text(innerWidth/1.75, innerHeight/1.57, "", { color: '#FFFFFF', font: "24px" }).setScrollFactor(0)
    //End Timer

    //Inventory
    borderBox = this.add.graphics().setScrollFactor(0);
    borderBox.fillStyle(0xFFFFFF);
    borderBox.fillRect(innerWidth/3.3 - 1, innerHeight/3.3 - 1, 52, 52);
    borderBox.visible = false;
    inventoryBox = this.add.graphics().setScrollFactor(0);
    inventoryBox.fillStyle(0x000000)
    inventoryBox.fillRect(innerWidth/3.3, innerHeight/3.3, 50, 50);
    inventoryBox.visible = false;
    //End Inventory

    //SETTINGS
    const unmute = this.add.image(innerWidth/1.5 -47, innerHeight/3.05, "volume").setInteractive().setDepth(2).setScrollFactor(0);
    unmute.setDisplaySize(35,35);
    unmute.setVisible(true);

    var mute = this.add.image(innerWidth/1.5 - 47, innerHeight/3.05, "mute").setInteractive().setDepth(2).setScrollFactor(0);
    mute.setDisplaySize(35,35);
    mute.setVisible(false);

    musique = this.sound.add('music');
    musique.setVolume(0.3);
    musique.play();
    unmute.on("pointerup", (event) => {
      musique.pause();
      mute.setVisible(true);
      unmute.setVisible(false);
    });


    mute.on("pointerup", (event) => {
      unmute.setVisible(true);
      mute.setVisible(false);
      musique.resume();
    });

    const exit = this.add.image(innerWidth/1.5, innerHeight/3.05, 'exit').setInteractive().setDepth(2).setScrollFactor(0);
    exit.setDisplaySize(35,35);

    exit.on("pointerup", (event) => {
     this.scene.stop();
     this.scene.start('Login');
     this.begin();
     musique.stop();
   });

    //END SETTINGS

  const items = [
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
    // this.input.keyboard.on("keydown-SPACE", () => {
    //   character.anims.stop();
    //   if (Range(0,88).includes(Math.round(character.x)) && Range(78,178).includes(Math.round(character.y))) {
    //     minigameSaber(this);
    //     minigame = "active";
    //   }
    // });
    this.input.keyboard.on("keydown-SPACE", () => {
      var counter = 0;
      items.forEach ((item) => {
        var distBetween = Phaser.Math.Distance.Between(
          character.x,
          character.y,
          item.x,
          item.y
        );
        if (distBetween < 30 && counter < 1 && status.minigame != "active") {
          const end = () => {
            status.minigame = "none";
          }
          status.minigame = "active";
          console.log(status.minigame);
          item.minigame(this, end);
          counter++;
        }
      });

    });
    // debugInteraction(this, this.objectTop, character);
    // debugInteraction(this.objectBottom);
    // debugInteraction(this.secretDoor);
  };

  update ()
  {
    movementSprite(this);
    timerLooseScreenDisplay(this, beginningSecs, beginningMins);

      //Inventory
    if (status.computerStatus === 'Unlocked' && countDoor < 1) {
      this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0).setDepth(0);
      countDoor = 1;
    } else if (countDoor === 1) {
      camera(this, this.secretDoor, character);
    }

    if (status.inventory != "" && status.inventory != "none") {
      borderBox.visible = true;
      inventoryBox.visible = true;
    } else {
      borderBox.visible = false;
      inventoryBox.visible = false;
    }
    camera(this, this.walls, character);
    camera(this, this.objectBottom, character);
    camera(this, this.objectTop, character);
    camera(this, this.extraObj, character);
    camera(this, this.layer, character);
    camera(this, this.transparent, character);
  };
};
export { Play1, status, coordinates, musique, timer, character, cursors };
