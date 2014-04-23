var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};
var BasicGame;

(function (BasicGame) 
{
  var GameState = (function (_super) 
  {
    __extends(GameState, _super);
    function GameState() 
    {
      _super.apply(this, arguments);
    }
    
    GameState.prototype.preload = function () 
    {
      
    };
    
    GameState.prototype.create = function () 
    {
      
    };

    GameState.prototype.update = function()
    {

    };
    
    return GameState;
  })(Phaser.State);
  BasicGame.GameState = GameState;
})(BasicGame || (BasicGame = {}));