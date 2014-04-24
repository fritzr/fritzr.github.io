var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Enemy = (function (_super) {
      __extends(Enemy, _super);

      // starting locations of enemies TODO: load from JSON for each level
      Enemy.LOCATIONS = [
          [250,16],  [715,816], [780,656], [625,144],
          [975,665], [365,80],  [190,432], [420,958],
          [670,890], [465,960]
      ];

      // how close to player enemy has to be to target the player
      Enemy.ACQUIRE_DISTANCE = 100;

      function Enemy(game, x, y, index, player, bullets) {
          _super.call(this, game, x, y, 'enemy_ship');

          this.player = player;
          this.bullets = bullets;
          this.fireRate = 1000;
          this.nextFire = 0;
          this.alive = true;

          game.add.existing(this);
          this.ship.body.setRectangle(31, 31, 2, 9);
          this.ship.anchor.setTo(0.5, 0.5);

          this.ship.name = index.toString();
          this.ship.body.immovable = false;
          this.ship.body.collideWorldBounds = true;
          this.ship.angle = game.rnd.angle();

          this.game.physics.velocityFromRotation(
                  this.ship.rotation, 100, this.ship.body.velocity);
      }

      Enemy.prototype.update = function() {
        if(!this.ship.alive){
            return;
        }
        if (this.game.physics.arcade.distanceBetween(this.ship,this.player)
                < ACQUIRE_DISTANCE)
        {
          this.ship.rotation = game.physics.angleBetween(this.ship, player);
          if (this.game.time.now > this.nextFire){
            bullet = this.bullets.getFirstExists(false);
            if (bullet){
              pew4 = game.add.audio('pew4');
              pew4.play();
              bullet.reset(this.ship.x, this.ship.y );
              bullet.body.velocity.y = -400;
              this.nextFire = game.time.now + 1000;

              bullet.rotation = game.physics.arcade.moveToObject(
                      bullet, this.player, 300);
            }   
          }
        }
        
        if(this.ship.body.blocked.left 
                || this.ship.body.blocked.right 
                || this.ship.body.blocked.up 
                || this.ship.body.blocked.down){
          this.ship.angle = game.rnd.angle();
          game.physics.arcade.velocityFromRotation(
                  this.ship.rotation, 100, this.ship.body.velocity);
        }
    };

      return Enemy;
  })(Phaser.Sprite);
  BasicGame.Enemy = Enemy;

  var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
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
    
    GameState.prototype.create = function () 
    {
          this.game.stage.backgroundColor = '#000000';

          this.bg = this.game.add.tileSprite(0, 0, 300, 300, 'background');
          this.bg.fixedToCamera = true;

          this.map = this.game.add.tilemap('level1');

          this.map.addTilesetImage('tiles-1');

          this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

          this.layer = this.map.createLayer('Tile Layer 1');

          this.layer.resizeWorld();


          this.player = this.game.add.sprite(3, 180, 'playership');
          this.game.physics.arcade.enableBody(this.player);
          this.player.body.collideWorldBounds = true;
          this.player.body.setSize(27, 27, 2, 9);
          this.player.anchor.setTo( 0.5, 0.5 );
          
          bullets = this.game.add.group();
          bullets.createMultiple(30, 'bullet');
          bullets.setAll('anchor.x', 0.5);
          bullets.setAll('anchor.y', 0.5);
          bullets.setAll('outOfBoundsKill', true);
        
          enemyBullets = this.game.add.group();
          enemyBullets.createMultiple(30, 'bullet');
          enemyBullets.setAll('anchor.x', 0.5);
          enemyBullets.setAll('anchor.y', 0.5);
          enemyBullets.setAll('outOfBoundsKill', true);
          
          enemies = [];
          for (var i = 0; i < BasicGame.Enemy.LOCATIONS.length; i++){
            enemies.push(new BasicGame.Enemy(game, 
                        BasicGame.Enemy.LOCATIONS[i][0], // x
                        BasicGame.Enemy.LOCATIONS[i][1], // y
                        player, enemyBullets));
          }

          this.game.camera.follow(player);
          
          this.stateText = this.game.add.text(150,100,'', { fontSize: '84px', fill: '#000000' });
          this.stateText.anchor.setTo(0.5, 0.5);
          this.stateText.visible = false;
          this.stateText.fixedToCamera = true;
    };

    GameState.prototype.update = function()
    {
      if(player.x > 960 && player.y > 960){
        this.stateText.content = " You Have Won! \n Click to restart";
        this.stateText.visible = true;
        this.game.input.onTap.addOnce(restart,this);
          }

          if(this.player.body.blocked.left && this.player.body.blocked.right){
            this.player.body.x = 3;
            this.player.body.y = 180;
          }
          
          this.bg.tilePosition.y -= 6;
         
          this.player.rotation = this.game.physics.accelerateToPointer( player, this.game.input.activePointer, 200, 200, 200 );

          if (this.game.input.activePointer.isDown){
              fireBullet();
          }
          
          this.collider();
          this.game.physics.overlap(enemyBullets, player, bulletHitPlayer, null, this);
          for (var i = 0; i < enemies.length; i++){
            if (enemies[i].alive){
              this.game.physics.collide(enemies[i].ship, layer);
              this.game.physics.collide(player, enemies[i].ship);
              this.game.physics.overlap(bullets, enemies[i].ship, bulletHitEnemy, null, this);
              this.enemies[i].update();
            }
          }
          
          this.game.physics.overlap(enemyBullets, layer, bulletHitLayer, null, this);
          this.game.physics.overlap(bullets, layer, bulletHitLayer, null, this); 
    };

    GameState.prototype.collider = function ()
    {
      this.game.physics.collide(player, layer);
    };

    GameState.prototype.fireBullet = function ()
    {
        if (game.time.now > bulletTime){
          this.bullet = this.bullets.getFirstExists(false);

        if (bullet){
          this.pew3 = this.game.add.audio('pew3');
          this.pew3.play();
          this.bullet.reset(player.x, player.y );
          this.bullet.body.velocity.y = -400;
          this.bulletTime = this.game.time.now + 200;
          this.bullet.rotation = this.game.physics.moveToPointer(bullet, 300);
        }
      }
    };

    GameState.prototype.bulletHitEnemy = function (bullet,ship)
    {
        this.explosion = this.sgame.add.audio('explosion');
        this.explosion = this.game.add.audio('explosion');
        explosion.play();
        bullet.kill();
        ship.kill();
        ship.alive = false;
    };

    GameState.prototype.bulletHitLayer = function (bullet,Layer)
    {
      bullet.kill();
    };
    
    GameState.prototype.bulletHitPlayer = function (bullet,player)
    {
            explosion = game.add.audio('explosion');
            explosion.play();
            bullet.kill();
            player.kill();
            
            stateText.content = " You Have Failed! \n Click to restart";
            stateText.visible = true;

            game.input.onTap.addOnce(restart,this);
    };

    GameState.prototype.resetBullet = function (bullet)
    {
        bullet.kill();
    };

    GameState.prototype.restart = function ()
    {
        game.world.removeAll();
        preload();
        create();
    };

    return GameState;
  })(Phaser.State);
  BasicGame.GameState = GameState;



})(BasicGame || (BasicGame = {}));
