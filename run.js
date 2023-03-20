const readline = require('readline');

const player = require('play-sound')((opts = {}));

const dataControllerFn = require('./src/DataController');
const Game = require('./src/Game');

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

global.score = 0;
global.timeCheck = 0;

const promisifiedIO = (question, key) => {
    return new Promise((resolve) => {
        io.question(question, (input) => {
            global[key] = input;
            console.log(`${key}: ${input}`);
            resolve();
        });
    });
};

promisifiedIO('Enter your Username: ', 'userName')
    .then(() => {
        player.play('./src/sounds/Welcome.wav', function (err) {
            if (err) throw err;
        });
    })
    .then(() => promisifiedIO('Enter your Teamname: ', 'teamName'))
    .then(() => {
        io.close();
        io.resume();
        const game = new Game({
            trackLength: 30,
            trackHeight: 5,
        });
        global.music = player.play('./src/sounds/sound.mp3', function (err) {
            if (err) throw err;
        });
        return game.play();
    })
    .then(() => {
        return dataControllerFn(
            global.userName,
            global.teamName,
            global.timeCheck / 10,
            global.score,
        );
    })
    .then(() => {
        global.music.kill();
        global.music = player.play('./src/sounds/ending.mp3', function (err) {
            if (err) throw err;
        });

        console.clear();
        console.log(`                                       
        ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼
        ███▀▀▀██┼███▀▀▀███┼███▀█▄█▀███┼██▀▀▀
        ██┼┼┼┼██┼██┼┼┼┼┼██┼██┼┼┼█┼┼┼██┼██┼┼┼
        ██┼┼┼▄▄▄┼██▄▄▄▄▄██┼██┼┼┼▀┼┼┼██┼██▀▀▀
        ██┼┼┼┼██┼██┼┼┼┼┼██┼██┼┼┼┼┼┼┼██┼██┼┼┼
        ███▄▄▄██┼██┼┼┼┼┼██┼██┼┼┼┼┼┼┼██┼██▄▄▄
        ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼
        ███▀▀▀███┼▀███┼┼██▀┼██▀▀▀┼██▀▀▀▀██▄┼
        ██┼┼┼┼┼██┼┼┼██┼┼██┼┼██┼┼┼┼██┼┼┼┼┼██┼
        ██┼┼┼┼┼██┼┼┼██┼┼██┼┼██▀▀▀┼██▄▄▄▄▄▀▀┼
        ██┼┼┼┼┼██┼┼┼██┼┼█▀┼┼██┼┼┼┼██┼┼┼┼┼██┼
        ███▄▄▄███┼┼┼─▀█▀┼┼─┼██▄▄▄┼██┼┼┼┼┼██▄
        ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼██┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼██┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼████▄┼┼┼▄▄▄▄▄▄▄┼┼┼▄████┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼┼▀▀█▄█████████▄█▀▀┼┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼┼┼┼█████████████ User: ${global.userName}
        ┼┼┼┼┼┼┼┼┼┼┼██▀▀▀███▀▀▀██ Team: ${global.teamName}
        ┼┼┼┼┼┼┼┼┼┼┼██┼┼┼███┼┼┼██ Time: ${global.timeCheck / 10}
        ┼┼┼┼┼┼┼┼┼┼┼█████▀▄▀█████ Score: ${global.score}
        ┼┼┼┼┼┼┼┼┼┼┼┼███████████┼┼┼┼┼┼┼┼┼┼┼┼┼ 
        ┼┼┼┼┼┼┼┼▄▄▄██┼┼█▀█▀█┼┼██▄▄▄┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼▀▀██┼┼┼┼┼┼┼┼┼┼┼██▀▀┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼┼┼▀▀┼┼┼┼┼┼┼┼┼┼┼▀▀┼┼┼┼┼┼┼┼┼┼┼
        ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼
        `);
    })
    .then(() => {
        process.exit(1);
    });
