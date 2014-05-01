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
        console.log('Credits');
        var background = this.add.image(0,0, 'menu_bg');
        background.scale.setTo(0.65, 0.75);
      	this.backButton = this.add.button(700, 0, 'controls_button', this.backToMenu, this, 1,0,1);
        var i = 0;
        var text = "Controls:\nControl Direction by moving mouse\nClick to fire";
    	var style = { font: "65px Arial", fill: "#FCFF00", align: "center" };

    	var t = this.add.text(this.world.centerX-500, this.world.centerY-100, text, style);
    	
    };

    Controls.prototype.update = function() {

    };
    
    Controls.prototype.backToMenu = function () {
    	this.game.state.start("MainMenu");
    }

    
    
        
    return Controls;

    })(Phaser.State);
    BasicGame.Controls = Controls;
})(BasicGame || (BasicGame = {}));
