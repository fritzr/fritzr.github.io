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
        console.log('Main menu');
        this.music = this.add.audio('music_title');
        this.music.play();
        this.background = this.add.image(0,0, 'menu_bg');
        this.continuebutton = this.add.button(100,100, 'continue_button', this.startGame, this, 1,0,1);
        this.controlsbutton = this.add.button(100,155, 'controls_button', this.startControls, this, 1,0,1);
        this.creditsbutton = this.add.button(100,210, 'credits_button', this.startCredits, this, 1,0,1);
        this.newgamebutton = this.add.button(100,265, 'newgame_button', this.startGame, this, 1,0,1);
        this.upgradesbutton = this.add.button(100,320, 'upgrades_button', this.startUpgrade, this, 1,0,1);
        var i = 0;
    };

    MainMenu.prototype.update = function() {

    };
    
    MainMenu.prototype.startGame = function () {
      this.music.stop();
      this.game.state.start("LevelOne");
    };
    
    MainMenu.prototype.startUpgrade = function(){
    	this.music.stop();
    	this.game.state.start("Upgrades");	
    };
    
    MainMenu.prototype.startControls = function(){
      this.music.stop();
      this.game.state.start('Controls');
    };
    
    MainMenu.prototype.startCredits = function(){
      this.music.stop();
      this.game.state.start('Credits');
    };
    
    MainMenu.prototype.actionOnClick = function () {
      //if(this.music.isPlaying){
      //  this.music.stop();
      //}else{
      //  this.music.play();
      //}
    };
        
    return MainMenu;

    })(Phaser.State);
    BasicGame.MainMenu = MainMenu;
})(BasicGame || (BasicGame = {}));
