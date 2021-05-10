import { game } from "../channels/game";

var skip
var particles

class Waiting extends Phaser.Scene {

    constructor ()
    {
        super('Waiting');
    }

  preload ()
  {

      const loginAssets = document.getElementById("login").dataset;
      this.load.image('logo', loginAssets.logoImg);
      this.load.image('spark', loginAssets.sparkParticle);
      this.load.video("overlay", loginAssets.overlayVid, 'loadeddata', false, true);

  }

  create ()
  {
    skip = this.add.text(innerWidth - 250, innerHeight - 50, "Press Enter to play...", {color: '#FFFFFF', font: "16px"})

    // var video = this.add.video(100, 100, 'overlay');
    // video.play(true)
    // video.setDisplaySize(innerWidth, innerHeight);
    // //video.setDisplaySize(innerWidth, innerHeight);


    // //video.setBlendMode(Phaser.BlendModes.SCREEN);

      // var logo = this.physics.add.image(400, 100, 'logo');
      // logo.setDisplaySize(225, 125);


    //   var particles = this.add.particles('yellow');
    //   var emitter = particles.createEmitter({
    //       speed: 100,
    //       scale: { start: 1, end: 0 },
    //       blendMode: 'ADD'
    //   });

    //   var logo = this.physics.add.image(400, 100, 'logo');
    //   logo.setDisplaySize(225, 125);
    //   // var text = this.physics.add.image(400, 100, "Press Enter")


    //   logo.setVelocity(100, 200);
    //   logo.setBounce(1, 1);
    //   logo.setCollideWorldBounds(true);

    //   // text.setVelocity(100, 200);
    //   // text.setBounce(1, 1);
    //   // text.setCollideWorldBounds(true);

    //   emitter.startFollow(logo);


    var logo = this.add.image(innerWidth/2, innerHeight/2 - 100, "logo");
    logo.setDisplaySize(810, 420);
    logo.setInteractive();

    logo.on('pointermove', (pointer) => {
      this.add.particles('spark').createEmitter({"active":true,"blendMode":1,"collideBottom":true,"collideLeft":true,"collideRight":true,"collideTop":true,"deathCallback":null,"deathCallbackScope":null,"emitCallback":null,"emitCallbackScope":null,"follow":null,"frequency":0,"gravityX":0,"gravityY":300,"maxParticles":1,"name":"sparks","on":true,"particleBringToTop":true,"radial":true,"timeScale":1,"trackVisible":false,"visible":true,"accelerationX":0,"accelerationY":0,"angle":{"min":0,"max":360},"alpha":{"start":0.1,"end":0,"ease":"Expo.easeOut"},"bounce":0,"delay":0,"lifespan":5000,"maxVelocityX":10000,"maxVelocityY":10000,"moveToX":0,"moveToY":0,"quantity":1,"rotate":0,"tint":16777215,"x":pointer.x,"y":pointer.y,"speed":{"min":600,"max":600},"scale":{"start":0.25,"end":0,"ease":"Circ.easeInOut"}})
    })

    logo.once('pointerdown', (pointer) => {
      this.add.particles('spark').createEmitter({"active":true,"blendMode":1,"collideBottom":true,"collideLeft":true,"collideRight":true,"collideTop":true,"deathCallback":null,"deathCallbackScope":null,"emitCallback":null,"emitCallbackScope":null,"follow":null,"frequency":0,"gravityX":0,"gravityY":300,"maxParticles":0,"name":"sparks","on":true,"particleBringToTop":true,"radial":true,"timeScale":1,"trackVisible":false,"visible":true,"accelerationX":0,"accelerationY":0,"angle":{"min":0,"max":360},"alpha":{"start":0,"end":0.5,"ease":"Linear"},"bounce":0,"delay":0,"lifespan":1000,"maxVelocityX":10000,"maxVelocityY":10000,"moveToX":0,"moveToY":0,"quantity":1,"rotate":360,"tint":16777215,"x":pointer.x,"y":pointer.y,"speed":{"min":300,"max":6000},"scale":{"start":0.1,"end":1.7,"ease":"Linear"}})
      if (this.cameras.main._eventsCount < 1) {
        this.cameras.main.fadeOut(2000, 255, 255, 255)
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('Login');
        })
      }
    })

    this.input.keyboard.once('keydown-ENTER', ()  => {
      if (this.cameras.main._eventsCount < 1) {
        this.cameras.main.fadeOut(2000, 255, 255, 255)
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.stop();
          this.scene.start('Login');
        });
      }
    });
  }
}

export { Waiting }
