const {Player} = require('../db/models');

async function dataControllerFn(name, team, time, score) {
    try {
        const createPlayer = await Player.create({
            name: `${name}`,
            team: `${team}`,
            time: time,
            score: score,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(`${createPlayer.name} auto-generated ID:`, createPlayer.id);
    } catch (err) {
        console.log(err);
    }
}

module.exports = dataControllerFn;
