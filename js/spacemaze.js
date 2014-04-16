window.onload = function() {
  var game = new Phaser.Game(300, 300, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

  enemy = function (index, game, player, bullets) {
    var x = [250, 715, 780, 625, 975, 365, 190, 420, 670, 465];
    var y = [16, 816, 656, 144, 665, 80, 432, 958, 890, 960];

    this.game = game;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.ship = game.add.sprite(x[index], y[index], 'enemyship');
    this.ship.body.setRectangle(31, 31, 2, 9);
    this.ship.anchor.setTo(0.5, 0.5);

    this.ship.name = index.toString();
    this.ship.body.immovable = false;
    this.ship.body.collideWorldBounds = true;
    this.ship.angle = game.rnd.angle();

    game.physics.velocityFromRotation(this.ship.rotation, 100, this.ship.body.velocity);
  };

  enemy.prototype.update = function() {
    if(this.ship.alive){
      if (this.game.physics.distanceBetween(this.ship, this.player) < 100){
        this.ship.rotation = game.physics.angleBetween(this.ship, player);
        if (this.game.time.now > this.nextFire){
          bullet = this.bullets.getFirstExists(false);
          if (bullet){
            pew4 = game.add.audio('pew4');
            pew4.play();
            bullet.reset(this.ship.x, this.ship.y );
            bullet.body.velocity.y = -400;
            this.nextFire = game.time.now + 1000;

            bullet.rotation = game.physics.moveToObject(bullet, this.player, 300);
          }   
        }
      }
      
      if(this.ship.body.blocked.left || this.ship.body.blocked.right || this.ship.body.blocked.up || this.ship.body.blocked.down){
        this.ship.angle = game.rnd.angle();
        game.physics.velocityFromRotation(this.ship.rotation, 100, this.ship.body.velocity);
      }
    }
  };

  function preload() {
    game.load.image('bullet', 'bullet.png');
    game.load.tilemap('level1', 'level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'tiles-1.png');
    game.load.spritesheet('playership', 'playership.png', 32, 48);
    game.load.spritesheet('enemyship', 'enemyship.png', 32, 48);
    game.load.image('background', 'background2.png');
    game.load.audio('pew3', 'pew3.ogg');
    game.load.audio('pew4', 'pew4.ogg');
    game.load.audio('explosion', 'explosion.ogg');
  }

  var map;
  var tileset;
  var layer;
  var player;
  var fireButton;
  var bg;
  var enemies = [];
  var bulletTime = 0;
  var stateText;

  function create() {
    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 300, 300, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles1');

    map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    game.physics.setBoundsToWorld();

    player = game.add.sprite(3, 180, 'playership');
    player.body.collideWorldBounds = true;
    player.body.setRectangle(27, 27, 2, 9);
    player.anchor.setTo( 0.5, 0.5 );
    
    bullets = game.add.group();
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
  
    enemyBullets = game.add.group();
    enemyBullets.createMultiple(30, 'bullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    
    enemies = [];
    for (var i = 0; i < 10; i++){
      enemies.push(new enemy(i, game, player, enemyBullets));
    }

    game.camera.follow(player);
    
    stateText = game.add.text(150,100,'', { fontSize: '84px', fill: '#000000' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    stateText.fixedToCamera = true;
  }

  function update() {
    if(player.x > 960 && player.y > 960){
      stateText.content = " You Have Won! \n Click to restart";
      stateText.visible = true;

      game.input.onTap.addOnce(restart,this);
    }

    if(player.body.blocked.left && player.body.blocked.right){
      player.body.x = 3;
      player.body.y = 180;
    }
    
    bg.tilePosition.y -= 6;
   
    player.rotation = game.physics.accelerateToPointer( player, this.game.input.activePointer, 200, 200, 200 );

    if (game.input.activePointer.isDown){
        fireBullet();
    }
    
    collider();
    game.physics.overlap(enemyBullets, player, bulletHitPlayer, null, this);
    for (var i = 0; i < enemies.length; i++){
      if (enemies[i].alive){
        game.physics.collide(enemies[i].ship, layer);
        game.physics.collide(player, enemies[i].ship);
        game.physics.overlap(bullets, enemies[i].ship, bulletHitEnemy, null, this);
        enemies[i].update();
      }
    }
    
    game.physics.overlap(enemyBullets, layer, bulletHitLayer, null, this);
    game.physics.overlap(bullets, layer, bulletHitLayer, null, this);   
  }

  function collider(){
    game.physics.collide(player, layer);
  }

  function fireBullet () {
    if (game.time.now > bulletTime){
      bullet = bullets.getFirstExists(false);

      if (bullet){
        pew3 = game.add.audio('pew3');
        pew3.play();
        bullet.reset(player.x, player.y );
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 200;
        bullet.rotation = game.physics.moveToPointer(bullet, 300);
      }
    }
  }

  function bulletHitEnemy (bullet, ship) {
    explosion = game.add.audio('explosion');
    explosion.play();
    bullet.kill();
    ship.kill();
    ship.alive = false;
  }

  function bulletHitPlayer (bullet,player) {
    explosion = game.add.audio('explosion');
    explosion.play();
    bullet.kill();
    player.kill();
    
    stateText.content = " You Have Failed! \n Click to restart";
    stateText.visible = true;

    game.input.onTap.addOnce(restart,this);
  }

  function bulletHitLayer (bullet,layer) {
  bullet.kill();
  }

  function resetBullet (bullet) {
    bullet.kill();
  }

  function restart () {
    game.world.removeAll();
    preload();
    create();
  }

  function render () {
    if (player.debug){
      game.debug.renderPhysicsBody(player.body);
      game.debug.renderBodyInfo(player, 16, 24);
    }
  }
}
