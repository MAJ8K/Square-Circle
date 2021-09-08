const engine = Matter.Engine.create();
engine.gravity = {x:0,y:0};
var shot = 0;

const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 400,
        height: 400,
        background: '#222',
        hasBounds: true,
        wireframes: false,
        showPositions: true,
        showVelocity: true,
        showCollisions: true,
    }
});

const map = [
    Matter.Bodies.rectangle(-500, 500, 1000, 60, {
            isStatic: true,
            label: 'floor'
        }
    ),
    Matter.Bodies.rectangle(750, 500, 750, 60, {
            isStatic: true,
            label: 'floor'
        }
    ),
    Matter.Bodies.rectangle(500, 0, 60, 800, {
            isStatic: true,
            label: 'wall'
        }
    ),
    Matter.Bodies.rectangle(-500, 0, 60, 800, {
            isStatic: true,
            label: 'wall'
        }
    ),
    Matter.Bodies.rectangle(-750, -500, 750, 60, {
            isStatic: true ,
            label: 'ceiling'
        }
    ),
    Matter.Bodies.rectangle(500, -500, 1000, 60, {
            isStatic: true ,
            label: 'ceiling'
        }
    ),
    Matter.Bodies.rectangle(0,0,500,500,{
        isStatic: true,
        label: 'Block'
    })
]

// Run the Game 
var player = Matter.Bodies.rectangle(0,0,30,30,
    {
        label: 'Player',
        gravity: {x:0,y:0},
        friction: 0,
        surface: 0,
        collisionFilter:{
            category: 1,
            mask: 1
        }
    }
);
const bopts = { 
    collisionFilter: {category: 2},
    // restitution: 1
}
var bullets = [
    Matter.Bodies.circle(300,3000,15,bopts),
    Matter.Bodies.circle(300,3000,15,bopts),
    Matter.Bodies.circle(300,3000,15,bopts)
]
var camera = Matter.Bodies.rectangle(200,0,400,400,
    {
        label: 'Camera',
        collisionFilter:{
            category: 0,
        },
        render:{
            fillStyle: '#0000',
            lineWidth: 5,
            visible: false
        }
    }
);
Matter.Body.setMass(camera, .0000001);
Matter.Body.setMass(player, 1);
var constraint = Matter.Constraint.create({
    bodyA: player,
    bodyB: camera,
    length: 0,
    stiffness: 0.01,
    damping: .05,
    render:{visible:false}
});
Matter.World.add(engine.world, map);
Matter.World.add(engine.world, 
    [player,camera,constraint]);
Matter.World.add(engine.world, bullets);
render.bounds.min.x = -1000;
render.bounds.max.x = 1000;
render.bounds.min.y = -1000;
render.bounds.max.y = 1000;

Matter.Runner.run(engine);
Matter.Render.run(render);

// Game Loop
var grav = {x:0,y:0.001}
Matter.Events.on(render, "afterRender", e => {
    // Matter.Render.lookAt(render,camera);

    player.force = player.gravity
    if(key.up) player.force.y -= 0.001;
    if(key.down) player.force.y += 0.001;
    if(key.left) player.force.x -= 0.001;
    if(key.right) player.force.x += 0.001;

    if(player.position.x > 1020)
        Matter.Body.setPosition(player,
            {x:-1020,y:player.position.y})
    else if(player.position.x < -1020)
        Matter.Body.setPosition(player,
            {x:1020,y:player.position.y})
    if(player.position.y > 1020)
        Matter.Body.setPosition(player,
            {x:player.position.x,y:-1020})
    else if(player.position.y < -1020)
        Matter.Body.setPosition(player,
            {x:player.position.x,y:1020})
    switch (player.surface) {
        case 0:
            player.gravity = {
                x:0,y:player.mass * 0.001
            };
            break;
        case 1:
            player.gravity = {
                x:0,y:-player.mass * 0.001
            };
            break;
        case 2:
            player.gravity = {
                x:player.mass * 0.001,y:0
            };
            break;
        case 3:
            player.gravity = {
                x:-player.mass * 0.001,y:0
            };
            break;
    }
});
console.log(bullets[0])

// Event Listeners
let key = {up:false,down:false,left:false,right:false}
window.addEventListener("keydown", e => {
    if (e.key == 'w') key.up = true;
    else if (e.key == 's') key.down = true;
    else if (e.key == 'a') key.left = true;
    else if (e.key == 'd') key.right = true;
    
    else if (e.key == 'ArrowUp'){
        Matter.Body.setPosition(bullets[shot],player.position)
        bullets[shot++].force.y = -0.05
    }
    else if (e.key == 'ArrowDown'){
        Matter.Body.setPosition(bullets[shot],player.position)
        bullets[shot++].force.y = 0.05
    }
    else if (e.key == 'ArrowLeft'){
        Matter.Body.setPosition(bullets[shot],player.position)
        bullets[shot++].force.x = -0.05
    }
    else if (e.key == 'ArrowRight'){
        Matter.Body.setPosition(bullets[shot],player.position)
        bullets[shot++].force.x = 0.05
    }
    shot %= 3
});
window.addEventListener("keyup", e => {
    if (e.key == 'w')
        key.up = false;
    else if (e.key == 's')
        key.down = false;
    else if (e.key == 'a')
        key.left = false;
    else if (e.key == 'd')
        key.right = false;
    else if (e.key == ' ')
        switch (player.surface) {
            case 0: player.force.y = -0.03
                break;
            case 1: player.force.y = 0.03
                break;
            case 2: player.force.x = -0.03
                break;
            case 3: player.force.x = 0.03
                break;
        }
});
window.addEventListener("click", e => {
});

Matter.Events.on(engine,'collisionStart', e => {
    const i = e.source.pairs.list.length;
    var collision = e.source.pairs.list[i-1].collision
    switch (player.id) {
    case collision.bodyA.id,collision.bodyB.id:
        if(collision.normal.y < 0)
            player.surface = 1;
        else if(collision.normal.x > 0)
            player.surface = 2;
        else if(collision.normal.x < 0)
            player.surface = 3;
        else
            player.surface = 0;
    }
});
