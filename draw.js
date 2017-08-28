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
  context.beginPath();
  context.fillStyle = particle.color;

  context.moveTo(10, 0);
  context.lineTo(-10, -7);
  context.lineTo(-10, 7);
  context.lineTo(10, 0);
  if(flag) {
    context.moveTo(-10, 0);
    context.lineTo(-18, 0);
  }
  context.stroke();
  context.restore();
}
