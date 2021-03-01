class Login extends Phaser.Scene {

  constructor ()
  {
      super('Login');
      // this.game.config.audio.disableWebAudio = true;
  }

  preload ()
  {
    const loginAssets = document.getElementById("login").dataset;

    this.load.image("logoo", loginAssets.logoImg);
    this.load.image("perso", loginAssets.persoImg);
    this.load.image("play", loginAssets.playBtn);
    this.load.image("settings", loginAssets.settingsBtn);
    this.load.video("overlay", loginAssets.overlayVid);
    console.log(loginAssets);
    this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);
  };

  create ()
  {

    // var containersett = this.add.image(125, 80, "containersett");

    var video = this.add.video(10, 10, 'overlay');
    video.setDisplaySize(innerWidth, innerHeight);

    video.setBlendMode(Phaser.BlendModes.SCREEN);

    var lg = this.add.image(125, 80, "logoo");
    lg.setDisplaySize(225, 125);

    var sett = this.add.image(innerWidth - 100, 75, "settings").setInteractive();
    sett.setDisplaySize(60,60);

    var perso = this.add.image(innerWidth/2, innerHeight/2, "perso");
    perso.setDisplaySize(230,380);

    var play = this.add.image(innerWidth/2, innerHeight/3 + 400, "play").setInteractive();
    play.setDisplaySize(200,80);

    var status = this.add.text(innerWidth-310, 145, "On", {
      // fontFamily: 'Pixeled',
      fontSize: '48px',
      color:'#796356'
    }).setDepth(2);
    status.setVisible(false);

    this.musique = this.sound.add('music');

    let clickSettings = this.add.image(innerWidth-250, 215, "containersett").setDepth(1);
    clickSettings.setDisplaySize(300, 200);
    clickSettings.setVisible(false);

    let volume = this.add.image(innerWidth-355, 165, "volume").setInteractive().setDepth(2);
    volume.setDisplaySize(50,50);
    volume.setVisible(false);

    // if (clickSettings.setVisible(true)) {
    //   true;
    // }else{false};

    sett.on("pointerup", (event) => {
      if (clickSettings.visible) {
        clickSettings.setVisible(false);
        volume.setVisible(false);
        status.setVisible(false);
      } else {
        clickSettings.setVisible(true);
        volume.setVisible(true);
        status.setVisible(true);
      };
    });


    volume.on("pointerup", (event) => {
      if (status.text == 'On') {
        status.text = "Off";
      } else {
        status.text = "On";
      }
    });

      localStorage.setItem('status', status.text)




    // controls.on("pointerup", () => {
    //   this.input.on("keydown", (event) => {
    //     statusControls = event.key
    //   })
    //   }
    // });

    play.on("pointerup", (event) => {
      this.scene.stop();
      this.scene.start('Play');
    } );

  };

};

export { Login }
