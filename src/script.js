import Player from '/src/player.js';
import InputHandle from '/src/input.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const map = [
    [125,400,250,250],
    [125,-20,250,35],
    [100,200,25,300],
    [375,200,25,300]
];

const gameWidth = 500;
const gameHeight = 500;

const input = new InputHandle();
const player = new Player(gameWidth,gameHeight);

let lastTime = 0;


function gameLoop(timestamp){
    let delta = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,gameWidth,gameHeight);

    ctx.fillStyle = 'grey';
    player.update(delta,input);
    player.draw(ctx);

    ctx.fillStyle = 'black';
    map.forEach(e => {
        ctx.fillRect(e[0],e[1],e[2],e[3])
    });
    requestAnimationFrame(gameLoop);
}

gameLoop();
