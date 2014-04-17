var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;
var timer;

(function (BasicGame) {
  var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
      _super.apply(this, arguments);
    }
    
    Preloader.prototype.preload = function () {
        console.log('preloading...');
        // show preload assets
        this.background = this.add.image(0, 0, "load_bg");
        this.preloadBar = this.add.sprite(this.game.width/2,
          (2*this.game.height)/3, "load_bar");
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);

        // load remaining game assets
        this.load.image("menu_bg", "assets/img/Background.jpg");
        /*this.load.audio("music_title", "assets/sound/title.mp3");
        this.load.audio("music_bg", "assets/sound/music.mp3");*/

        // load main menu when done
        this.load.onLoadComplete.add(function() {
            this.game.state.start('MainMenu', true, false);
        }, this);

    };
    
    return Preloader;
  })(Phaser.State);
  BasicGame.Preloader = Preloader;
})(BasicGame || (BasicGame = {}));
