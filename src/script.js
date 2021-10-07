if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js")
    .then(registration => {})
    .catch(err => {
        console.error("SW Registration Fail");
        console.error(err);
    });
} else console.error(
        'app not supported SW not in navigator'
    );

// URL needs to be promoted to "wss://..."
if(WebSocket){
    // init a list of player data
} else {
    console.error("WebSocket not supported")
    // set list of player data to null
}
const url = "ws://127.0.0.1:7890";
const ws = new WebSocket(url);

ws.addEventListener('open', e => {
    console.debug("Connection Established");
    ws.send("SC Initialization Message")
});

ws.addEventListener('close', e => {
    console.debug("Connection Ended");
});

ws.addEventListener('message', e => {
    console.debug(e.data);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------Input------------------- //
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const buttons = [false, false, false, false,
    false, false, false, false];
var jump = false;

for (const btn of 
document.getElementsByTagName('input')){
    btn.style.gridArea = btn.id;
    if (Number.isInteger(parseInt(btn.value))){
        btn.addEventListener('touchstart', e => {
            buttons[btn.value] = true;
            console.log(buttons)
        });
        btn.addEventListener('touchend', e => {
            buttons[btn.value] = false;
            console.log(buttons)
        });
    }
}

window.addEventListener('keydown',e => {
    if (e.key == 'w') buttons[0] = true;
    else if (e.key == 's') buttons[3] = true;
    else if (e.key == 'a') buttons[1] = true;
    else if (e.key == 'd') buttons[2] = true;
    else if (e.key == ' ') buttons[5] = true;
});
window.addEventListener("keyup", e => {
    if (e.key == 'w')buttons[0] = false;
    else if (e.key == 's')buttons[3] = false;
    else if (e.key == 'a')buttons[1] = false;
    else if (e.key == 'd')buttons[2] = false;
    else if (e.key == ' ')buttons[5] = false;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ------------------Matter.JS---------------- //
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const engine = Matter.Engine.create({
    gravity:{x:0,y:0}
});
const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options:{
        width: 1000,
        height: 1000,
        background: 'wheat',
        wireframes: false,
        showPositions: true,
        showVelocity: true,
        showCollisions: true,
    }
});
const sopts = {isStatic:true};
const map = [
    Matter.Bodies.rectangle(3500, 2500, 4000, 60,sopts),//Bottom
    Matter.Bodies.rectangle(0, 2500, 1500, 60,sopts),
    Matter.Bodies.rectangle(-2500, 2500, 2000, 60,sopts),
    Matter.Bodies.rectangle(3500, -2500, 4000, 60,sopts),//Top
    Matter.Bodies.rectangle(1200, -2500, 250, 250,sopts),
    Matter.Bodies.rectangle(600, -2500, 250, 250,sopts),
    Matter.Bodies.rectangle(0, -2500, 250, 250,sopts),
    Matter.Bodies.rectangle(-600, -2500, 250, 250,sopts),
    Matter.Bodies.rectangle(-1200, -2500, 250, 250,sopts),
    Matter.Bodies.rectangle(-3500, -2500, 4000, 60,sopts),
    Matter.Bodies.rectangle(-2500, 2500, 60, 2000,sopts),//Left
    Matter.Bodies.rectangle(-2500, -3500, 60, 4000,sopts),
    Matter.Bodies.rectangle(2500, 2000, 60, 1000,sopts),//Right
    Matter.Bodies.rectangle(2500, -2000, 60, 1000,sopts),
    Matter.Bodies.rectangle(650, 1000, 750, 60,sopts),//Corners
    Matter.Bodies.rectangle(-650, -1000, 750, 60,sopts),
    Matter.Bodies.rectangle(1000, 650, 60, 750,sopts),
    Matter.Bodies.rectangle(-1000, -650, 60, 750,sopts),
    Matter.Bodies.rectangle(0,0,2000,2000,sopts),// Center
    //Quad7
    Matter.Bodies.rectangle(-3000,3000,850,850,sopts),
];
Matter.World.add(engine.world,map);
Matter.Runner.run(engine);
Matter.Render.run(render);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// -------------------Player------------------ //
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const camera = Matter.Bodies.rectangle(0,0,10000,10000,{
    label:'Camera',
    collisionFilter:{category:0},
    render:{visible:false},
});
Matter.Body.setMass(camera, .0000001);
var player = Matter.Bodies.rectangle(-30,0,30,30,{
    label:'Player',
    gravity:{x:0,y:0},
    friction:0,
    surface:0,
    collisionFilter:{ category:1, mask:1,},
    lastdir:0,
});
var constraint = Matter.Constraint.create({
    bodyA: player,
    bodyB: camera,
    length: 0,
    stiffness: 0.01,
    damping: .05,
    render:{visible:false}
});
Matter.World.add(engine.world,[player,camera]);
// Matter.World.add(engine.world,[player,camera,constraint]);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ------------------Game Loop---------------- //
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
Matter.Events.on(render,"afterRender",e => {
    Matter.Render.lookAt(render,camera);

    const grav = [
        {x:0,y:0.9*0.001},{x:0,y:-0.9*0.001},
        {x:0.9*0.001,y:0},{x:-0.9*0.001,y:0}
    ];
    player.force = grav[player.surface];
    if(buttons[0])player.force.y -= 0.001;
    if(buttons[3])player.force.y += 0.001;
    if(buttons[1])player.force.x -= 0.001;
    if(buttons[2])player.force.x += 0.001;
    if(buttons[5] && !jump){
        player.force.y -= 0.05
    };
    jump = buttons[5];

    if(player.position.x > 4980)
        Matter.Body.setPosition(player,
            {x:-4980,y:player.position.y});
    else if(player.position.x < -4980)
        Matter.Body.setPosition(player,
            {x:4980,y:player.position.y});
    if(player.position.y > 4980)
        Matter.Body.setPosition(player,
            {x:player.position.x,y:-4980});
    else if(player.position.y < -4980)
        Matter.Body.setPosition(player,
            {x:player.position.x,y:4980});
    ws.send(player.position);
});

