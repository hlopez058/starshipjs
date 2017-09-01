window.onload = function(){
  //----------------------------------------------
  //canvas setup
  //----------------------------------------------
  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
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
  //create sprites
  //update sprites
  //draw sprites

   var earth = planet.create(boundary,
                            center.x ,
                           center.y,
                           sizes.medium,
                            masses.medium,
                            pallete.Blue
                          );
    
   var moon = planet.create(boundary,
                            center.x + 50,
                           center.y +50,
                           sizes.small,
                            masses.small,
                            pallete.Gray
                          );
  var orbit = vector.create(0,0);
    orbit.setLength(.7);
    orbit.setAngle(2*Math.PI/3);
    moon.particle.accelerate(orbit);
    

  var starship = ship.create(boundary,
                            center.x,
                            center.y-100,
                            sizes.medium,
                            masses.small,
                            pallete.Black
                          );

  //----------------------------------------------
  //FRAME UPDATE CALL
  update();
  //FRAME UPDATE DEFINED
  function update(){
    context.clearRect(0,0,width,height);
    //-----------------------
    // Animiation : Render
    //-----------------------

    //for(i=0;i<sprites.length;i++){
      
      //pass controller info to sprites
      //sprites[i].mapController(controller);

      //update sprite locations
    //  sprites[i].update();

      //draw sprites on screen
  //    context = sprites[i].draw(context);
    //}

  
    moon.particle.gravitateTo(earth.particle);
    moon.update();
    context = moon.draw(context);
   
    earth.update();
    context =  earth.draw(context);

    starship.control(controller);
    starship.update();
    context = starship.draw(context);

    //check if bullets hit the planet
    for(k=0;k<starship.weapon.fired.length;k++){
     if( earth.hittest(starship.weapon.fired[k].particle))
      {earth.explode();}

     if( moon.hittest(starship.weapon.fired[k].particle))
      {moon.explode();}
    }

    //-----------------------
    requestAnimationFrame(update);
  }

}
