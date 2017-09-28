function drawCircle(context,x,y,size,color){
  context.beginPath();
  context.fillStyle = color;
  context.arc(x, y,size,0,Math.PI*2,false);
  context.fill();
  return context;
}

function drawPlanet(context,planet,size){
  context.beginPath();
  context.fillStyle = "#0000ff";
  context.arc(planet.position.getX(), planet.position.getY(),size,0,Math.PI*2,false);
  context.fill();
  return context;
}

function drawBullets(context,weapon,size){

    for(i=0; i<weapon.fired_cntr; i++){
      context.beginPath();
      context.fillStyle = "#000000";
      context.arc(weapon.cartridge[i].position.getX(),
                  weapon.cartridge[i].position.getY(),
                  size,0,Math.PI*2,false);
      context.fill();
  }
  return context;
}


function drawShip(context,particle,size,flag){
  context.save();
  context.translate(particle.position.getX(),
                      particle.position.getY());
  context.rotate(particle.rotation);


  //Thrusters
  if(flag) {

    context.beginPath();
    context.strokeStyle = pallete.Bisque;
    context.moveTo(size*-9, size*2.25);
    context.lineTo(size*-7, size*1.25);
    context.lineTo(size*-7, size*3.25);
    context.lineTo(size*-9, size*2.25);
    context.moveTo(size*-9, size*-2.25);
    context.lineTo(size*-7, size*-1.25);
    context.lineTo(size*-7, size*-3.25);
    context.lineTo(size*-9, size*-2.25);
    context.stroke();

    context.lineWidth = (size*.25);    
    context.beginPath();
    context.strokeStyle = pallete.AlmondPink;
    context.moveTo(size*-8, size*2.25);
    context.lineTo(size*-6, size*1.25);
    context.lineTo(size*-6, size*3.25);
    context.lineTo(size*-8, size*2.25);
    context.moveTo(size*-8, size*-2.25);
    context.lineTo(size*-6, size*-1.25);
    context.lineTo(size*-6, size*-3.25);
    context.lineTo(size*-8, size*-2.25);
    context.stroke();
    context.beginPath();
    context.fillStyle = pallete.White;
    context.strokeStyle = pallete.SkylineBlue;
    context.moveTo(size*-7, size*2.25);
    context.lineTo(size*-5, size*1.25);
    context.lineTo(size*-5, size*3.25);
    context.lineTo(size*-7, size*2.25);
    context.moveTo(size*-7, size*-2.25);
    context.lineTo(size*-5, size*-1.25);
    context.lineTo(size*-5, size*-3.25);
    context.lineTo(size*-7, size*-2.25);
    context.fill();    
    context.stroke();
     }


  context.beginPath();
  context.strokeStyle = pallete.Black;
  context.lineWidth = (size*.25);
  context.moveTo(size*5, 0);
  context.lineTo(size*-5, size*-3.5);
  context.lineTo(size*-5, size*3.5);
  context.lineTo(size*5, 0);
  context.stroke();
  
  context.beginPath();  
  context.fillStyle = pallete.White;
  context.moveTo(size*5, 0);
  context.lineTo(size*-5, size*-3.5);
  context.lineTo(size*-5, size*3.5);
  context.lineTo(size*5, 0);
  context.fill();

  context.beginPath();
  //context.fillStyle = particle.color;
  context.fillStyle = pallete.DarkDarkGrey;
  context.moveTo(size*3.7, 0);
  context.lineTo(size*-3.7, size*-2.6);
  context.lineTo(size*-3.7, size*2.6);
  context.lineTo(size*3.7, 0);
  context.fill();

  context.beginPath();
  context.strokeStyle = pallete.Black;
  context.moveTo(size*3.7, 0);
  context.lineTo(size*-3.7, size*-2.6);
  context.lineTo(size*-3.7, size*2.6);
  context.lineTo(size*3.7, 0);
  context.stroke();

  context.beginPath();
  context.fillStyle = pallete.White;
  context.moveTo(size*2.6,0);
  context.lineTo(size*-2.6, size*-1.82);
  context.lineTo(size*-2.6, size*1.82);
  context.lineTo(size*2.6, 0);
  context.fill();

  context.beginPath();
  context.strokeStyle = pallete.Black;
  context.moveTo(size*2.6,0);
  context.lineTo(size*-2.6, size*-1.82);
  context.lineTo(size*-2.6, size*1.82);
  context.lineTo(size*2.6, 0);
  context.stroke();

  context.restore();
}
