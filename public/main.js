 
  document.addEventListener("DOMContentLoaded", function(event) {
      init();
  });

  function init() {
      //initialise values of the canvas and the grid spacing
      antibiotics = false;
      const width = 800; 
      const height = 800; 
      const grid_size = 5;
      var fillStyle_border = "#4E0D31";
      var fillStyle_population = "rgb(72, 72, 72)";
      first_run = true;
      generation_counter = 0;
      document.getElementById("counter").innerHTML = "generation 0";
      
      const run_button = document.getElementById("run-button");
      run_button.addEventListener('click', () => {new_generation(random_population, border, ctx, width, height, grid_size, fillStyle_population, fillStyle_border, run_button);}, false);

      const antibiotics_button = document.getElementById("antibiotics-button"); 
      antibiotics_button.addEventListener('click', () => {toggle_antibiotics();}, false);


      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var game = document.getElementById('game');
      const ctx = canvas.getContext('2d');
      game.appendChild(canvas);

      //draw the grid
      draw_grid(ctx, width, height, grid_size);



      //let random_population = random_population_array(width, height, grid_size);
      //let random_population = line_population_array(width, height, grid_size);
      let random_population = box_population_array(width, height, grid_size);


      draw_population(random_population, ctx, grid_size, fillStyle_population);
      let border = create_border_array(width, height, grid_size);

      draw_population(border, ctx, grid_size, fillStyle_border);


      //delay(1000).then(() => draw_population(first_generation, ctx, grid_size, fillStyle_population));
      //delay(1000).then(() => draw_population(border, ctx, grid_size, fillStyle_border);

      
  }; //init()


  function new_generation(random_population, border, ctx, width, height, grid_size, fillStyle_population, fillStyle_border, run_button){

      if (first_run) {
        next_generation = create_new_generation(random_population, width, height, grid_size);
        draw_population(next_generation, ctx, grid_size, fillStyle_population);
        draw_population(border, ctx, grid_size, fillStyle_border);
        first_run = false;
        generation_counter ++;

      }
      else{
        next_generation = create_new_generation(next_generation, width, height, grid_size); 
        draw_population(next_generation, ctx, grid_size, fillStyle_population);
        draw_population(border, ctx, grid_size, fillStyle_border);
        generation_counter ++;
      }

      wait(50, run_button);
      document.getElementById("counter").innerHTML = "generation " + generation_counter;




      //run_button.removeEventListener('click', new_generation(random_population, border, ctx, width, height, grid_size, fillStyle_population, fillStyle_border, run_button), false);

      //run_button.addEventListener(('click'), stop_generation, false);
  }

  function wait(ms, run_button) {
          setTimeout(() => { run_button.click() }, ms);
      };

  function toggle_antibiotics() {
          antibiotics = !antibiotics;

          console.log('add_antibiotics button pressed! antibiotics is: ' + antibiotics);

          if (antibiotics){
              window.document.getElementById("antibiotics-button").innerHTML = "antibiotics -";
          }
          else
          {
              window.document.getElementById("antibiotics-button").innerHTML = "antibiotics +";
          }



  }


  function stop_generation () {
      console.log('stop pressed')
            //const run_button = document.getElementById("run-button");
      //console.log(run_button.getEventListener());

  }
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
                  //nothing needs to be done to the cell in this option ** unless antibiotics are added!
                  //if (antibiotics) {population[i][2] = false};
                break;
                
                case 3:
                  //stops new births
                  if (!antibiotics) {population[i][2] = true};

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



  function line_population_array(width, height, grid_size) {

  let population = [];

      // make blank array
  for (let x = 0; x < width; x += grid_size) {
    for (let y = 0; y < height; y += grid_size) {
      population.push([x,y,false]);    
    };
  };


  //for (let i = 3220; i < 3230; i += 1) {
  //    population[i][2] = true;    
  //};

  for (let i = 3380; i < 3450; i += 1) {
      population[i][2] = true;    
  };


  for (let i = 3440; i < 3480; i += 2) {
      population[i][2] = true;    
  };


  console.table(population);

  return population;


  }


function box_population_array(width, height, grid_size) {

  let population = [];

      // make blank array
  for (let x = 0; x < width; x += grid_size) {
    for (let y = 0; y < height; y += grid_size) {
      population.push([x,y,false]);    
    };
  };

      var j = 7010; // offset to more easily position the seed

  for (let i = 5220 + j; i < 5230 + j; i += 1) {
      population[i][2] = true;    
  };

  
  for (let i = 5380 + j; i < 5390 + j; i += 3) {
      population[i][2] = true;    
  };

/*
  for (let i = 5440; i < 5480; i += 3) {
      population[i][2] = true;    
  };
*/
  
  for (let i = 5539 + j; i < 5540 + j; i += 2) {
      population[i][2] = true;    
  };


  //console.table(population);

  return population;


  }


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




