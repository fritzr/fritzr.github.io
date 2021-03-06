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
      //announce main menu
      console.log('Main menu');
      
      //set and display main menu assets
      this.music = this.add.audio('music_title');
      this.music.play();
      this.background = this.add.image(0,0, 'menu_bg');
      this.continuebutton = this.add.button(100,100, 'continue_button', this.ContinueGame, this, 1,0,1);
      this.controlsbutton = this.add.button(100,155, 'controls_button', this.startControls, this, 1,0,1);
      this.creditsbutton = this.add.button(100,210, 'credits_button', this.startCredits, this, 1,0,1);
      this.newgamebutton = this.add.button(100,265, 'newgame_button', this.startGame, this, 1,0,1);
      this.upgradesbutton = this.add.button(100,320, 'upgrades_button', this.startUpgrade, this, 1,0,1);
      var i = 0;
    };
    
    MainMenu.prototype.ContinueGame = function(){
      //stop music, load next level
      this.music.stop();
      if(BasicGame.level == 1)
        this.game.state.start('LevelOne');
      if(BasicGame.level == 2)
        this.game.state.start('LevelTwo');
    };
    
    MainMenu.prototype.startGame = function () {
      //stop music, reset player data, start level one
      this.music.stop();
      BasicGame.currency = 0;
      BasicGame.level = 1;
      BasicGame.playerFireRate = 200;
      BasicGame.FireRateUpgrade1 = 0;
      BasicGame.FireRateUpgrade2 = 0;
      BasicGame.FireRateUpgrade3 = 0;
      this.game.state.start("LevelOne");
    };
    
    MainMenu.prototype.startUpgrade = function(){
      //stop music start upgrades state
    	this.music.stop();
    	this.game.state.start("Upgrades");	
    };
    
    MainMenu.prototype.startControls = function(){
      //stop music, start controls state
      this.music.stop();
      this.game.state.start('Controls');
    };
    
    MainMenu.prototype.startCredits = function(){
      //stop music, start credits state
      this.music.stop();
      this.game.state.start('Credits');
    };
        
    return MainMenu;

    })(Phaser.State);
    BasicGame.MainMenu = MainMenu;
})(BasicGame || (BasicGame = {}));
