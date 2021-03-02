import { game } from "../channels/game"

var text
var skip
var then = 0
var wordIndex = 0;
var letterIndex = 0;
var lineIndex = 0;
var line = "";
var run = true


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

    const gameAssets = document.getElementById("game-assets").dataset;
    this.load.image('exit', gameAssets.exitImg);
  };

create ()
{

    var graphics = this.add.graphics();

    graphics.fillStyle(0xFFFFFF);

    graphics.fillRect(50, 175, innerWidth - 100, 200);
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
    text = this.add.text(60, 400, "", {color: '#FFFFFF', font: "32px", wordWrap: {width: innerWidth - 120, height: 200 }})
    skip = this.add.text(innerWidth - 250, innerHeight - 50, "Press Enter to skip...", {color: '#FFFFFF', font: "16px"})


    // nextLine();

    this.input.keyboard.on('keydown', (event)  => {

      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
      {
          this.scene.stop();
          this.scene.start('Play');
      }

    })

    // START SETTINGS

    var unmute = this.add.image(innerWidth/1.255, innerHeight/10.5, "volume").setInteractive();
    unmute.setDisplaySize(80,80);
    unmute.setVisible(true);

    var mute = this.add.image(innerWidth/1.255, innerHeight/10.5, "mute").setInteractive();
    mute.setDisplaySize(80,80);
    mute.setVisible(false);

    var status = this.add.text(innerWidth-310, 135, "Controls", {
      fontSize: '48px',
      color:'#796356'
    }).setDepth(2);
    status.setVisible(false);

    let musique = this.sound.add('music');
    musique.setVolume(0.1);
    musique.play();

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

    const exit = this.add.image(innerWidth/1.087, innerHeight/10.5, 'exit').setInteractive().setDepth(2).setScrollFactor(0);
    exit.setDisplaySize(80,80);




      localStorage.setItem('status', status.text)

    // END SETTINGS

    // function nextLine() {
    //   if (lineIndex === content.length)
    //   {
    //       //  We're finished
    //       return;
    //   }

    //   //  Split the current line on spaces, so one word per array element
    //   line = content[lineIndex].split(' ');

    //   //  Reset the word index to zero (the first word in the line)
    //   wordIndex = 0;

    //   //  Call the 'nextWord' function once for each word in the line (line.length)
    //   t.events.repeat(wordDelay, line.length, nextWord, this);
    //   // line.forEach((w)=>{
    //   //   // setTimeout(wordDelay/1000);
    //   //   nextWord();
    //   // })

    //   //  Advance to the next line
    //   lineIndex++;

    // }

    // function nextWord() {

    //   //  Add the next word onto the text string, followed by a space
    //   text.text = text.text.concat(line[wordIndex] + " ");

    //   //  Advance the word index to the next word in the line
    //   wordIndex++;

    //   //  Last word?
    //   if (wordIndex === line.length)
    //   {
    //       //  Add a carriage return
    //       text.text = text.text.concat("\n");
    //       // setTimeout(lineDelay/1000)
    //       //  Get the next line after the lineDelay amount of ms has elapsed
    //       t.events.add(lineDelay, nextLine, this);
    //   }

    // }


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
      "One night, as he went to pick some cigarettes, I took my chance and sneaked into his apartment.",
      "Suffice to say I might have underestimated the guy... and the door locked securely after my passage.",
      "I felt silly, I felt inadequate. I spent so much time preparing only to fail at the very first step.",
      "No more time to look for evidence, this guy is sick. I must get out of here at all costs before he comes back..."
    ]
      var word = content[lineIndex].split(" ")
      var letter = content[lineIndex].split("")
      var letterDelay = 30;
      if (letter.length == letterIndex) { letterDelay = 2000 }
      var now = t.time.now
      if (lineIndex < content.length) {
        if ((now - then) > letterDelay) {
            if (letterIndex == letter.length) {lineIndex++, letterIndex = 0, line = ""}
            if (lineIndex == content.length) {run = false; return ;}
            if (run) { letter = content[lineIndex].split("") }
            line = line.concat(letter[letterIndex])
            text.setText(line),
            letterIndex++
            then = now
          }
      }
    } else {
      skip.setText("Press Enter").setAlign('right')
    }
    }

}

export { Intro }
