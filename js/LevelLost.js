var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (LevelLost) {
  var LevelLost = (function (_super) {
    __extends(LevelLost, _super);
    function LevelLost() {
      _super.apply(this, arguments);
    }

    LevelLost.prototype.create = function () {
        console.log('LevelLost');
        background = this.add.image(0,0, 'upgrade_background');
        background.scale.setTo(0.65, 0.75);
      	this.continuebutton = this.add.button(700, 0, 'continue_button', this.toMainMenu, this, 1,0,1);
      
      stateText = this.game.add.text(150,100,'Level ' + BasicGame.level + ' Failed!', { fontSize: '84px', fill: '#000000' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = false;
      stateText.fixedToCamera = true;
    };

    LevelLost.prototype.toMainMenu = function () {
      this.game.state.start('MainMenu');
    };

    return LevelLost;

    })(Phaser.State);
    BasicGame.LevelLost = LevelLost;
})(BasicGame || (BasicGame = {}));
