const keypress = require('keypress');

const keyboard = {
    a: (hero) => hero.moveLeft(),
    w: (hero) => hero.moveTop(),
    s: (hero) => hero.moveBottom(),
    d: (hero) => hero.moveRight(),
    space: (hero) => hero.attack(),
};

function runInteractiveConsole(hero) {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
        if (key) {
            if (key.name in keyboard) {
                keyboard[key.name](hero);
            }
            if (key.ctrl && key.name === 'c') {
                global.music.kill();
                process.exit();
            }
        }
    });
    process.stdin.setRawMode(true);
}

module.exports = {runInteractiveConsole};
