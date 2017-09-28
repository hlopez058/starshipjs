var ship = {
  particle:null,
  size:null,
  color:null,
  hittest:false,
  visible:true,
  fragments:null,
  blasts:null,
  boundary:null,
  exploded:null,
  hp:0,
  thruster:{on:false,left:false,right:false},
  weapon:{release:false,
          charge:0.01,
          charging:false,
          trigger:false,
          fired:[],
          max_ammo:100,
          ammo:0,
          rate_of_fire:9,
          cooldown:0,
          bullet_size:5,
          bullet_mass:1,
          bullet_color:pallete.Red,
          bullet_speed:5,
          fire: function(boundary,x,y,direction)
          {
            //rate_of_fire
            if(this.cooldown>=0){
              this.cooldown-=1;
            }else{
              this.cooldown = this.rate_of_fire;
              //fire bullet
              if(this.fired.length < this.max_ammo){
                //scale bullet
                var bsize = this.bullet_size * this.charge;
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
              this.ammo = this.max_ammo - this.fired.length ;
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
    var frags = [];
    var numOfFrags = getRandomIntInclusive(size/2,2*size);
    for(i=0;i<numOfFrags;i++){
      frags[i] = particle.create(x,y,0,0);
    }
    obj.fragments = frags;
    obj.blasts = [];
    this.weapon.ammo = this.weapon.max_ammo;
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

    if(this.weapon.trigger){
      this.weapon.charging = true;
    }

    if(this.weapon.trigger && this.weapon.charging){
      this.weapon.release = false;
    }

    if(this.weapon.charging && !this.weapon.trigger){
      this.weapon.release = true;
      this.weapon.charging =false;
    }

  },

  setHP: function(val){
    this.hp = val;
  },

  explode: function(){
    if(!this.exploded){
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

    if(this.thruster.left){
      this.particle.rotate(-0.05);
    }
    if(this.thruster.right){
      this.particle.rotate(0.05);
    }
    
    if(this.weapon.release){
      this.weapon.fire(
        this.boundary,
        this.particle.position.getX(),
        this.particle.position.getY(),
        this.particle.rotation
      );
    }

    if(this.weapon.charging){
      if(this.weapon.charge<1){
      this.weapon.charge = this.weapon.charge+0.01;}
    }else{
      this.weapon.charge = 0.01;
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
    var s = 5;//scalar


    drawShip(context,this.particle,s,this.thruster.on);

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
