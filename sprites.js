var planet = {
  particle:null,
  size:null,
  color:null,
  fragments:null,
  exploded:false,
  hittest:false,
  visible:true,
  blasts:null,
  boundary:null,

  create : function(bounds,x,y,size,mass,color){
    var obj = Object.create(this);
    obj.boundary = bounds;
    var p = particle.create(x,y,0,0);
    this.particle.mass = mass;
    obj.particle = p;
    obj.size = size;
    obj.color = color||"#000000";
    var frags = [];
    var numOfFrags = getRandomIntInclusive(size/2,2*size);
    for(i=0;i<numOfFrags;i++){
      frags[i] = particle.create(x,y,0,0);
    }
    obj.fragments = frags;
    obj.blasts = [];
    return obj;
  },

  setMass: function(val){
    this.particle.mass = val;
  },

  hittest: function(p2){
    if(this.particle.distanceTo(p2) > this.size)
    {
      return false;
    }else{
      return true;
    }
  },

  explode: function(){
    if(!this.exploded){
      var rand = Math.random();
      //create blast vectors for fragments
      for(i=0;i<this.fragments.length;i++){
        //create a blast vector
        var direction = getRandomFloatInclusive(1,2*Math.PI);
        var speed = getRandomFloatInclusive(.2,.4);
        var blast = vector.create(this.particle.position.getX(),this.particle.position.getY());
        blast.setLength(speed);
        blast.setAngle(direction);
        this.blasts[i]=blast;
      }
      this.visible=false;
      this.exploded = true;
      this.setMass(0);
    }

  },

  update: function(){
    // update any movement to planet particle
    this.particle.update();

    //update explosion
    if(this.exploded){
      for(i=0;i<this.fragments.length;i++){
        //check if fragments are still in view
        if( this.fragments[i].position.getX()>this.boundary.xmin &
            this.fragments[i].position.getX()<this.boundary.xmax &
            this.fragments[i].position.getY()>this.boundary.ymin &
            this.fragments[i].position.getY()<this.boundary.ymax)
          {
            this.fragments[i].velocity.addTo(this.blasts[i]);
            this.fragments[i].update();
          }else{
            this.fragments[i].hidden = true;
          }
      }
    }
  },

  draw: function(context){
    //draw planet
    if(this.visible){
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.particle.position.getX(),
                  this.particle.position.getY(),
                  this.size,0,Math.PI*2,false);
      context.fill();
    }
    //draw explosion
    if(this.exploded){
      for(i=0;i<this.fragments.length;i++){
        if(!this.fragments[i].hidden)
        {
          context.beginPath();
          context.fillStyle = this.color;
          context.arc(this.fragments[i].position.getX(),
                      this.fragments[i].position.getY(),
                      2,0,Math.PI*2,false);
          context.fill();
        }
      }
    }

    return context;
  },
}

var ship = {
  particle:null,
  size:null,
  color:null,
  hittest:false,
  visible:true,
  boundary:null,
  thruster:{on:false,thrust:vector.create(0,0)},
  weapon:{fired:false,
          cartridge:[],
          fired_cntr:0,
          cooldown_cntr:0,
          cooldown_max:9},

  create : function(bounds,x,y,size,mass,color){
    var obj = Object.create(this);
    obj.boundary = bounds;
    var p = particle.create(x,y,0,0);
    this.particle.mass = mass;
    obj.particle = p;
    obj.size = size;
    obj.color = color||"#000000";
    return obj;
  },

  setMass: function(val){
    this.particle.mass = val;
  },

  hittest: function(p2){
    if(this.particle.distanceTo(p2) > this.size)
    {return false;}else{return true;}
  },

  firebullet: function(){
    //cooldown
    if(this.weapon.cooldown_cntr <= this.weapon.cooldown_max){
      this.weapon.cooldown_cntr+=1;
    }

    //fire bullet
    if(this.weapon.cooldown_cntr >= this.weapon.cooldown_max){
      if(this.weapon.fired_cntr < this.weapon.cartridge.length){
        var i = this.weapon.fired_cntr;
        this.weapon.cartridge[i].
          position.setX(this.particle.position.getX());
        this.weapon.cartridge[i].
          position.setY(this.particle.position.getY());
        var blast = vector.create(0,0);
        blast.setLength(5);
        blast.setAngle(this.particle.rotation);
        this.weapon.cartridge[i].accelerate(blast);
        this.weapon.fired_cntr ++;
      }
      this.weapon.cooldown_cntr = 0;
    }
  }

  update: function(up,left,right,action){

    this.thruster.on = up;
    this.thruster.left = left;
    this.thruster.right = right;
    this.weapon.fired = action;

    if(this.thruster.left){
      this.particle.rotate(-0.05);
    }
    if(this.thruster.right){
      this.particle.rotate(0.05);
    }
    if(this.thruster.up){
      thruster.thrust.setLength(0.1);
    }else{
      thruster.thrust.setLength(0);
    }
    if(this.weapon.fired){
      //fire weapon
      //launch new bullet
    }
    thruster.thrust.setAngle(this.particle.rotation);
    this.particle.accelerate(thruster.thrust);
    this.particle.update();
  },

  draw: function(context){
    //draw ship outline
    context.save();
    context.translate(this.particle.position.getX(),
                        this.particle.position.getY());
    context.rotate(this.particle.rotation);
    context.beginPath();
    context.fillStyle = this.particle.color;
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    if(this.thruster.on) {
      context.moveTo(-10, 0);
      context.lineTo(-18, 0);
    }
    context.stroke();
    context.restore();

    //draw fired bullets


    return context;
  },
}
