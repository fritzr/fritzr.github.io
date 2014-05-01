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
    
    var currencyLbl;

    Upgrades.prototype.create = function () {
        console.log('Upgrades');
        var background = this.add.image(0,0, 'upgrade_background');
        background.scale.setTo(0.65, 0.75);
        //this.music = this.add.audio('music_title');
        //this.music.play();
      	this.backButton = this.add.button(700, 0, 'continue_button', this.toLevel, this, 1,0,1);
        //this.upgradesbutton = this.add.button(300,300, 'upgrades_button', this.actionOnClick, this, 1,0,1);
        var i = 0;
        var text = "Upgrades";
    	var style = { font: "30px Helvetica Neue UltraLight", fill: "#FCFF00", align: "center" };
    	var style2 = { font: "15px Helvetica Neue UltraLight", fill: "#FCFF00", align: "center" };
		var fireRate = "Increased Fire Rate:";
		var frLabel = this.add.text(50, 200, fireRate, style);
		this.currencyLbl = this.add.text(750, 500, 'Total Parts: ' + BasicGame.currency, style);
		
		this.fr1Button = this.add.button(400, 200, 'upgradeButton', this.FirstUpgrade, this);
		this.fr1Button.frame = BasicGame.FireRateUpgrade1;
		this.fr2Button = this.add.button(600, 200, 'upgradeButton', this.SecondUpgrade, this);
		this.fr2Button.frame = BasicGame.FireRateUpgrade2;
		this.fr3Button = this.add.button(800, 200, 'upgradeButton', this.ThirdUpgrade, this);
		this.fr3Button.frame = BasicGame.FireRateUpgrade3;
		
		this.lrButton1 = this.add.button(400, 325, 'upgradeButton', this.FirstLight, this);
		this.lrButton1.frame = BasicGame.LightUpgrade1;
		this.lrButton2 = this.add.button(600, 325, 'upgradeButton', this.SecondLight, this);
		this.lrButton2.frame = BasicGame.LightUpgrade2;
		this.lrButton3 = this.add.button(800, 325, 'upgradeButton', this.ThirdLight, this);
		this.lrButton3.frame = BasicGame.LightUpgrade3;
		var lr11Label = this.add.text(400, 400, 'x1.5 Range \nCost: 20', style2);
		var lr2Label = this.add.text(600, 400, 'x2 Range \nCost: 50', style2);
		var lr3Label = this.add.text(800, 400, 'x2.5 Range \nCost: 100', style2);
		
		var fr1Label = this.add.text(400, 275, 'x2 Fire Rate \nCost: 20', style2);
		var fr2Label = this.add.text(600, 275, 'x4 Fire Rate \nCost: 100', style2);
		var fr3Label = this.add.text(800, 275, 'Infinite Fire Rate \nCost: 500', style2);		
		var LightLabel = this.add.text(50, 350, "Light Distance:", style);
    	var t = this.add.text(this.world.centerX-300, 0, text, style);
    	
    };

    Upgrades.prototype.update = function() {
      this.currencyLbl.setText('Total Parts: ' + BasicGame.currency);
    };
    
    Upgrades.prototype.FirstLight = function(){
    	if(BasicGame.currency >= 20){
    		BasicGame.playerLight = 4;
    		this.lrButton1.frame = 1;
    		BasicGame.LightUpgrade1 = 1;
        BasicGame.currency = BasicGame.currency - 20;
    	}
    }
    
    Upgrades.prototype.SecondLight = function(){
    	if(BasicGame.currency >= 50){
    		BasicGame.playerLight = 2;
    		this.lrButton2.frame = 1;
    		BasicGame.LightUpgrade2 = 1;
        BasicGame.currency = BasicGame.currency - 50;
    	}
    }
    
    Upgrades.prototype.ThirdLight = function(){
    	if(BasicGame.currency >= 100){
    		BasicGame.playerLight = 0;
    		this.lrButton3.frame = 1;
    		BasicGame.LightUpgrade3 = 1;
        BasicGame.currency = BasicGame.currency - 100;
    	}
    }
    
    Upgrades.prototype.FirstUpgrade = function(){
    	if(BasicGame.currency >= 20){
    		BasicGame.playerFireRate = 100;
    		this.fr1Button.frame = 1;
    		BasicGame.FireRateUpgrade1 = 1;
        BasicGame.currency = BasicGame.currency - 20;
    	}
    }
    
    Upgrades.prototype.SecondUpgrade = function(){
    	if(BasicGame.currency >= 100){
    		BasicGame.playerFireRate = 50;
    		this.fr2Button.frame = 1;
    		BasicGame.FireRateUpgrade2 = 1;
        BasicGame.currency = BasicGame.currency - 100;
    	}
    }
    
    Upgrades.prototype.ThirdUpgrade = function(){
    	if(BasicGame.currency >= 500){
    		BasicGame.playerFireRate = 0;
    		this.fr3Button.frame = 1;
    		BasicGame.FireRateUpgrade3 = 1;
        BasicGame.currency = BasicGame.currency - 500;
    	}
    }

    Upgrades.prototype.startGame = function () {
    };
    
    MainMenu.prototype.toLevel = function(){
      this.music.stop();
      if(BasicGame.level == 1)
        this.game.state.start('LevelOne');
      if(BasicGame.level == 2)
        this.game.state.start('LevelTwo');
    };
    
    Upgrades.prototype.backToMenu = function () {
    	this.game.state.start("MainMenu");
    }

    
    
        
    return Upgrades;

    })(Phaser.State);
    BasicGame.Upgrades = Upgrades;
})(BasicGame || (BasicGame = {}));
