class Enemy {
  constructor({ maxVertical, maxHorizontal }) {
    this.generateSkin();
    this.position = [
      Math.floor(Math.random() * maxVertical),
      maxHorizontal - 1,
    ];
    this.prevPosition = [...this.position];
  }

  generateSkin() {
    const skins = [
      '👾',
      '💀',
      '👹',
      '👻',
      '👽',
      '👿',
      '💩',
      '🤡',
      '🤺',
      '🧛',
      '🧟',
      '🎃',
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    const [x, y] = this.position;
    this.prevPosition = [...this.position];
    this.position = [x, y - 1 >= 0 ? y - 1 : 0];
  }

  die() {
    this.position = null;
  }
}

module.exports = Enemy;
