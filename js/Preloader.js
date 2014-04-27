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
        console.log('Preloading...');
        // show preload assets
        this.background = this.add.image(0, 0, "load_bg");
        this.preloadBar = this.add.sprite(this.game.width/2,
        this.game.height/2, "load_bar");
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        // load remaining game assets
        this.load.image("menu_bg", "assets/img/Background.jpg");
        this.load.image("level1bg", "assets/img/level1background.jpg");
        this.load.image("upgrade_background", "assets/img/upgradeBackground.jpg");
        this.load.audio("music_title", "assets/sound/title.mp3");
        this.load.spritesheet("continue_button", "assets/img/Buttons/Continue.png", 200, 55);
        this.load.spritesheet("controls_button", "assets/img/Buttons/Controls.png", 200, 55);
        this.load.spritesheet("credits_button", "assets/img/Buttons/Credits.png", 200, 55);
        this.load.spritesheet("newgame_button", "assets/img/Buttons/NewGame2.png", 200, 50);
        this.load.spritesheet("upgrades_button", "assets/img/Buttons/Upgrades.png", 255, 55);
        this.load.spritesheet("player_ship", "assets/img/playership.png");
        this.load.spritesheet("enemy_ship", "assets/img/enemyship.png");
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.tilemap('level1', 'assets/img/spacetiles.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles-1', 'assets/img/tiles/space_tiles.png');
        this.load.spritesheet('playership', 'assets/img/playership.png', 32, 48);
        this.load.spritesheet('enemyship', 'assets/img/enemyship.png', 32, 48);
        this.load.image('background', 'assets/img/Background.jpg');
        this.load.audio('pew3', 'assets/sound/pew3.ogg');
        this.load.audio('pew4', 'assets/sound/pew4.ogg');
        this.load.audio('explosion', 'assets/sound/explosion.ogg');
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
