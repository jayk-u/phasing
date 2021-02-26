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
    var lg = this.add.image(125, 80, "logoo");
    lg.setDisplaySize(225, 125);

    var sett = this.add.image(innerWidth - 100, 75, "settings");
    sett.setDisplaySize(60,60);

    var perso = this.add.image(innerWidth/2, innerHeight/2, "perso");
    perso.setDisplaySize(230,380);

    var play = this.add.image(innerWidth/2, innerHeight/3 + 280, "play").setInteractive();
    play.setDisplaySize(200,80);

    //play btn bis
    play.on("pointerup", (event) => {
      this.scene.stop();
      this.scene.start('Play');
    } );

    // settings.on("pointerup", (event) => {

    // } );
  };

};

export { Login }