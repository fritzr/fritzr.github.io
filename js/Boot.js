var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
      _super.apply(this, arguments);
    }
    
    Boot.prototype.preload = function () {
      //load preloader assets
      this.load.image("load_bg", "assets/img/LoaderBackground.jpg");
      this.load.image("load_bar", "assets/img/LoaderBar.jpg");
    };
    
    Boot.prototype.create = function () {
      //announce botting status
      console.log('Booting...');
      
      //set some game settings
      this.game.input.maxPointers = 1;
      this.game.stage.disableVisibilityChange = true;
      BasicGame.playerFireRate = 200;
      
      //start Preloader
      this.game.state.start("Preloader");
    };
    
    return Boot;
  })(Phaser.State);
  BasicGame.Boot = Boot;
})(BasicGame || (BasicGame = {}));
