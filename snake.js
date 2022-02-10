class Snake {
    body = []; // body's X-Y positions throughout its movement
    move_dir = createVector(0,0); // movement speed in x(-1=>left,+1=>right) and y(-1=>up,+1=>down) directions
    movement_speed = 1; // movement speed
    border_limit = 0; // border of this snake game
    color = 'green'; // snake's color
    // TODO: There must be a better way to list these options
    pathfinding_options = [ 'human-path-finding', 
                            'depth-first-search',
                            'breadth-first-search',
                            "dijkstra's-algorithm",
                            'a*-pathfinding',
                            'hamilton-cycle']
    pathfinding_choice = ''
    first_time = true;

    constructor(border_length, spawn_loc, choice) {
  
        // get information on the game's dimensions and your spawn point
        this.border_limit = border_length - 1;
        this.body.push(spawn_loc);
        this.pathfinding_choice = this.pathfinding_options[choice]
        console.log('spawn was at: ',spawn_loc)
        console.log('body is at: ', this.body[0])
        console.log('head is at:',this.get_head())
        
    }

    handle_keypress(keyCode) {
        if (this.pathfinding_choice != this.pathfinding_options[0]) {
            // other pathfinding choices do not require any further user input, exit w/o doing anything
            return;
        }
        // TODO: Handle WASD and IJKL letter keys as well for arrows for those who use that
        switch (keyCode) {
            case UP_ARROW:
                this.move_dir.x = 0;
                this.move_dir.y = -1;
                break;
            case DOWN_ARROW:
                this.move_dir.x = 0;
                this.move_dir.y = 1;
                break;
            case LEFT_ARROW:
                this.move_dir.x = -1;
                this.move_dir.y = 0;
                break;
            case RIGHT_ARROW:
                this.move_dir.x = 1;
                this.move_dir.y = 0;
                break;
        }
    }
  
    
    update(food_body) {
        // A Snake has the following behavior:
        // 1. think() about the movement to make
        //    - set this.move_dir appropriately
        this.#think(food_body);
        // 2. move() the desired direction
        this.#move();
        // 3. eat() the food if the head has reached it in this iteration
        //    (if it hasn't reached it, nothing will happen)
        //    (the Food object is responsible to figure out if it needs to respawn or not)
        this.#eat(food_body);
  
  
    }
  
    #think(food_body) {
  
        // this method serves to implement the following pathfinding algorithms you can see here:
        // https://happycoding.io/tutorials/libgdx/pathfinding
        //
        // basically, the idea here is based on the chosen pathfinding algorithm, we will decide on 
        // the "plan" on how to reach the goal (i.e. Food). At every instant of time, we will
        // evaluate the start point (i.e. the head of the snake) and the goal and make the best 
        // decision that will bring us closest to our goal. 
        //
        // Is this cumbersome? Yes. Couldn't we just "save the plan" in memory and only calculate 
        // new plans? Yes. Do I want to do that? No. Will I do it someday? Maybe. For now, I'd like 
        // to play with pathfinding algorithms in a super atomic way. Assume this snake as amnesia
        // every time instant if that helps, now stop reading comments and try running this code
        //
  
        let start = this.get_head()
        let goal = food_body
  
        // Act based on the chosen pathfinding algorithm
        switch(this.pathfinding_choice) {
            case this.pathfinding_options[0]: //'human-path-finding'
                // do nothing, let the user control the snake and handle any keypresses
                break;
            case this.pathfinding_options[1]: //'depth-first-search'
                break;
            case this.pathfinding_options[2]: //'breadth-first-search'
                break;
            case this.pathfinding_options[3]: //'dijkstras-algorithm'
                break;
            case this.pathfinding_options[4]: //'a*-pathfinding'
                break;
            case this.pathfinding_options[5]: //'hamilton-cycle'
                break;
        }
    }
  
    #move() {
        // In this function, we will move the snake "forward" based on the move_dir we've decided on
        //
        // this.body is an array of the snake's position with the following specs:
        // - 0th position => the oldest position (i.e. TAIL)
        // - Nth position => the newest position (i.e. HEAD)
        if (this.first_time) {
            console.log('before:');
            this.body.forEach((item, index) => {console.log(`${index} : ${item}`)})
        }
        let new_head = this.get_head()
        if (this.first_time) {
            console.log('returned get_head() is:', new_head)
        }
        new_head.x += this.move_dir.x; // move in the X direction by this much
        new_head.y += this.move_dir.y; // move in the Y direction by this much
        if (this.first_time) {
            console.log('move_dir is:', this.move_dir)
            console.log('added to new_head, is now:', new_head)
        }
  
        // TODO: Check if this new_head is going to move the snake beyond the border
        // If so, then raise an exception. The World object will handle it
        if (new_head.x > this.border_limit || new_head.y > this.border_limit || new_head.x < 0 || new_head.y < 0) {
            // RAISE AN ERROR
            throw new Error("OutOfBounds: Snake is out of bounds of game")
        }
        if (this.first_time) {
            console.log('1.newHead is:',new_head)
        }
        
        
        // delete the oldest position
        this.body.shift()
        // push the newest position to the end of this array
        this.body.push(new_head)
        if (this.first_time) {
            console.log('after:');
            this.body.forEach((item, index) => {console.log(`${index} : ${item}`)}) 
            console.log('2.newHead is:',new_head)
        }
    }
  
    #eat(food_body) {
  
        // basically the moment when
        if (this.body.includes(food_body)) {
            this.body.push(this.get_head());
        }
    } 
  
    show() {
        // show the snake's body in this game
        if (this.first_time) {
            console.log('showing this:');
            this.body.forEach((item, index) => {console.log(`${index} : ${item}`)}) 
            this.first_time = false;
        }
        this.body.forEach((item, index) => {
            fill(this.color);
            noStroke();
            rect(item.x, item.y, 1, 1);
        })
    }
  
    get_head() {
        if (this.first_time) {
        console.log('get_head() will return this:',this.body.slice(-1)[0])
    }
        return this.body.slice(-1)[0];
    }
  }