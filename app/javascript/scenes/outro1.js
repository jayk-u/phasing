import { game } from "../channels/game"
import { createCutscene, updateCutscene } from '../components/cutscenes'

var status
var content = [ "The door opened.",
"I felt elated, relieved. I ran with all my heart. With every step, I was leaving all this tension, all this fear behind.",
"He didn’t follow me. Perhaps he didn't even see me. Perhaps I was too fast. By the time I came to myself, I was already in front of the office.",
"I was glad this was over. I was still reeling from the experience. This was fine though. Everything was fine. We had him. We needed to move quickly, but we had him.",
"All those atrocities I saw at his place... He wouldn't get to commit ever again.",
"It was with this feeling of Noblesse Oblige that we stormed his compound. We mobilized every man available. There was no way we'd let him escape after all this.",
"Then I set foot upon his doorstep. I had an intense feeling of déjà vu. I expected fear or anything akin to PTSD. All I felt was trepidation. Because the front door was still wide open. As I left it.",
"In the end, we didn't catch the guy. Our main hypothesis was that he saw me fleeing and understood his plans were foiled. Now, he's on the run.",
"That also means his killing streak stopped though. Or perhaps he moved it to some other country. It was unsatisfactory, and with all things settled I couldn't help but wonder if we were played. Something was telling me... perhaps he never planned to come back that one night. One thing was sure though...",
"I'm definitely getting a raise."
]

class Outro1 extends Phaser.Scene {

  constructor ()
  {
    super('Outro1');
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
    this.load.image("picture1", introAssets.picture1o1Img);
    this.load.image("picture2", introAssets.picture2o1Img);
    this.load.image("picture3", introAssets.picture3o1Img);
    this.load.image("picture4", introAssets.picture4o1Img);
    this.load.image("picture5", introAssets.picture5o1Img);
    this.load.audio("introMusic", introAssets.introMp3);


    const gameAssets = document.getElementById("game-assets").dataset;
    this.load.image('exit', gameAssets.exitImg);
  };

  create ()
  {
    this.begin();
    createCutscene(this, status, 'Login')
  };
  update ()
  {
    updateCutscene(this, content, status)
  }
}

export { Outro1 }
