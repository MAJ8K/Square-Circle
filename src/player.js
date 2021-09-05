class Player {
    constructor(position,size){
        this.x = position.x;
        this.y = position.y;
        this.size = size;
        this.body = Matter.Bodies.rectangle(this.x,this.y,size,size)
    }
}