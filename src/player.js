export default class Player {
    constructor(width,height,size){
        this.size = size;
        this.position = {
            x: width/2 - size/2,
            y: height/2 - size/2,
        };
    }
    draw(ctx) {
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size);
    }
    update(dt,input){
        if(!dt) return;
        if(input.up)
        this.position.y -= 50/dt;
        if(input.down)
        this.position.y += 50/dt;
        if(input.left)
        this.position.x -= 50/dt;
        if(input.right)
        this.position.x += 50/dt;
        if (this.position.x > 510) this.position.x = -10;
        if (this.position.x < -10) this.position.x = 510;
        if (this.position.y > 510) this.position.y = -10;
        if (this.position.y < -10) this.position.y = 510;
    }
}