const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
const Enemy = require('./game-models/Enemy');
const Hero = require('./game-models/Hero');
const {runInteractiveConsole} = require('./keyboard');

class Game {
    constructor({trackLength, trackHeight}) {
        this.trackLength = trackLength;
        this.trackHeight = trackHeight;
        this.boomerangRange = trackLength * 0.3;
        this.createEmptyTrack();

        this.hero = new Hero({
            maxHorizontal: trackLength,
            maxVertical: trackHeight,
            weapon: new Boomerang({range: this.boomerangRange, trackLength}),
        });

        runInteractiveConsole(this.hero);

        this.setHeroPosition();

        this.view = new View();

        this.view.render(this.track);

        this.enemies = [new Enemy({maxHorizontal: trackLength, maxVertical: trackHeight})];
    }

    createEmptyTrack() {
        this.track = new Array(this.trackHeight)
            .fill(new Array(this.trackLength).fill(' '))
            .map((v) => {
                return [...v];
            });
    }

    setHeroPosition() {
        const [x, y] = [...this.hero.position];

        this.track[x][y] = this.hero.skin;
    }

    setBoomerangPosition() {
        const [x, y] = [...(this.hero.boomerang.position || [])];

        const [initialX, initialY] = [...(this.hero.boomerang.initialPosition || [])];
        if (
            !this.hero.boomerang.isFlying &&
            (typeof x === 'undefined' ||
                typeof y === 'undefined' ||
                typeof initialX === 'undefined' ||
                typeof initialY === 'undefined')
        ) {
            return;
        }
        if (x && y) this.track[x][y] = this.hero.boomerang.skin || [];
    }

    setEnemyPosition() {
        this.enemies.forEach((enemy) => {
            if (!enemy.position) {
                return;
            }

            const [x, y] = enemy.position;

            this.track[x][y] = enemy.skin;
        });
    }

    removeBoomerang() {
        const [x, y] = this.hero.boomerang.position;
        this.track[x][y] = this.hero.skin;
    }

    regenerateTrack() {
        this.createEmptyTrack();
        this.setHeroPosition();
        this.setBoomerangPosition();
        this.setEnemyPosition();
    }

    check(enemyInterval, gameInterval, resolve) {
        const [boomerangX, boomerangY] = this.hero.boomerang.position;
        const [heroX, heroY] = this.hero.position;
        let isEnemyKilled = false;
        this.enemies.forEach((enemy) => {
            if (enemy.position) {
                const [enemyX, enemyY] = enemy.position;
                isEnemyKilled =
                    enemyX === boomerangX && (enemyY === boomerangY || enemyY === boomerangY + 1);
                if (isEnemyKilled) {
                    this.hero.boomerang.direction = 'left';
                }
                if ((isEnemyKilled && this.hero.boomerang.isFlying) || enemyY <= 0) {
                    enemy.die();
                    if (isEnemyKilled) global.score += 1;
                } else {
                    enemy.moveLeft();
                }

                if (heroX === enemyX && heroY === enemyY) {
                    clearInterval(enemyInterval);
                    clearInterval(gameInterval);
                    this.hero.die();
                    resolve();
                }
            }
        });

        if (
            boomerangY >= this.hero.boomerang.maxHorizontal - 1 &&
            this.hero.boomerang.direction === 'right'
        ) {
            this.hero.boomerang.direction = 'left';
            this.hero.boomerang.fly();
        } else if (
            this.hero.boomerang.initialPosition &&
            this.hero.boomerang.direction === 'left' &&
            boomerangY <= this.hero.boomerang.initialPosition[1]
        ) {
            this.hero.boomerang.fly();
            this.hero.boomerang.isFlying = false;
        } else if (this.hero.boomerang.isFlying) {
            this.hero.boomerang.fly();
        }

        if (heroX === boomerangX && heroY === boomerangY) {
            this.removeBoomerang();
            this.hero.attacked = false;
            this.hero.boomerang.position = [];
        }
        global.timeCheck += 1;
    }

    play() {
        return new Promise((resolve) => {
            const enemyInterval = setInterval(() => {
                this.enemies = [
                    ...this.enemies,
                    new Enemy({
                        maxHorizontal: this.trackLength,
                        maxVertical: this.trackHeight,
                    }),
                ];
            }, 1000);

            const gameInterval = setInterval(() => {
                this.check(enemyInterval, gameInterval, resolve);
                this.regenerateTrack();
                this.view.render(this.track);
            }, 100);
        });
    }
}

module.exports = Game;
