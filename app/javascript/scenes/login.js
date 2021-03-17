class Login extends Phaser.Scene {
  constructor() {
    super("Login");
    // this.game.config.audio.disableWebAudio = true;
  }

  preload() {
    const loginAssets = document.getElementById("login").dataset;

    this.load.image("logoo", loginAssets.logoImg);
    this.load.image("perso", loginAssets.persoImg);
    this.load.image("play", loginAssets.playBtn);
    this.load.image("settings", loginAssets.settingsBtn);
    this.load.video("overlay", loginAssets.overlayVid);
    this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);
    this.load.image("controls", loginAssets.controlsImg);
  }

  create() {
    // var containersett = this.add.image(125, 80, "containersett");

    var video = this.add.video(10, 10, "overlay");
    video.setDisplaySize(innerWidth, innerHeight);

    video.setBlendMode(Phaser.BlendModes.SCREEN);

    var lg = this.add.image(125, 80, "logoo");
    lg.setDisplaySize(225, 125);

    var controls = this.add.image(innerWidth - 200, 150, "controls");
    controls.setDisplaySize(200, 270);

    var perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, "perso");
    perso.setDisplaySize(230, 420);

    var play = this.add
      .image(innerWidth / 2, innerHeight / 3 + 400, "play")
      .setInteractive();
    play.setDisplaySize(200, 80);

    // SETTINGS

    //  var sett = this.add.image(innerWidth - 100, 75, "settings").setInteractive();
    // sett.setDisplaySize(60,60);

    // var status = this.add.text(innerWidth-310, 135, "On", {
    //   fontSize: '48px',
    //   color:'#796356'
    // }).setDepth(2);
    // status.setVisible(false);

    // let musique = this.sound.add('music');
    // musique.setVolume(0.1);
    // musique.play();

    // let clickSettings = this.add.image(innerWidth-250, 155, "containersett").setDepth(1);
    // clickSettings.setDisplaySize(300, 90);
    // clickSettings.setVisible(false);

    // let volume = this.add.image(innerWidth-355, 155, "volume").setInteractive().setDepth(2);
    // volume.setDisplaySize(50,50);
    // volume.setVisible(false);

    // if (clickSettings.setVisible(true)) {
    //   true;
    // }else{false};

    // sett.on("pointerup", (event) => {
    //   if (clickSettings.visible) {
    //     clickSettings.setVisible(false);
    //     volume.setVisible(false);
    //     status.setVisible(false);
    //   } else {
    //     clickSettings.setVisible(true);
    //     volume.setVisible(true);
    //     status.setVisible(true);
    //   };
    // });

    // volume.on("pointerup", (event) => {
    //   if (status.text == 'On') {
    //     status.text = "Off";
    //     musique.pause();
    //   } else {
    //     status.text = "On";
    //     musique.resume();
    //   }
    // });
    //END SETTINGS

    localStorage.setItem("status", status.text);

    this.input.keyboard.on("keydown", (event) => {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
        this.scene.stop();
        this.scene.start("Select");
      }
    });

    play.on("pointerup", () => {
      this.scene.stop();
      this.scene.start("Select");
    });
  }
}

export { Login };
