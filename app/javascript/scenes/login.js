class Login extends Phaser.Scene {

  constructor ()
  {
      super('Login');
  }

  preload ()
  {
    const loginAssets = document.getElementById("login").dataset;

    this.load.image("logoo", loginAssets.logoImg);
    this.load.image("perso", loginAssets.persoImg);
    this.load.image("play", loginAssets.playBtn);
    this.load.image("settings", loginAssets.settingsBtn);
    // this.load.video("overlay", loginAssets.boOverlay2Mp4);
  };

  create ()
  {
     function updateState() {
    this.scene.stop();
    this.scene.start('Play');
  };


    var lg = this.add.image(125, 75, "logoo");
    lg.setDisplaySize(225, 125);

    var sett = this.add.image(1550, 75, "settings");
    sett.setDisplaySize(60,60);

    var perso = this.add.image(860, 400, "perso");
    perso.setDisplaySize(400,700);

    var play = this.add.image(860, 700, "play").setInteractive();
    play.setDisplaySize(300,100);

    var dist = Phaser.Math.Distance.Between(860, 700, 30, 30)
    console.dir(dist)


    //play btn bis
    play.on("pointerup", (event) => {
      this.scene.stop();
      this.scene.start('Play');
    } );

    settings.on("pointerup", (event) => {

    } );
  };






    //   //  Play btn
    //   this.input.keyboard.on('keydown', (event)  => {

    //     if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
    //     {
    //         this.scene.stop();
    //         this.scene.start('Play');
    //     }

    // });

};

export { Login }


1680
