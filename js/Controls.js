var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Controls = (function (_super) {
    __extends(Controls, _super);
    function Controls() {
      _super.apply(this, arguments);
    }

    Controls.prototype.create = function () {
      //announce credits starting
      console.log('Credits');
      
      //set and display controls assets
      var background = this.add.image(0,0, 'menu_bg');
      background.scale.setTo(0.65, 0.75);
      his.backButton = this.add.button(50, 50, 'controls_button', this.backToMenu, this, 1,0,1);
      var i = 0;
      var text = "Controls:\nControl Direction by moving mouse\nClick to fire";
    	var style = { font: "45px Helvetica Neue UltraLight", fill: "#FCFF00", align: "center" };
    	var t = this.add.text(this.world.centerX-250, this.world.centerY+75, text, style);
    	
    };
    
    Controls.prototype.backToMenu = function () {
      //return to main menut when clicked
    	this.game.state.start("MainMenu");
    }

    
    
        
    return Controls;

    })(Phaser.State);
    BasicGame.Controls = Controls;
})(BasicGame || (BasicGame = {}));
