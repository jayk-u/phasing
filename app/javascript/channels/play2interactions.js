import { status } from "../scenes/play2";
import { textbox } from '../components/textBox';

var key;
var next;

const minigameMap = (game, end) => {
  // 125x 850y
  textbox(game, ["A map of the docks.", "Perhaps I should sutdy this carefully..."], end);
}

const minigameRoofLadder = (game, end) => {
  // 300x 615y
  textbox(game, ["A ladder.", "I don't have time to go parkouring"], end);
}

const minigamePillar = (game, end) => {
  // 525x 555y
  textbox(game, ["A pillar.", "Maybe I could use this..."], end);
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
  // 270x 675y
  textbox(game, ["It's bright.", "But not as bright as me."], end);
}

const minigameTourismDoor = (game, end) => {
  // 210x 845y
  textbox(game, ["What a night for tourism."], end);
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
  textbox(game, ["I wonder what's inside...?"], end);
}

const minigameStreetLamp = (game, end) => {
  //45x 995y && 275x 995y && 560x 995y && 720x 995y
  textbox(game, ["It's bright.", "I should probably avoid those."], end);
}

const minigameBoat = (game, end) => {
  //115x 1000y
  textbox(game, ["I wish I could boatride my way out of this", "It'd probably make too much noise though..."], end);
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
