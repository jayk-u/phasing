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

    var lg = this.add.image(125, 75, "logoo");
    lg.setDisplaySize(225, 125);

    var sett = this.add.image(1000, 75, "settings");
    sett.setDisplaySize(100,100);

      //  Play btn
      this.input.keyboard.on('keydown', (event)  => {

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
        {
            this.scene.stop();
            this.scene.start('Play');
        }

    });
  }
}

export { Login }


1680
