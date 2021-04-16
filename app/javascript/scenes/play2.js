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
import { minigameBoat,
  minigameBuildingDoor,
  minigameContainer,
  minigameDocksLadder,
  minigameLightPillar,
  minigameMap,
  minigameOfficeDoor,
  minigamePillar,
  minigameRamenDoor,
  minigameRoofLadder,
  minigameStreetLamp,
  minigameStreetPlants,
  minigameSupermarketDoor,
  minigameTourismDoor,
} from "../channels/play2interactions"

var rainParticles
var musique;
var character;
var cursors;
var shapeGraphics;
var coordinates;
var bridgeCollision;
var countDoor = 0;

var beginningMins;
var beginningSecs;

//Status
var status = {};

class Play2 extends Phaser.Scene {

  constructor ()
  {
    super("Play2");
  }

  begin () {
    status.bridge = ""
    status.detect = false;
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
    beginningMins = 3;
    beginningSecs = 30;
    coordinates = [];
    this.x = 3;
  }


  preload()
  {
    const gameAssets = document.getElementById("game-assets").dataset;

    // Minigames
    this.load.image("tv", gameAssets.tvImg);
    this.load.image("redBtn", gameAssets.redbtnImg);
    this.load.image("computer", gameAssets.computerImg);
    this.load.image("ring", gameAssets.ringImg);
    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);
    this.load.image("container", gameAssets.containerImg);
    //end minigames

    //Map
    this.load.tilemapTiledJSON('map2', gameAssets.map2Json);
    this.load.image('tiles2', gameAssets.map2Png);
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
    }
    //End Sprite

    this.load.spritesheet("character6", gameAssets.character6Sprite, {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image('exit', gameAssets.exitImg);

    //Endscreen
    this.load.image('playAgain', gameAssets.playagainPng);
    this.load.image('winscreen', gameAssets.winscreenPng);
    this.load.image('lossScreen', gameAssets.lossscreenPng);
    this.load.audio('door', gameAssets.doorMp3);
    //End endscreen

    // Overlay
    const loginAssets = document.getElementById("login").dataset;

    this.load.image("settings", loginAssets.settingsBtn);
    this.load.video("overlay", loginAssets.overlayVid, false, true);
    this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);

    const introAssets = document.getElementById("intro").dataset;

    this.load.image("mute", introAssets.muteImg);
    //End overlay

    this.load.image("rain", gameAssets.rainParticle)

  };

  create()
  {
    this.begin();
    this.cameras.main.fadeIn(1000)
    this.add.rectangle(0, 0, 10000, 10000, 0x000000, 0.2).setDepth(10);


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
    this.map = this.make.tilemap({ key: 'map2', tileWidth: 16, tileHeight: 16 });
    // this.layer = this.map.createLayer('ground');  // set layer name
    // this.layer.resizeWorld();
    this.tileset = this.map.addTilesetImage("city", 'tiles2');
    this.dock = this.map.createLayer("dock", this.tileset, 0, 0);
    this.promenade = this.map.createLayer("promenade", this.tileset, 0, 0);
    this.walls = this.map.createLayer("wall", this.tileset, 0, 0).setDepth(1);
    this.bridge = this.map.createLayer("bridge", this.tileset, 0, 0).setDepth(1);
    this.dockWalls = this.map.createLayer("dock_wall", this.tileset, 0, 0).setDepth(1);
    this.promenadeWalls = this.map.createLayer("promenade_wall", this.tileset, 0, 0).setDepth(1);
    this.promenadeShops = this.map.createLayer("promenade_shops", this.tileset, 0, 0).setDepth(1);
    this.layer = this.map.createLayer('floor', this.tileset, 0, 0);
    // this.layer.resizeWorld();
    // this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0);
    this.objectBottom = this.map.createLayer("floor_objects", this.tileset, 0, 0).setDepth(2);
    this.extraObj = this.map.createLayer("dock_objects", this.tileset, 0, 0).setDepth(2);
    this.objectTop = this.map.createLayer("roof_objects", this.tileset, 0, 0).setDepth(1);
    this.gameObjects = this.map.getObjectLayer("GameObjects").objects;
    //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
    spriteFrame(this, characterCounter);
    character = this.physics.add.sprite(450, 450, `character${characterCounter}`, 0).setSize(15, 2).setOffset(9, 43).setDepth(1);

    //NPC
    spriteFrame(this, 6);
    this.agent = {
      john: this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1),
      mike: this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1),
      bob: this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1),
      tom: this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1),
      rob: this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1),
      roger: this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1),
    }
    this.agent.john.setPosition(290, 600)
    this.agent.mike.setPosition(780, 520).anims.play('left6end', true)
    this.agent.bob.setPosition(465, 775).anims.play('left6end', true)
    this.agent.tom.setPosition(430, 1240).anims.play('up6end', true).anims.stop();
    this.agent.rob.setPosition(360, 1240).anims.play('up6end', true).anims.stop();
    this.agent.roger.setPosition(170, 885).anims.play('right6end', true).anims.stop();
    Object.values(this.agent).forEach(agent => {agent.setPushable(false)});
    //End NPC
    this.input.keyboard.on('keydown-SPACE', () => {
      console.log(character.x, character.y)
    })

    // this.transparent = this.map.createLayer("transparent", this.tileset, 0, 0).setDepth(2);
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
    // this.dock.setCollisionFromCollisionGroup();
    // this.promenade.setCollisionFromCollisionGroup()
    this.bridge.setCollisionFromCollisionGroup();
    this.walls.setCollisionFromCollisionGroup();
    this.dockWalls.setCollisionFromCollisionGroup();
    this.promenadeWalls.setCollisionFromCollisionGroup();
    this.promenadeShops.setCollisionFromCollisionGroup();
    this.extraObj.setCollisionFromCollisionGroup();
    this.objectBottom.setCollisionFromCollisionGroup();
    this.objectTop.setCollisionFromCollisionGroup();
    // this.transparent.setCollisionFromCollisionGroup();
    // this.secretDoor.setCollisionFromCollisionGroup();
    shapeGraphics = this.add.graphics();

    // drawCollisionShapes(shapeGraphics, this.secretDoor);
    drawCollisionShapes(this, shapeGraphics, this.extraObj, coordinates);
    drawCollisionShapes(this, shapeGraphics, this.objectBottom, coordinates);
    drawCollisionShapes(this, shapeGraphics, this.objectTop, coordinates);

    // this.physics.world.collide(character, this.layer)
    Object.values(this.agent).forEach(agent => {this.physics.add.collider(agent, character)});
    this.physics.add.collider(this.walls, character);
    bridgeCollision = this.physics.add.collider(this.bridge, character);
    this.physics.add.collider(this.dockWalls, character);
    this.physics.add.collider(this.promenadeWalls, character);
    this.physics.add.collider(this.promenadeShops, character);
    // this.physics.add.collider(this.extraObj, character);
    this.physics.add.collider(this.platforms, character);
    // this.physics.add.collider(this.transparent, character);
    // this.physics.add.collider(this.secretDoor, character);
    // this.physics.add.collider(character, this.objectTop);
    // this.physics.add.collider(this.objectBottom, character);

    cursors = this.input.keyboard.createCursorKeys();
    cameraSettings(this, character);
    timerBox(this, status);
    borderInventory(this, status);

    // Rain
    rainParticles = this.add.particles('rain').createEmitter({"active":true,"blendMode":3,"collideBottom":true,"collideLeft":true,"collideRight":true,"collideTop":true,"deathCallback":null,"deathCallbackScope":null,"emitCallback":null,"emitCallbackScope":null,"follow":null,"frequency":0,"gravityX":300,"gravityY":0,"maxParticles":50,"name":"raindrops","on":true,"particleBringToTop":true,"radial":true,"timeScale":1,"trackVisible":false,"visible":true,"accelerationX":0,"accelerationY":0,"angle":{"min":360,"max":0},"alpha":{"start":0.4,"end":1,"ease":"Quad.easeIn"},"bounce":0,"delay":0,"lifespan":200,"maxVelocityX":5000,"maxVelocityY":5000,"moveToX":0,"moveToY":0,"quantity":1,"rotate":0,"tint":16777215,"x":character.x,"y":character.y,"speed":{"min":0,"max":220},"scale":{"start":0,"end":1.3,"ease":"Cubic.easeInOut"}});
    //End rain

    //SETTINGS
    musique = game.sound.add('music');
    sound(this, musique);
    leaveGame(this, musique);
    //END SETTINGS

    const items = [
      {x: 115, y: 1000, name: 'boat', minigame: minigameBoat},
      {x: 715, y: 845, name: 'buildingDoor', minigame: minigameBuildingDoor},
      {x: 655, y: 990, name: 'container', minigame: minigameContainer},
      {x: 750, y: 975, name: 'docksLadder', minigame: minigameDocksLadder},
      {x: 270, y: 875, name: 'lightPillar', minigame: minigameLightPillar},
      {x: 125, y: 850, name: 'map', minigame: minigameMap},
      {x: 750, y: 495, name: 'officeDoor', minigame: minigameOfficeDoor},
      {x: 525, y: 550, name: 'pillar', minigame: minigamePillar},
      {x: 620, y: 495, name: 'ramenDoor', minigame: minigameRamenDoor},
      {x: 300, y: 615, name: 'roofLadder', minigame: minigameRoofLadder},
      {x: 45, y: 995, name: 'streetLamp', minigame: minigameStreetLamp},
      {x: 580, y: 555, name: 'streetPlants', minigame: minigameStreetPlants},
      {x: 545, y: 875, name: 'supermarketDoor', minigame: minigameSupermarketDoor},
      {x: 210, y: 845, name: 'tourismDoor', minigame: minigameTourismDoor},
    ];
    //   character.anims.stop();
    interactionObject(this, items, character, status);
    // debugInteraction(this, this.objectTop, character);
    // debugInteraction(this, this.objectBottom, character);
    // debugInteraction(this.secretDoor);
  }

  update ()
  {
    movementSprite(this, character, cursors, characterCounter, status);
    timerLoseScreenDisplay(this, beginningSecs, beginningMins, status, musique, displayLoseScreen, "Lockdown complete! Suspect is around, renforcement incoming!");
    rainParticles.setPosition(character.x, character.y);

    // Bridge walls behavior - used because depth changes depending on location
    if (character.y >= 831 && character.y <= 833 && character.x > 295 && character.x < 315 && character.frame.name >= 13 && character.frame.name <= 15) {
      this.bridge.setDepth(1);
      this.layer.setDepth(0);
      this.walls.setDepth(1);
      this.physics.world.colliders.add(bridgeCollision);
    } else if (character.y >= 831 && character.y <= 833 && character.x > 295 && character.x < 315 && character.frame.name >= 1 && character.frame.name <= 3) {
      this.bridge.setDepth(2);
      this.layer.setDepth(2);
      this.walls.setDepth(2);
      this.physics.world.removeCollider(bridgeCollision);
    }
    
    if (status.minigame != 'active') {

      // John the Destroyer
      if (this.agent.john.x <= 350 && this.agent.john.y < 670) {
        //Here X is the upper left corner
        this.agent.john.setVelocityX(0);
        this.agent.john.setVelocityY(45);
        this.agent.john.anims.play(`down6`, true);
      } else if (this.agent.john.x >= 490 && this.agent.john.y >= 670) {
        // Here X is the lower right corner
        this.agent.john.setVelocityX(0);
        this.agent.john.setVelocityY(-45);
        this.agent.john.anims.play(`up6`, true);
      } else if (this.agent.john.y <= 580 && this.agent.john.x <= 500) {
        // Here Y is the upper right corner
        this.agent.john.setVelocityY(0);
        this.agent.john.setVelocityX(-45);
        this.agent.john.anims.play(`left6`, true);
      } else if (this.agent.john.y >= 670 && this.agent.john.x < 350) {
        // Here Y is the lower left corner
        this.agent.john.setVelocityY(0);
        this.agent.john.setVelocityX(45);
        this.agent.john.anims.play(`right6`, true);
      }

      // Mike the Egoistic
      if (this.agent.mike.anims.currentAnim.key === 'down6end') {
        this.time.delayedCall(3000, () => {
          if (status.minigame != 'active') this.agent.mike.anims.play('left6end', true);
          this.agent.mike.anims.stop();
        });
      } else if (this.agent.mike.anims.currentAnim.key === 'left6end') {
        this.time.delayedCall(3000, () => {
          if (status.minigame != 'active') this.agent.mike.anims.play('down6end', true);
          this.agent.mike.anims.stop();
        });
      }

      // Roger the Undetectable
      if (this.agent.roger.anims.currentAnim.key === 'right6end') {
        this.time.delayedCall(3000, () => {
          if (status.minigame != 'active') this.agent.roger.anims.play('left6end', true);
          this.agent.roger.anims.stop();
        });
      } else if (this.agent.roger.anims.currentAnim.key === 'left6end') {
        this.time.delayedCall(3000, () => {
          if (status.minigame != 'active') this.agent.roger.anims.play('right6end', true);
          this.agent.roger.anims.stop();
        });
      }

      // Bob the Stealthy
      if (this.agent.bob.anims.currentAnim.key === 'up6end') {
        this.time.delayedCall(3000, () => {
          if (status.minigame != 'active') this.agent.bob.anims.play('left6end', true);
          this.agent.bob.anims.stop();
        });
      } else if (this.agent.bob.anims.currentAnim.key === 'left6end') {
        this.time.delayedCall(3000, () => {
          if (status.minigame != 'active') this.agent.bob.anims.play('up6end', true);
          this.agent.bob.anims.stop();
        });
      }

      Object.values(this.agent).forEach(agent => {detectCharacter(this, this.layer, agent, character, displayLoseScreen, "Suspect in sight! Requesting renforcement!")});
    }


    

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
    camera(this, this.walls, character);
    camera(this, this.bridge, character);
    camera(this, this.dockWalls, character);
    camera(this, this.promenadeWalls, character);
    camera(this, this.promenadeShops, character);
    camera(this, this.dock, character);
    camera(this, this.promenade, character);
    camera(this, this.objectBottom, character);
    camera(this, this.objectTop, character);
    camera(this, this.extraObj, character);
    camera(this, this.layer, character);
    Object.values(this.agent).forEach(agent => {hideNPC(this, this.layer, agent, character)});
    // camera(this, this.transparent, character);
  };
};
export { Play2, status, coordinates, musique, character, cursors };
