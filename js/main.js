window.onload = function(){
  var level = 2;
  var score = 0;
  var hud = document.getElementById("hud");
  //----------------------------------------------
  //canvas setup
  //----------------------------------------------
  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight-20;
  var center = {x:width/2,y:height/2};
  var boundary = {xmin:-10,xmax:width+10,ymin:-10,ymax:height+10};
  //----------------------------------------------
  //player controls
  //----------------------------------------------
  var controller = {keyUp:false,
                    keyDown:false,
                    keyLeft:false,
                    keyRight:false,
                    keySpace:false};
  controller = BindKeyboard(controller);  
  //----------------------------------------------
  // Animation : Pre-Render
  //----------------------------------------------
  var bodies = GenerateCelestialBodies(); 
  var starship = ship.create(boundary,
                            center.x,
                            center.y-100,
                            sizes.medium,
                            masses.small,
                            pallete.Black
                          );
  starship.setHP(100);



  /*
   frebodies should be a class that hodls each of the 
   physics within the class. 
   The art layer on the body should be seperate from its physics?

   crete a body class- 
   build a multilayer object?
   
   object with two classes
   
   
   main body object
    Updates will update interaction and visualizations?
      - interaction
       -physics and space itneraction
      - visualization
       - draw class and displays

  */

  //----------------------------------------------
  //FRAME UPDATE CALL
  update();

  //FRAME UPDATE DEFINED
  function update(){
    //-----------------------
    // Decorate Canvas
    //-----------------------
    context.clearRect(0,0,width,height);
   
    DrawBackground();
    
    //-----------------------
    // Game State Update
    //-----------------------
    hud.innerHTML=
    "<h1> Star Ship </h1>"
    " HP:"+ starship.hp + 
    " Ammo:"+ starship.weapon.ammo + 
    " Points:" + score;

    //-----------------------
    // Draw Sprites
    //-----------------------
 
    var blength = bodies.length;
    for(var i=0;i<blength;i++){
  
      //update movement      
      bodies[i].update();

      //draw states
      context = bodies[i].draw(context);

      //apply forces
      for(var k=0; k>bodies.length; k++){
        if(k!=i){
        bodies[i].particle.gravitateTo(bodies[k].particle);        
        }     
      }      
    
      //test collisions
      for(var k=0; k<bodies.length; k++){
        if(k!=i){
        var hit = bodies[i].hittest(bodies[k].particle);
        if(hit){
          
          bodies[i].explode(bodies[k].particle); 
        }
      }
      }    
      
      for(var k=0;k<starship.weapon.fired.length;k++)
      {
        if(bodies[i].hittest(starship.weapon.fired[k].particle))
        {
          bodies[i].explode(starship.weapon.fired[k].particle);
          score++;
        }  
      }    
      
      //add new bodies
      //for(var k=bodies[i].fragments.length; k>0; k--){
      //  bodies.push(bodies[i].fragments[k]);
      //  bodies[i].fragments.pop();             
      //}
    
  
    }

    //-----------------------
    // Draw Ship
    //-----------------------
    starship.control(controller);

    starship.update();

    context = starship.draw(context);

    DrawControlHub();

    //-----------------------

    requestAnimationFrame(update);
  }


  function GenerateCelestialBodies(){
    var bodies =[];
    for(var k=0 ; k<level*4 ; k++)
    {
      var posx = getRandomIntInclusive(-width/2,width/2);
      var posy = getRandomIntInclusive(-height/2,height/2);
      
      var sz = getRandomIntInclusive(5,40);
      var ms = getRandomIntInclusive(1,20);
      var col = getRandomIntInclusive(1,10);

      var lor = pallete.Gray;    

      switch(col){
        case 1: lor = pallete.Blue;break;
        case 2: lor = pallete.DarkCyan;break;
        case 3: lor = pallete.DarkBlue;break;
        case 4: lor = pallete.Green;break;
        case 5: lor = pallete.Maroon;break;
        case 6: lor = pallete.Brown;break;
        case 7: lor = pallete.Chocolate;break;
        case 8: lor = pallete.Tomato;break;
        case 9: lor = pallete.SeaGreen;break;
        case 10: lor = pallete.Orange;break;
        default: pallete.Gray;
      }
  
      var body = planet.create(
        boundary,
        center.x + posx,
        center.y +posy,
        sz,
        ms,
        lor
      );
  
      
      var orbit = vector.create(0,0);
      orbit.setLength(getRandomFloatInclusive(.1,.7));
      orbit.setAngle(getRandomFloatInclusive(1,2*Math.PI));
      body.particle.accelerate(orbit);
  
  
      bodies[k] = body;
    } 
    return bodies;   
  }

  function DrawBackground(){
    // Background 
    context.beginPath();
    context.strokeStyle =  pallete.Black;
    context.fillStyle = pallete.White;
    context.moveTo(0, 0);
    context.lineTo(width, 0);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.fill();
    context.stroke();
    
  }

  function DrawControlHub(){
  // Controller Cirlce 
  context.beginPath();
  context.fillStyle = pallete.White;
  context.arc(100,100,50,0,2*Math.PI);
  context.fill();

  context.beginPath();
  context.strokeStyle = pallete.Black;
  context.arc(100,100,50,0,2*Math.PI);
  context.arc(100,100,40,0,2*Math.PI);
  context.arc(100,100,44,0,2*Math.PI);
  context.stroke();

  context.beginPath();
  context.strokeStyle = pallete.Blue;
  context.arc(100,100,45,0,2*Math.PI);
  context.stroke();
  }
}


