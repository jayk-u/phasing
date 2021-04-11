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
import { minigameSofa, minigameKitchenTree, minigameBathPlant, minigameWindbreak, minigameKey, minigameBathtub, minigameBathsink, minigameAltar, minigameBonsai, minigameCattree, minigameComputer, minigameSink, minigameRoomLibrary, minigameKettle, minigameFish, minigameHallway, minigameMicrowave, minigameLivingLibrary, minigameSaber, minigameDoor, minigameTV, minigameFreezer } from "../channels/interactions";

var particles
var musique;
var character;
var cursors;
var shapeGraphics;
var coordinates;
var agent
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
    this.load.image("tv", gameAssets.tvImg);
    this.load.image("redBtn", gameAssets.redbtnImg);
    this.load.image("computer", gameAssets.computerImg);
    this.load.image("ring", gameAssets.ringImg);
    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);
    //end minigames

    //Map
    this.load.tilemapTiledJSON('map', gameAssets.map2Json);
    this.load.image('tiles', gameAssets.map2Png);
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
    this.load.image('lostscreen', gameAssets.lostscreenPng);
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
    this.add.rectangle(0, 0, 10000, 10000, 0x000000, 0.3).setDepth(10);


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
    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    // this.layer = this.map.createLayer('ground');  // set layer name
    // this.layer.resizeWorld();
    this.tileset = this.map.addTilesetImage("city", 'tiles');
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
    // We are creating a default value "agent" for this.agent should we want every single agent to shara a property, we can interfere with agent here
    agent = this.physics.add.sprite(0, 0, `character6`, 6).setSize(15, 2).setOffset(9, 43).setDepth(1)
    // the default value function, using a proxy
    var agentCreator = {
      get: function(target, name) {
        return target.hasOwnProperty(name) ? target[name] : agent;
      }
    };
    // We are attributing the new proxy to this.agent so that we can call it with a default value (i.e. this.agent.Nicolas will automatically get assigned the value agent)
    this.agent = new Proxy({}, agentCreator);
    this.agent.john.setPosition(290, 600)
    //End NPC

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
    // this.promenade.setCollisionFromCollisionGroup();
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
    this.physics.add.collider(agent, character);
    this.physics.add.collider(this.walls, character);
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
    particles = this.add.particles('rain').createEmitter({"active":true,"blendMode":3,"collideBottom":true,"collideLeft":true,"collideRight":true,"collideTop":true,"deathCallback":null,"deathCallbackScope":null,"emitCallback":null,"emitCallbackScope":null,"follow":null,"frequency":0,"gravityX":300,"gravityY":0,"maxParticles":50,"name":"raindrops","on":true,"particleBringToTop":true,"radial":true,"timeScale":1,"trackVisible":false,"visible":true,"accelerationX":0,"accelerationY":0,"angle":{"min":360,"max":0},"alpha":{"start":0.4,"end":1,"ease":"Quad.easeIn"},"bounce":0,"delay":0,"lifespan":200,"maxVelocityX":5000,"maxVelocityY":5000,"moveToX":0,"moveToY":0,"quantity":1,"rotate":0,"tint":16777215,"x":character.x,"y":character.y,"speed":{"min":0,"max":220},"scale":{"start":0,"end":1.3,"ease":"Cubic.easeInOut"}});
    //End rain

    //SETTINGS
    musique = game.sound.add('music');
    sound(this, musique);
    leaveGame(this, musique);
    //END SETTINGS

    const items = [
      // {x: 400, y: 188, name: 'kitchen-tree', minigame: minigameKitchenTree},
    ];
    //   character.anims.stop();
    interactionObject(this, items, character, status);
    // debugInteraction(this, this.objectTop, character);
    // debugInteraction(this.objectBottom);
    // debugInteraction(this.secretDoor);
  }

  update ()
  {
    movementSprite(this, character, cursors, characterCounter, status);
    timerLoseScreenDisplay(this, beginningSecs, beginningMins, status, musique, displayLoseScreen);
    particles.setPosition(character.x, character.y);

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
    hideNPC(this, this.layer, agent, character)
    // camera(this, this.transparent, character);
  };
};
export { Play2, status, coordinates, musique, character, cursors };
