class Waiting extends Phaser.Scene {

    constructor ()
    {
        super('Waiting');
    }

  preload ()
  {

      const loginAssets = document.getElementById("login").dataset;
      this.load.image('logo', loginAssets.logoImg);
      this.load.video("overlay", loginAssets.overlayVid, 'loadeddata', false, true);

      this.load.setBaseURL('http://labs.phaser.io');
      this.load.image('yellow', 'assets/particles/yellow.png');
  }

  create ()
  {

    // var video = this.add.video(100, 100, 'overlay');
    // video.play(true)
    // video.setDisplaySize(innerWidth, innerHeight);
    // //video.setDisplaySize(innerWidth, innerHeight);

    // //video.setBlendMode(Phaser.BlendModes.SCREEN);

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

    this.input.keyboard.on('keydown', (event)  => {

      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
       {
          this.scene.stop();
          this.scene.start('Login');
      }

    });
  }
}

export { Waiting }
