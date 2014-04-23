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
        this.load.audio("music_title", "assets/sound/title.mp3");
        this.load.image("continue_button", "assets/img/Buttons/Continue.png");
        this.load.image("controls_button", "assets/img/Buttons/Controls.png");
        this.load.image("credits_button", "assets/img/Buttons/Credits.png");
        this.load.image("newgame_button", "assets/img/Buttons/NewGame.png");
        this.load.image("upgrades_button", "assets/img/Buttons/Upgrades.png");
        this.load.image("player_ship", "assets/img/playership.png");
        this.load.image("enemy_ship", "assets/img/enemyship.png");
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