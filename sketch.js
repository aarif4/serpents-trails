
let size = 20;
let res = 20;
let frame_rate = 5;
let snake_choice = 0;
let world_color = 'black';
let has_border = false;

let snake;
let food; 

function setup() {
  // set up the canvas and framerate of the game
  createCanvas(size*res,size*res);
  frameRate(frame_rate);

  spawn_max_size = size - 1;
  // spawn a snake at a random location
  
  let tmp_pos = createVector(0, 0);
  tmp_pos.x = Math.round(Math.random()*spawn_max_size);
  tmp_pos.y = Math.round(Math.random()*spawn_max_size);
  snake = new Snake(spawn_max_size, tmp_pos, snake_choice);

  // spawn food at a random location
  let tmp_pos2 = tmp_pos.copy();
    while (tmp_pos.x == tmp_pos2.x && tmp_pos.y == tmp_pos2.y) {
        tmp_pos2.x = Math.round(Math.random()*spawn_max_size);
        tmp_pos2.y = Math.round(Math.random()*spawn_max_size);
    }
    food = new Food(spawn_max_size, tmp_pos2);
}

function draw() {
  // first, run an iteration of the snake moving
  update();
  // first, scale everything  then color the background of the world
  scale(res);
  background(world_color);
  if (has_border) {
      // make a border around it
  }
  snake.show();
  food.show();
}

function keyPressed() {
  snake.handle_keypress(keyCode);
}

function update() {
    try {
        snake.update(food.body);
        food.update(snake.body);
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
