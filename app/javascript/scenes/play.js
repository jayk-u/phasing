var egyptian;
var platforms;
var cursors;

class Play extends Phaser.Scene {

  constructor ()
  {
    super("Play");
  }


  preload() 
  {
    const gameAssets = document.getElementById("game-assets").dataset;

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

    console.log("here")

    platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, "ground").setScale(2).refreshBody();

    // platforms.create(600, 400, "ground");
    // platforms.create(50, 250, "ground");
    // platforms.create(750, 220, "ground");

    this.map = this.make.tilemap({ key: 'map'});  // 
    // this.layer = this.map.createLayer('ground');  // set layer name
    // this.layer.resizeWorld();
    this.tileset = this.map.addTilesetImage("MainTileMap", 'tiles');
    this.layer = this.map.createLayer('Main Map', this.tileset, 0, 0);
    this.objectBottom = this.map.createLayer("Objects/bottom", this.tileset, 0, 0);
    this.objectTop = this.map.createLayer("Objects/top", this.tileset, 0, 0);


    egyptian = this.physics.add.sprite(460, 323, "egyptian");

    // egyptian.setBounce(0.2);
    egyptian.setCollideWorldBounds(true);

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

    this.physics.add.collider(egyptian, platforms);
    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, 1000, 1000);
    this.cameras.main.zoom = 2.5;
    this.cameras.main.startFollow(egyptian);
  }

  update()
  {

    egyptian.body.setVelocity(0);

    if (cursors.left.isDown) {
      egyptian.setVelocityX(-100);

      egyptian.anims.play("left", true);
    } else if (cursors.right.isDown) {
      egyptian.setVelocityX(100);

      egyptian.anims.play("right", true);
    } else if (cursors.down.isDown) {
      egyptian.setVelocityY(100);

      egyptian.anims.play("down", true);
    } else if (cursors.up.isDown) // && egyptian.body.touching.down 
    {
      egyptian.setVelocityY(-100);

      egyptian.anims.play("up", true);
    } else {
      egyptian.setVelocityX(0);

      // egyptian.anims.play("turn");
      egyptian.anims.stop();
    }
  }
};

export { Play };
