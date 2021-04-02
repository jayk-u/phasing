var perso
var characterCounter = 1

var sprites = [
  { counter: 0, character: "perso" },
  { counter: 1, character: "perso2" }
];

class Login extends Phaser.Scene {
  constructor() {
    super("Login");
    // this.game.config.audio.disableWebAudio = true;
  }

  preload() {
    const loginAssets = document.getElementById("login").dataset;

    this.load.image("logoo", loginAssets.logoImg);
    this.load.image("perso1", loginAssets.perso1Img);
    this.load.image("perso2", loginAssets.perso2Img);
    this.load.image("arrowLeft", loginAssets.arrowLeftImg)
    this.load.image("arrowRight", loginAssets.arrowRightImg)
    this.load.image("play", loginAssets.playBtn);
    this.load.image("settings", loginAssets.settingsBtn);
    this.load.video("overlay", loginAssets.overlayVid, false, true);
    this.load.image("containersett", loginAssets.containerImg);
    // this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);
    this.load.image("controls", loginAssets.controlsImg);
  }

  create() {
    // var containersett = this.add.image(125, 80, "containersett");
    var video;
    var lg;
    var controls;
    var play;
    var leftArrow;
    var rightArrow;

    video = this.add.video(0, 0, "overlay");
    video.setDisplaySize(innerWidth*2, innerHeight*2);

    video.setBlendMode(Phaser.BlendModes.SCREEN);
    video.play(true);

    lg = this.add.image(125, 80, "logoo");
    lg.setDisplaySize(225, 125);

    controls = this.add.image(innerWidth - 200, 150, "controls");
    controls.setDisplaySize(200, 270);

    leftArrow = this.add.image(innerWidth / 2 - 130, innerHeight / 2, "arrowLeft")
      .setInteractive();
    leftArrow.setDisplaySize(150, 150);
    rightArrow = this.add.image(innerWidth / 2 + 130 , innerHeight / 2, "arrowRight")
      .setInteractive();
    rightArrow.setDisplaySize(150, 150);

    play = this.add
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

    const playSelect = ()  => {
      this.scene.stop();
      this.scene.start("Select");
    };

    this.input.keyboard.on("keydown-SPACE", playSelect)

    play.on("pointerup", playSelect)

    perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, `perso${characterCounter}`).setDisplaySize(230, 420);

    leftArrow.on("pointerup", () => {
      if (characterCounter <= 1) {
        characterCounter = 2
      } else {
        characterCounter--
      }
      perso.destroy();
      perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, `perso${characterCounter}`).setDisplaySize(230, 420);
    });

    rightArrow.on("pointerup", () => {
      if (characterCounter >= 2) {
        characterCounter = 1
      } else {
        characterCounter++
      }
      perso.destroy();
      perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, `perso${characterCounter}`).setDisplaySize(230, 420);
    });
  }
}

export { Login, sprites, characterCounter };
