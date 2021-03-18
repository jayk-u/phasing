var nameCounter;
var level

const box = (game, x, y, width, height) => {
  game.add.graphics().fillStyle(0xFFFFFF).fillRect(x - 5, y - 5, width + 10, height + 10);
  game.add.graphics().fillStyle(0x000000).fillRect(x - 2.5, y - 2.5, width + 5, height + 5);
  level = game.add.image(x, y, `map${nameCounter}`).setOrigin(0).setDisplaySize(width, height).setInteractive();
  if (nameCounter == 0) {
    game.add.text(x + width/4, y + height + 10, `Tutorial`, {font: "24px", color:"#FFFFFF"})
    level.on("pointerdown", () => {
      game.scene.stop();
      game.scene.start("Tutorial");
    });
  } else {
    game.add.text(x + width/4, y + height + 10, `Level ${nameCounter}`, {font: "24px", color:"#FFFFFF"})
    var sceneName = `Intro${nameCounter}`;
    level.on("pointerdown", () => {
      game.scene.stop();
      game.scene.start(sceneName);
    });
  }
  nameCounter ++;
}

class Select extends Phaser.Scene {

  constructor ()
    {
        super('Select');
    }

  preload ()
  {
      const selectAssets = document.getElementById("selectScreen").dataset;
      this.load.image('map0', selectAssets.map1Img);
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
    nameCounter = 0;
    box(this, innerWidth/5, innerHeight/3, innerWidth/5, innerHeight/5);
    box(this, innerWidth/2, innerHeight/3, innerWidth/5, innerHeight/5);

    var video = this.add.video(10, 10, "overlay");
    video.setDisplaySize(innerWidth, innerHeight);

    video.setBlendMode(Phaser.BlendModes.SCREEN);

    var lg = this.add.image(125, 80, "logoo");
    lg.setDisplaySize(225, 125);

  }
}

export { Select }
