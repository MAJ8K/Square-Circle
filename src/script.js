const engine = Matter.Engine.create();

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
        showVelocity: true
    }
});

var boxA = Matter.Bodies.rectangle(200, 200, 30, 30);
    boxA.friction = 0
var camera = Matter.Bodies.rectangle(0,0,400,400,
    {
        collisionFilter:{category:0},
        render:{
            lineWidth: 5,
            opacity: 1,
            fillStyle: '#0000'
        },
        density: 0.000001
    }
);
var constr = Matter.Constraint.create(
    {
        bodyA: boxA,
        bodyB: camera,
        damping: 0,
        stiffness: 0.1,
        length: 0,
    }
);
console.log(camera);
var off = {x:0,y:0};
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            off.x = -0.001;
            break;
        case 'ArrowRight':
            off.x = 0.001;
            break;
        case 'ArrowUp':
            off.y = -0.001;
            break;
        case 'ArrowDown':
            off.y = 0.001;
            break;
    }
    boxA.force = off
    console.log(boxA.velocity)
});

var ballA = Matter.Bodies.circle(80, 100, 40, 10);
var ballB = Matter.Bodies.circle(260, 10, 40, 10);
var ballC = Matter.Bodies.circle(200, 100, 15, 10);
var ground = Matter.Bodies.rectangle(
    0, 380, 8000, 60, { isStatic: true });

Matter.World.add(
    engine.world, 
    [boxA, camera, constr, ground]
);
render.bounds.min.x = -500;
render.bounds.max.x = 500;
render.bounds.min.y = -500;
render.bounds.max.y = 500;
Matter.Events.on(render, "afterRender", e => {
    // Matter.Render.lookAt(render,camera);
});

Matter.Runner.run(engine);
Matter.Render.run(render);

    // switch (e.key) {
    //     case 'ArrowRight':
    //         render.bounds.max.x += 1
    //         render.bounds.min.x += 1
    //         break;
    //     case 'ArrowLeft':
    //         render.bounds.max.x -= 1
    //         render.bounds.min.x -= 1
    //         break;
    //     case 'ArrowUp':
    //         render.bounds.max.y -= 1
    //         render.bounds.min.y -= 1
    //         break;
    //     case 'ArrowDown':
    //         render.bounds.max.y += 1
    //         render.bounds.min.y += 1
    //         break;
    // }