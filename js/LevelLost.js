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
      //announce level lost state
      console.log('LevelLost');
      
      //set and display losing assets
      background = this.add.image(0,0, 'upgrade_background');
      background.scale.setTo(0.65, 0.75);
      this.continuebutton = this.add.button(700, 50, 'continue_button', this.toMainMenu, this, 1,0,1);
      this.restartbutton = this.add.button(700, 100, 'restart_button', this.toLevel, this, 1,0,1);
      
      //set and diplay loss text
      stateText = this.add.text(512,288,'Level ' + BasicGame.level + ' Failed!', { fontSize: '84px', fill: '#FFFFFF' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = true;
      stateText.fixedToCamera = true;
    };

    LevelLost.prototype.toMainMenu = function () {
      //go back to main menu
      this.game.state.start('MainMenu');
    };
    
    LevelLost.prototype.toLevel = function () {
      //restart current level
      if(BasicGame.level == 1){
        this.game.state.start('LevelOne');
      }
      else this.game.state.start('LevelTwo');
    };

    return LevelLost;

    })(Phaser.State);
    BasicGame.LevelLost = LevelLost;
})(BasicGame || (BasicGame = {}));
