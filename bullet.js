var bullet = {
  particle:null,
  size:null,
  color:null,
  hittest:false,
  boundary:null,
 
  create : function(boundary,x,y,speed,direction,size,mass,color){
    var obj = Object.create(this);
    obj.boundary = boundary;
    var p = particle.create(x,y,speed,direction);
        p.mass = mass;
    obj.speed = speed;
    obj.direction = direction;
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

  update: function(){
    
    //if(this.particle.isbounded(this.boundary)){
    
     /*    var blast = vector.create(0,0);
        blast.setLength(this.speed);
        blast.setAngle(this.direction);
        this.particle.velocity.addTo(blast);*/
        this.particle.update();    
    //}
  },

  draw: function(context){
    //if(this.particle.isbounded(this.boundary)){
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.particle.position.getX(),
                this.particle.position.getY(),
                this.size,0,Math.PI*2,false);
    context.fill();
    //}
    return context;
  },
}