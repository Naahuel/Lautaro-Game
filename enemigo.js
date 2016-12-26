function Enemigo(){

  this.dim = createVector(300,430);
  this.pos = createVector(0,0);
  this.vel = createVector(1, 1);
  this.image_index = 0;
  this.shrink_factor = 0.9;
  this.dim.mult(1.5);
  this.dead = false;

  this.show = function(){
    if( !this.dead ){
      image(img_lautaro[this.image_index], this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }
  }

  this.update = function(x, y){
    if( !this.dead ){
      this.pos.x = x;
      this.pos.y = y;
    }
  }

  this.hit = function(){
    this.image_index = 1;
    this.dim.mult(this.shrink_factor);
    sound_enemy_hit.play();
  }

  this.unhit = function(){
    this.image_index = 0;
  }

  this.die = function(){
    this.dead = true;
    sound_death.play();
  }
}
