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
    this.load.image("perso3", loginAssets.perso3Img);
    this.load.image("perso4", loginAssets.perso4Img);
    this.load.image("arrowLeft", loginAssets.arrowLeftImg)
    this.load.image("arrowRight", loginAssets.arrowRightImg)
    this.load.image("play", loginAssets.playBtn);
    this.load.image("settings", loginAssets.settingsBtn);
    // this.load.video("overlay", loginAssets.overlayVid, 'loadeddata', false, true);
    this.load.video("background", loginAssets.backgroundVid, 'loadeddata', false, true);
    this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);
    this.load.image("controls", loginAssets.controlsImg);

    const introAssets = document.getElementById("intro").dataset;
    this.load.image("emptyBar", introAssets.emptybarImg);


  }

  create() {
    // var containersett = this.add.image(125, 80, "containersett");
    var video;
    var lg;
    var controls;
    var play;
    var leftArrow;
    var rightArrow;

    video = this.add.video(0, 0, "background");
    video.setDisplaySize(innerWidth * 2, innerHeight * 2);

    // video.setBlendMode(Phaser.BlendModes.SCREEN);
    video.play(true);

    lg = this.add.image(innerWidth / 9, innerHeight / 8, "logoo");
    lg.setDisplaySize(innerWidth / 5, innerHeight / 7.9);

    controls = this.add.image(innerWidth - 200, 150, "controls");
    controls.setDisplaySize(innerWidth/7, innerHeight/3);

    leftArrow = this.add.image(innerWidth / 2 - 150, innerHeight / 2, "arrowLeft")
      .setInteractive();
    leftArrow.setSize((innerWidth + innerHeight)/14, (innerWidth + innerHeight)/14).setDisplaySize(leftArrow.width, leftArrow.height);
    rightArrow = this.add.image(innerWidth / 2 + 150 , innerHeight / 2, "arrowRight")
      .setInteractive();
    rightArrow.setSize((innerWidth + innerHeight)/14, (innerWidth + innerHeight)/14).setDisplaySize(rightArrow.width, rightArrow.height);

    this.input.on("gameobjectover", (p, object) => {
      object.setDisplaySize(object.width*1.2, object.height*1.2)
    })

    this.input.on("gameobjectout", (p, object) => {
      object.setDisplaySize(object.width, object.height)
    })

    play = this.add
      .image(innerWidth / 2, innerHeight / 3 + 400, "play")
      .setInteractive();
    play.setSize(innerWidth/6.5, innerHeight/8.5).setDisplaySize(play.width, play.height);

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
      this.sound.play("tone", {rate: 0.4})
      this.scene.stop();
      this.scene.start("Select");
    };

    this.input.keyboard.on("keydown-SPACE", playSelect)

    play.on("pointerup", playSelect)

    perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, `perso${characterCounter}`).setDisplaySize(innerWidth/6.5, innerHeight/1.9);

    const swipeLeft = () => {
      if (characterCounter <= 1) {
        characterCounter = 4
      } else {
        characterCounter--
      }
      perso.destroy();
      perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, `perso${characterCounter}`).setDisplaySize(innerWidth/6.5, innerHeight/1.9);
    };

    const swipeRight = () => {
      if (characterCounter >= 4) {
        characterCounter = 1
      } else {
        characterCounter++
      }
      perso.destroy();
      perso = this.add.image(innerWidth / 2, innerHeight / 2 - 50, `perso${characterCounter}`).setDisplaySize(innerWidth/6.5, innerHeight/1.9);
    }

    leftArrow.on("pointerup", swipeLeft)

    this.input.keyboard.on("keydown-LEFT", swipeLeft)


    rightArrow.on("pointerup", swipeRight)

    this.input.keyboard.on("keydown-RIGHT", swipeRight)
  }
}

export { Login, sprites, characterCounter };
