const borderInventory = (game, status) => {
  status.borderBox = game.add.graphics().setScrollFactor(0);
  status.borderBox.fillStyle(0xFFFFFF);
  status.borderBox.fillRect(innerWidth/3.3 - 1, innerHeight/3.3 - 1, 52, 52);
  status.borderBox.visible = false;
  status.inventoryBox = game.add.graphics().setScrollFactor(0);
  status.inventoryBox.fillStyle(0x000000)
  status.inventoryBox.fillRect(innerWidth/3.3, innerHeight/3.3, 50, 50);
  status.inventoryBox.visible = false;
}

export { borderInventory }