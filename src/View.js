class View {
    render(track) {
        console.clear();
        const rows = track.map((t) => t.join(' '));
        const field = rows.join('\n');
        console.log(field);
        console.log('\n\n');
        console.log(`Score: ${global.score} souls`);
        console.log(`${global.userName} of ${global.teamName} on the battlefield`);
        console.log(`Time: ${global.timeCheck / 10} seconds`);
    }
}

module.exports = View;
