class Ball {
	constructor(x,y,waypoint) {
		this.x = x;
		this.y = y;
		this.waypoint = waypoint;
		this.t = 0;
		this.v = 0;
		this.color = "black"
	}
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x,this.y,20,0,360*Math.PI/180,false);
		ctx.fill();
	}
	move(last,before) {
		if (this.t >= 1) {
			this.t = 0;
			this.v++;
		}
		let v = this.v;
		const p0 = {x:this.waypoint[v].x0, y:this.waypoint[v].y0},
			p1 = {x:this.waypoint[v].x1, y:this.waypoint[v].y1},
			p2 = {x:this.waypoint[v].x2, y:this.waypoint[v].y2},
			p3 = {x:this.waypoint[v].x3, y:this.waypoint[v].y3}
		const point = this.calcBezierPoint(this.t,p0,p1,p2,p3);
		if (last) {
			this.x = this.lerp(this.x,point.x,0.02);
			this.y = this.lerp(this.y,point.y,0.02);
			let chord = this.linearLength(p3,p0);
			let cont_net = this.linearLength(p1,p0) + this.linearLength(p2,p1) + this.linearLength(p3,p2);
			let distance = (cont_net + chord) / 2;
			let ratio = 1 / distance;
			this.t = this.t + 0.4*ratio;
		}
		else {
			if (pz(this.x,this.y,before.x,before.y)) {
				this.x = this.lerp(this.x,point.x,0.2);
				this.y = this.lerp(this.y,point.y,0.2);
				let chord = this.linearLength(p3,p0);
				let cont_net = this.linearLength(p1,p0) + this.linearLength(p2,p1) + this.linearLength(p3,p2);
				let distance = (cont_net + chord) / 2;
				let ratio = 1 / distance;
				this.t = this.t + 1.2*ratio;
			} else {
				this.x = this.lerp(this.x,point.x,0.1);
				this.y = this.lerp(this.y,point.y,0.1);
				let chord = this.linearLength(p3,p0);
				let cont_net = this.linearLength(p1,p0) + this.linearLength(p2,p1) + this.linearLength(p3,p2);
				let distance = (cont_net + chord) / 2;
				let ratio = 1 / distance;
				this.t = this.t + 0.01*ratio;
			}
		}
	}
	linearLength(p3,p0) {
		let distance = Math.sqrt((p3.x - p0.x)**2 + (p3.y - p0.y)**2)
		return distance;
	}
	//Hit detection/collision
	pz(x1,y1,x2,y2) {
		const a = x1 - x2;
		const b = y1 - y2;
		const c = Math.sqrt(a*a+b*b);
		if(c<40){
			return true;
		}
		else{
			return false;
		}
	}
	calcBezierPoint(t, p0, p1, p2, p3) {
		var data = [p0, p1, p2, p3];
		var at = 1 - t;
		for (var i = 1; i < data.length; i++) {
			for (var k = 0; k < data.length - i; k++) {
				data[k] = {
					x: data[k].x * at + data[k + 1].x * t,
					y: data[k].y * at + data[k + 1].y * t
				};
			}
		}
		return data[0];
	}
	lerp(a, b, f) {
		return (a * (1.0 - f)) + (b * f);
	}
}
