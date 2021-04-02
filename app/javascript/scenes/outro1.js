import { game } from "../channels/game"

var text;
var skip;
var then;
var wordIndex;
var letterIndex;
var lineIndex;
var line;
var run;
var pictureNum;
var picture;
var picturecam;
var incrementexpo;
var alphaIncrement;

class Outro1 extends Phaser.Scene {

  constructor ()
  {
      super('Outro1');
  }

  begin ()
  {
    then = 0
    wordIndex = 0;
    letterIndex = 0;
    lineIndex = 0;
    line = "";
    run = true;
    pictureNum = 1.58;
    picture;
    picturecam;
    incrementexpo = 0.1;
    alphaIncrement = 0;
  }


  preload ()
  {
    const loginAssets = document.getElementById("login").dataset;
    this.load.image("settings", loginAssets.settingsBtn);
    this.load.image("containersett", loginAssets.containerImg);
    this.load.image("volume", loginAssets.volumeImg);
    this.load.audio("music", loginAssets.musicMp3);

    const introAssets = document.getElementById("intro").dataset;
    this.load.image("mute", introAssets.muteImg);
    this.load.image("picture1", introAssets.picture1Img);
    this.load.image("picture2", introAssets.picture2Img);
    this.load.image("picture3", introAssets.picture3Img);
    this.load.image("picture4", introAssets.picture4Img);
    this.load.image("picture5", introAssets.picture5Img);
    this.load.audio("introMusic", introAssets.introMp3);


    const gameAssets = document.getElementById("game-assets").dataset;
    this.load.image('exit', gameAssets.exitImg);
  };

  create ()
  {
    this.begin();

    picture = this.add.image(innerWidth/20, innerHeight/6, `picture${Math.trunc(pictureNum)}`).setOrigin(0);
    picture.setDisplaySize(innerWidth*18/20, innerHeight*4/10);
    text = this.add.text(innerWidth/20, innerHeight/1.65, "", {color: '#FFFFFF', font: "32px", wordWrap: {width: innerWidth*18/20 }})
    skip = this.add.text(innerWidth*16/20, innerHeight*8/9, "Press Enter to skip...", {color: '#FFFFFF', font: "16px"})

    this.input.keyboard.on('keydown', (event)  => {

      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
      {
          this.scene.stop();
          this.scene.start('Login');
          intromusic.stop();
      }

    })

    // START SETTINGS

    var unmute = this.add.image(innerWidth-230, innerHeight/10.5, "volume").setInteractive();
    unmute.setDisplaySize(80,80);
    unmute.setVisible(true);
    unmute.setDepth(2);

    var mute = this.add.image(innerWidth-230, innerHeight/10.5, "mute").setInteractive();
    mute.setDisplaySize(80,80);
    mute.setVisible(false);
    mute.setDepth(2);

    var status = this.add.text(innerWidth-310, 135, "Controls", {
      fontSize: '48px',
      color:'#796356'
    }).setDepth(2);
    status.setVisible(false);

    let intromusic = this.sound.add('introMusic');
    intromusic.setVolume(0.5);
    intromusic.play();

    unmute.on("pointerup", (event) => {
      intromusic.pause();
      mute.setVisible(true);
      unmute.setVisible(false);
    });

    mute.on("pointerup", (event) => {
      intromusic.resume();
      unmute.setVisible(true);
      mute.setVisible(false);
    });

    const exit = this.add.image(innerWidth-110, innerHeight/10.5, 'exit').setInteractive().setDepth(2).setScrollFactor(0);
    exit.setDisplaySize(80,80);




    localStorage.setItem('status', status.text)

    // END SETTINGS

    exit.on("pointerup", (event) => {
      this.scene.stop();
      this.scene.start('Login');
      intromusic.stop();
    } );

  };
  update ()
  {
    if (run) {
      var t = this
      var content = [ "The door opened.",
      "I felt elated, relieved. I ran with all my heart. With every step, I was leaving all this tension, all this fear behind.",
      "He didn’t follow me. Perhaps he didn't even see me. Perhaps I was too fast. By the time I came to myself, I was already in front of the office.",
      "I was glad this was over. I was still reeling from the experience. This was fine though. Everything was fine. We had him. We needed to move quickly, but we had him.",
      "All those atrocities I saw at his place... He wouldn't get to commit ever again.",
      "It was with this feeling of Noblesse Oblige that we stormed his compound. We mobilized every man available. There was no way we'd let him escape after all this.",
      "Then I set foot upon his doorstep. I had an intense feeling of déjà vu. I expected fear or anything akin to PTSD. All I felt was trepidation. Because the front door was still wide open. As I left it.",
      "We didn't catch the guy. Our main hypothesis was that he saw me running away and understood his plans were foiled, causing him to run away.",
      "His killing streak stopped though. Or perhaps he moved it to some other country. It was unsatisfactory, but perhaps that didn't matter. I couldn't help but wonder if we were played. If he never planned to come back that one night. One thing was sure though...",
      "This definitely was above my paygrade."
    ]
      var word = content[lineIndex].split(" ")
      var letter = content[lineIndex].split("")
      var letterDelay = 30;
      if (letter.length == letterIndex) {
        letterDelay = 2000;
      }
      if (Math.trunc(pictureNum) != Math.min(5,Math.trunc(pictureNum + incrementexpo))) {
        alphaIncrement += 0.025
        picture.setAlpha(1 - alphaIncrement)
      }
      var now = t.time.now
      if (lineIndex < content.length) {
        if ((now - then) > letterDelay) {
            if (letterIndex == letter.length) {
              lineIndex++;
              letterIndex = 0;
              line = "";
              incrementexpo += 0.07;
              pictureNum += incrementexpo;
              picture = this.add.image(innerWidth/20, innerHeight/6, `picture${Math.min(5,Math.trunc(pictureNum))}`).setOrigin(0);
              if (Math.trunc(pictureNum) != Math.min(5,Math.trunc(pictureNum - incrementexpo))) {alphaIncrement = 0; picture.setAlpha(alphaIncrement)}
              picture.setDisplaySize(innerWidth*18/20, innerHeight*4/10);
            }
            if (lineIndex == content.length) {run = false; return ;}
            if (run) { letter = content[lineIndex].split("") }
            line = line.concat(letter[letterIndex])
            text.setText(line),
            letterIndex++
            then = now
          }
      }
      if (alphaIncrement < 1 && letter.length != letterIndex) {
        alphaIncrement += 0.025
        picture.setAlpha(alphaIncrement)
      }
    } else {
      skip.setText("Press Enter").setAlign('right')
    }
  }

}

export { Outro1 }
