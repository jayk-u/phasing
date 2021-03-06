import { sound } from './soundSettings'
import { phaser } from "../channels/game"

var text;
var skip;
var picture;
var typing;
var softtyping;
var hardtyping;


const createCutscene = (game, status, nextScene) => {
  // console.log(`picture${Math.trunc(status.pictureNum)}${game.scene.key.substring(0, 1)}${game.scene.key.substring(game.scene.key.length - 1)}`)
  game.cameras.main.fadeIn(200)
  picture = game.add.image(innerWidth/20, innerHeight/6, `picture${Math.trunc(status.pictureNum)}${game.scene.key.substring(0, 1)}${game.scene.key.substring(game.scene.key.length - 1)}`).setOrigin(0);
  picture.setDisplaySize(innerWidth*18/20, innerHeight*4/10);
  text = game.add.text(innerWidth/20, innerHeight/1.65, "", {color: '#FFFFFF', font: "32px", wordWrap: {width: innerWidth*18/20 }})
  skip = game.add.text(innerWidth*16/20, innerHeight*8/9, "Press Enter to skip...", {color: '#FFFFFF', font: "16px"})

  game.input.keyboard.once('keydown-ENTER', ()  => {
    game.cameras.main.fadeOut(1000)
    game.time.delayedCall(1000, () => {
      game.scene.stop();
      game.scene.start(nextScene);
      intromusic.stop();
    })
  });

  game.events.once("finished", () => {
    game.cameras.main.fadeOut(1000)
    game.cameras.main.once("camerafadeoutcomplete", () => {
      game.scene.stop();
      intromusic.stop();
      game.scene.start(nextScene);
    })
  })

  // START SETTINGS

  // var unmute = game.add.image(innerWidth-230, innerHeight/10.5, "volume").setInteractive();
  // unmute.setDisplaySize(80,80);
  // unmute.setVisible(true);
  // unmute.setDepth(2);

  // var mute = game.add.image(innerWidth-230, innerHeight/10.5, "mute").setInteractive();
  // mute.setDisplaySize(80,80);
  // mute.setVisible(false);
  // mute.setDepth(2);

  // var status = game.add.text(innerWidth-310, 135, "Controls", {
  //   fontSize: '48px',
  //   color:'#796356'
  // }).setDepth(2);
  // status.setVisible(false);

  let intromusic = game.sound.add('introMusic');
  sound(game, innerWidth-230, innerHeight/10.5, 80, 80, intromusic, false)
  // intromusic.setVolume(0.5);
  // intromusic.play();

  // unmute.on("pointerup", () => {
  //   intromusic.pause();
  //   mute.setVisible(true);
  //   unmute.setVisible(false);
  // });

  // mute.on("pointerup", () => {
  //   intromusic.resume();
  //   unmute.setVisible(true);
  //   mute.setVisible(false);
  // });

  const exit = game.add.image(innerWidth-110, innerHeight/10.5, 'exit').setInteractive().setDepth(2).setScrollFactor(0);
  exit.setDisplaySize(80,80);

  localStorage.setItem('status', status.text)

  // END SETTINGS

  exit.on("pointerup", () => {
    game.scene.stop();
    game.scene.start('Login');
    intromusic.stop();
  });

  // TYPING SFX

  hardtyping = game.sound.add('hardtypewriting', {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
  })
  hardtyping.addMarker({
    config: {
      volume: 0.05,
    },
    name: 'keypress',
    start: 0.1,
    duration: 0.1,
  })

  softtyping = game.sound.add('softtypewriting', {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
  })
  softtyping.addMarker({
    config: {
      volume: 0.05,
    },
    name: 'keypress',
    start: 0.1,
    duration: 0.1,
  })

  typing = game.sound.add('typewriting', {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
  })
  typing.addMarker({
    config: {
      volume: 0.05,
    },
    name: 'keypress',
    start: 0,
    duration: 0.1,
  })
  //END SFX
}

const updateCutscene = (game, content, status) => {
  if (status.run) {
    // var word = content[status.lineIndex].split(" ")
    var letter = content[status.lineIndex].split("")
    var letterDelay = 30;
    if (letter.length == status.letterIndex) {
      letterDelay = 2000 + content[status.lineIndex].split("").length * 9;
    }
    if (Math.trunc(status.pictureNum) != Math.min(5,Math.trunc(status.pictureNum + status.incrementexpo))) {
      status.alphaIncrement += 0.025
      picture.setAlpha(1 - status.alphaIncrement)
    }
    var now = game.time.now
    if (status.lineIndex < content.length) {
      if ((now - status.then) > letterDelay) {
          if (status.letterIndex == letter.length) {
            status.lineIndex++;
            status.letterIndex = 0;
            status.line = "";
            status.incrementexpo += 0.07;
            status.pictureNum += status.incrementexpo;
            picture = game.add.image(innerWidth/20, innerHeight/6, `picture${Math.min(5,Math.trunc(status.pictureNum))}${game.scene.key.substring(0, 1)}${game.scene.key.substring(game.scene.key.length - 1)}`).setOrigin(0);
            if (Math.trunc(status.pictureNum) != Math.min(5,Math.trunc(status.pictureNum - status.incrementexpo))) {status.alphaIncrement = 0; picture.setAlpha(status.alphaIncrement)}
            picture.setDisplaySize(innerWidth*18/20, innerHeight*4/10);
          }
          if (status.lineIndex == content.length) {status.run = false; return ;}
          if (status.run) { letter = content[status.lineIndex].split("") }
          status.line = status.line.concat(letter[status.letterIndex])
          text.setText(status.line);
          if (!hardtyping.isPlaying && !softtyping.isPlaying && !typing.isPlaying) {
            [typing, softtyping, hardtyping][Math.floor(Math.random() * 3)].play("keypress");
          }
          status.letterIndex++
          status.then = now
        }
    }
    if (status.alphaIncrement < 1 && letter.length != status.letterIndex) {
      status.alphaIncrement += 0.025
      picture.setAlpha(status.alphaIncrement)
    }
  } else {
    skip.destroy();
    game.events.emit("finished")
  }
}

export {createCutscene, updateCutscene}