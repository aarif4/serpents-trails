
let game_world;
let use_world = false

function setup() {
  
  let size = 20;
  let res = 20;
  game_world = new World(size, res);
}

function draw() {
  //game_world.update();// DOESN'T WORK YET
  game_world.show();
}

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

class Snake {
  body = []; // body's X-Y positions throughout its movement
  move_dir = [0,0]; // movement speed in x and y directions
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

  constructor(border_length, spawn_loc, choice) {

      // get information on the game's dimensions and your spawn point
      this.border_limit = border_length - 1;
      this.body.push(spawn_loc);
      this.pathfinding_choice = this.pathfinding_options[choice]
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
      let new_head = this.get_head()
      new_head.x += this.move_dir.x; // move in the X direction by this much
      new_head.y += this.move_dir.y; // move in the Y direction by this much

      // TODO: Check if this new_head is going to move the snake beyond the border
      // If so, then raise an exception. The World object will handle it
      if (new_head.x > this.border_limit || new_head.y > this.border_limit) {
          // RAISE AN ERROR
          throw new Error("OutOfBounds: Snake is out of bounds of game")
      }
      
      // delete the oldest position
      this.body.shift()
      // push the newest position to the end of this array
      this.body.push(new_head)
  }

  #eat(food_body) {

      // basically the moment when
      if (this.body.includes(food_body)) {
          this.body.push(this.get_head());
      }
  } 

  show() {
      // show the snake's body in this game
      
      for (let i = 0; i < this.body.length; i++) {
          fill(this.color);
          noStroke();
          rect(this.body[i].x, this.body[i].y, 1, 1);
      }
  }

  get_head() {
      return this.body.slice(-1);
  }

  length() {
      return this.body.length;
  }
}

class World {
  size = 1;
  scale = 1;
  framerate = 1;
  color = 'black';

  has_border = false;
  border_color = 'yellow';

  snake;
  food;

  constructor(size=20, scale=20, framerate=5, snake_choice=0) {
      this.size = size;
      this.scale = scale;
      createCanvas(this.size*this.scale, this.size*this.scale);
      this.size -= 1;
      this.#spawn_snake_and_food(snake_choice);

      this.framerate = framerate;
      frameRate(this.framerate);
      
  }

  #spawn_snake_and_food(snake_choice) {
      // find 2 unique spawn locations for the snake and the food

      let tmp_pos = createVector(0, 0);
      tmp_pos.x = Math.round(Math.random()*this.size);
      tmp_pos.y = Math.round(Math.random()*this.size);
      this.snake = new Snake(this.size, tmp_pos, snake_choice);

      let tmp_pos2 = tmp_pos.copy();
      while (tmp_pos.x == tmp_pos2.x && tmp_pos.y == tmp_pos2.y) {
          tmp_pos2.x = Math.round(Math.random()*this.size);
          tmp_pos2.y = Math.round(Math.random()*this.size);
      }
      
      this.food = new Food(this.size, tmp_pos2);
  }

  update() {
      try {
          this.snake.update(this.food.body);
          this.food.update(this.snake.body);
      }   
      catch (e) {
          // Force the following color scheme:
          // - World to be LIGHT GREY
          // - Snake to be BLACK
          // - Food to be WHITE
          // let the user know of this error
          let errorMessage = `Exception: ${e.message}`;
          console.log(errorMessage);
          throw e;
      }
  }

  show() {
      scale(this.scale);
      background(this.color);
      if (this.has_border) {
          // make a border around it
      }
      this.snake.show();
      this.food.show();
  }
}