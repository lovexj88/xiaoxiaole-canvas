(function(){
	var Map = window.Map = function(){
		this.row;
		this.column;
		this.canClear;
		this.k=0;
		this.allGirls = [];
		this.girltype=[];
		this.type();
		this.init();
		// this.clear();
		// this.render();
	}
	Map.prototype.type = function(){
		for(var i = 0;i<100;i++){
			this.girltype[i]=_.random(0,5);
			if((i-2)>=0){
				if(this.girltype[i]==this.girltype[i-1] && this.girltype[i]==this.girltype[i-2]){
					this.girltype[i]+=1;
					this.girltype[i]%=6;
				}
			}
			if((i-20)>=0){
				if(this.girltype[i]==this.girltype[i-10] && this.girltype[i]==this.girltype[i-20]){
					this.girltype[i]+=1;
					this.girltype[i]%=6;
				}
			}
		}
	}
	Map.prototype.init = function(){
		this.allGirls = [];
		for(var i =0;i<100;i++){
			this.row = parseInt(i/10);
			this.column = i%10;
			this.allGirls.push(new Block(this.column*50,this.row*50,this.girltype[i]));
		}

	}
	Map.prototype.clear = function(){
		var self = this;
		self.k=0;
		self.canClear = false;
		for(var i =0;i<100;i++){
			var row = parseInt(i/10);
			var column = i%10;
			if((column-2)>=0){
				if((this.allGirls[i].typeNum==this.allGirls[i-1].typeNum) && (this.allGirls[i].typeNum==this.allGirls[i-2].typeNum)){
					game.ctx.clearRect((column-2)*50,row*50,150,50);
					for(var j=0;j<row;j++){
						this.girltype[i-10*j-2] = this.girltype[i-10*(j+1)-2];
						this.girltype[i-10*j-1] = this.girltype[i-10*(j+1)-1];
						this.girltype[i-10*j] = this.girltype[i-10*(j+1)];
					}
					this.girltype[i-10*row-2] = _.random(0,5);
					this.girltype[i-10*row-1] = _.random(0,5);
					this.girltype[i-10*row] = _.random(0,5);
					setTimeout(function(){
                        game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
						self.init();
					},1000);
					self.k++;
				}
			}
			if((row-2)>=0 ){

				if((this.allGirls[i].typeNum==this.allGirls[i-10].typeNum) && (this.allGirls[i].typeNum==this.allGirls[i-20].typeNum)){
					game.ctx.clearRect(column*50,(row-2)*50,50,150);
					for(var j=0;j<row-3;j++){
						this.girltype[i-10*j] = this.girltype[i-10*(j+3)];
					}
					this.girltype[i-10*row] = _.random(0,5);
					this.girltype[i-10*row+10] = _.random(0,5);
					this.girltype[i-10*row+20] = _.random(0,5);
					setTimeout(function(){
                        game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);	
						self.init();
					},1000);
					self.k++;
				}
			}
			if(self.k!=0){
				self.canClear = true;
			}
		}
	}
	Map.prototype.check = function(){
		var self = this;
		self.k=0;
		self.canClear = false;
		for(var i =0;i<100;i++){
			var row = parseInt(i/10);
			var column = i%10;
			if((column-2)>=0){
				if((this.allGirls[i].typeNum==this.allGirls[i-1].typeNum) && (this.allGirls[i].typeNum==this.allGirls[i-2].typeNum)){
					self.k++;
				}
			}
			if((row-2)>=0 ){

				if((this.allGirls[i].typeNum==this.allGirls[i-10].typeNum) && (this.allGirls[i].typeNum==this.allGirls[i-20].typeNum)){
					self.k++;
				}
			}
			if(self.k!=0){
				self.canClear = true;
			}
		}
	}
})();