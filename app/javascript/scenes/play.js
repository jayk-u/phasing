import {game} from "../channels/game"
import {minigameSofa, minigameKitchenTree, minigameBathPlant, minigameWindbreak, minigameKey, minigameBathtub, minigameBathsink, minigameAltar, minigameBonsai, minigameCattree, minigameComputer, minigameSink, minigameRoomLibrary, minigameKettle, minigameFish, minigameHallway, minigameMicrowave, minigameLivingLibrary, minigameSaber, minigameDoor, minigameTV, minigameFreezer } from "../channels/interactions";

function Range(a,b){
  // if only one argument supplied then return random number between 1 and argument
  if (b === undefined) {
    b = a;
    a = 1;
  }
  return [...Array(b-a+1).keys()].map(x => x+a);
}


var minigame
var egyptian;
var cursors;
var shapeGraphics;
var coordinates = [];

//Timer
var s = 0
var m = 0
var beginningMins = 3
var beginningSecs = 30
var then = 0
var mins = ""
var sec = ""
var timer
//EndTimer


class Play extends Phaser.Scene {

  constructor ()
  {
    super("Play");
  }


  preload()
  {
    const gameAssets = document.getElementById("game-assets").dataset;


    this.load.image("tv", gameAssets.tvImg);
    this.load.image("redBtn", gameAssets.redBtnImg);
    this.load.image("computer", gameAssets.computerImg);
    this.load.image("ring", gameAssets.ringImg);
    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);

    this.load.tilemapTiledJSON('map', gameAssets.mapJson);
    this.load.image('tiles', gameAssets.mapPng);
    this.load.image('ground', gameAssets.platformPng);
    this.load.image('exit', gameAssets.exitImg);
    this.load.spritesheet('egyptian', gameAssets.policemanSprite, {
      frameWidth: 32,
      frameHeight: 48,
    });

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
    egyptian = this.physics.add.sprite(460, 323, "egyptian").setSize(15, 2).setOffset(9, 43);
    this.transparent = this.map.createLayer("transparent", this.tileset, 0, 0);
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

    // egyptian.body.setSize(15, 1);
    // egyptian.setBounce(0.2);
    // egyptian.setCollideWorldBounds(true);
    this.walls.setCollisionFromCollisionGroup();
    this.extraObj.setCollisionFromCollisionGroup();
    this.objectBottom.setCollisionFromCollisionGroup();
    this.objectTop.setCollisionFromCollisionGroup();
    this.transparent.setCollisionFromCollisionGroup();
    shapeGraphics = this.add.graphics();
    const drawCollisionShapes = (graphics, object) => {
      graphics.clear();

      // Loop over each tile and visualize its collision shape (if it has one)
      object.forEachTile((tile) => {
        var tileWorldX = tile.getLeft();
        var tileWorldY = tile.getTop();
        var collisionGroup = tile.getCollisionGroup();

          // console.log(collisionGroup);

        if (!collisionGroup || collisionGroup.objects.length === 0) { return; }

          // The group will have an array of objects - these are the individual collision shapes
          var objects = collisionGroup.objects;
          for (var i = 0; i < objects.length; i++)
          {
              var object = objects[i];
              var objectX = tileWorldX + object.x;
              var objectY = tileWorldY + object.y;

              // When objects are parsed by Phaser, they will be guaranteed to have one of the
              // following properties if they are a rectangle/ellipse/polygon/polyline.
              if (object.rectangle) {
                  this.platforms.create(objectX, objectY, "ground").setSize(object.width, object.height).setOffset(16, 16).visible = false;
                  coordinates.push({ x:objectX, y:objectY, w:object.width, h:object.height });
              } else if (object.ellipse) {
                  // Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center
                  // origin
                  graphics.strokeEllipse(
                    objectX + object.width / 2, objectY + object.height / 2,
                    object.width, object.height
                  );
              } else if (object.polygon || object.polyline) {
                  var originalPoints = object.polygon ? object.polygon : object.polyline;
                  var points = [];
                  for (var j = 0; j < originalPoints.length; j++) {
                    var point = originalPoints[j];
                    points.push({
                      x: objectX + point.x,
                      y: objectY + point.y
                    });
                  }
                  graphics.strokePoints(points);
              }
          }
      });
    }

    drawCollisionShapes(shapeGraphics, this.extraObj);
    drawCollisionShapes(shapeGraphics, this.objectBottom);
    drawCollisionShapes(shapeGraphics, this.objectTop);
    // drawCollisionShapes(shapeGraphics, phaserrect);
    // drawCollisionShapes(shapeGraphics, this.objectBottom);
    // drawCollisionShapes(shapeGraphics, this.objectTop);
    // console.log(shapeGraphics);
    // console.log(this)
    // console.log(this.matter)
    console.log(coordinates);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("egyptian", { start: 5, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "egyptian", frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("egyptian", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('egyptian', { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
    frames: this.anims.generateFrameNumbers('egyptian', { start: 13, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'upend',
    frames: this.anims.generateFrameNumbers('egyptian', { start: 12 }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'downend',
    frames: this.anims.generateFrameNumbers('egyptian', { start: 0 }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'leftend',
    frames: this.anims.generateFrameNumbers('egyptian', { start: 4 }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'rightend',
    frames: this.anims.generateFrameNumbers('egyptian', { start: 8 }),
      frameRate: 20,
    });


    // this.physics.world.collide(egyptian, this.layer)
    this.physics.add.collider(this.walls, egyptian);
    this.physics.add.collider(this.extraObj, egyptian);
    this.physics.add.collider(this.platforms, egyptian);
    this.physics.add.collider(this.transparent, egyptian);
    // this.physics.add.collider(egyptian, this.objectTop);
    // this.physics.add.collider(this.objectBottom, egyptian);

    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, 1000, 1000);
    this.cameras.main.zoom = 2.5;
    this.cameras.main.startFollow(egyptian);

    //Timer
    var chrono = this.add.graphics();
    chrono.fillStyle(0x000000);
    chrono.fillRect(innerWidth/1.75, innerHeight/1.57, 100, 50).setScrollFactor(0)

    timer = this.add.text(innerWidth/1.75, innerHeight/1.57, "", { color: '#FFFFFF', font: "24px" }).setScrollFactor(0)
    //End Timer

    //Inventory
    var border = this.add.graphics().setScrollFactor(0);
    border.fillStyle(0xFFFFFF);
    border.fillRect(innerWidth/3.3 - 1, innerHeight/3.3 - 1, 52, 52)
    var inventory = this.add.graphics().setScrollFactor(0);
    inventory.fillStyle(0x000000)
    inventory.fillRect(innerWidth/3.3, innerHeight/3.3, 50, 50);
    //End Inventory

    //SETTINGS

    const unmute = this.add.image(innerWidth/1.65, innerHeight/3.05, "volume").setInteractive().setDepth(2).setScrollFactor(0);
    unmute.setDisplaySize(35,35);
    unmute.setVisible(true);

    var mute = this.add.image(innerWidth/1.65, innerHeight/3.05, "mute").setInteractive().setDepth(2).setScrollFactor(0);
    mute.setDisplaySize(35,35);
    mute.setVisible(false);

    let musique = this.sound.add('music');
    musique.setVolume(0.1);
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
    {x: 591, y: 249, name: 'aquarium', minigame: minigameFish},
    {x: 336, y: 148, name: 'kettle', minigame: minigameKettle},
    {x: 47, y: 147, name: 'saber', minigame: minigameSaber}
  ];
    // this.input.keyboard.on("keydown-E", () => {
    //   egyptian.anims.stop();
    //   if (Range(0,88).includes(Math.round(egyptian.x)) && Range(78,178).includes(Math.round(egyptian.y))) {  
    //     minigameSaber(this);
    //     minigame = "active";
    //   }
    // });
    const debugInteraction = (layout) => {
      this.input.keyboard.on("keyup-E", () => {
        this.findCoordinates = layout.getTileAtWorldXY(egyptian.x, egyptian.y) || this.findCoordinates
        layout.forEachTile(tile => {
          var tileWorldX = tile.getLeft();
          var tileWorldY = tile.getTop();
          if (!this.findCoordinates) return
          var collisionGroup = tile.getCollisionGroup();
          if (!collisionGroup || collisionGroup.objects.length === 0) { return; }
          tile.getCollisionGroup().objects.forEach((object) => {
            var objectCenterX = object.x + tileWorldX + object.width / 2;
            var objectCenterY = object.y + tileWorldY + object.height / 2;
            var distBetween = Phaser.Math.Distance.Between(
              egyptian.x,
              egyptian.y,
              objectCenterX,
              objectCenterY
            );
            if (distBetween < 30) {

              console.log("Object Position",objectCenterX, objectCenterY);
              console.log("Distance to Object", distBetween);
              console.log("Egyptian position", egyptian.x, egyptian.y);
              const testLine = this.add.graphics()
              testLine.lineStyle(1, 0xFFFFFF, 1.0);
              testLine.beginPath();
              testLine.moveTo(egyptian.x, egyptian.y);
              testLine.lineTo(objectCenterX, objectCenterY);
              testLine.closePath();
              testLine.strokePath();
            }
          })
        });
      });
    }
    this.input.keyboard.on("keyup-E", () => {
      var counter = 0;
      items.forEach ((item) => {
        var distBetween = Phaser.Math.Distance.Between(
          egyptian.x,
          egyptian.y,
          item.x,
          item.y
        );
        if (distBetween < 30 && counter < 1) {
          item.minigame(this);
          counter++;
        }
      });
    });
    // debugInteraction(this.objectTop);
    // debugInteraction(this.objectBottom);
    // debugInteraction(this.extraObj);
  };

  update ()
  {
    // this.input.keyboard.on("keydown-E", () => {
    //   if (Range(0,88).includes(Math.round(egyptian.x)) && Range(78,178).includes(Math.round(egyptian.y))) {  updateSaber(this, egyptian) }
    // })
    egyptian.body.setVelocity(0);
    if (minigame != "active") {
      if (cursors.left.isDown) {
        egyptian.setVelocityX(-90);

        egyptian.anims.play("left", true);
        this.x = 1;
      } else if (cursors.right.isDown) {
        egyptian.setVelocityX(90);

        egyptian.anims.play("right", true);
        this.x = 2;
      } else if (cursors.down.isDown) {
        egyptian.setVelocityY(90);

        egyptian.anims.play("down", true);
        this.x = 3;
      } else if (cursors.up.isDown) // && egyptian.body.touching.down
      {
        egyptian.setVelocityY(-90);

        egyptian.anims.play("up", true);
        this.x = 4;
      } else {
        egyptian.setVelocityX(0);
        if (this.x === 1) {
          egyptian.anims.play("leftend");
        }
        else if (this.x === 2) {
          egyptian.anims.play("rightend");
        }
        else if (this.x === 3) {
          egyptian.anims.play("downend");
        }
        else if (this.x === 4) {
          egyptian.anims.play("upend");
        }
        //egyptian.anims.play("turn");
        }
     } else {
          egyptian.setVelocityX(0);
          if (this.x === 1) {
            egyptian.anims.play("leftend");
          }
          else if (this.x === 2) {
            egyptian.anims.play("rightend");
          }
          else if (this.x === 3) {
            egyptian.anims.play("downend");
          }
          else if (this.x === 4) {
            egyptian.anims.play("upend");
          }
          this.input.keyboard.on("keydown-ESC", () => {
            minigame = "none"
          })
      }
    const camera = (layout) => {
      this.origin = layout.getTileAtWorldXY(egyptian.x, egyptian.y) || this.origin
      layout.forEachTile(tile => {
        if (!this.origin) return
        var dist = Phaser.Math.Distance.Chebyshev(
            this.origin.x,
            this.origin.y,
            tile.x,
            tile.y
        );
        if (dist === 1) {
          tile.setAlpha(1);
        } else {
          tile.setAlpha(1 - 0.3 * dist);
        }

        // Timer
        var now = this.time.now
        var ms = then - now
        if (ms <= 0) {
          then = now + 1000
          s++
        } else if ((beginningSecs - s) <= 0) {
          beginningSecs = 59
          s = 0
          m++
        }
        if ((beginningMins - m) < 10) {
          mins = "0" + (beginningMins - m)
        } else {
          mins = (beginningMins - m)
        };
        if ((beginningSecs - s) < 10) {
          sec = "0" + (beginningSecs - s);
        } else {
          sec = (beginningSecs - s)
        };
        var time = mins + ":" + sec + ":" + Math.min(Math.trunc(ms/10),99)
        timer.setText(time)
        //End Timer

        //Inventory

      });
    }
    camera(this.walls);
    camera(this.objectBottom);
    camera(this.objectTop);
    camera(this.extraObj);
    // camera(this.secretDoor);
    camera(this.layer);
    camera(this.transparent);
  };
};

export { Play };
