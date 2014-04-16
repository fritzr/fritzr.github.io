var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

window.onload = function() {
    game = new BasicGame.Main();
}

var game;
var BasicGame;

(function (BasicGame) {
  var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
      _super.call(this, 1024, 576, Phaser.AUTO, 'game', null, false, false);

      this.state.add("Boot", BasicGame.Boot);
      this.state.add("Preloader", BasicGame.Preloader);
      this.state.add("MainMenu", BasicGame.MainMenu);

      this.state.start("Boot");
    }
    
    return Main;
  })(Phaser.Game);
  BasicGame.Main = Main;
})(BasicGame || (BasicGame = {}));
