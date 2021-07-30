var loadedScreens = []

const loadingScreen = (game) => {
  if (!loadedScreens.includes(game.load.systems.config)) {
  
    var logo = game.add.image(innerWidth/1.1, innerHeight/1.1, 'logo');
    logo.setAlpha(0).setDisplaySize(innerWidth/6, innerHeight/6);
    // var progressBar = game.add.graphics();
    // var progressBox = game.add.graphics();
    // progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(innerWidth/2, innerHeight/2, 320, 50);
    
    var width = game.cameras.main.width;
    var height = game.cameras.main.height;
    var loadingText = game.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = game.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = game.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(0.5, 0.5);
    
    game.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        // progressBar.clear();
        // progressBar.fillStyle(0xffffff, 1);
        // progressBar.fillRect(innerWidth/1.95, innerHeight/1.95, 300 * value, 30);
        logo.setAlpha(0 + value);
    });
    
    game.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });
    
    
    game.load.on('complete', function () {
        // progressBar.destroy();
        // progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        logo.destroy();
        loadedScreens.push(game.load.systems.config)
        game.load.off('complete')
        game.load.off('fileprogress')
        game.load.off('progress')
    });
  
  }
}

export { loadingScreen }