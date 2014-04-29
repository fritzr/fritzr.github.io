var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  	

  var LevelTwo = (function (_super) {
    __extends(LevelTwo, _super);
    function LevelTwo() {
      _super.apply(this, arguments);
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
    var explode_audio;
    var explode;
    var LOCATIONS = [
          [250,16],  [715,816], [780,656], [625,144],
          [975,665], [365,80],  [190,432], [420,958],
          [670,890], [465,960]
      ];
    enemy = function (game, index1,index2, player, bullets) {
   
	  var x = [250, 715, 780, 625, 975, 365, 190, 420, 670, 465];
    var y = [16, 816, 656, 144, 665, 80, 432, 958, 890, 960];
      // how close to player enemy has to be to target the player
    enemy.ACQUIRE_DISTANCE = 100;
    this.game = game;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.explode = explode;
    this.ship = game.add.sprite(index1, index2, 'enemyship');
    game.physics.enable(this.ship, Phaser.Physics.ARCADE.Body);
    //this.ship.body.setRectangle(31, 31, 2, 9);
    this.ship.anchor.setTo(0.5, 0.5);

    //this.ship.name = index.toString();
    this.ship.body.immovable = false;
    this.ship.body.collideWorldBounds = true;
    this.ship.angle = game.rnd.angle();
    game.physics.arcade.velocityFromRotation(this.ship.rotation, 100, this.ship.body.velocity);
  };

  enemy.prototype.update = function() {
    if(this.ship.alive){
      if (this.game.physics.arcade.distanceBetween(this.ship, this.player) < 100){
        this.ship.rotation = this.game.physics.arcade.angleBetween(this.ship, this.player);
        if (this.game.time.now > this.nextFire){
          this.bullet = this.bullets.getFirstExists(false);
          this.game.physics.enable(this.bullet, Phaser.Physics.ARCADE.Body);
          if (this.bullet){
            this.pew4 = this.game.add.audio('pew4');
            this.pew4.play();
            this.bullet.reset(this.ship.x, this.ship.y );
            this.bullet.body.velocity.y = -400;
            this.nextFire = this.game.time.now + 1000;

            this.bullet.rotation = this.game.physics.arcade.moveToObject(this.bullet, this.player, 300);
          }   
        }
      }
      
      if(this.ship.body.blocked.left || this.ship.body.blocked.right || this.ship.body.blocked.up || this.ship.body.blocked.down){
        this.ship.angle = this.game.rnd.angle();
        this.game.physics.arcade.velocityFromRotation(this.ship.rotation, 100, this.ship.body.velocity);
      }
    }
  };

    
    
    LevelTwo.prototype.create = function () 
    {
		      this.game.physics.startSystem(Phaser.Physics.ARCADE);

          this.game.stage.backgroundColor = '#000000';

          this.bg = this.game.add.tileSprite(0, 0, 3600, 2520, 'level1bg');
          this.bg.fixedToCamera = false;

          this.map = this.game.add.tilemap('level2');

          this.map.addTilesetImage('tiles-2');

          this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

          this.layer = this.map.createLayer('Tile Layer 1');

          this.layer.resizeWorld();


          this.player = this.game.add.sprite(3, 180, 'playership');
          this.game.physics.arcade.enableBody(this.player);
          this.player.body.collideWorldBounds = true;
          this.player.body.setSize(27, 27, 2, 9);
          this.player.anchor.setTo( 0.5, 0.5 );
          
<<<<<<< HEAD:js/LevelTwo.js
=======
          //this.camera.follow(this.player);

>>>>>>> 88ff228a6cf800a1b478043098f85c012c0dc795:js/GameState.js
          
          bullets = this.game.add.group();
          bullets.createMultiple(1000, 'bullet');
          bullets.setAll('anchor.x', 0.5);
          bullets.setAll('anchor.y', 0.5);
          bullets.setAll('outOfBoundsKill', true);
        
          enemyBullets = this.game.add.group();
          enemyBullets.createMultiple(30, 'bullet');
          enemyBullets.setAll('anchor.x', 0.5);
          enemyBullets.setAll('anchor.y', 0.5);
          enemyBullets.setAll('outOfBoundsKill', true);


          enemies = [];
          for (var i = 0; i < LOCATIONS.length; i++){
            enemies.push(new enemy(this, 
                        LOCATIONS[i][0], // x
                        LOCATIONS[i][1], // y
                        this.player, enemyBullets));
          }

          this.game.camera.follow(this.player);
          
          stateText = this.game.add.text(150,100,'', { fontSize: '84px', fill: '#000000' });
          stateText.anchor.setTo(0.5, 0.5);
          stateText.visible = false;
          stateText.fixedToCamera = true;

    };

    LevelTwo.prototype.update = function()
    {
      if(this.player.x > 960 && this.player.y > 960){
        this.stateText.content = " You Have Won! \n Click to restart";
        this.stateText.visible = true;
        this.game.input.onTap.addOnce(restart,this);
          }

          if(this.player.body.blocked.left && this.player.body.blocked.right){
            this.player.body.x = 3;
            this.player.body.y = 180;
          }
          
          //this.bg.tilePosition.y -= 6;
         
          this.player.rotation = this.game.physics.arcade.accelerateToPointer( this.player, this.game.input.activePointer, 200, 200, 200 );

          if (this.game.input.activePointer.isDown){
              this.fireBullet();
          }
          
          this.collider();
          this.game.physics.arcade.overlap(enemyBullets, this.player, this.bulletHitPlayer, null, this.player);
          for (var i = 0; i < enemies.length; i++){
            if (enemies[i].alive){
              this.game.physics.arcade.collide(enemies[i].ship, this.layer);
              this.game.physics.arcade.collide(player, enemies[i].ship);
              this.game.physics.arcade.overlap(bullets, enemies[i].ship, this.bulletHitEnemy, null, enemies[i].ship);
              enemies[i].update();
            }
          }
          
          this.game.physics.arcade.overlap(enemyBullets, this.layer, this.bulletHitLayer, null, this.layer);
          this.game.physics.arcade.overlap(bullets, this.layer, this.bulletHitLayer, null, this.layer); 
    };

    LevelTwo.prototype.collider = function ()
    {
      this.game.physics.arcade.collide(this.player, this.layer);
    };

    LevelTwo.prototype.fireBullet = function ()
    {
        if (this.game.time.now > bulletTime){
        	console.log(bulletTime);
          this.bullet = bullets.getFirstExists(false);
		this.game.physics.arcade.enableBody(this.bullet);
        if (this.bullet){
          this.pew3 = this.game.add.audio('pew3');
          this.pew3.play();
          this.bullet.reset(this.player.x, this.player.y );
          this.bullet.body.velocity.y = -400;
          bulletTime = this.game.time.now + BasicGame.playerFireRate;
          this.bullet.rotation = this.game.physics.arcade.moveToPointer(this.bullet, 300);
        }
      }
    };

    LevelTwo.prototype.bulletHitEnemy = function (bullet,ship)
    {
        this.explosion_audio = this.game.add.audio('explosion');
        this.explosion_audio.play();

         var explosion = this.game.add.sprite(ship.body.x,ship.body.y,'explode');
         explosion.animations.add('explode');
         explosion.play('explode',25,false,true);


        bullet.kill();
        ship.kill();
        ship.alive = false;
    };

    LevelTwo.prototype.bulletHitLayer = function (bullet,Layer)
    {
      bullet.kill();
    };
    
    LevelTwo.prototype.bulletHitPlayer = function (bullet,player)
    {
            this.explosion_audio = this.game.add.audio('explosion');
            this.explosion_audio.play();

            var explosion = this.game.add.sprite(player.body.x,player.body.y,'explode');
            explosion.animations.add('explode');
            explosion.play('explode',25,false,true);

            bullet.kill();
            player.kill();
            
            stateText.content = " You Have Failed! \n Click to restart";
            stateText.visible = true;
            this.game.state.start("LevelTwo");
			//this.game.input.activePointer.onDown.add(this.restart, this.game);
            //this.game.input.activePointer.onTap.addOnce(this.restart,this.game);

    };

    LevelTwo.prototype.resetBullet = function (bullet)
    {
        bullet.kill();
    };

    LevelTwo.prototype.restart = function ()
    {
    	this.game.state.start("LevelTwo");
        //this.game.world.removeAll();
        //preload();
        //create();
    };

    return LevelTwo;
  })(Phaser.State);
  BasicGame.LevelTwo = LevelTwo;



})(BasicGame || (BasicGame = {}));
