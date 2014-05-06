var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Credits = (function (_super) {
    __extends(Credits, _super);
    function Credits() {
      _super.apply(this, arguments);
    }

    Credits.prototype.create = function () {
      //announce credits page
      console.log('Credits');
      
      //set and display credits page assets
      var background = this.add.image(0,0, 'menu_bg');
      background.scale.setTo(0.65, 0.75);
    	this.backButton = this.add.button(50, 50, 'credits_button', this.backToMenu, this, 1,0,1);
      var i = 0;
      var text = "Credits:\nDamian O'Leary\nDrew Schilthelm\nFritz Reese\nWes Chappell";
    	var style = { font: "65px Helvetica Neue UltraLight", fill: "#FCFF00", align: "center" };
    	var t = this.add.text(this.world.centerX, this.world.centerY-100, text, style);
    	
    };
    
    Credits.prototype.backToMenu = function () {
      //go back to main menu if selected
    	this.game.state.start("MainMenu");
    }

    
    
        
    return Credits;

    })(Phaser.State);
    BasicGame.Credits = Credits;
})(BasicGame || (BasicGame = {}));
