// Наш герой.

class Hero {
    attacked = false;
    constructor({position = [0, 0], maxHorizontal = 0, maxVertical = 0, weapon} = {}) {
        this.skin = '🐻';
        this.position = position;
        this.prevPosition = position;
        this.maxHorizontal = maxHorizontal;
        this.maxVertical = maxVertical;
        this.boomerang = weapon;
    }

    moveLeft() {
        const [x, y] = this.position;
        this.prevPosition = [...this.position];
        this.position = [x, y - 1 >= 0 ? y - 1 : 0];
    }

    moveRight() {
        const [x, y] = this.position;
        this.prevPosition = [...this.position];
        this.position = [x, y + 1 >= this.maxHorizontal ? this.maxHorizontal - 1 : y + 1];
    }

    moveTop() {
        const [x, y] = this.position;
        this.prevPosition = [...this.position];
        this.position = [x - 1 >= 0 ? x - 1 : 0, y];
    }

    moveBottom() {
        const [x, y] = this.position;
        this.prevPosition = [...this.position];
        this.position = [x + 1 >= this.maxVertical ? this.maxVertical - 1 : x + 1, y];
    }

    attack() {
        if (this.attacked) {
            return;
        }
        this.attacked = true;
        this.boomerang.fly([...this.position]);
    }

    die() {
        this.skin = '💀';
    }
}

module.exports = Hero;
