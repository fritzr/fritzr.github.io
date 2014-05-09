var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
      _super.apply(this, arguments);
    }
    
    Preloader.prototype.preload = function () {
      //show preloading
      console.log('Preloading...');
      
      //set preload assets
      this.background = this.add.image(0, 0, "load_bg");
      this.preloadBar = this.add.sprite(this.game.width/2,
                        (this.game.height/2) + 150, "load_bar");
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.load.setPreloadSprite(this.preloadBar);

      //load remaining game assets
      //load backgrounds
      this.load.image("menu_bg", "assets/img/Background.jpg");
      this.load.image("level1bg", "assets/img/level1background.jpg");
      this.load.image("level2bg", "assets/img/level2background.jpg");
      this.load.image("upgrade_background", "assets/img/upgradeBackground.jpg");
      this.load.image('background', 'assets/img/Background.jpg');

      //load tilesets
      this.load.tilemap('level2', 'assets/img/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.tilemap('level1', 'assets/img/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles-1', 'assets/img/tiles/LevelOne.png');
      this.load.image('tiles-2', 'assets/img/tiles/LevelTwo.png');

      //load audio files
      this.load.audio("music_title", "assets/sound/title.ogg");        
      this.load.audio('pew3', 'assets/sound/pew3.ogg');
      this.load.audio('pew4', 'assets/sound/pew4.ogg');
      this.load.audio('explosion', 'assets/sound/explosion.ogg');
        
      //load player & enemy assets & animations
      this.load.spritesheet("player_ship", "assets/img/playership.png");
      this.load.spritesheet("enemy_ship", "assets/img/enemyship.png");
      this.load.spritesheet('playership', 'assets/img/playership.png', 29, 27);
      this.load.spritesheet('enemyship', 'assets/img/enemyship.png', 27, 30);
      this.load.spritesheet('upgradeButton', 'assets/img/Buttons/upgradeButton.png',80,60);
      this.load.spritesheet('explode','assets/img/explosion.png',64,64);
      this.load.image('bullet', 'assets/img/bullet.png');
        
      //global variables
      BasicGame.currency = 0;
      BasicGame.level = 1;
      BasicGame.playerFireRate = 200;
      BasicGame.FireRateUpgrade1 = 0;
      BasicGame.FireRateUpgrade2 = 0;
      BasicGame.FireRateUpgrade3 = 0;
      BasicGame.playerLight = 8;
      BasicGame.LightUpgrade1 = 0;
      BasicGame.LightUpgrade2 = 0;
      BasicGame.LightUpgrade3 = 0;
        
      //load all button spritesheets
      this.load.spritesheet("continue_button", "assets/img/Buttons/Continue.png", 200, 50);
      this.load.spritesheet("controls_button", "assets/img/Buttons/Controls.png", 200, 50);
      this.load.spritesheet("credits_button", "assets/img/Buttons/Credits.png", 200, 50);
      this.load.spritesheet("newgame_button", "assets/img/Buttons/NewGame.png", 200, 50);
      this.load.spritesheet("upgrades_button", "assets/img/Buttons/Upgrades.png", 200, 50);
      this.load.spritesheet("restart_button", "assets/img/Buttons/restart.png", 200, 50);
    };

    Preloader.prototype.update = function () {
      // load main menu when done
      if(this.cache.isSoundDecoded("music_title")){
        this.game.state.start("MainMenu");
      }
    };
    
    return Preloader;
  })(Phaser.State);
  BasicGame.Preloader = Preloader;
})(BasicGame || (BasicGame = {}));
