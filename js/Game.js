(function(){
    //构造函数
    var Game = window.Game = function(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.images = {};
        this.clicktimes =0;
        this.old = 0;
        this.oldx =0;
        this.oldy =0;
        this.timer;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var obj = eval("(" + xhr.responseText + ")");
                var imagesNumber = obj.resource.length;
                var picNumber = 0;
                _.each(obj.resource,function(item){
                    self.images[item.name] = new Image();
                    self.images[item.name].src = item.src;
                    self.images[item.name].onload = function(){
                        picNumber++;
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        self.ctx.fillText("正在加载图片" + picNumber + "/" + imagesNumber,10,20);
                        if(picNumber == imagesNumber){
                            self.init();    
                        }
                    }
                });
            }
        }
        xhr.open("get","girls.json",true);
        xhr.send(null);


    }
    Game.prototype.init = function(){
    	//开场动画
        var self = this;
        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
    	var map = new Map();
        self.timer = setInterval(function(){
            map.clear();
        },2000);
        this.canvas.onclick = function(event){
            var x = parseInt(event.clientX / 50);
            var y = parseInt(event.clientY / 50);
            self.ctx.globalCompositeOperation = "destination-over";
            if(self.clicktimes ==0){
                var x = parseInt(event.clientX / 50);
                var y = parseInt(event.clientY / 50);
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                map.init(); 
                self.oldx = x;
                self.oldy = y;
                self.ctx.fillStyle = "red";
                self.ctx.fillRect(50*x,50*y,50,50);
                self.clicktimes++;
                self.clicktimes %=2;
                self.old = 10*y+x;
            }else{
                var x = parseInt(event.clientX / 50);
                var y = parseInt(event.clientY / 50);
                if( (Math.abs(x-self.oldx)==0  && Math.abs(y-self.oldy)==1 ) || 
                    (Math.abs(x-self.oldx)==1  && Math.abs(y-self.oldy)==0 ) ){
                    self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                    map.init(); 
                    self.ctx.fillStyle = "green";
                    self.ctx.fillRect(50*x,50*y,50,50);
                    self.clicktimes++;
                    self.clicktimes %=2;
                    var t =map.girltype[10*y+x]; //储存新值
                    map.girltype[10*y+x] = map.girltype[self.old];//新变旧
                    map.girltype[self.old] = t;//旧变新
                    setTimeout(function(){
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        map.init();
                        map.check();
                        console.log(map.canClear);
                        if(map.canClear ==false){
                            self.ctx.globalCompositeOperation = "sourcer-over";
                            map.girltype[self.old] =map.girltype[10*y+x] ;//新变旧
                            map.girltype[10*y+x]=t;
                            setTimeout(function(){
                                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                                map.init();
                            },400)
                        }
                    },100);  
                }else{
                    self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                    map.init(); 
                    self.ctx.fillStyle = "red";
                    self.ctx.fillRect(50*x,50*y,50,50);
                    self.clicktimes+=1;
                    self.clicktimes %=2;
                    self.old = 10*y+x;
                }
            }
        }
        self.ctx.globalCompositeOperation = "sourcer-over";
    }
})();