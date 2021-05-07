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
  minigameManHole,
  minigameBridgeEnd,
  minigameWareHouse,
  minigameGenerator,
} from "../channels/play2interactions"

var rainParticles
var musique;
var character;
var cursors;
var shapeGraphics;
var coordinates;
// var hidden;
var countDoor = 0;

var beginningMins;
var beginningSecs;

//Status
var status = {};

//Bridge
const upBridge = (game) => {
  game.bridge.setDepth(1);
  game.floorBridge.setDepth(0);
  game.walls.setDepth(1);
  if (!status.bridgeCollision.active) {
    game.physics.world.colliders.add(status.bridgeCollision);
    status.bridgeCollision.active = true
    game.physics.world.removeCollider(status.hiddenCollision);
  }
};
const downBridge = (game) => {
  game.bridge.setDepth(2);
  game.floorBridge.setDepth(2);
  game.walls.setDepth(2);
  if (status.bridgeCollision.active) {
    game.physics.world.removeCollider(status.bridgeCollision);
    status.bridgeCollision.active = false
    if (!status.hiddenCollision) status.hiddenCollision = game.physics.add.collider(game.hiddenWalls, character);
    else game.physics.world.colliders.add(status.hiddenCollision);
  }
};

class Play2 extends Phaser.Scene {

  constructor ()
  {
    super("Play2");
  }

  begin () {
    status.read = false;
    status.bridgeCollision = false;
    status.electricity = false;
    status.roofLadderCount = 0;
    status.manhole = "";
    status.hiddenCollision = false;
    status.bridge = "";
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
    this.load.image("fuel", gameAssets.fuelImg);
    this.load.image("computer", gameAssets.computerImg);
    this.load.image("ring", gameAssets.ringImg);
    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);
    this.load.image("container", gameAssets.containerImg);
    this.load.image("note", gameAssets.blanknoteImg);
    this.load.image("clueMap", gameAssets.dockscluemapImg);
    this.load.image("generator", gameAssets.generatorImg);
    this.load.image("electricity", gameAssets.electricityImg);
    this.load.image("warehouse", gameAssets.warehouseImg);
    this.load.image("scratchticket", gameAssets.scratchticketImg);
    this.load.image("blanknote", gameAssets.blanknoteImg)
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
    } else if (characterCounter === 3) {
      this.load.spritesheet("character3", gameAssets.character7Sprite, {
        frameWidth: 32,
        frameHeight: 48,
      });
    } else if (characterCounter === 4) {
      this.load.spritesheet("character2", gameAssets.character8Sprite, {
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
    this.visibleWalls = this.physics.add.staticGroup();
    this.hiddenWalls = this.physics.add.staticGroup();

    this.map = this.make.tilemap({ key: 'map2', tileWidth: 16, tileHeight: 16 });
    // this.layer = this.map.createLayer('ground');  // set layer name
    // this.layer.resizeWorld();
    this.tileset = this.map.addTilesetImage("city", 'tiles2');
    this.layer = this.map.createLayer('floor', this.tileset, 0, 0).setDepth(0);
    this.floorBridge = this.map.createLayer('floor_bridge', this.tileset, 0, 0);
    this.redBoat = this.map.createLayer("red_boat", this.tileset, 0, 0).setDepth(3);
    this.hidden = this.map.createLayer("hidden", this.tileset, 0, 0).setDepth(0).setVisible(false);
    // this.layer.resizeWorld();
    // this.secretDoor = this.map.createLayer("Secret Door", this.tileset, 0, 0);
    this.building = this.map.createLayer("building", this.tileset, 0, 0).setDepth(0);
    this.warehouseClosed = this.map.createLayer("warehouse_closed", this.tileset, 0, 0).setDepth(0);
    this.warehouseOpened = this.map.createLayer("warehouse_open", this.tileset, 0, 0).setDepth(0).setVisible(false);
    this.decorationBuilding = this.map.createLayer("decoration_building", this.tileset, 0, 0).setDepth(0);
    this.decorationRooftop = this.map.createLayer("rooftop_decoration", this.tileset, 0, 0).setDepth(0.5);
    this.dockWalls = this.map.createLayer("dock_wall", this.tileset, 0, 0).setDepth(0);
    this.floorObjects = this.map.createDynamicLayer("floor_objects", this.tileset, 0, 0).setDepth(0.5);
    this.plant = this.map.createLayer("plant", this.tileset, 0, 0).setDepth(1);
    this.bridge = this.map.createLayer("bridge_walls", this.tileset, 0, 0).setDepth(2);
    this.docksTop = this.map.createLayer("docks_top", this.tileset, 0, 0).setDepth(2);
    this.objectBottom = this.map.createLayer("object_bottom", this.tileset, 0, 0).setDepth(2);
    this.rooftopUpperWalls = this.map.createLayer("rooftop_upperwalls", this.tileset, 0, 0).setDepth(2);
    this.hiddenRooftop = this.map.createLayer("hidden_rooftop_collisions", this.tileset, 0, 0).setDepth(0);
    this.railing = this.map.createLayer("railing", this.tileset, 0, 0).setDepth(0);
    this.railing2 = this.map.createLayer("railing2", this.tileset, 0, 0).setDepth(0);
    this.ladder = this.map.createLayer("ladder_bottom", this.tileset, 0, 2);
    this.ladderTop = this.map.createLayer("ladder_top", this.tileset, 0, 2).setDepth(2);
    this.dockObjects = this.map.createLayer("dock_objects", this.tileset, 0, 0).setDepth(2);
    this.manHole = this.map.createLayer("man_hole", this.tileset, 0, 0).setDepth(0);
    this.shadow = this.map.createLayer("shadow", this.tileset, 0, 0).setDepth(0);
    this.walls = this.map.createLayer("walls", this.tileset, 0, 0).setDepth(2);
    this.overheadBuilding = this.map.createLayer("overhead_building", this.tileset, 0, 0).setDepth(2);
    this.overheadBuildingDecoration = this.map.createLayer("overhead_building_decoration", this.tileset, 0, 0).setDepth(2);
    this.gameObjects = this.map.getObjectLayer("GameObjects").objects;
    //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
    spriteFrame(this, characterCounter);
    character = this.physics.add.sprite(430, 480, `character${characterCounter}`, 0).setSize(15, 2).setOffset(9, 43).setDepth(1);
    // 430, 480
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
    this.agent.roger.setPosition(150, 885).anims.play('right6end', true).anims.stop();
    Object.values(this.agent).forEach(agent => {agent.setPushable(false)});
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
    // this.promenade.setCollisionFromCollisionGroup()
    this.walls.setCollisionFromCollisionGroup();
    this.dockWalls.setCollisionFromCollisionGroup();
    this.floorObjects.setCollisionFromCollisionGroup();
    this.objectBottom.setCollisionFromCollisionGroup();
    this.rooftopUpperWalls.setCollisionFromCollisionGroup();

    // this.transparent.setCollisionFromCollisionGroup();
    // this.secretDoor.setCollisionFromCollisionGroup();
    shapeGraphics = this.add.graphics();

    // drawCollisionShapes(shapeGraphics, this.secretDoor);
    // drawCollisionShapes(this, shapeGraphics, this.dockWalls);
    drawCollisionShapes(this, shapeGraphics, this.walls);
    drawCollisionShapes(this, shapeGraphics, this.building);
    drawCollisionShapes(this, shapeGraphics, this.dockWalls);
    drawCollisionShapes(this, shapeGraphics, this.objectBottom);
    drawCollisionShapes(this, shapeGraphics, this.docksTop);
    drawCollisionShapes(this, shapeGraphics, this.rooftopUpperWalls, "hidden");
    drawCollisionShapes(this, shapeGraphics, this.overheadBuilding);
    drawCollisionShapes(this, shapeGraphics, this.floorObjects);
    drawCollisionShapes(this, shapeGraphics, this.railing);
    drawCollisionShapes(this, shapeGraphics, this.railing2);
    drawCollisionShapes(this, shapeGraphics, this.decorationBuilding);
    drawCollisionShapes(this, shapeGraphics, this.decorationRooftop);
    drawCollisionShapes(this, shapeGraphics, this.warehouseClosed);

//     drawCollisionShapes(this, shapeGraphics, this.extraObj);
    drawCollisionShapes(this, shapeGraphics, this.hidden, "hidden");
//     drawCollisionShapes(this, shapeGraphics, this.objectBottom);
//     drawCollisionShapes(this, shapeGraphics, this.objectTop);
//     drawCollisionShapes(this, shapeGraphics, this.dockWalls);
//     drawCollisionShapes(this, shapeGraphics, this.promenadeWalls);
//     drawCollisionShapes(this, shapeGraphics, this.promenadeShops);
//     drawCollisionShapes(this, shapeGraphics, this.walls);
    drawCollisionShapes(this, shapeGraphics, this.bridge, "visible");
    drawCollisionShapes(this, shapeGraphics, this.hiddenRooftop, "visible");
    drawCollisionShapes(this, shapeGraphics, this.overheadBuilding);
    // this.physics.add.collider(this.dockWalls, character);
    // this.physics.add.collider(this.promenadeWalls, character);
    // this.physics.add.collider(this.promenadeShops, character);

    this.worldBounds = this.physics.world.setBounds(0, 0, 800, 1280, true, true, true, true);
    character.setCollideWorldBounds(true);
    
    // this.physics.world.collide(character, this.layer)
    Object.values(this.agent).forEach(agent => {this.physics.add.collider(agent, character)});
    // this.physics.add.collider(this.walls, character);
//     drawCollisionShapes(this, shapeGraphics, this.bridge);
//     console.log(this.walls)
    // status.bridgeCollision = this.physics.add.collider(this.bridge, character);
    // this.physics.add.collider(this.dockWalls, character);
    this.physics.add.collider(this.platforms, character);
    status.bridgeCollision = this.physics.add.collider(this.visibleWalls, character);
    // this.physics.add.collider(this.promenadeWalls, character);
    // this.physics.add.collider(this.promenadeShops, character);
    // this.physics.add.collider(this.extraObj, character);
    // this.physics.add.collider(this.transparent, character);
    // this.physics.add.collider(this.secretDoor, character);
    // this.physics.add.collider(character, this.objectTop);
    // this.physics.add.collider(this.objectBottom, character);

    cursors = this.input.keyboard.createCursorKeys();
    cameraSettings(this, character);
    timerBox(this, status);
    borderInventory(this, status);

    // Rain
    var rainParticle = this.add.particles('rain')
    rainParticles = rainParticle.createEmitter({"active":true,"blendMode":3,"collideBottom":true,"collideLeft":true,"collideRight":true,"collideTop":true,"deathCallback":null,"deathCallbackScope":null,"emitCallback":null,"emitCallbackScope":null,"follow":null,"frequency":0,"gravityX":300,"gravityY":0,"maxParticles":50,"name":"raindrops","on":true,"particleBringToTop":true,"radial":true,"timeScale":1,"trackVisible":false,"visible":true,"accelerationX":0,"accelerationY":0,"angle":{"min":360,"max":0},"alpha":{"start":0.4,"end":1,"ease":"Quad.easeIn"},"bounce":0,"delay":0,"lifespan":200,"maxVelocityX":5000,"maxVelocityY":5000,"moveToX":0,"moveToY":0,"quantity":1,"rotate":0,"tint":16777215,"x":character.x,"y":character.y,"speed":{"min":0,"max":220},"scale":{"start":0,"end":1.3,"ease":"Cubic.easeInOut"}});
    rainParticle.setDepth(4);
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
      {x: 750, y: 935, name: 'docksLadder', minigame: minigameDocksLadder},
      {x: 270, y: 875, name: 'lightPillar', minigame: minigameLightPillar},
      {x: 125, y: 850, name: 'map', minigame: minigameMap},
      {x: 750, y: 495, name: 'officeDoor', minigame: minigameOfficeDoor},
      {x: 525, y: 550, name: 'pillar', minigame: minigamePillar},
      {x: 620, y: 495, name: 'ramenDoor', minigame: minigameRamenDoor},
      {x: 300, y: 615, name: 'roofLadder', minigame: minigameRoofLadder},
      {x: 280, y: 615, name: 'roofLadder', minigame: minigameRoofLadder},
      {x: 45, y: 995, name: 'streetLamp', minigame: minigameStreetLamp},
      {x: 275, y: 995, name: 'streetLamp', minigame: minigameStreetLamp},
      {x: 560, y: 995, name: 'streetLamp', minigame: minigameStreetLamp},
      {x: 720, y: 995, name: 'streetLamp', minigame: minigameStreetLamp},
      {x: 580, y: 555, name: 'streetPlants', minigame: minigameStreetPlants},
      {x: 715, y: 555, name: 'streetPlants', minigame: minigameStreetPlants},
      {x: 530, y: 650, name: 'streetPlants', minigame: minigameStreetPlants},
      {x: 50, y: 875, name: 'streetPlants', minigame: minigameStreetPlants},
      {x: 680, y: 875, name: 'streetPlants', minigame: minigameStreetPlants},
      {x: 545, y: 875, name: 'supermarketDoor', minigame: minigameSupermarketDoor},
      {x: 210, y: 845, name: 'tourismDoor', minigame: minigameTourismDoor},
      {x: 120, y: 550, name: 'manHole', minigame: minigameManHole},
      {x: 780, y: 890, name: 'manHole', minigame: minigameManHole},
      {x: 40, y: 430, name: 'generator', minigame: minigameGenerator},
      {x: 400, y: 1260, name: 'bridgeEnd', minigame: minigameBridgeEnd},
      {x: 622, y: 876, name: 'warehouse', minigame: minigameWareHouse},
    ];
    //   character.anims.stop();
    interactionObject(this, items, character, status);
    // debugInteraction(this, this.objectTop, character);
    // debugInteraction(this, this.objectBottom, character);
    // debugInteraction(this.secretDoor);
    this.input.keyboard.on("keydown-E", () => {
      console.log(character.x, character.y)
    })
    // this.decorationBuilding.forEachTile(tile => {
    //   if (tile.getCollisionGroup()) console.log(tile.pixelY)
    // })
  }

  update ()
  {
    movementSprite(this, character, cursors, characterCounter, status);
    timerLoseScreenDisplay(this, beginningSecs, beginningMins, status, musique, displayLoseScreen, "Lockdown complete! Suspect is around, renforcement incoming!");
    rainParticles.setPosition(character.x, character.y);
    // Bridge walls behavior - used because depth changes depending on location
    if (character.y >= 831 && character.y <= 833 && character.x > 295 && character.x < 315 && character.frame.name >= 13 && character.frame.name <= 15) {
      upBridge(this);
    } else if (character.y >= 831 && character.y <= 833 && character.x > 295 && character.x < 315 && character.frame.name >= 1 && character.frame.name <= 3) {
      downBridge(this);
    }

    if (character.y >= 935 && character.y <= 960 && character.x > 160 && character.x < 190 && character.frame.name >= 13 && character.frame.name <= 15) {
      if (this.docksTop.depth === 0) {this.docksTop.setDepth(2), this.ladderTop.setDepth(2)};
    } else if (character.y >= 935 && character.y <= 960 && character.x > 160 && character.x < 190 && character.frame.name >= 1 && character.frame.name <= 3) {
      if (this.docksTop.depth === 2) {this.docksTop.setDepth(0), this.ladderTop.setDepth(0)};
    }
    
    if (status.minigame != 'active') {

      // John the Destroyer
      if (this.agent.john.x <= 350 && this.agent.john.y < 670) {
        //Here X is the upper left corner
        this.agent.john.setVelocityX(0);
        this.agent.john.setVelocityY(45);
        this.agent.john.anims.play(`down6`, true);
      } else if (this.agent.john.x >= 490 && this.agent.john.y >= 550) {
        // Here X is the lower right corner
        this.agent.john.setVelocityX(0);
        this.agent.john.setVelocityY(-45);
        this.agent.john.anims.play(`up6`, true);
      } else if (this.agent.john.y <= 580 && this.agent.john.x <= 500) {
        // Here Y is the upper right corner
        this.agent.john.setVelocityY(0);
        this.agent.john.setVelocityX(-45);
        this.agent.john.anims.play(`left6`, true);
      } else if (this.agent.john.y >= 670 && this.agent.john.x < 500) {
        // Here Y is the lower left corner
        this.agent.john.setVelocityY(0);
        this.agent.john.setVelocityX(45);
        this.agent.john.anims.play(`right6`, true);
      }

      // Rob the Inevitable
      if (this.agent.rob.x <= 310 && this.agent.rob.y >= 740 && this.agent.rob.y <= 900) {
        //Here X is the upper left corner
        this.agent.rob.setVelocityX(0);
        this.agent.rob.setVelocityY(45);
        this.agent.rob.anims.play(`down6`, true);
      } else if (this.agent.rob.x >= 180 && this.agent.rob.y >= 900 && this.agent.rob.x <= 310) {
        // Here X is the lower right corner
        this.agent.rob.setVelocityX(-45);
        this.agent.rob.setVelocityY(0);
        this.agent.rob.anims.play(`left6`, true);
      } else if (this.agent.rob.y <= 760 && this.agent.rob.x >= 310) {
        // Here Y is the upper right corner
        this.agent.rob.setVelocityY(0);
        this.agent.rob.setVelocityX(-45);
        this.agent.rob.anims.play(`left6`, true);
      } else if (this.agent.rob.x <= 190 && this.agent.rob.y <= 1010) {
        // Here Y is the lower left corner
        this.agent.rob.setVelocityY(45);
        this.agent.rob.setVelocityX(0);
        this.agent.rob.anims.play(`down6`, true);
      } else if (this.agent.rob.x <= 190 && this.agent.rob.y >=1010) {
        this.agent.rob.setVelocityY(0);
        this.agent.rob.setVelocityX(0);
        this.agent.rob.anims.play(`down6end`, true).anims.stop();
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
    } else {
      Object.values(this.agent).forEach(agent => {
        agent.setVelocity(0, 0)
        if (agent.anims.currentAnim.key.substring(agent.anims.currentAnim.key.length - 3) != "end") agent.anims.play(`${agent.anims.currentAnim.key}end`).anims.stop()
      });
    }

    //Inventory
    if (status.inventory != "" && status.inventory != "none") {
      status.borderBox.visible = true;
      status.inventoryBox.visible = true;
    } else {
      status.borderBox.visible = false;
      status.inventoryBox.visible = false;
    }

    sortDepth(this.floorObjects, character);
    sortDepth(this.decorationRooftop, character);

    camera(this, this.walls, character);
    camera(this, this.bridge, character);
    camera(this, this.dockWalls, character);
    camera(this, this.layer, character);
    camera(this, this.building, character);
    camera(this, this.warehouseClosed, character);
    camera(this, this.warehouseOpened, character);
    camera(this, this.decorationBuilding, character);
    camera(this, this.decorationRooftop, character);
    camera(this, this.overheadBuilding, character);
    camera(this, this.overheadBuildingDecoration, character);
    camera(this, this.objectBottom, character);
    camera(this, this.docksTop, character);
    camera(this, this.rooftopUpperWalls, character);
    camera(this, this.railing, character);
    camera(this, this.railing2, character);
    camera(this, this.shadow, character);
    camera(this, this.manHole, character);
    camera(this, this.plant, character);
    camera(this, this.floorObjects, character);
    camera(this, this.floorBridge, character);
    camera(this, this.dockWalls, character);
    camera(this, this.redBoat, character);
    camera(this, this.dockObjects, character);
    camera(this, this.ladder, character);
    camera(this, this.ladderTop, character);
    Object.values(this.agent).forEach(agent => {hideNPC(this, this.layer, agent, character)});
    // camera(this, this.transparent, character);
  };
};
export { Play2, status, coordinates, musique, character, cursors, upBridge, downBridge };
