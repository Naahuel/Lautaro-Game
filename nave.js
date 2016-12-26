function Nave(){

  this.dim = createVector(400,523);
  this.pos = createVector(0,0);
  this.vel = createVector(0, 0);
  this.dim.mult(0.3);
  this.image_index = 0;
  this.dead = false;

  this.show = function(){
    if( !this.dead )
      image(img_nahuel[this.image_index], this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }

  this.update = function(){
    if( !this.dead ){
      this.pos.add(this.vel);
      this.pos.x = constrain(this.pos.x,0,width - this.dim.x);
      this.pos.y = constrain(this.pos.y,0,height - this.dim.y);
    }
  }

  this.shoot = function( index ){
    this.image_index = index;
    sound_enemy_laser.amp(0.6);
    sound_enemy_laser.play();
  }

  this.unshoot = function(){
    this.image_index = 0;
  }

  this.die = function(){
    this.dim.mult(0);
    this.pos = createVector(0,0);
    this.vel = createVector(0, 0);
    this.dead = true;
    sound_death.play();
  }
}
