import Player from '/src/player.js';
import InputHandle from '/src/input.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gameWidth = 500;
const gameHeight = 500;

const input = new InputHandle();
const player = new Player(gameWidth,gameHeight,10);

let lastTime = 0;


function gameLoop(timestamp){
    let delta = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,gameWidth,gameHeight);

    player.update(delta,input);
    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
