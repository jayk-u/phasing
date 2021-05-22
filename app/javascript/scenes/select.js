var nameCounter;
var level;

const box = (game, x, y, width, height) => {
  var white;

  var toggle = true
  var i = 10
  var timedEvent
  var stopEvent = false;
  var toneSound = game.sound.add("tone", {rate: 0.6});

  const onEvent = () => {
    toggle ? i++ : i--;
    if (i>=20 || stopEvent) {toggle = false}
    else if (i<=10) {toggle = true}
    if (white) white.destroy();
    white = game.add.graphics().fillStyle(0xFFFFFF).fillRect(x - Math.max(i/2, 5), y - Math.max(i/2, 5), width + Math.max(10, i), height + Math.max(10, i)).setDepth(-1);
    if (stopEvent && i<=10) {timedEvent.destroy()}
  }

  white = game.add.graphics().fillStyle(0xFFFFFF).fillRect(x - 5, y - 5, width + 10, height + 10);
  game.add.graphics().fillStyle(0x000000).fillRect(x - 2.5, y - 2.5, width + 5, height + 5);
  level = game.add.image(x, y, `map${nameCounter}`).setOrigin(0).setDisplaySize(width, height).setInteractive();
  level.on("pointerover", () => {
    stopEvent = false;
    // activerect.setDisplaySize(width + i, height + i)
    timedEvent = game.time.addEvent({
      delay: 30,
      callback: onEvent, 
      callbackScope: game, 
      loop: true
    });

})
  level.on("pointerout", () => {
    stopEvent = true;
    // activerect.destroy();
  })
  if (nameCounter == 0) {
    game.add.text(x + width/3, y + height + 10, `Tutorial`, {font: `${width/13}px`, color:"#FFFFFF", align: 'center', wordWrap: {width: width}})
    level.on("pointerdown", () => {
      toneSound.play();
      game.scene.stop();
      game.scene.start("Tutorial");
    });
  } else {
    game.add.text(x + width/3, y + height + 10, `Level ${nameCounter}`, {font: `${width/12.2}px`, color:"#FFFFFF"}).setAlign('center')
    var sceneName = `Intro${nameCounter}`;
    level.on("pointerdown", () => {
      toneSound.play();
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
      this.load.image('map0', selectAssets.map0Img);
      this.load.image('map1', selectAssets.map1Img);
      this.load.image('map2', selectAssets.map2Img);
      this.load.audio("selectLevel", selectAssets.selectlevelMp3);

      const loginAssets = document.getElementById("login").dataset;

      this.load.image("logoo", loginAssets.logoImg);
      this.load.image("settings", loginAssets.settingsBtn);
      // this.load.video("overlay", loginAssets.overlayVid, false, true);
      this.load.video("background", loginAssets.backgroundVid, 'loadeddata', false, true);
      this.load.image("volumeSettings", loginAssets.volumesettingsImg);
      this.load.image("volume", loginAssets.volumeImg);
      this.load.image("lowVolume", loginAssets.lowvolumeImg);
      this.load.audio("music", loginAssets.musicMp3);
      this.load.image("controls", loginAssets.controlsImg);
  }

  create ()
  {
    nameCounter = 0;
    box(this, innerWidth/8, innerHeight/3, innerWidth/5, innerHeight/5);
    box(this, innerWidth/2.5, innerHeight/3, innerWidth/5, innerHeight/5);
    box(this, innerWidth*2/3, innerHeight/3, innerWidth/5, innerHeight/5);


    var video = this.add.video(0, 0, "background");
    video.setDisplaySize(innerWidth*2, innerHeight*2).setPaused(false);

    video.setBlendMode(Phaser.BlendModes.SCREEN);
    video.play(true);

    var lg = this.add.image(innerWidth / 9, innerHeight / 8, "logoo");
    lg.setDisplaySize(innerWidth / 5, innerHeight / 7.9);

  }
}

export { Select }
