import { phaser } from "../channels/game"

var unmute;
var mute;
var musicSettings
var SFXSettings
var musicSettingsBar
var musicMask

const sound = (game, x, y, width, height, musique, play = true) => {
  unmute = game.add.image(x, y, "volume").setInteractive().setDepth(2);
  if (play) {unmute.setScrollFactor(0);}
  unmute.setDisplaySize(width, height);
  unmute.setVisible(true);

  mute = game.add.image(x, y, "mute").setInteractive().setDepth(2);
  if (play) {mute.setScrollFactor(0);}
  mute.setDisplaySize(width, height);
  mute.setVisible(false);

  musicSettings = game.add.image(x + width/1.35, y + height/1.2, "emptyBar").setDisplaySize(width*2.3, height/3, 6).setVisible(false).setDepth(2).setInteractive();
  if (play) {musicSettings.setScrollFactor(0);}
  musicSettingsBar = game.add.graphics()
  musicSettingsBar.fillStyle(0x000000).fillRoundedRect(x - width/2.8, y + height/1.42, width*2.2, height/3.5, 6).setVisible(false).setDepth(3);
  if (play) {musicSettingsBar.setScrollFactor(0);}
  musicMask = game.add.graphics();
  musicMask.fillStyle(0x034037).fillRoundedRect(x - width/2.8, y + height/1.42, width*2.2, height/3.5, 6).setVisible(false).setDepth(4);
  if (play) {musicMask.setScrollFactor(0);}

  // musicSettingsBar.mask = new Phaser.Display.Masks.BitmapMask(game, musicMask);

  musique.setVolume(1);
  musique.play();

  musicSettings.on("pointerdown", (pointer, positionX) => {
    musicMask.destroy();
    if (positionX > 30) {
      musicMask = game.add.graphics();
      if (play) {musicMask.fillStyle(0x034037).fillRoundedRect(x - width/2.8, y + height/1.42, positionX/4.5, height/3.5, 6).setDepth(6).setScrollFactor(0);}
      else musicMask.fillStyle(0x034037).fillRoundedRect(x - width/2.8, y + height/1.42, positionX/1.9, height/3.5, 6).setDepth(6);
      phaser.musicVolume = positionX/300
    } else {
      phaser.musicVolume = 0
    }
    console.log(phaser.musicVolume)
    phaser.sound.sounds.forEach(music => {
      music.currentConfig.volume = (phaser.musicVolume.toFixed(3))
      console.log(music.markers[Object.keys(music.markers)[0]])
      if (music.markers[Object.keys(music.markers)[0]] != undefined) {
        if (music.markers[Object.keys(music.markers)[0]].config != undefined) {
          Object.keys(music.markers).forEach(marker => {
            music.markers[marker].config.volume = phaser.musicVolume.toFixed(3)
            // console.log("config", marker.config.volume)
          })
        };
      };
    })
    console.log(positionX/2, width*2.2)
    console.log(phaser)
  })

  // game.input.on("pointerdown", (pointer, z, w, a, b) => {
  //   console.log(pointer)
  //   console.log(pointer.downX, x - width/2.8)
  //   if (pointer.downX > (x - width/2.8) && pointer.downX < (x - width/2.8 + width*2.2) && pointer.downY > y + height/1.42 && pointer.downY < y + height/1.42 + height/3.5) {
  //     musicMask.destroy();
  //     if (pointer.downX - (x - width/2.8) > 10) {
  //       musicMask = game.add.graphics();
  //       musicMask.fillStyle(0x034037).fillRoundedRect(x - width/2.8, y + height/1.42, pointer.downX - (x - width/2.8), height/3.5, 6).setDepth(4);
  //       if (play) {musicMask.setScrollFactor(0);}
  //     }
  //     phaser.musicVolume = (pointer.downX - (x - width/2.8))/175
  //     phaser.sound.sounds.forEach(music => {music.currentConfig.volume = (phaser.musicVolume.toFixed(3))})
  //     console.log(phaser)

  //   }
  // })

  unmute.on("pointerup", () => {
    musicSettings.setVisible(true);
    musicSettingsBar.setVisible(true);
    musicMask.setVisible(true);


    // SFXSettings.setVisible(true);

    musique.pause();
    mute.setVisible(true);
    unmute.setVisible(false);
  });


  mute.on("pointerup", () => {
    musicSettings.setVisible(false)
    musicSettingsBar.setVisible(false)
    musicMask.setVisible(false);

    unmute.setVisible(true);
    mute.setVisible(false);
    musique.resume();
  });
}

export { sound };