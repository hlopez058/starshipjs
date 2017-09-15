window.onload = function(){
  var level = 3;
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

  var bodies =[];
  for(var k=0 ; k<level*10 ; k++)
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

  var starship = ship.create(boundary,
                            center.x,
                            center.y-100,
                            sizes.medium,
                            masses.small,
                            pallete.Black
                          );
  starship.setHP(100);

 
  //----------------------------------------------
  //FRAME UPDATE CALL
  update();
  //FRAME UPDATE DEFINED
  function update(){
    context.clearRect(0,0,width,height);

     // Background 
    context.beginPath();
    context.fillStyle = pallete.Black;
    context.moveTo(0, 0);
    context.lineTo(width, 0);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.fill();
    context.stroke();
    
    //-----------------------
    // Game State Update
    //-----------------------
    hud.innerHTML="HP:"+starship.hp + " Ammo:"+starship.weapon.ammo + " Points:" + score;

    //-----------------------
    // Animiation : Render
    //-----------------------

    for(var i=0;i<bodies.length;i++){
      bodies[i].update();
      context = bodies[i].draw(context);
    }

    for(var i=0;i<(bodies.length/2);i++){
      for(var k=(bodies.length/2);k<bodies.length;k++)
      {   
        bodies[i].particle.gravitateTo(bodies[k].particle); 
      }
   }

    starship.control(controller);
    starship.update();
    context = starship.draw(context);

    //collision testing for bullets
    for(var k=0;k<starship.weapon.fired.length;k++)
    {
      for(var i=0;i<bodies.length;i++)
      {
        if(!bodies[i].exploded){
        if(bodies[i].hittest(starship.weapon.fired[k].particle))
        {
          bodies[i].explode();
          score++;
        }}
      }       
    }
   
    //-----------------------
    requestAnimationFrame(update);
  }

}
