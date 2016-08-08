(function(){
	var Block = window.Block = function(x,y,t){
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.type=["girl1","girl2","girl3","girl4","girl5","girl6"];
		this.typeNum =t;
		this.render();
	}
	Block.prototype.render = function(){
		game.ctx.drawImage(game.images[this.type[this.typeNum]],this.x,this.y,this.width,this.height);
	}
})();