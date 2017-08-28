
function keyMapping(controller,keycode,pressed){
  // console.log(event.keyCode);
      switch(event.keyCode) {
      case 38: // up
        controller.keyUp = pressed;
        break;

      case 40://down
        controller.keyDown = pressed;
        break;

      case 37: // left
        controller.keyLeft = pressed;
        break;

      case 39: // right
        controller.keyRight = pressed;
        break;

      case 32: // space
        controller.keySpace = pressed;
        break;

      default:
        break;
    }

    return controller;
}

function BindKeyboard(controller){
  document.body.addEventListener("keydown", function(event) {
      controller = keyMapping(controller,event.keycode,true);
  	});
	document.body.addEventListener("keyup", function(event) {
      controller = keyMapping(controller,event.keycode,false);
	});
  return controller;
}




function BindDirectionalKeys_Thrust(thruster){
	document.body.addEventListener("keydown", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				thruster.on = true;
				break;

			case 37: // left
				thruster.left = true;
				break;

			case 39: // right
				thruster.right = true;
				break;

			default:
				break;

		}
	});

	document.body.addEventListener("keyup", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 38: // up
				thruster.on = false;
				break;

			case 37: // left
				thruster.left = false;
				break;

			case 39: // right
				thruster.right = false;
				break;

			default:
				break;

		}
	});
  return thruster;
}



function BindDirectionalKeys_Move(vector){

  document.body.addEventListener("keydown",function(event){
    switch(event.keyCode){
      case 38://up
        vector.setY(-0.1);
        break;
        case 40://down
          vector.setY(0.1);
          break;
          case 37://left
            vector.setX(-0.1);
            break;
            case 39://right
              vector.setX(0.1);
              break;
            default: break;
    }
  });

  document.body.addEventListener("keyup",function(event){
    switch(event.keyCode){
      case 38://up
        vector.setY(0);
        break;
        case 40://down
          vector.setY(0);
          break;
          case 37://left
            vector.setX(0);
            break;
            case 39://right
              vector.setX(0);
              break;
            default: break;
    }
  });

  return vector;
}

function BindActionKey(){
var action = false;
  document.body.addEventListener("keydown",function(event){
    if(event.keyCode ==32){
      action = true;
    }
    });
  document.body.addEventListener("keyup",function(event){
    if(event.keyCode ==32){
      action = false;
    }
    });

    return action;
}


/// Limit vector position to
// remain within the canvas boundary
function BorderCollisionInf(position,width,height){
  if (position.getX() > width){
    position.setX(0);
  }
  if (position.getX() < 0){
    position.setX(width);
  }
  if (position.getY() > height){
    position.setY(0);
  }
  if (position.getY() < 0){
    position.setY(height);
  }
  return position;
};
