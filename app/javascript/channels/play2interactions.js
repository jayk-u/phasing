import { status } from "../scenes/play2";
import { textbox } from '../components/textBox';

var key;
var next;

const minigameMap = (game, end) => {
  // 125x 850y
  textbox(game, ["A map of the docks.", "Perhaps I should study this carefully...", "...", "Who am I kidding?", "I didn't become a criminal to study."], end);
}

const minigameRoofLadder = (game, end) => {
  // 300x 615y
  textbox(game, ["A ladder.", "I don't have time to go parkouring.", "Fucking policemen."], end);
}

const minigamePillar = (game, end) => {
  // 525x 555y
  textbox(game, ["This reminds me of the time I light-burned that guy's retina...", "...", "Those were the days."], end);
}

const minigameStreetPlants = (game, end) => {
  // 580x 555y && 715x 555y && 530x 650y && 50x 875y && 683x 875y
  textbox(game, ["This plant has known brighter nights."], end);
}

const minigameRamenDoor = (game, end) => {
  // 622x 495y
  textbox(game, ["I'm hungry."], end);
}

const minigameOfficeDoor = (game, end) => {
  //750x 495y
  textbox(game, ["I'm no mere thief.", "I won't go in breaking pots for currency.", "What kind of madman would do that anyways?"], end);
}

const minigameLightPillar = (game, end) => {
  // 270x 875y
  textbox(game, ["It's bright.", "But not as bright as me."], end);
}

const minigameTourismDoor = (game, end) => {
  // 210x 845y
  textbox(game, ["Knock knock.", `"Who's there?"`, "Police.", '"Police who?"', "Police force's Kyoto department open up you're under arrest!", "...", "Would have worked on me."], end);
}

const minigameSupermarketDoor = (game, end) => {
  // 545x 875y
  textbox(game, ["Maybe I should buy some snacks?"], end);
}

const minigameBuildingDoor = (game, end) => {
  // 715x 845y
  textbox(game, ["It's locked.", "...", "I had to make sure."], end);
}

const minigameDocksLadder = (game, end) => {
  // 750x 975y
  textbox(game, ["I'm not touching this.", "Even criminals have pride."], end);
}

const minigameContainer = (game, end) => {
  // 655x 990y
  const destroyMinigame = () => {
    while (containers.getChildren()[0]) containers.getChildren()[0].destroy()
    end();
  }
  var containers = game.add.group({ key: 'container', repeat: 20, setScale: { x: 0.09, y: 0.08 } });
  Phaser.Actions.GridAlign(containers.getChildren(), {
    width: 5,
    height: 4,
    cellWidth: 47,
    cellHeight: 52,
    x: game.cameras.main.scrollX + innerWidth / 3.6,
    y: game.cameras.main.scrollY - innerHeight / 20,
  });
  game.input.keyboard.on('keydown-RIGHT', () => {
    containers.getChildren()[5].destroy();
    // containers.children.iterate(child => {
    //   child.setX(child.x + 5)
    //   console.log(child)
    // })
  })
  // var i = 0;

  //   containers.children.iterate(function (child) {

  //       game.tweens.add({
  //           targets: child,
  //           scaleX: 1,
  //           scaleY: 1,
  //           ease: 'Sine.easeInOut',
  //           duration: 300,
  //           delay: i * 50,
  //           repeat: -1,
  //           yoyo: true
  //       });

  //       i++;

  //       if (i % 12 === 0)
  //       {
  //           i = 0;
  //       }

  //   }, game);
  console.log(containers.children)
  // container = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, 'container')
  textbox(game, ["I wonder what's inside...?"], destroyMinigame);
}

const minigameStreetLamp = (game, end) => {
  //45x 995y && 275x 995y && 560x 995y && 720x 995y
  textbox(game, ["It's bright.", "I should probably avoid those.", "I don't have time to blind agents with my mad skills."], end);
}

const minigameBoat = (game, end) => {
  //115x 1000y
  textbox(game, ["I wish I could boat-ride my way out of this", "It'd probably make too much noise though...", "Would be funny.", "...At first."], end);
}

export {
  minigameBoat,
  minigameBuildingDoor,
  minigameContainer,
  minigameDocksLadder,
  minigameLightPillar,
  minigameMap,
  minigameOfficeDoor,
  minigamePillar,
  minigameRamenDoor,
  minigameRoofLadder,
  minigameStreetLamp,
  minigameStreetPlants,
  minigameSupermarketDoor,
  minigameTourismDoor,
};
