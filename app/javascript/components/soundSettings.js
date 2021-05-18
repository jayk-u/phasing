import { phaser } from "../channels/game"

var unmute;
var mute;
var low
var settings;
var SFXSettings
// var SFXSettingsBar
var SFXMask
var SFXText
var musicSettings
// var musicSettingsBar
var musicMask
var musicText




const sound = (game, x, y, width, height, musique, play = true) => {
  unmute = game.add.image(x, y, "volume").setInteractive().setDepth(2);
  if (play) {unmute.setScrollFactor(0);}
  unmute.setDisplaySize(width, height);
  unmute.setVisible(true);

  low = game.add.image(x, y, "lowVolume").setInteractive().setDepth(2);
  if (play) {low.setScrollFactor(0);}
  low.setDisplaySize(width, height);
  low.setVisible(false);

  settings = game.add.image(x, y, "settings").setInteractive().setDepth(2);
  if (play) {settings.setScrollFactor(0);}
  settings.setDisplaySize(width, height);
  settings.setVisible(false);

  mute = game.add.image(x, y, "mute").setInteractive().setDepth(2);
  if (play) {mute.setScrollFactor(0);}
  mute.setDisplaySize(width, height);
  mute.setVisible(false);

  SFXSettings = game.add.image(x + width/1.35, y + height/1.2, "emptyBar").setDisplaySize(width*2.3, height/3, 1).setVisible(false).setDepth(2).setInteractive();
  if (play) {SFXSettings.setScrollFactor(0);}
  // SFXSettingsBar = game.add.graphics()
  // SFXSettingsBar.fillStyle(0x000000).fillRoundedRect(x - width/2.6, y + height/1.42, width*2.2, height/3.5, 1).setVisible(false).setDepth(2);
  // if (play) {SFXSettingsBar.setScrollFactor(0);}
  SFXMask = game.add.graphics();
  SFXMask.fillStyle(0xFFFCBB).fillRoundedRect(x - width/2.6, y + height/1.42, width*1.1, height/3.5, 1).setVisible(false).setDepth(2);
  if (play) {SFXMask.setScrollFactor(0);}
  SFXText = game.add.text(
    x + width/2,
    play? y + height/1.65 : y + height/1.5,
    "SFX",
    {
      fontFamily: "Arial",
      color: "#FFFFFF",
      font: `${width/4}px`,
      wordWrap: { width: 110 },
      stroke: 0x000000,
      strokeThickness: 3
    }
  ).setDepth(3).setVisible(false)
  if (play) {SFXText.setScrollFactor(0).setResolution(5);}
  
  musicSettings = game.add.image(x + width/1.35, y + height*1.2, "emptyBar").setDisplaySize(width*2.3, height/3, 4).setVisible(false).setDepth(2).setInteractive();
  if (play) {musicSettings.setScrollFactor(0);}
  // musicSettingsBar = game.add.graphics()
  // musicSettingsBar.fillStyle(0x000000).fillRoundedRect(x - width/2.6, y + height*1.05, width*2.2, height/3.5, 1).setVisible(false).setDepth(2);
  // if (play) {musicSettingsBar.setScrollFactor(0);}
  musicMask = game.add.graphics();
  musicMask.fillStyle(0xFFFCBB).fillRoundedRect(x - width/2.6, y + height*1.05, width*2.2, height/3.5, 1).setVisible(false).setDepth(2);
  if (play) {musicMask.setScrollFactor(0);}
  musicText = game.add.text(
    x + width/2.8,
    play? y + height : y + height*1.05,
    "Music",
    {
      fontFamily: "Arial",
      color: "#FFFFFF",
      font: `${width/4}px`,
      wordWrap: { width: 110 },
      stroke: 0x000000,
      strokeThickness: 3
    }
  ).setDepth(3).setVisible(false)
  if (play) {musicText.setScrollFactor(0).setResolution(5);}

  // SFXSettingsBar.mask = new Phaser.Display.Masks.BitmapMask(game, SFXMask);

  musique.setVolume(1);
  musique.play();

  SFXSettings.on("pointerdown", (pointer, positionX) => {
    SFXMask.destroy();
    if (positionX > 15) {
      SFXMask = game.add.graphics();
      if (play) {SFXMask.fillStyle(0xFFFCBB).fillRoundedRect(x - width/2.6, y + height/1.42, positionX/4.1, height/3.5, 1).setDepth(2).setScrollFactor(0);}
      else SFXMask.fillStyle(0xFFFCBB).fillRoundedRect(x - width/2.6, y + height/1.42, positionX/1.8, height/3.5, 1).setDepth(2);
      phaser.SFXVolume = positionX/300
    } else {
      phaser.SFXVolume = 0
    }
    phaser.sound.sounds.forEach(SFX => {
      SFX.currentConfig.volume = (phaser.SFXVolume.toFixed(3))
      if (SFX.markers[Object.keys(SFX.markers)[0]] != undefined) {
        if (SFX.markers[Object.keys(SFX.markers)[0]].config != undefined) {
          Object.keys(SFX.markers).forEach(marker => {
            SFX.markers[marker].config.volume = phaser.SFXVolume.toFixed(3)
          })
        };
      };
    })
  })

  musicSettings.on("pointerdown", (pointer, positionX) => {
    musicMask.destroy();
    if (positionX > 15) {
      musicMask = game.add.graphics();
      if (play) {musicMask.fillStyle(0xFFFCBB).fillRoundedRect(x - width/2.6, y + height*1.05, positionX/4.1, height/3.5, 1).setDepth(2).setScrollFactor(0);}
      else musicMask.fillStyle(0xFFFCBB).fillRoundedRect(x - width/2.6, y + height*1.05, positionX/1.8, height/3.5, 1).setDepth(2);
      musique.setVolume(positionX/300)
    } else {
      musique.setVolume(0)
    }
  })

  // game.input.on("pointerdown", (pointer, z, w, a, b) => {
  //   console.log(pointer)
  //   console.log(pointer.downX, x - width/2.6)
  //   if (pointer.downX > (x - width/2.6) && pointer.downX < (x - width/2.6 + width*2.2) && pointer.downY > y + height/1.42 && pointer.downY < y + height/1.42 + height/3.5) {
  //     SFXMask.destroy();
  //     if (pointer.downX - (x - width/2.6) > 10) {
  //       SFXMask = game.add.graphics();
  //       SFXMask.fillStyle(0x034037).fillRoundedRect(x - width/2.6, y + height/1.42, pointer.downX - (x - wi1th/2.8), height/3.5, 6).setDepth(4);
  //       if (play) {SFXMask.setScrollFactor(0);}
  //     }
  //     phaser.SFXVolume = (pointer.downX - (x - width/2.6))/175
  //     phaser.sound.sounds.forEach(SFX => {SFX.currentConfig.volume = (phaser.SFXVolume.toFixed(3))})
  //     console.log(phaser)

  //   }
  // })

  const displaySettings = () => {
    if(SFXSettings.visible) {
      SFXSettings.setVisible(false)
      // SFXSettingsBar.setVisible(false)
      SFXMask.setVisible(false);
      SFXText.setVisible(false);
      musicSettings.setVisible(false)
      // musicSettingsBar.setVisible(false)
      musicMask.setVisible(false);
      musicText.setVisible(false);
      settings.setVisible(false);
      if (phaser.SFXVolume === 0 && musique.volume === 0) {
        mute.setVisible(true);
        unmute.setVisible(false);
        low.setVisible(false);
      } else if (phaser.SFXVolume === 0 || musique.volume === 0) {
        mute.setVisible(false);
        unmute.setVisible(false);
        low.setVisible(true);
      } else {
        mute.setVisible(false);
        unmute.setVisible(true);
        low.setVisible(false);
      }
    } else {
      SFXSettings.setVisible(true);
      // SFXSettingsBar.setVisible(true);
      SFXMask.setVisible(true);
      SFXText.setVisible(true);
      musicSettings.setVisible(true)
      // musicSettingsBar.setVisible(true)
      musicMask.setVisible(true);
      musicText.setVisible(true);
      mute.setVisible(false);
      unmute.setVisible(false);
      low.setVisible(false);
      settings.setVisible(true);
    }
    
    // SFXSettings.setVisible(true);

    // musique.pause();
  }

  unmute.on("pointerup", displaySettings)
  low.on("pointerup", displaySettings)
  settings.on("pointerup", displaySettings)
  mute.on("pointerup", displaySettings)
}

export { sound };