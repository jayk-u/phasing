import { game } from "../channels/game"

var text
var skip
var then = 0
var wordIndex = 0;
var letterIndex = 0;
var lineIndex = 0;
var line = "";
var run = true;
var pictureNum = 1.58;
var picture;
var picturecam;
var incrementexpo = 0.1;
var alphaIncrement = 0;

class Intro extends Phaser.Scene {

  constructor ()
  {
      super('Intro');
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


    const gameAssets = document.getElementById("game-assets").dataset;
    this.load.image('exit', gameAssets.exitImg);
  };

create ()
{
    // var graphics = this.add.graphics();

    //graphics.fillStyle(0xFFFFFF);
    picture = this.add.image(innerWidth/20, innerHeight/6, `picture${Math.trunc(pictureNum)}`).setOrigin(0);
    picture.setDisplaySize(innerWidth*18/20, innerHeight*4/10);
    // picturecam = this.cameras.add(innerWidth/20, innerHeight/10, innerWidth*18.2/20, innerHeight*4.1/10).setAlpha(0);
    // picturecam.visible = false

    //graphics.fillRect(50, 175, innerWidth - 100, 200);
    var content = [ "Kyoto - October 13th 1997",
                    "The city has been in the grip of terror for several months, as a killer chains the victims week after week.",
                    "He didn’t follow any pattern, never stopping at anything, killing women, children, the elderly... The victims were all found sliced, cut by what seems to be a large blade, a sword or a saber.",
                    "But I had something solid. On several TV reports, a man can be seen in the background, hidden in the crowd.",
                    "After 3 weeks of investigation, I did not have further doubt: this is our man.",
                    "I have shadowed him ever since, I knew by heart his daily schedule: when he sleeps, when he eats, when he moves.",
                    "One night, as he went to pick some cigarettes, I took my chance and sneaked into his apartment.",
                    "Suffice to say I might have underestimated the guy... and the door locked securely after my passage.",
                    "I felt silly, I felt inadequate. I spent so much time preparing only to fail at the very first step.",
                    "No more time to look for evidence, this guy is sick. I must get out of here at all costs before he comes back..."
                  ]
    text = this.add.text(innerWidth/20, innerHeight/1.65, "", {color: '#FFFFFF', font: "32px", wordWrap: {width: innerWidth*18/20 }})
    skip = this.add.text(innerWidth*16/20, innerHeight*8/9, "Press Enter to skip...", {color: '#FFFFFF', font: "16px"})


    // nextLine();

    this.input.keyboard.on('keydown', (event)  => {

      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
      {
          this.scene.stop();
          this.scene.start('Play');
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

    let musique = this.sound.add('music');
    musique.setVolume(0.1);
    // musique.play();

    unmute.on("pointerup", (event) => {
      musique.pause();
      mute.setVisible(true);
      unmute.setVisible(false);
    });

    mute.on("pointerup", (event) => {
      musique.resume();
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
    } );

  };
  update ()
  {
    if (run) {
      var t = this
      var content = [ "Kyoto - October 13th 1997",
      "The city has been in the grip of terror for several months, as a killer chains the victims week after week.",
      "He didn’t follow any pattern, never stopping at anything, killing women, children, the elderly... The victims were all found sliced, cut by what seems to be a large blade, a sword or a saber.",
      "But I had something solid. On several TV reports, a man can be seen in the background, hidden in the crowd.",
      "After 3 weeks of investigation, I did not have further doubt: this is our man.",
      "I have shadowed him ever since, I knew by heart his daily schedule: when he sleeps, when he eats, when he moves.",
      "One night, as he went to pick some cigarettes, I took my chances and sneaked into his apartment.",
      "Suffice to say I might have underestimated the guy... and the door locked securely after my passage.",
      "I felt silly, I felt inadequate. I spent so much time preparing only to fail at the very first step.",
      "No more time to look for evidence, this guy is sick. I must get out of here at all costs before he comes back..."
    ]
      var word = content[lineIndex].split(" ")
      var letter = content[lineIndex].split("")
      var letterDelay = 30;
      if (letter.length == letterIndex) {
        letterDelay = 2000;
        // picturecam.visible = true
        // picturecam.fadeOut(2000)
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
              console.log(pictureNum)
              picture = this.add.image(innerWidth/20, innerHeight/6, `picture${Math.min(5,Math.trunc(pictureNum))}`).setOrigin(0);
              if (Math.trunc(pictureNum) != Math.min(5,Math.trunc(pictureNum - incrementexpo))) {alphaIncrement = 0; picture.setAlpha(alphaIncrement)}
              picture.setDisplaySize(innerWidth*18/20, innerHeight*4/10);
              // picturecam.fadeIn(2000)
              // picturecam.visibe = false
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

export { Intro }
