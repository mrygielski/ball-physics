function Vector(x, y) { 
	this.x = x;
	this.y = y;
}
            
Vector.prototype = {

	setX: function(x) {
		this.x = x;
	},

	getX: function() {
		return this.x;
	},

	setY: function(y) {
		this.y = y;
	},

	getY: function() {
		return this.y;
	},

	set: function(x, y) {
		this.setX(x);
		this.setY(y);
	},


	dot: function(v2) {
		var result = 0.0;
       
		result = this.getX() * v2.getX() + this.getY() * v2.getY();
		return result;
	},
    
	getLength: function() {
		return Math.sqrt(this.getX()*this.getX() + this.getY()*this.getY());
	},
    
	getDistance: function(v2) {
		return Math.sqrt((v2.getX() - this.getX()) * (v2.getX() - this.getX()) + (v2.getY() - this.getY()) * (v2.getY() - this.getY()));
	},
	
	add: function(v2) {
        var result = new Vector();
		result.setX(this.getX() + v2.getX());
		result.setY(this.getY() + v2.getY());
		return result;
	},

	subtract: function(v2) {
		var result = new Vector();
		result.setX(this.getX() - v2.getX());
		result.setY(this.getY() - v2.getY());
		return result;
	},  

	multiply: function(scaleFactor) {
		var result = new Vector();
		result.setX(this.getX() * scaleFactor);
		result.setY(this.getY() * scaleFactor);
		return result;
	},

	normalize: function() {
		var len = this.getLength();
		if (len != 0.0) {
			this.setX(this.getX() / len);
			this.setY(this.getY() / len);
		}
		else {
			this.setX(0.0);
			this.setY(0.0);
		}

		return this;
	},
    setdir: function(dx, dy) {
      var dir = this.normalize();
      this.x = dir.x;
      this.y = dir.y;
    }
}       