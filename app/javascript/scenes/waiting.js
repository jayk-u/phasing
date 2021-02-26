class Waiting extends Phaser.Scene {

    constructor ()
    {
        super('Waiting');
    }

  preload ()
  {

      const loginAssets = document.getElementById("login").dataset;
      this.load.image('logo', loginAssets.logoImg);

      this.load.setBaseURL('http://labs.phaser.io');
      this.load.image('yellow', 'assets/particles/yellow.png');
      this.load.image('grid', 'assets/skies/grid.png');
  }

  create ()
  {
      var particles = this.add.particles('yellow');
      this.add.image(400, 300, 'sky').setDisplaySize(innerWidth, innerHeight);
      console.log(window)
    //   this.add.image(400, 300, 'grid')
      this.add.image(400, 300, 'grid').setScale(1.5,1.5)

      var particles = this.add.particles('red');
      var emitter = particles.createEmitter({
          speed: 100,
          scale: { start: 1, end: 0 },
          blendMode: 'ADD'

      });

      var logo = this.physics.add.image(400, 100, 'logo');
      logo.setDisplaySize(225, 125);
      // var text = this.physics.add.image(400, 100, "Press Enter")

      logo.setVelocity(100, 200);
      logo.setBounce(1, 1);
      logo.setCollideWorldBounds(true);

      // text.setVelocity(100, 200);
      // text.setBounce(1, 1);
      // text.setCollideWorldBounds(true);

      emitter.startFollow(logo);

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
