function Laser(nave, vel, inv){

  this.navepos = nave.pos.copy();
  console.log(inv);;
  if( inv ){
    this.pos = createVector( this.navepos.x, this.navepos.y + 4*nave.dim.y/5 );
  } else{
    this.pos = createVector( this.navepos.x + nave.dim.x, this.navepos.y + 4*nave.dim.y/5 );
  }
  this.vel = vel.copy();

  this.show = function(){
    fill(255,0,0);
    noStroke();
    rect( this.pos.x,this.pos.y, 20, 5 );
  }

  this.update = function(){
    this.pos.add(this.vel);
  }
}
