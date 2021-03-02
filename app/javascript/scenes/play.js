import {game} from "../channels/game"
import { minigameSaber } from "../channels/interactions";

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

    this.load.image("keylock", gameAssets.keylockImg);
    this.load.image("key", gameAssets.keyImg);
    this.load.image("sky", gameAssets.skyImg);
    this.load.image("ground", gameAssets.groundImg);
    this.load.image("star", gameAssets.starImg);
    this.load.image("bomb", gameAssets.bombImg);
    this.load.tilemapTiledJSON('map', gameAssets.mapJson);
    this.load.image('tiles', gameAssets.mapPng)
    this.load.spritesheet("egyptian", gameAssets.egyptianSprite, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create()
  {
    // platforms = this.physics.add.staticGroup();
    // platforms.create(400, 568, "ground").setScale(2).refreshBody();
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
    egyptian = this.physics.add.sprite(460, 323, "egyptian").setSize(15, 2).setOffset(9, 43);
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
    shapeGraphics = this.add.graphics();
     const drawCollisionShapes = (graphics, object) => {
      graphics.clear();

      // Loop over each tile and visualize its collision shape (if it has one)
      object.forEachTile(function (tile)
      {
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
                  graphics.strokeRect(objectX, objectY, object.width, object.height);
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
    drawCollisionShapes(shapeGraphics, this.walls);
    drawCollisionShapes(shapeGraphics, this.extraObj);
    drawCollisionShapes(shapeGraphics, this.objectBottom);
    drawCollisionShapes(shapeGraphics, this.objectTop);
    // console.log(shapeGraphics);
    // console.log(this)
    // console.log(this.matter)

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
    this.physics.add.collider(this.objectTop, egyptian);
    this.physics.add.collider(this.objectBottom, egyptian);
   
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

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;

  });

    this.input.keyboard.on("keydown-E", () => {
      egyptian.anims.stop();
      if (Range(0,88).includes(Math.round(egyptian.x)) && Range(78,178).includes(Math.round(egyptian.y))) {  
        minigameSaber(this);
        minigame = "active";
      }

    })
  
  }

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
          this.input.keyboard.on("keydown-ENTER", () => {
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

        //Invetory

      });
    }
    camera(this.walls);
    camera(this.objectBottom);
    camera(this.objectTop);
    camera(this.extraObj);
    // camera(this.secretDoor);
    camera(this.layer);
  }
}

export { Play };
