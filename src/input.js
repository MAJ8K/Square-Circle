export default class InputHandle {
    constructor(){
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                    this.left = true;
                    break;
                case 39:
                    this.right = true;
                    break;
                case 38:
                    this.up = true;
                    break;
                case 40:
                    this.down = true;
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 37:
                    this.left = false;
                    break;
                case 39:
                    this.right = false;
                    break;
                case 38:
                    this.up = false;
                    break;
                case 40:
                    this.down = false;
                    break;
            }
        });
    }
}