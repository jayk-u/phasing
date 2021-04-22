import { status } from "../scenes/play2";
import { textbox } from '../components/textBox';

var key;
var next;
var fuel
var containers;
var containerNumber;

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
  var i = 0;
  const destroyMinigame = () => {
    if (game.active === false) {
      while (containers.getChildren()[0]) containers.getChildren()[0].destroy()
      game.input.keyboard.off('keydown-RIGHT')
      game.input.keyboard.off('keydown-LEFT')
      game.input.keyboard.off('keydown-DOWN')
      game.input.keyboard.off('keydown-UP')
      game.input.keyboard.off('keydown-ENTER')
      if (fuel) fuel.destroy(), fuel = false;
      end();
    }
  }
  containerNumber = 0;
  containers = game.add.group({ key: 'container', repeat: 25, setScale: { x: 0.09, y: 0.07 }, setDepth: {value: 5 } });
  Phaser.Actions.GridAlign(containers.getChildren(), {
    width: 5,
    height: 5,
    cellWidth: 47,
    cellHeight: 45.2,
    x: game.cameras.main.scrollX + innerWidth / 3.6,
    y: game.cameras.main.scrollY - innerHeight / 14,
  });
  containers.getChildren()[0].setScale(0.1, 0.09)
  var tween = game.tweens.add({
    targets: containers.getChildren()[containerNumber],
    scaleX: 0.15,
    scaleY: 0.13,
    ease: 'Sine.easeInOut',
    duration: 300,
    delay: i * 50,
    repeat: -1,
    yoyo: true
    });

    i++;

    if (i % 12 === 0) i = 0;
  
  const zoomMove = (cases) => {
    tween.remove();
    i = 0;
    containers.getChildren()[containerNumber].setScale(0.09, 0.07).setDepth(5);
    containerNumber += cases
    if (containerNumber > 24 || containerNumber < 0) containerNumber -=5*cases
    containers.getChildren()[containerNumber].setScale(0.1, 0.08).setDepth(6);
    tween = game.tweens.add({
      targets: containers.getChildren()[containerNumber],
      scaleX: 0.12,
      scaleY: 0.1,
      ease: 'Sine.easeInOut',
      duration: 300,
      delay: i * 50,
      repeat: -1,
      yoyo: true
    })

  i++;

  if (i % 12 === 0) i = 0;
  };
  
  game.input.keyboard.on('keydown-RIGHT', () => {zoomMove(1)})
  game.input.keyboard.on('keydown-LEFT', () => {zoomMove(-1)})
  game.input.keyboard.on('keydown-DOWN', () => {zoomMove(5)})
  game.input.keyboard.on('keydown-UP', () => {zoomMove(-5)})
  game.input.keyboard.on('keydown-ENTER', () => {
    if (containerNumber == 13) {
      if (status.inventory === "Fuel") {textbox(game, ["I already completed this heist!"], destroyMinigame)}
      else {
        textbox(game, ["Looks like fuel.", "Reminds me of the good old days..."], destroyMinigame)
        if (!fuel) fuel = game.add.image(game.cameras.main.scrollX + innerWidth / 2.1, game.cameras.main.scrollY + innerHeight / 2.3, "fuel").setDisplaySize(innerWidth/6, innerHeight/3.5).setDepth(6).setInteractive();
        fuel.on('pointerdown', () => {
          fuel.x = innerWidth / 3.15;
          fuel.y = innerHeight / 3;
          fuel.setDisplaySize(40, 40);
          fuel.ignoreDestroy = true;
          fuel.setScrollFactor(0);
          status.inventory = "Fuel";
        })
      }
    }
    else if (containerNumber == 3) {
      textbox(game, ["I wish my mother could see this.", "Those containers are so neatly stacked.", "Would have made up for all those times I did not clean my room."], destroyMinigame)
    }
    else if (containerNumber == 5) {
      textbox(game, ["I wonder if any docker forgot their lunch here.", "I'm hungry."], destroyMinigame)
    }
    else if (containerNumber == 10) {
      textbox(game, ["An hungry criminal is a dangerous criminal.", "Therefore, the state should collect criminal sustainment funds from the citizens.", "Safer streets, safer life.", "I would have made a great politician."], destroyMinigame)
    }
    else if (containerNumber == 17) {
      textbox(game, ["OH MY GOD WHAT IS THIS?!", "...", "Sike."], destroyMinigame)
    }
    else if (containerNumber == 24) {
      textbox(game, ["It's not empty.", "There's a note on the inside.", '"Your princess is in another castle."', "...", "Just kidding.", "It's empty."], destroyMinigame)
    }
    else textbox(game, ["It's empty."], destroyMinigame)
  })
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
