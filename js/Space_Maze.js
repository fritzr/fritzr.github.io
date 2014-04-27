var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Space_Maze = (function (_super) {
    __extends(Space_Maze, _super);
    function Space_Maze() {
      _super.apply(this, arguments);
    }
    
  Space_Maze.prototype.create = function (){
    
    console.log('Space_Maze GameState');
    
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    
    this.game.stage.backgrouindColor = '#EE0000';
    
    this.bg = this.game.add.tileSprite(0,0,1280,800,'background');
    this.bg.fixedToCamera = true;
    
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('tiles-1');
    this.map.setCollision([36,37]);
    
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    
    this.player = this.game.add.sprite(100,180,'playership');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE.Body);
    this.player.collideWorldBounds = true;
    this.player.body.setSize(27,27,2,9);
    this.player.anchor.setTo(0.5,0.5);
    
    this.bullets = this.game.add.group();
    this.bullets.createMultiple(100, 'bullet');
    for(i = 0;i<this.bullets.length;i++){
      this.game.physics.enable(this.bullets[i], Phaser.Physics.ARCADE.Body);
      console.log(i);
    }
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);

  }
  
  Space_Maze.prototype.update = function (){
    this.player.rotation = this.game.physics.arcade.accelerateToPointer( this.player, this.game.input.activePointer, 200, 200, 200);
    if(this.game.input.activePointer.isDown){
      this.fireBullet();
    }
  }
  
  Space_Maze.prototype.fireBullet = function(){
    this.pew3 = this.game.add.audio('pew3');
    this.pew3.play();
    this.bullet = this.bullets.getFirstExists(false);
    this.bullet.reset(this.player.x,this.player.y);
    this.bullet.body.velocity.y = -400;
    this.bullet.rotation = this.game.physics.arcade.moveToPointer(this.bullet, 300);
  }
    
    return Space_Maze;
  })(Phaser.State);
  BasicGame.Space_Maze = Space_Maze;
})(BasicGame || (BasicGame = {}));
