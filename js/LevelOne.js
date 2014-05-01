var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  	

  var LevelOne = (function (_super) {
    __extends(LevelOne, _super);
    function LevelOne() {
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
    var button;
    var explode;
    var enemiesKilled = 0;
    var startTime = 0;
    var score = 0;

    var LIGHT_PEN   = 20; // how far light penetrates into walls
    var LIGHT_DEPTH = 200; // how far you can see
    var LIGHT_ANGLE = 40; // angle of the flashlight in degrees
    var LIGHT_RADS  = LIGHT_ANGLE*Math.PI/180; // angle in radians

    var LOCATIONS = [
          [80,432],  [208,80], [336,80], [464,80],
          [848,560], [656,816], [208,368], [208,816]
      ];
    var wonGame;
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
    this.ship.body.setSize(31, 31, 2, 9);
    this.ship.anchor.setTo(0.5, 0.5);
    
    this.ship.animations.add('fly');
    this.ship.animations.play('fly', 10, true);

    this.ship.body.immovable = false;
    this.ship.body.collideWorldBounds = true;
    this.ship.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.ship.rotation, 100, this.ship.body.velocity);
  };

  enemy.prototype.update = function() {
    if(this.ship.alive && this.player.alive){
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

    
    
    LevelOne.prototype.create = function () 
    {
		      this.game.physics.startSystem(Phaser.Physics.ARCADE);
          this.game.stage.backgroundColor = '#000000';

          this.bg = this.game.add.tileSprite(0, 0, 3600, 2520, 'level1bg');
          this.bg.fixedToCamera = false;

          this.map = this.game.add.tilemap('level1');
          this.map.addTilesetImage('tiles-1');
          this.map.setCollisionByExclusion([0]);
          this.layer = this.map.createLayer('Tile Layer 1');
          this.layer.resizeWorld();

          // for setting up field of vision
          this.createLightBitmaps();

          this.player = this.game.add.sprite(75, 32, 'playership');
          this.game.physics.arcade.enableBody(this.player);
          this.player.body.collideWorldBounds = true;
          this.player.body.setSize(27, 27, 2, 9);
          this.player.anchor.setTo( 0.5, 0.5 );
          this.player.animations.add('fly');
          this.player.animations.play('fly', 10, true);
          
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
          
          stateText = this.game.add.text(150,100,'POOOOOOOO', { fontSize: '84px', fill: '#000000' });
          stateText.anchor.setTo(0.5, 0.5);
          stateText.visible = false;
          stateText.fixedToCamera = true;
          
          startTime = this.game.time.now;
          endTime = 0;
          wonGame = false;
    };

    LevelOne.prototype.update = function()
    {
      // draw field of vision
      this.updateVision();

          if(this.player.body.blocked.left && this.player.body.blocked.right){
            this.player.body.x = 75;
            this.player.body.y = 100;
          }
          
          if(this.player.x >= 930){
          	var currentTime = this.game.time.now;
          	score = 2000 + (enemiesKilled*500) - (currentTime - startTime)/100000;
      		  BasicGame.currency += score/1000;
            this.wonGame = true;
            BasicGame.level += 1;
            this.game.state.start('LevelWon');
          }
         
          this.player.rotation = this.game.physics.arcade.accelerateToPointer( this.player, this.game.input.activePointer, 200, 100, 100 );

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

    LevelOne.prototype.collider = function ()
    {
      this.game.physics.arcade.collide(this.player, this.layer);
    };

    LevelOne.prototype.fireBullet = function ()
    {
      if (this.game.time.now > bulletTime && this.player.alive){
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

    LevelOne.prototype.bulletHitEnemy = function (bullet,ship)
    {
        this.explosion = this.game.add.audio('explosion');
        this.explosion = this.game.add.audio('explosion');
        this.explosion.play();
		enemiesKilled += 1;
         var explosion = this.game.add.sprite(ship.body.x,ship.body.y,'explode');
         explosion.anchor.setTo(0.5,0.5);
         explosion.animations.add('explode');
         explosion.play('explode',25,false,true);

        bullet.kill();
        ship.kill();
        ship.alive = false;
    };

    LevelOne.prototype.bulletHitLayer = function (bullet,Layer)
    {
      bullet.kill();
    };
    
    LevelOne.prototype.bulletHitPlayer = function (bullet,player)
    {
      this.explosion = this.game.add.audio('explosion');
      this.explosion.play();

      var explosion = this.game.add.sprite(player.body.x,player.body.y,'explode');
      explosion.anchor.setTo(0.5,0.5);
      explosion.animations.add('explode');
      explosion.play('explode',25,false,true);

      bullet.kill();
      player.kill();
      player.alive = false;
      BasicGame.level += 1;
      this.game.state.start('LevelLost');
    };

    LevelOne.prototype.resetBullet = function (bullet)
    {
        bullet.kill();
    };
    
    LevelOne.prototype.endLevel = function(){
      if(!this.wonGame){
        this.restart();
      }else this.finished();
    }
    
    LevelOne.prototype.restart = function ()
    {
      //this.game.world.removeAll();
    	this.game.state.start("LevelWon");
    };
    
    LevelOne.prototype.finished = function (){
      BasicGame.level += 1;
      this.game.state.start("LevelWon");
    }

LevelOne.prototype.createLightBitmaps = function() {
    // Create a bitmap texture for drawing light cones
    this.bitmap = this.game.add.bitmapData(this.game.world.bounds.width,
                                           this.game.world.bounds.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    var lightBitmap = this.game.add.image(0, 0, this.bitmap);

    // This bitmap is drawn onto the screen using the MULTIPLY blend mode.
    // Since this bitmap is over the background, dark areas of the bitmap
    // will make the background darker. White areas of the bitmap will allow
    // the normal colors of the background to show through. Blend modes are
    // only supported in WebGL. If your browser doesn't support WebGL then
    // you'll see gray shadows and white light instead of colors and it
    // generally won't look nearly as cool. So use a browser with WebGL.
    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
}

// The update() method is called every frame
LevelOne.prototype.updateVision = function() {
    // Fill the entire light bitmap with a dark shadow color.
    this.bitmap.context.fillStyle = 'rgb(0, 0, 0)';
    this.bitmap.context.fillRect(0, 0,
            this.game.world.bounds.width, this.game.world.bounds.height);

    // darken out-of-range enemy ships
    enemies.forEach(function(enmy) {
        var distance = this.game.math.distance(enmy.ship.x, enmy.ship.y,
                                               this.player.x,this.player.y);
        // enemies get easier to see when they're closer
        if(distance > LIGHT_DEPTH) {
            enmy.ship.alpha = 0;
        } else {
            enmy.ship.alpha = Math.exp(-2.5*(distance/LIGHT_DEPTH));
        }
    }, this);

    // when player is dead, draw glow around wreckage
    if(!this.player.alive) {
        // Use light to dark gradient
        var gradient = this.bitmap.context.createRadialGradient(
            this.player.x, this.player.y, LIGHT_DEPTH * 0.2,
            this.player.x, this.player.y, LIGHT_DEPTH/2
                + this.game.rnd.integerInRange(1,LIGHT_PEN/2));
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.bitmap.context.beginPath();
        this.bitmap.context.fillStyle = gradient;
        this.bitmap.context.arc(this.player.x, this.player.y,
                                LIGHT_DEPTH/2, 0, Math.PI*2);
    } else {
    // Use light to dark gradient
    var gradient = this.bitmap.context.createRadialGradient(
        this.player.x, this.player.y, LIGHT_DEPTH * 0.2,
        this.player.x, this.player.y, LIGHT_DEPTH 
            + this.game.rnd.integerInRange(1,LIGHT_PEN));
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');


    // Ray casting!
    // Cast rays at intervals in a large circle around the light.
    // Save all of the intersection points up to the sight radius
    var points = [this.player];
    for(var a = this.player.rotation - LIGHT_RADS/2;
            a < this.player.rotation + LIGHT_RADS/2;
            a += Math.PI/180) {
        // Create a ray from the player to a point on the circle
        var ray = new Phaser.Line(
            this.player.x, this.player.y,
            this.player.x + Math.cos(a) * LIGHT_DEPTH,
            this.player.y + Math.sin(a) * LIGHT_DEPTH);

        // Returns sight radius along the ray, or end of the sight radius
        points.push(this.getEndPoint(ray));
    }

    // Connect the dots and fill in the shape, which are cones of light,
    // with a bright white color. When multiplied with the background,
    // the white color will allow the full color of the background to
    // shine through.
    this.bitmap.context.beginPath();
    this.bitmap.context.fillStyle = gradient; //'rgb(255, 255, 255)';
    this.bitmap.context.moveTo(points[0].x, points[0].y);
    for(var j = 0; j < points.length-1; j++) {
        this.bitmap.context.lineTo(points[j].x, points[j].y);
    }

    }

    // This just tells the engine it should update the texture cache
    this.bitmap.context.closePath();
    this.bitmap.context.fill();
    this.bitmap.dirty = true;

};

LevelOne.prototype.nearbyTiles = function(object) {
    return this.layer.getTiles(object.x-LIGHT_DEPTH, object.y-LIGHT_DEPTH,
                               2*LIGHT_DEPTH, 2*LIGHT_DEPTH, true);
};

// Given a ray, this function iterates through all of the walls and
// returns the closest wall intersection from the start of the ray
// or null if the ray does not intersect any walls.
LevelOne.prototype.getEndPoint = function(ray) {
    var distanceToWall = LIGHT_DEPTH;
    var closestIntersection = ray.end;

    // For each of the walls...
    this.nearbyTiles(this.player).forEach(function(wall) {
        // Create an array of lines that represent the four edges of each wall
        var lines = [
            new Phaser.Line(wall.worldX, wall.worldY,
                wall.worldX + wall.width, wall.worldY),
            new Phaser.Line(wall.worldX, wall.worldY,
                wall.worldX, wall.worldY + wall.height),
            new Phaser.Line(wall.worldX + wall.width, wall.worldY,
                wall.worldX + wall.width, wall.worldY + wall.height),
            new Phaser.Line(wall.worldX, wall.worldY + wall.height,
                wall.worldX + wall.width, wall.worldY + wall.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        for(var i = 0; i < lines.length; i++) {
            var intersect = Phaser.Line.intersects(ray, lines[i]);
            if (intersect) {
                // Find the closest intersection
                distance =
                    this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                if (distance < distanceToWall) {
                    distanceToWall = distance;
                    closestIntersection = intersect;
                }
            }
        }
    }, this);

    // intersection vector; penetrate light a few pixels into the walls
    var u = Phaser.Point.subtract(closestIntersection, ray.start);
    u.setMagnitude(u.getMagnitude() + LIGHT_PEN);
    return Phaser.Point.add(ray.start, u);
    //return closestIntersection;
};

    return LevelOne;
  })(Phaser.State);
  BasicGame.LevelOne = LevelOne;



})(BasicGame || (BasicGame = {}));
