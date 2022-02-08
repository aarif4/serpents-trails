class Food {
    body = [];
    border_limit = 0;
    color = 'red';
    constructor(border_length, spawn_loc) {
        this.border_limit = border_length - 1;
        this.body = spawn_loc;
    }
  
    update(snake_body) {
        
        // basically, if by the end of this update, the snake's head has reached this food, then
        // the food must respawn somewhere else (that does not overwrite the snake's body)
        if (this.body == snake_body) {
            let tmp_pos = snake_body
            while (snake_body.includes(tmp_pos)) {
                tmp_pos.x = Math.round(Math.random()*this.border_limit)
                tmp_pos.y = Math.round(Math.random()*this.border_limit)
            }
            
            // with this random position, create a new location for this food
            this.body = tmp_pos;
        }
    }
  
    show() {
        // show this food in the game
        fill(this.color);
        noStroke();
        rect(this.body.x, this.body.y, 1, 1);
    }
  }