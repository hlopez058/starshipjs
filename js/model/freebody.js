/*
    state = {
        location ={x,y},
        physical = {particle,size,mass,color,visible}
        properties ={visible?,rotatespd,thrustspd,hp,weapon..}
        render =  drawShip, or drawCirlce, drawPlanet.. etc.
    }
*/

var interaction = {
    state:null,
    create : function(state){
        var obj =  Object.create(this);
        obj.state = state;
        return obj;
    },
    update: function(){
        return this.update(this.state);
    },
    update: function(state){
        //add functionality to simulate
        //physics engine

        //update physics properties

        //collision testing
        
        //return state of particle

        return state;
    }
}

var visualization = {
    state:null,
    create : function(state){
        var obj =  Object.create(this);
        obj.state = state;
        return obj;
    },
    update: function(canvas){
        return this.update(this.state,canvas);
    },
    update: function(state,canvas){
        if(state.properties.visible){
            //draw on canvas the object
            return state.render();
        }
        return canvas;
    },
}

var freebody = {
    interaction:null,
    visualization:null,
    state:null,
    boundary:null,
    create : function(state,boundary){
      var obj = Object.create(this);
      obj.state = state;
      obj.boundary = boundary;
      obj.interaction = interaction.create(state);
      obj.visualization = visualization.create(state);
      return obj;
    },
    update: function(canvas){
        var newState = this.interaction.update(this.state);
        return this.visualization.update(newState,canvas);
    }
  }
  