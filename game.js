
  document.addEventListener("DOMContentLoaded", function(event) {
      init();
  });

  function init() {

      //initialise values of the canvas and the grid spacing
      const width = height = 1000; 
      const grid_size = 5;
      var fillStyle_border = "#D30286";
      var fillStyle_population = "#808080";
      first_run = true;
      
      const button = document.getElementById("run-button");
      button.addEventListener('click', () => {new_generation(random_population, border, ctx, width, height, grid_size, fillStyle_population, fillStyle_border, button);}, false);

      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var game = document.getElementById('game');
      const ctx = canvas.getContext('2d');
      game.appendChild(canvas);

      //draw the grid
      draw_grid(ctx, width, height, grid_size);

      let random_population = random_population_array(width, height, grid_size);
      let border = create_border_array(width, height, grid_size);

      draw_population(random_population, ctx, grid_size, fillStyle_population);
      draw_population(border, ctx, grid_size, fillStyle_border);


      //delay(1000).then(() => draw_population(first_generation, ctx, grid_size, fillStyle_population));
      //delay(1000).then(() => draw_population(border, ctx, grid_size, fillStyle_border);

      
  }; //init()


  function new_generation(random_population, border, ctx, width, height, grid_size, fillStyle_population, fillStyle_border, button){

      if (first_run) {
        next_generation = create_new_generation(random_population, width, height, grid_size);
        draw_population(next_generation, ctx, grid_size, fillStyle_population);
        draw_population(border, ctx, grid_size, fillStyle_border);
        first_run = false;
      }
      else{
        next_generation = create_new_generation(next_generation, width, height, grid_size); 
        draw_population(next_generation, ctx, grid_size, fillStyle_population);
        draw_population(border, ctx, grid_size, fillStyle_border);
      }

      wait(100, button);

  }

  function wait(ms, button) {
          setTimeout(() => { button.click() }, ms);
      };



//______________________________________________



  function create_new_generation(population, width, height, grid_size) {

              let o = width/grid_size;

   for (let i = 0; i < population.length; i++) {

          //This is just another way of creating the border array! 
          if (  !((population[i][0] == 0) || (population[i][0] == width - grid_size) || (population[i][1] == 0) || (population[i][1] == height - grid_size))  ) {
            
              let local_cell_array = [];
              let true_count = 0;

              local_cell_array.push([population[i-o-1][0], population[i-o-1][1], population[i-o-1][2]]);
              local_cell_array.push([population[i-o][0], population[i-o][1], population[i-o][2]]);
              local_cell_array.push([population[i-o+1][0], population[i-o+1][1], population[i-o+1][2]]);
              local_cell_array.push([population[i-1][0], population[i-1][1], population[i-1][2]]);
              local_cell_array.push([population[i+1][0], population[i+1][1], population[i+1][2]]);
              local_cell_array.push([population[i+o-1][0], population[i+o-1][1], population[i+o-1][2]]);
              local_cell_array.push([population[i+o][0], population[i+o][1], population[i+o][2]]);
              local_cell_array.push([population[i+o+1][0], population[i+o+1][1], population[i+o+1][2]]);

              for (let i = 0; i < local_cell_array.length; i++) {
                if (local_cell_array[i][2])
                      true_count++
              }
          
              /*  RULES TO CREATE THE NEXT GENERATION

                  Each cell of the board has 8 neighbouring cells; four adjacent orthogonally and 4 adjacent diagonally.

                  1. Survivals: Every populated cell with 2 or 3 neighbouring populated cells survives to the next generation.
                  2. Deaths: 
                      - Each populated cell with 4 or more neighbours dies from overpopulation and is removed. 
                      - Every populated cell with 0 or 1 neighbour dies from isolation.
                  3. Births: Each unpopulated cell adjacent to exactly 3 populated neighbours is a birth cell and becomes populated. */

              switch(true_count) {
                
                case 0:
                  population[i][2] = false;
                break;
            
                case 1:
                  population[i][2] = false;
                break;
                
                case 2: 
                  //nothing needs to be done to the cell in this option
                break;
                
                case 3:
                  population[i][2] = true;
                break;
                
                case 4:
                  population[i][2] = false;
                break;
                
                case 5:
                  population[i][2] = false;
                break;
                
                case 6:
                  population[i][2] = false;
                break;
                
                case 7:
                  population[i][2] = false;
                break;
                
                case 8:
                  population[i][2] = false;
                break;
                };   


          };
    };

   return population;

  }; //create_next_generation()



//______________________________________________



  function create_border_array(width, height, grid_size) {

    let border_array = [];

    for (let x = 0; x < width; x+=grid_size) {    //top
          border_array.push([x, 0, true]);   
        };

    for (let x = 0; x < width; x+=grid_size) {    //bottom
          border_array.push([x, width - grid_size, true]);   
        };    

    for (let y = 0; y < height; y+=grid_size) {   //left
          border_array.push([0, y, true]);   
        };  

    for (let y = 0; y < height; y+=grid_size) {    //right
          border_array.push([height - grid_size, y, true]);   
        };  

    //console.table(border_array);   

    return border_array;

  }; //create_border_array



//______________________________________________

  function random_population_array (width, height, grid_size) {

  //this gives an array populated by its coordinates and the value of the cell - dead or alive
  // an 80 x 80 array with zeros has 6561 elements

  let population = [];

  for (let x = 0; x < width; x += grid_size) {
    for (let y = 0; y < height; y += grid_size) {

      var dead_or_alive = Math.random() > 0.5;

      population.push([x,y,dead_or_alive]);
    
    };
  };

  return population;

  }; //population_array()




//______________________________________________

  function draw_population(population, ctx, grid_size, fillStyle) {

    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < population.length; i ++) {
        ctx.fillRect(population[i][0],population[i][1],grid_size, grid_size);
    };    

    ctx.fillStyle = fillStyle;

    for (let i = 0; i < population.length; i ++) {
      if ( population[i][2] == true){
        ctx.fillRect(population[i][0],population[i][1],grid_size, grid_size);
      };
    };
  }; //draw_population

//______________________________________________

 function draw_grid(ctx, width, height, grid_size) {
    ctx.strokeStyle = "#F8C0C8";
    ctx.lineWidth = .5;

  // vertical grid lines
  for (let i = 0; i < width; i += grid_size) {
    ctx.beginPath();
    ctx.moveTo(i, .5);
    ctx.lineTo(i, height);
    ctx.stroke();
  };

  //horizontal grid lines 
  for (let i = 0; i < height; i += grid_size) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();  
  };
}; //draw-grid()

