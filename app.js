var restitution = 0.85;      
   
function draw(obj) {
  ctx.beginPath();
  ctx.fillStyle = obj.c;
    
  ctx.arc(obj.p.x, obj.p.y, obj.r, 0, 2 * Math.PI);
   ctx.fill();
  ctx.closePath();
  
}

var sx, 
	sy, 
	ex, 
	ey;

function update(obj, dt) {
	// corners collision
	if ((obj.p.y + obj.r) > c.height) {
		obj.v.y *= -1;
	}
	if ((obj.p.y - obj.r) < 0) {
		obj.v.y *= -1;
	}
	if ((obj.p.x + obj.r) > c.width) {
		obj.v.x *= -1;
	}
	if ((obj.p.x - obj.r) < 0) {
		obj.v.x *= -1;
	}

	obj.v.x *= 0.985;
	obj.v.y *= 0.985;

	obj.p.x += obj.v.x * dt * ppm;
	obj.p.y += obj.v.y * dt * ppm;

	if (obj.v.x < 0.3 && obj.v.x > -0.3) obj.v.x = 0;
	if (obj.v.y < 0.3 && obj.v.y > -0.3) obj.v.y = 0;
}

var d = document;
    c = d.createElement('canvas');
    ctx = c.getContext('2d');
		
	sx = 0;
	sy = 0;
	ex = 0;
	ey = 0;

	fps = 30;  
	ppm = 10; 
	 
	objs = [];

	wall = [];
    wall.push(new WallObject(150, 150, 200, 300));
    
c.addEventListener('mousemove', function(evt) {

	var mousePos = getMousePos(c, evt);
	var message = "Mouse position: " + mousePos.x + "," + mousePos.y;

	document.getElementById('id4').innerHTML = "mouseX="+mousePos.x;
	document.getElementById('id5').innerHTML = "mouseY="+mousePos.y;

}, false);

t = new Date().getTime();

// Initialize objects 
objs.push(new BallObject(6 / 100));
objs[0].p.x = 410;
objs[0].p.y = 150;
objs[0].v.x = 0;
objs[0].v.y = 0;
objs[0].m = 9999; // Static
objs[0].c = 'rgb(180,180,180)';
objs[0].r = 20;
objs[0].collision = false;

 
objs.push(new BallObject(6 / 100));
objs[1].p.x = 500;
objs[1].p.y = 500;
objs[1].v.x = 0;
objs[1].v.y = 0;
objs[1].m = 2;
objs[1].c = 'rgb(255,255,255)';
objs[1].r = 10;
objs[1].collision = false;

objs.push(new BallObject(6 / 100));
objs[2].p.x = 580;
objs[2].p.y = 150;
objs[2].v.x = 0;
objs[2].v.y = 0;
objs[2].m = 1.8;
objs[2].c = 'rgb(180,180,180)';
objs[2].r = 20;
objs[2].collision = false;

objs.push(new BallObject(6 / 100));
objs[3].p.x = 550;
objs[3].p.y = 180;
objs[3].v.x = 0;
objs[3].v.y = 0;
objs[3].m = 0.9;
objs[3].c = 'rgb(0,200,200)';
objs[3].r = 20;
objs[3].collision = false;

for (var x = 4; x < 20; x++) {

	objs.push(new BallObject(6 / 100));
	objs[x].p.x = 650+x*20;
	objs[x].p.y = 180;
	objs[x].v.x = 0;
	objs[x].v.y = 0;
	objs[x].m = 0.4;
	objs[x].c = 'rgb(200,0,0)';
	objs[x].r = 10;
	objs[x].collision = false;

}
for (var x = 20; x < 40; x++) {

	objs.push(new BallObject(6 / 100));
	objs[x].p.x = 300+x*20;
	objs[x].p.y = 380;
	objs[x].v.x = 0;
	objs[x].v.y = 0;
	objs[x].m = 0.4;
	objs[x].c = 'rgb(200,0,0)';
	objs[x].r = 10;
	objs[x].collision = false;

}

for (var x = 40; x < 50; x++) {

	objs.push(new BallObject(6 / 100));
	objs[x].p.x = 710;
	objs[x].p.y = -620+x*20;
	objs[x].v.x = 0;
	objs[x].v.y = 0;
	objs[x].m = 0.5;
	objs[x].c = 'rgb(200,0,200)';
	objs[x].r = 10;
	objs[x].collision = false;

}
for (var x = 50; x < 60; x++) {

	objs.push(new BallObject(6 / 100));
	objs[x].p.x = 1050;
	objs[x].p.y = -820+x*20;
	objs[x].v.x = 0;
	objs[x].v.y = 0;
	objs[x].m = 0.6;
	objs[x].c = 'rgb(200,0,200)';
	objs[x].r = 10;
	objs[x].collision = false;

}

c.style.display = 'block';
c.width = 1200;
c.height = 800;

d.body.appendChild(c);

var mouseClick = false;
var mmx=0;
var mmy=0;

var roznicaX = 0;
var roznicaY = 0;

   
setInterval(function() {
		   
	c.addEventListener('mousedown', function(evt){
		var mousePos = getMousePos(c, evt);
		if (mouseClick == false) {
			sx = mousePos.x;
			sy = mousePos.y;

			mouseClick = true;
		}
		document.getElementById('id6').innerHTML = "click="+mouseClick;
	}, false);
					
	c.addEventListener('mouseup', function(evt){
		mouseClick = false;

		objs[1].p.x = ex;
		objs[1].p.y = ey;

		objs[1].v.x = roznicaX;
		objs[1].v.y = roznicaY;
		
	}, false);

	document.getElementById('id6').innerHTML = "click="+mouseClick;

	if (mouseClick) {
		ex = MX-10;
		ey = MY-10;

		var roznicaX = sx - ex;
		var roznicaY = sy - ey;

		document.getElementById('id7').innerHTML = "sx="+sx;
		document.getElementById('id8').innerHTML = "sy="+sy;
		document.getElementById('id9').innerHTML = "rx="+roznicaX;
		document.getElementById('id10').innerHTML = "ry="+roznicaY;
		
	}

	ctx.clearRect(0, 0, c.width, c.height);

	ctx.beginPath();
	ctx.rect(0, 0, c.width, c.height);

	ctx.rect(0, 4, c.width, c.height);
	ctx.fillStyle = "#006600";
	ctx.fill();
	ctx.lineWidth = '0';
	ctx.stroke();


	ctx.beginPath();
	ctx.rect(0, 0, c.width, c.height);

	ctx.rect(0, 4, c.width, c.height);
	ctx.fillStyle = "#006600";
	ctx.fill();
	ctx.lineWidth = '0';
	ctx.stroke();


	ctx.beginPath();
	ctx.moveTo(0, 50);
	ctx.lineTo(1200, 50);
	ctx.fillStyle = 'rgb(220,220,220)';
	ctx.strokeStyle = 'rgb(222,222,222)';
	ctx.lineWidth = '10';
	ctx.stroke();


	ctx.closePath();


	ctx.beginPath();
	ctx.moveTo(sx, sy);
	ctx.lineTo(ex, ey);
	ctx.fillStyle = 'rgb(100,200,255)';
	ctx.strokeStyle = 'rgb(255,51,102)';
	ctx.lineWidth = '2';
	ctx.stroke();


	ctx.closePath();



	// Solid wall
	ctx.beginPath();
	ctx.rect(wall[0].x, wall[0].y, wall[0].w, wall[0].h);
	ctx.fillStyle = "#0ff";
	ctx.fill();

	ctx.closePath();



	var nt = new Date().getTime(),
	  dt = (nt - t) / 1000;

	for (var i = 0; i < objs.length; i++) {
		update(objs[i], dt);
		draw(objs[i]);  
		t = nt;
	}
	 

	for (var i = 0; i < objs.length; i++)  
	{  

		wall[0].collisionBall(objs[i]); 

		for (var j = i + 1; j < objs.length; j++)  
		{  
			if (objs[i].coliding(objs[j]))  
			{
				objs[i].resolveCollision(objs[j]);
			}
		}
	}


	document.getElementById('id1').innerHTML = "odleglosc="+MY;
	document.getElementById('id2').innerHTML = "vx="+objs[1].p.x;
	document.getElementById('id3').innerHTML = "vy="+objs[1].p.y;  
	  
}, 1000 / fps);