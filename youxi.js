
function game (){
	this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    this.imgs={
        A:"img/A.png",
        B:"img/B.png",
        C:"img/C.png",
        D:"img/D.png",
        E:"img/E.png",
        F:"img/F.png",
        G:"img/G.png",
        H:"img/H.png",
        I:"img/I.png",
        J:"img/J.png",
        K:"img/K.png",
        L:"img/L.png",
        M:"img/M.png",
        N:"img/N.png",
        O:"img/O.png",
        P:"img/P.png",
        Q:"img/Q.png",
        R:"img/R.png",
        S:"img/S.png",
        T:"img/T.png",
        U:"img/U.png",
        V:"img/V.png",
        W:"img/W.png",
        X:"img/X.png",
        Y:"img/Y.png",
        Z:"img/Z.png",
    };

    this.score=0;
    this.currScore=0;
    this.passScore=10;
    this.life=5;
    this.step=1;
    this.number=3;
    this.scorebox=document.getElementById('score')
    this.lifebox=document.getElementById('life')
    this.stepbox=document.getElementById('step')


	this.len=3;
	this.currentLetter=[];
	this.currentSpan=[];

	this.clientW=document.documentElement.clientWidth;
	this.clientH=document.documentElement.clientHeight;
	this.t;
	this.spend=2;
}	
game.prototype={
	play:function(){
		this._createSpan(this._getRand(this.len));
		this._move()
        this._key()
	},
    
    _move:function(){
    	var that=this;
        this.t=setInterval(function(){
        	for (var i = 0; i <that.currentSpan.length; i++) {
        	var tops=that.currentSpan[i].offsetTop+that.spend
        	that.currentSpan[i].style.top=tops+"px";
        	if (tops>that.clientH) {
        		document.body.removeChild(that.currentSpan[i])
        		that.currentSpan.splice(i,1);
        		that.currentLetter.splice(i,1)
        		that._createSpan(that._getRand(1)) 
        	};
        	};
        },60)
    },
   
    _key:function(){
    	var that=this;
    	document.onkeydown=function(e){
           var e=e||window.event;
           var letters=String.fromCharCode(e.keyCode);
           for (var i = 0; i < that.currentSpan.length; i++) {
           	if(that.currentSpan[i].index==letters){
           		document.body.removeChild(that.currentSpan[i])
        		that.currentSpan.splice(i,1);
        		that.currentLetter.splice(i,1)
        		that._createSpan(that._getRand(1)) 
                that.score++;
                that.currScore++;
                that.scorebox.innerHTML=that.score;
                if (that.currScore%that.passScore==0) {
                    alert("恭喜您！进入下一关")


                    this.t=clearInterval(t);

                        for (var i = 0; i < that.currentSpan.length; i++) {
                            document.body.removeChild(that.currentSpan)
                        };
                        that.currScore=0;
                        that.currentSpan=[]
                        that.arr=[]
                        that.passScore+=5;
                        that.step++;
                        that.stepbox.innerHTML=that.step;
                        that.number++;
                        that.speed+=2;
                        that.getRand(letterarr,that.number)
                        that.createLetter(that.arr)
                        move(that.currentSpan)
                        key(that.currentSpan)
                 };
           	}
           };
    	}

    },

    _getRand:function(num){
    	var newarr=[];
    	for (var i = 0; i < num; i++) {
    		var letter=this.arr[Math.floor(Math.random()*this.arr.length)]
    		while(this._check(letter,newarr)){
    			var letter=this.arr[Math.floor(Math.random()*this.arr.length)]
    			
    		}
    		this.currentLetter.push(letter)
    		newarr.push(letter)
    	};
       return newarr;
    },
    _check:function(val,arr){
         for (var i = 0; i < arr.length; i++) {
         	if(arr[i]==val){
         		return true
         	}
         };return false
    },
    _createSpan:function(arr){
    	var newarr=[];
    	for (var i = 0; i < arr.length; i++) {
    		var spans=document.createElement('span')
    		spans.innerHTML="<img src="+this.imgs[arr[i]]+" width='100' height='100'>";
    		var lefts=100+(Math.random()*(this.clientW-200))
    		spans.lefts=lefts;

    		var tops=Math.floor(Math.random()*20+10)
    		spans.index=arr[i];


    		while(this._checkPos(spans,newarr)){
                  lefts=100+(Math.random()*(this.clientW-200))
                spans.lefts=lefts;
    	    }

    		newarr.push(spans)
    		this.currentSpan.push(spans)

    		spans.style.cssText="position:absolute;left:"+lefts+"px;top:"+tops+"px;";
    		document.body.appendChild(spans);
    	}
        return newarr;
    },

    _checkPos:function(ele,eleArr){
    	for (var i = 0; i < eleArr.length; i++) {
    		if (ele.lefts>eleArr[i].lefts-100&&ele.lefts<eleArr[i].lefts+100){
           return true
    		}
    	};
        return false
    }
  }
	