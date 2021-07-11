export default class Player {
    constructor(width,height){
        this.size = 10;
        this.x =  width/2,
        this.y =  height/2,
        this.vx=0, this.vy=0,
        this.ax=0, this.ay=0,
        this.fx=0, this.fy=0,
        this.g = 0.3;
        this.jump = false;
    }
    draw(ctx) {
        ctx.fillRect(
            this.x - this.size/2,
            this.y - this.size/2,
            this.size,this.size
        );
    }
    update(dt,input){
        if(!dt) return;
        
        this.physics(input);
    }

    collision(){
        const maps = [
            [125,400,250,250],
            [125,-20,250,35],
            [100,200,25,300],
            [375,200,25,300]
        ];
        var hp = this.size/2;
        maps.forEach(B => {
            var dx = this.x - (B[0] + B[2]/2)
            var dy = this.y - (B[1] + B[3]/2)
            if (this.x - hp < B[0] + B[2] &&
                this.x + hp > B[0] &&
                this.y - hp < B[1] + B[3] &&
                this.y + hp > B[1]) {
                //X collision
                if (abs(dx) > B[2]/2) {
                    this.vx = 0;
                    this.ay -= this.g;
                }
                //Y collision
                if (abs(dy) > B[3]/2) {
                    this.vy = 0;
                    this.y = B[1] - hp;
                }
            }
        });
    }
    // for X in BLOCKS:
    //     hwid = X[2]/2
    //     hhig = X[3]/2
    //     Xxc = X[0] + hwid - hp
    //     Xyc = X[1] + hhig - hp
    //     dx = p.x - Xxc
    //     dy = p.y - Xyc
    //     if abs(dx) < hwid:
    //         if p.y > Xyc - hhig - hp and p.y < Xyc + hhig + hp:
    //             p.y = Xyc + ((hhig + hp) * dy/abs(dy))
    //             pvels[id]["ya"] -= G
    //             if dy < 0:
    //                 pvels[id]["jump"] = True
    //     if abs(dy) < hhig:
    //         if p.x > Xxc - hwid - hp and p.x < Xxc + hwid + hp:
    //             p.x = Xxc + ((hwid + hp) * dx/abs(dx))
    //             pvels[id]["ya"] -= G
    physics(input){
        this.ay += this.g;
        if (this.ay > 1)
            this.ay = 1;
        this.collision();
        this.ax -= this.ax*.4;
        this.ay -= this.ay*.4;
        this.vx += this.ax - (this.vx*.01);
        this.vy += this.ay - (this.vy*.01);
        this.x += this.vx
        this.y += this.vy
        if (this.y > 510)
            this.y = -10;
        if (this.x > 510)
            this.x = -10;
        if (this.y < -10)
            this.y = 510;
        if (this.x < -10)
            this.x = 510;
        
        if(input.right)
            this.ax += .15;
        if(input.left)
            this.ax -= .15;
        if(input.down)
            this.ay += .15;
        if(input.up)
            this.ay -= .15;
    }
}

function abs(num){
    if(num < 0) num *= -1;
    return num;
}