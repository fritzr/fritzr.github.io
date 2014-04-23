var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
      _super.apply(this, arguments);
    }

    MainMenu.prototype.create = function () {
        console.log('Main menu');
        this.music = this.add.audio('music_title');
        //this.music.play();
        this.background = this.add.image(0,0, 'menu_bg');
        this.continuebutton = this.add.sprite(100,100, 'continue_button');
        this.controlsbutton = this.add.sprite(100,155, 'controls_button');
        this.controlsbutton = this.add.sprite(100,210, 'credits_button');
        this.newgamebutton = this.add.sprite(100,265, 'newgame_button');
        this.upgradesbutton = this.add.sprite(100,320, 'upgrades_button');
    };

    MainMenu.prototype.update = function() {

    };

    MainMenu.prototype.startGame = function () {
    };
      
    return MainMenu;

    })(Phaser.State);
    BasicGame.MainMenu = MainMenu;
})(BasicGame || (BasicGame = {}));
