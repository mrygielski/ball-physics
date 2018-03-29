function BallObject(x, y, elasticity) {
	this.v = new Vector(0, 0);
	this.p = new Vector(x, y);
	this.m = 10;
	this.r = 20;


	this.c = 'rgb(33,0,0)';  
	this.cr = elasticity;  
}


BallObject.prototype = {

	coliding: function(ball) {
		var xd = parseFloat(this.p.x - ball.p.x);
		var yd = parseFloat(this.p.y - ball.p.y);

		var sumRadius = parseFloat(this.r + ball.r);
		var sqrRadius = parseFloat(sumRadius * sumRadius);

		var distSqr = parseFloat((xd * xd) + (yd * yd));

		if (distSqr <= sqrRadius) return true;

		return false;
	}, 


	psyhics: function(ball) {
				  
		var m1, 
			m2,
			x1, 
			y1, 
			x2, 
			y2, 
			vx1, 
			vy1, 
			vx2, 
			vy2;

			m1 = ball.m; 
			m2 = this.m;
			x1 = this.p.x;
			y1 = this.p.y;
			x2 = ball.p.x;
			y2 = ball.p.y;
			vx1 = this.v.x;
			vy1 = this.v.y;
			vx2 = ball.v.x;
			vy2 = ball.v.y;
			
			var m21,
				dvx2,
				a,
				x21,
				y21,
				vx21,
				vy21,
				fy21,
				sign;

				m21 = m2 / m1;
				x21 = x2 - x1;
				y21 = y2 - y1;
				vx21 = vx2 - vx1;
				vy21 = vy2 - vy1;

				var fy21 = 1.0E-12 * Math.abs(y21);

				if ( Math.abs(x21)<fy21 ) {
					if (x21 < 0) sign = -1; else sign = 1;
					x21 = fy21 * sign; 
				} 

				var a = y21 / x21;

				dvx2 = -2.0 * (vx21 + a * vy21) / ((1 + a * a) * (1 + m21)) ;
				vx2 = vx2 + dvx2;
				vy2 = vy2 + a * dvx2;
				vx1 = vx1 - m21 * dvx2;
				vy1 = vy1 - a * m21 * dvx2;

				ball.v.x = vx2;
				ball.v.y = vy2;
				this.v.x = vx1;
				this.v.y = vy1;

 
       
    },
	
    resolveCollision: function(ball) { 
		var delta = new Vector();
		delta = this.p.subtract(ball.p);
		var d = delta.getLength();
	   
		var mtd = new Vector();
		mtd = delta.multiply(((this.r + ball.r) - d) / d); 
	   
		var im1 = 1 / this.m; 
		var im2 = 1 / ball.m;
		
		this.p = this.p.add(mtd.multiply(im1 / (im1 + im2)));
		ball.p = ball.p.subtract(mtd.multiply(im2 / (im1 + im2)));
		
		var v = new Vector();
		v = this.v.subtract(ball.v);
		var vn = v.dot(mtd.normalize());
		
		if (vn > 0.0) return;
		
		var i = (-(1.0 + restitution) * vn) / (im1 + im2);
		
		var impulse = new Vector();
		impulse = mtd.multiply(i);
		
		this.v = this.v.add(impulse.multiply(im1));
		ball.v = ball.v.subtract(impulse.multiply(im2));
	}
}