var ship = {
  particle:null,
  size:null,
  color:null,
  hittest:false,
  visible:true,
  boundary:null,
  thruster:{on:false,left:false,right:false},
  weapon:{trigger:false,
          fired:[],
          ammo:100,
          rate_of_fire:9,
          cooldown:0,
          bullet_size:3,
          bullet_mass:1,
          bullet_color:pallete.Black,
          bullet_speed:5,
          fire: function(boundary,x,y,direction)
          {
            //rate_of_fire
            if(this.cooldown>=0){
              this.cooldown-=1;
            }else{
              this.cooldown = this.rate_of_fire;
              //fire bullet
              if(this.fired.length <= this.ammo){
                //create a new bullet and add to fired
                //bounds,x,y,speed,direction,size,mass,color
                var b = bullet
                  .create(
                    boundary,
                    x,y,
                    this.bullet_speed,
                    direction,
                    this.bullet_size,
                    this.bullet_mass,
                    this.bullet_color);
                this.fired[this.fired.length]= b;
              }
            }
          },
        },

  create : function(boundary,x,y,size,mass,color){
    var obj = Object.create(this);
    obj.boundary = boundary;
    var p = particle.create(x,y,0,0);
        p.mass = mass;
    obj.particle = p;
    obj.size = size;
    obj.color = color|pallete.White;
    return obj;
  },

  setMass: function(val){
    this.particle.mass = val;
  },

  hittest: function(p2){
    if(this.particle.distanceTo(p2) > this.size)
    {return false;}else{return true;}
  },

  control: function(controller){
    this.thruster.on = controller.keyUp;
    this.thruster.left = controller.keyLeft;
    this.thruster.right = controller.keyRight;
    this.weapon.trigger = controller.keySpace;
  },

  update: function(){

    if(this.thruster.left){
      this.particle.rotate(-0.05);
    }
    if(this.thruster.right){
      this.particle.rotate(0.05);
    }
    
    if(this.weapon.trigger){
      this.weapon.fire(
        this.boundary,
        this.particle.position.getX(),
        this.particle.position.getY(),
        this.particle.rotation
      );
    }

    //create a thrust vector
    var thrust = vector.create(this.particle.position.getX(),
                               this.particle.position.getY());
    thrust.setAngle(this.particle.rotation);

    if(this.thruster.on){
      thrust.setLength(0.1);
    }else{
      thrust.setLength(0.0);
    }

    this.particle.accelerate(thrust);
    this.particle.update();
    
    //reposition so borders wrap
    this.wrapborder();
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
    //draw ship outline
    context.save();
    context.translate(this.particle.position.getX(),
                        this.particle.position.getY());
    context.rotate(this.particle.rotation);
    context.beginPath();
    context.fillStyle = this.color;
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    context.moveTo(-10,0);
    context.lineTo(10, 0);
    context.fill()
    context.stroke();
    
    if(this.thruster.on) {
      context.beginPath();
      context.fillStyle = pallete.Orange;
      context.moveTo(-10, 0);
      context.lineTo(-18, -2);
      context.lineTo(-20, 0);
      context.moveTo(-10, 0);
      context.lineTo(-18, 2);
      context.lineTo(-20, 0);
      context.fill();
      context.stroke();
    }
    context.restore();

    //draw any bullets fired
    if(this.weapon.fired.length>0){
     for(i=0 ; i<this.weapon.fired.length ; i++){
       this.weapon.fired[i].update();
       context = this.weapon.fired[i].draw(context);
      }
    }

    return context;
  },
}
