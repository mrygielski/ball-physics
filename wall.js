function WallObject(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}
            
WallObject.prototype = {

	collisionBall: function(ball) {
		
		if (((ball.p.y + ball.v.y - (ball.r / 2) <= this.y + this.h) &&
            (ball.p.y - (ball.r / 2) >= this.y + this.h)) ||
			((ball.p.y + ball.v.y + (ball.r / 2) >= this.y) &&
			(ball.p.y + (ball.r / 2) <= this.y ))) {
                    
			if (ball.p.x + ball.v.x + (ball.r / 2) >= this.x &&
				ball.p.x + ball.v.x - (ball.r / 2)<= this.x + this.w){                                    
				ball.p.y = ball.p.y + ball.v.y;
				if (ball.v.y < 0) ball.p.y += ball.r / 2; else ball.p.y -= ball.r / 2;
				ball.v.y = -ball.v.y;
			}                      
		
		}        
 
		if (((ball.p.x + ball.v.x - (ball.r/2) <= this.x + this.w) &&
			(ball.p.x - (ball.r/2) >= this.x + this.w)) ||                    
			((ball.p.x + ball.v.x + (ball.r/2) >= this.x) &&
			 (ball.p.x + (ball.r/2) <= this.x ))) {
				
			if (ball.p.y + ball.v.y + (ball.r / 2) >= this.y &&
				ball.p.y + ball.v.y - (ball.r / 2)<= this.y + this.h) {      
				
				ball.p.x = ball.p.x + ball.v.x;

				if (ball.v.x < 0) ball.p.x += ball.r / 2; else ball.p.x -= ball.r / 2;
				ball.v.x = -ball.v.x;
				
			}  
			
		} 
                 
	}

}