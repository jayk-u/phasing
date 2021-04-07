import { game } from "../channels/game"
import { createCutscene, updateCutscene } from '../components/cutscenes'

var status
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
    this.begin()
    createCutscene(this, status, 'Play2')
  };
  update ()
  {
    updateCutscene(this, content, status)
  }
}

export { Intro2 }
