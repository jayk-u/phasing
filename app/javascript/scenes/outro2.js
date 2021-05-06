import { game } from "../channels/game"
import { createCutscene, updateCutscene } from '../components/cutscenes'

var status
var content = [ "Splash.",
"Splash.",
"My feet on the wet ground echoed through the night.",
"I could hear the agents talking in the distance. In the distance, as in: far behind me.",
"I won't lie, I was proud of this scheme of mine. Playing with the law enforcers always felt thrilling. Playing them, now, that's what I was living for.",
"I always loved a good challenge. A mind-boggling puzzle. I always thought life was only ever worth as much as you made it to be.",
"Ironic, isn't it? I take the lives of others to make mine more satisfying. I'm... stealing value from them. All things considered, am I not more of a thief than a killer?",
"It always makes me laugh.",
"And now, vanishing into the depth of the night, I scheme for my return. A great symphony of men and crime, of drama and suspense of plans and actions...",
"That's monday for me."
]

class Outro2 extends Phaser.Scene {

  constructor ()
  {
      super('Outro2');
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
    this.load.image("picture1O2", introAssets.picture1Img);
    this.load.image("picture2O2", introAssets.picture2Img);
    this.load.image("picture3O2", introAssets.picture3Img);
    this.load.image("picture4O2", introAssets.picture4Img);
    this.load.image("picture5O2", introAssets.picture5Img);
    this.load.audio("introMusic", introAssets.introMp3);


    const gameAssets = document.getElementById("game-assets").dataset;
    this.load.image('exit', gameAssets.exitImg);
  };

  create ()
  {
    this.begin()
    createCutscene(this, status, 'Login')
  };
  update ()
  {
    updateCutscene(this, content, status)
  }
}

export { Outro2 }
