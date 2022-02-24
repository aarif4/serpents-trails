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

        //(head.x == food_body.x && head.y == food_body.y)
        let head = snake_body[snake_body.length - 1].copy()
        if (head.x == this.body.x && head.y == this.body.y) {
            console.log('Respawning fruit!')
            let tmp_pos = this.body
            let keep_going = true;
            // TODO: This .includes() command isn't working right
            while (keep_going) {
                tmp_pos.x = Math.round(Math.random()*this.border_limit)
                tmp_pos.y = Math.round(Math.random()*this.border_limit)
                snake_body.forEach((item, index) => {
                    // once we make a tmp_pos that doesn't match any area of the snake, it will respawn with this new coord
                    keep_going = keep_going && item.equals(tmp_pos)
                })
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