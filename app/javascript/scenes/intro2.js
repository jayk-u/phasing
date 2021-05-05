import { game } from "../channels/game"
import { createCutscene, updateCutscene } from '../components/cutscenes'

var status
var content = [ "Kyoto - October 13th 1997",
"11:30 p.m.",
"I was running.",
"It was a dreary night, the rythmic splashing of the rain only interrupted by the patrolling of police cars everywhere around me.",
"The rainfall curtain cooled down my skin and obscured the night - I was glad.",
"This made it easy. I could hide, I could sneak, I could slither my way through the agents without them seeing me.",
"Then, they would never find me again. I would vanish like a ghost, like a bad story no one would want to hear anymore. I was leaving the city.",
"I only had to escape the lockdown. Agents stood everywhere in-between me and my goal. If I could manage to get past them and through this bridge...",
"I would win. That was it. I would play one last round. They'd look for me and I'd escape.",
"A fitting finale, I guess. I'm a gentleman. I wouldn't leave without one last tango."
]

class Intro2 extends Phaser.Scene {

  constructor ()
  {
      super('Intro2');
  }

  begin ()
  {
    status = {
      then: 0,
      wordIndex: 0,
      letterIndex: 0,
      lineIndex: 0,
      line: "",
      run: true,
      pictureNum: 1.58,
      incrementexpo: 0.1,
      alphaIncrement: 0,
    }
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
    this.load.image("picture1", introAssets.picture1i2Img);
    this.load.image("picture2", introAssets.picture2i2Img);
    this.load.image("picture3", introAssets.picture3i2Img);
    this.load.image("picture4", introAssets.picture4i2Img);
    this.load.image("picture5", introAssets.picture5i2Img);
    this.load.audio("introMusic", introAssets.introMp3);


    const gameAssets = document.getElementById("game-assets").dataset;
    this.load.image('exit', gameAssets.exitImg);
  };

  create ()
  {
    this.begin()
    createCutscene(this, status, 'Play2')
  };
  update ()
  {
    updateCutscene(this, content, status)
  }
}

export { Intro2 }
