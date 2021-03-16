class Select extends Phaser.Scene {

    constructor ()
    {
        super('Select');
    }

  preload ()
  {
      const selectAssets = document.getElementById("selectScreen").dataset;
      this.load.image('map1', selectAssets.map1Img);

      const loginAssets = document.getElementById("login").dataset;

      this.load.image("logoo", loginAssets.logoImg);
      this.load.image("settings", loginAssets.settingsBtn);
      this.load.video("overlay", loginAssets.overlayVid);
      this.load.image("containersett", loginAssets.containerImg);
      this.load.image("volume", loginAssets.volumeImg);
      this.load.audio("music", loginAssets.musicMp3);
      this.load.image("controls", loginAssets.controlsImg);
  }

  create ()
  {
    var map1 = this.add.graphics(innerWidth/5, innerHeight/5, "map1");
    map1.setDisplaySize(innerWidth/5, innerHeight/5);

    var video = this.add.video(10, 10, "overlay");
    video.setDisplaySize(innerWidth, innerHeight);

    video.setBlendMode(Phaser.BlendModes.SCREEN);

    var lg = this.add.image(125, 80, "logoo");
    lg.setDisplaySize(225, 125);

    var controls = this.add.image(innerWidth - 200, 150, "controls");
    controls.setDisplaySize(200, 270);

  }
}

export { Select }
