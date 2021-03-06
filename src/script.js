if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
    }).catch(err => {
        console.error("SW Registration Fail");
        console.error(err);
    });
}else console.error(
        'app not supported SW not in navigator'
);
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
const nav = document.getElementsByTagName('nav')[0];
const navbtns = nav.getElementsByTagName('input');
const engine = Matter.Engine.create();
engine.gravity = {x:0,y:0};
var shot = 0;

const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 400,
        height: 400,
        background: '#555',
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
        },
        lastdir: 0,
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
var camera = Matter.Bodies.rectangle(200,0,1000,1000,
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
    Matter.Render.lookAt(render,camera);

    player.force = player.gravity
    if(In[0]) player.force.y -= 0.001;
    if(In[3]) player.force.y += 0.001;
    if(In[1]) player.force.x -= 0.001;
    if(In[2]) player.force.x += 0.001;

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
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
// ----------------- Input GUI ----------------- //
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
let In = [false, false, false, false,
    false, false, false, false]
for (const btn of document.getElementsByTagName('input')){
    btn.style.gridArea = btn.id;
    btn.addEventListener('touchstart', e => {
        In[btn.value] = true;
        if(btn.value < 4) player.lastdir = btn.value;
        if (btn.value == '5') 
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
        if (btn.value == '4'){
            Matter.Body.setPosition(bullets[shot],player.position)
            if (player.lastdir == 0) bullets[shot++].force.y = -0.05;
            if (player.lastdir == 3) bullets[shot++].force.y = 0.05;
            if (player.lastdir == 1) bullets[shot++].force.x = -0.05;
            if (player.lastdir == 2) bullets[shot++].force.x = 0.05;
        shot %= 3
        }
    });
    btn.addEventListener('touchend', e => {
        In[btn.value] = false;
        if(btn.value == 6) nav.classList.remove('hide');
        if(btn.value == 'G'){
            nav.classList.add('hide');
            player.render.fillStyle = navbtns[0].value;//from primary color
            for (const bullet of bullets)
                bullet.render.fillStyle = navbtns[1].value;//from secondary color
            render.options.background = navbtns[2].value;//bacground color
            for (const object of map) 
                object.render.fillStyle = navbtns[3].value;//background secondary color
        }
    });
}
window.addEventListener("keydown", e => {
    if (e.key == 'w') In[0] = true;
    else if (e.key == 's') In[3] = true;
    else if (e.key == 'a') In[1] = true;
    else if (e.key == 'd') In[2] = true;
    
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
    if (e.key == 'w') In[0] = false;
    else if (e.key == 's') In[3] = false;
    else if (e.key == 'a') In[1] = false;
    else if (e.key == 'd') In[2] = false;
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
