var planet = {
  particle:null,
  size:null,
  color:null,
  fragments:null,
  exploded:false,
  visible:true,
  boundary:null,
  create : function(bounds,x,y,size,mass,color){
    var obj = Object.create(this);
    obj.boundary = bounds;
    var p = particle.create(x,y,0,0);
    p.mass = mass;
    obj.particle = p;
    obj.size = size;
    obj.exploded = false;
    obj.color = color||"#000000";
    var frags = [];
    obj.fragments = frags;
    return obj;
  },

  setSize: function(){
    var volume = 4*Math.PI*((size*size*size)/3);
    this.particle.setDensity(volume);
  },

  hittest: function(p2){
    if(this.particle.distanceTo(p2) > this.size)
    {
      return false;
    }else{
      return true;
    }
  },

  collisionTestToAll: function(pArr){
    for(var i = 0 ; i < pArr.length; i++){

      if(this.particle.distanceTo(pArr[i]) < this.size)
      {
        this.explode(pArr[i]);
      }
    }
  },

  //pass in a particle
  explode: function(p2){
    if(!this.exploded){
     // impact_force = p2.force.getLength();
     
     // var impact_angle = p2.angleTo(this.particle);
     // var impact_dist = p2.distanceTo(this.particle);
    

     this.exploded = true;
     this.particle.setMass(0);
     this.visible = false;

      //fragment?
      var fragmentation = 3;//Math.round(this.size / (impact_force*this.size));
      var sz = (this.size / fragmentation);
      var ms =(this.mass / fragmentation) ;

      if(sz<2){sz=2;}
      if(ms<2){ms=2;}
      
      for(i=0;i<fragmentation;i++){
        this.fragments[i] = planet.create(
                        this.boundary,
                        this.particle.position.x,
                        this.particle.position.y,
                        sz,
                        ms,
                        this.color
                        );
      }

      /*
      if(fragmentation>1){ 
        this.visible=false;
        this.exploded = true;
        this.particle.setMass(0);
        for(i=0;i<fragmentation;i++){
          var asteroid = planet.create(
            this.bounds,
            this.particle.position.x,
            this.particle.position.y,
            (this.size / fragmentation),
            (this.mass / fragmentation),
            this.color
            );
          this.fragments[i] = asteroid;
        }
        //change trajectory of impacting particle
        p2.launch(2*Math.PI - p2.velocity.getAngle(),p2.velocity.getLength/2);
      } */
    }
  },

  update: function(){
   if(this.visible){
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
    
    return context;
  },
}
