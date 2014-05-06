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
      //announce level won
      console.log('LevelWon');
      
      //set and display assets
      background = this.add.image(0,0, 'upgrade_background');
      background.scale.setTo(0.65, 0.75);
      this.continuebutton = this.add.button(700, 0, 'continue_button', this.toUpgrades, this, 1,0,1);
      
      //set and display win text
      stateText = this.add.text(512,288,'Level ' + BasicGame.level + ' Complete!\nTotal Score: ' + BasicGame.currency, { fontSize: '84px', fill: '#FFFFFF' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = true;
      stateText.fixedToCamera = true;
    };

    LevelWon.prototype.toUpgrades = function () {
      //Go to upgrades screen (only option)
      this.game.state.start('Upgrades');
    };

    return LevelWon;

    })(Phaser.State);
    BasicGame.LevelWon = LevelWon;
})(BasicGame || (BasicGame = {}));
