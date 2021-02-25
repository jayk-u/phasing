class Login extends Phaser.Scene {
  constructor() {
    super("Login");
  }

  preload() {
    this.load.setBaseURL("http://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/arrows.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    var particles = this.add.particles("red");

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    var logo = this.physics.add.image(400, 100, "logo");
    // var text = this.physics.add.image(400, 100, "Press Enter")

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    // text.setVelocity(100, 200);
    // text.setBounce(1, 1);
    // text.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    this.input.keyboard.on("keydown", (event) => {
      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
        this.scene.stop();
        this.scene.start("Game");
      }
    });
  }
}

export { Login };
