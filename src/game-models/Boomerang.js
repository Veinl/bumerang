class Boomerang {
    isFlying = false;
    direction;
    position = [];
    constructor({trackLength, range}) {
        this.trackLength = trackLength;
        this.range = range;
        this.skin = '🍭';
        this.initialPosition = null;
    }

    fly(heroPosition) {
        if (heroPosition) {
            this.isFlying = true;
            this.direction = 'right';
            this.initialPosition = [heroPosition[0], heroPosition[1]];
            this.prevPosition = [heroPosition[0], heroPosition[1]];
            this.position = [heroPosition[0], heroPosition[1]];
            this.maxHorizontal =
                heroPosition[1] + this.range > this.trackLength
                    ? this.trackLength
                    : heroPosition[1] + this.range;
        }

        switch (this.direction) {
            case 'right':
                this.moveRight();
                break;
            case 'left':
                this.moveLeft();
                break;
        }
    }

    moveLeft() {
        const [x, y] = this.position;
        this.prevPosition = [...this.position];
        this.position = [x, y - 1 >= this.initialPosition[1] ? y - 1 : this.initialPosition[1]];
    }

    moveRight() {
        const [x, y] = this.position;
        this.prevPosition = [...this.position];
        this.position = [x, y + 1 >= this.maxHorizontal ? this.maxHorizontal - 1 : y + 1];
    }
}

module.exports = Boomerang;
