import { status } from "../scenes/play1"

var chrono;

const timerBox = (game) => {
    chrono = game.add.graphics();
    chrono.fillStyle(0x000000);
    chrono.fillRect(innerWidth/1.75, innerHeight/1.57, 100, 50).setScrollFactor(0);

    status.actualTime = game.add.text(innerWidth/1.75, innerHeight/1.57, "", { color: '#FFFFFF', font: "24px" }).setScrollFactor(0);
}

export { timerBox };