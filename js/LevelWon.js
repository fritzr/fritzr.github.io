var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (LevelWon) {
  var LevelWon = (function (_super) {
    __extends(LevelWon, _super);
    function LevelWon() {
      _super.apply(this, arguments);
    }

    LevelWon.prototype.create = function () {
        console.log('LevelWon');
        background = this.add.image(0,0, 'upgrade_background');
        background.scale.setTo(0.65, 0.75);
      	this.continuebutton = this.add.button(700, 0, 'continue_button', this.toUpgrades, this, 1,0,1);
      
      stateText = this.game.add.text(150,100,'Level ' + BasicGame.level + ' Complete!\nTotal Score: ' + BasicGame.currency, { fontSize: '84px', fill: '#000000' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.fixedToCamera = true;
    };

    LevelWon.prototype.toUpgrades = function () {
      this.game.state.start('Upgrades');
    };

    return LevelWon;

    })(Phaser.State);
    BasicGame.LevelWon = LevelWon;
})(BasicGame || (BasicGame = {}));
