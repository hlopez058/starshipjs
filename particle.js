
var particle = {
  position:null,
  velocity:null,
  gravity:null,
  rotation:null,
  mass: 1,
	hidden:false,

  create : function(x,y,speed,direction){
    var obj = Object.create(this);
    obj.position = vector.create(x,y);
    obj.velocity = vector.create(0,0);
    obj.velocity.setLength(speed);
    obj.velocity.setAngle(direction);
    obj.gravity = vector.create(0,this.gravity||0);
    obj.rotation = 0;
    return obj;
  },

  rotate: function(val){
    this.rotation += val;
  },

  update: function(){
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
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

    this.velocity.addTo(grav);
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
