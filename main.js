window.onload = function(){
  //canvas setup
  //----------------------------------------------
  var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  var center = {x:width/2,y:height/2};
  var boundary = {xmin:-10,xmax:width+10,ymin:-10,ymax:height+10};
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
  var earth = planet.create(boundary,
                            center.x,
                            center.y,
                            sizes.small,
                            masses.large,
                            pallete.Blue
                          );

  var rogue = ship.create(boundary,
                            center.x,
                            center.y-100,
                            sizes.small,
                            masses.small,
                            pallete.Black
                          );

//  var ship = particle.create(center.x,center.y-100,0,0);
  var thruster= {on:false,
                 left:false,
                 right:false,
                 thrust:vector.create(0,0)
                };

  var bullets = createBullets(100);
  var weapon = {on:false,
                cartridge:bullets,
                fired_cntr:0,
                cooldown_cntr:0,
                cooldown_max:9
               };

  //----------------------------------------------
  //FRAME UPDATE CALL
  update();
  //FRAME UPDATE DEFINED
  function update(){
    context.clearRect(0,0,width,height);
    //-----------------------
    // Animiation : Render
    //-----------------------

    ship.gravitateTo(earth.particle);
    moveShip();
    drawShip(context, //context
             ship,    //particle
             20,      //size
             thruster.on // animation flag
            );

    moveBullets();
    drawBullets(context, //context
                weapon,  //particle
                3      //size
               );


    if(earth.hittest(ship)){
      earth.explode();
    }

    earth.update();
    context = earth.draw(context);

    //drawPlanet(
    //  context,
    //  planet,
    //  20
    //);

    //collision handler
    ship.position = BorderCollisionInf(ship.position,width,height);

    //-----------------------
    requestAnimationFrame(update);
  }


  function moveShip(){

    ControlThruster();

    if(thruster.left){
      ship.rotate(-0.05);
    }
    if(thruster.right){
      ship.rotate(0.05);
    }

    if(thruster.on){
      thruster.thrust.setLength(0.1);
    }else{
      thruster.thrust.setLength(0);
    }

    thruster.thrust.setAngle(ship.rotation);

    ship.accelerate(thruster.thrust);

    ship.update();

  };

  function moveBullets(){

    ControlWeapon();

    if(weapon.on){
      //cooldown
      if(weapon.cooldown_cntr <= weapon.cooldown_max){
        weapon.cooldown_cntr+=1;
      }
      //fire bullet
      if(weapon.cooldown_cntr >= weapon.cooldown_max){
        if(weapon.fired_cntr < weapon.cartridge.length){
          var i = weapon.fired_cntr;
          weapon.cartridge[i].position.setX(ship.position.getX());
          weapon.cartridge[i].position.setY(ship.position.getY());
          var blast = vector.create(0,0);
          blast.setLength(5);
          blast.setAngle(ship.rotation);
          weapon.cartridge[i].accelerate(blast);
          weapon.fired_cntr ++;
        }
        weapon.cooldown_cntr = 0;
      }
    }
    //update bullets
    for(i=0;i<weapon.fired_cntr;i++){
      var x = weapon.cartridge[i].position.getX();
      var y = weapon.cartridge[i].position.getY()
      if(x<width+10 & x>-10 & y<height+10 & y>-10){
        weapon.cartridge[i].update();
      }
    }

    return weapon;
  }

  function createBullets(count){
    var bullets = [];
    for(i=0 ; i < count ; i++){
      var bullet = particle.create(0,0,0,0)
      bullets[i] = bullet;
    }
    return bullets;
  }

  function ControlThruster(){
    thruster.on = controller.keyUp;
    thruster.left =  controller.keyLeft;
    thruster.right =  controller.keyRight;
    return thruster;
  }

  function ControlWeapon(){
    weapon.on = controller.keySpace;
    return weapon;
  }
}
