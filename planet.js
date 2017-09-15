var planet = {
  particle:null,
  size:null,
  color:null,
  fragments:null,
  exploded:false,
  visible:true,
  blasts:null,
  boundary:null,

  create : function(bounds,x,y,size,mass,color){
    var obj = Object.create(this);
    obj.boundary = bounds;
    var p = particle.create(x,y,0,0);
    p.mass = mass;
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
        var speed = getRandomFloatInclusive(.3,.5);
        var blast = vector.create(0,0);
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
    //reposition so borders wrap
    this.wrapborder();
    
    //movement limiter to keep planets from 
    //ejecting across the screen because of
    //gravitational effects.
    if(this.particle.velocity.getLength() >20){
      this.particle.velocity.setLength(20);
    }

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
            this.fragments[i].position.setX(this.particle.position.getX());
            this.fragments[i].position.setY(this.particle.position.getY());
            this.fragments[i].velocity.addTo(this.blasts[i]);
            this.fragments[i].update();
          }else{
            this.fragments[i].hidden = true;
          }
      }
    }
  },

  wrapborder : function(){
    if (this.particle.position.getX() > this.boundary.xmax){
      this.particle.position.setX(this.boundary.xmin);
    }
    if (this.particle.position.getX() < this.boundary.xmin){
      this.particle.position.setX(this.boundary.xmax);
    }
    if (this.particle.position.getY() > this.boundary.ymax){
      this.particle.position.setY(this.boundary.ymin);
    }
    if (this.particle.position.getY() < this.boundary.ymin){
      this.particle.position.setY(this.boundary.ymax);
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
