var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};

var BasicGame;

(function (BasicGame) {
  var Upgrades = (function (_super) {
    __extends(Upgrades, _super);
    function Upgrades() {
      _super.apply(this, arguments);
    }

    Upgrades.prototype.create = function () {
        console.log('Upgrades');
        var background = this.add.image(0,0, 'upgrade_background');
        background.scale.setTo(0.65, 0.75);
        //this.music = this.add.audio('music_title');
        //this.music.play();
      	this.backButton = this.add.button(700, 0, 'upgrades_button', this.backToMenu, this, 1,0,1);
        //this.upgradesbutton = this.add.button(300,300, 'upgrades_button', this.actionOnClick, this, 1,0,1);
        var i = 0;
        var text = "Upgrades";
    	var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    	var t = this.add.text(this.world.centerX-300, 0, text, style);
    	
    };

    Upgrades.prototype.update = function() {

    };

    Upgrades.prototype.startGame = function () {
    };
    
    Upgrades.prototype.backToMenu = function () {
    	this.game.state.start("MainMenu");
    }

    
    
        
    return Upgrades;

    })(Phaser.State);
    BasicGame.Upgrades = Upgrades;
})(BasicGame || (BasicGame = {}));
