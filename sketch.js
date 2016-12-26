var nave;
var enemigo;
var lasers = [];
var img_lautaro = [];
var img_nahuel = [];
var sound_enemy_hit;
var sound_death;
var sound_laser;

var enemigoxoff = 0;
var enemigoyoff = 1000;

var velocidad_nave = 15;
var velocidad_laser = 24;
var velocidad_enemigo = 0.008;

var tamano_enemigo_die = 100;

function preload(){
  img_lautaro.push( loadImage("images/lautaro-1.png") );
  img_lautaro.push( loadImage("images/lautaro-2.png") );
  img_nahuel.push( loadImage("images/nahuel-1.png") );
  img_nahuel.push( loadImage("images/nahuel-2.png") );
  img_nahuel.push( loadImage("images/nahuel-3.png") );

  sound_enemy_hit = loadSound('sounds/hit.mp3');
  sound_enemy_laser = loadSound('sounds/laser.mp3');
  sound_death = loadSound('sounds/muerte.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  nave = new Nave();
  enemigo = new Enemigo();
}

function draw() {
  background(0,0,0);

  if( !enemigo.dead ){
    enemigo.update( map(noise(enemigoxoff), 0, 1, -1*enemigo.dim.x, width), map(noise(enemigoyoff), 0, 1, -1*enemigo.dim.y, height)  );
    enemigo.show();
  }
  if( !nave.dead ){
    nave.update();
    nave.show();
  }

  // Invertir laser?
  if( nave.pos.x > enemigo.pos.x ){
    velocidad_laser = -1*abs(velocidad_laser);
  } else {
    velocidad_laser = abs(velocidad_laser);
  }

  // Nos morimos?
  if( !nave.dead && dist(nave.pos.x + 0.5*nave.dim.x,nave.pos.y + 0.5*nave.dim.y,
      enemigo.pos.x + 0.5*enemigo.dim.x,enemigo.pos.y + 0.5*enemigo.dim.y) <= ( 0.5*enemigo.dim.x +  0.5*nave.dim.x ) ) {
      nave.die();
  }

  if( enemigo.dim.x < tamano_enemigo_die && !enemigo.dead ){
    enemigo.die();
  }

  if( nave.dead ){
    textSize(64);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
  }

  if( enemigo.dead ){
    textSize(64);
    fill(random(255), random(255), random(255));
    textAlign(CENTER);
    text("GANASTE", width/2, height/2);
  }

  // Mover lasers
  for (var i = lasers.length -1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].update();

    // Verificar si el laser chocó la cara
    if( lasers[i].pos.x >= enemigo.pos.x && lasers[i].pos.x <= (enemigo.pos.x + enemigo.dim.x) ){

      if( lasers[i].pos.y >= enemigo.pos.y && lasers[i].pos.y <= (enemigo.pos.y + enemigo.dim.y)  ){
        enemigo.hit();
        lasers.splice(i, 1);
        velocidad_enemigo *= 1.15;

        setTimeout(function () {
          enemigo.unhit();
        }, 200);
      }

    }else if( lasers[i].pos.x > width ){

      lasers.splice(i, 1);

    }

  }

  enemigoxoff += velocidad_enemigo;
  enemigoyoff += velocidad_enemigo;
}

function keyReleased(){

  if ( keyCode == UP_ARROW ){
    nave.vel.y = 0;
  }
  if ( keyCode == DOWN_ARROW ){
    nave.vel.y = 0;
  }
  if ( keyCode == LEFT_ARROW ){
    nave.vel.x = 0;
  }
  if ( keyCode == RIGHT_ARROW ){
    nave.vel.x = 0;
  }

}

function keyPressed(){
  if( nave.dead || enemigo.dead ){
    return true;
  }

  // MOVER
  if ( keyCode == UP_ARROW ){
    nave.vel.y = -velocidad_nave;
  }
  if ( keyCode == DOWN_ARROW ){
    nave.vel.y = velocidad_nave;
  }
  if ( keyCode == LEFT_ARROW ){
    nave.vel.x = -velocidad_nave;
  }
  if ( keyCode == RIGHT_ARROW ){
    nave.vel.x = velocidad_nave;
  }

  // DISPARAR
  if( key == ' ' && !nave.dead ){

    lasers.push( new Laser( nave, createVector(velocidad_laser,0), velocidad_laser < 0 ) );

    nave.shoot( velocidad_laser > 0 ? 1 : 2 );

    setTimeout(function () {
      nave.unshoot();
    }, 100);

  }

}

function touchStarted(){
  if( nave.dead || enemigo.dead ){
    return true;
  }

  lasers.push( new Laser( nave, createVector(velocidad_laser,0), velocidad_laser < 0 ) );

  nave.shoot( velocidad_laser > 0 ? 1 : 2 );

  setTimeout(function () {
    nave.unshoot();
  }, 100);

}
