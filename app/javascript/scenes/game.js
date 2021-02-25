class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    const gameAssets = document.getElementById("game-assets").dataset;

    this.load.image("tiles", gameAssets.tilesImg);
    this.load.tilemapTiledJSON("map", gameAssets.mapJson);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("MainTileMap", "tiles");

    const terrain = map.createLayer("Main Map", tileset, 0, 0);
    const objectBottom = map.createLayer("Objects/bottom", tileset, 0, 0);
    const objectTop = map.createLayer("Objects/top", tileset, 0, 0);
  }

  update() {}
}

export { Game };
