
var particle = {
  position:null,
  velocity:null,
  velocity_old:null,
  acceleration:null,
  force:null,
  gravity:null,
  rotation:null,
  mass: 1,
  density:null,
	hidden:false,
  create : function(x,y,speed,direction){
    var obj = Object.create(this);
    obj.position = vector.create(x,y);
    obj.velocity = vector.create(0,0);
    obj.velocity.setLength(speed);
    obj.velocity.setAngle(direction);
    obj.acceleration = vector.create(0,0);
    obj.force =vector.create(0,0);
    obj.density = 1;
    obj.rotation = 0;
    return obj;
  },

  rotate: function(val){
    this.rotation += val;
  },

  update: function(){    
    this.position.addTo(this.velocity);

    //update properties
    this.acceleration.addTo(this.velocity);
    this.force = this.acceleration.multiply(this.mass);
    
  },

  setDensity: function(volume){
    this.density = this.mass/volume;
  },

  setMass: function(val){
    this.mass = val;
  },
  
  accelerate: function(accel){
    this.velocity.addTo(accel);
  },

  angleTo: function(p2){
    return Math.atan2(p2.position.getY()-this.position.getY(),
    p2.position.getX()-this.position.getX());
  },

  distanceTo: function(p2){
    var dx = p2.position.getX() - this.position.getX();
    var dy = p2.position.getY() - this.position.getY();
    return Math.sqrt(dx*dx+dy*dy);
  },

  gravitateTo: function(p2){
    var grav = vector.create(0,0),
    dist = this.distanceTo(p2);
    grav.setLength(p2.mass/(dist*dist));
    grav.setAngle(this.angleTo(p2));
    this.accelerate(grav);
  },

  gravitateToAll: function(pArr){
    for(var i = 0 ; i < pArr.length; i++){
      this.gravitateTo(pArr[i]);
    }
  },
    
  launch: function(direction,speed){
    var blast = vector.create(0,0);
    blast.setLength(speed);
    blast.setAngle(direction);
    this.accelerate(blast);
  },
  
  isbounded: function(boundary){
    if 
    (this.position.getX() > boundary.xmax ||
    this.position.getX() < boundary.xmin ||
    this.position.getY() > boundary.ymax ||
    this.position.getY() < boundary.ymin){
     return true;
    }
    return false;
  }
}
