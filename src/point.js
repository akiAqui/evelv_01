class Point {
    constructor(index) {
        this.index = index;

	// modified
	this.wx=Math.random()*WIDTH;
	this.wy=Math.random()*HEIGHT;
        //this.lx=
	//this.ly=
        this.theta = Math.atan2(this.y,this.x);
        this.radius = Math.random()*(RMAX-RMIN)+RMIN;
        this.hue = Math.random()*(HMIN-HMAX)+HMIN;
        this.lightness = Math.random()*(LMAX-LMIN)+LMIN;
	// end of modification		
        this.prevRadius = this.radius;
        if (this.radius < 1) {
            console.error(`Error at point constructor :`);
	    console.error(`r(${this.index},${t}) = ${this.r} < 1`);
            noLoop();
	}
	if (this.index==3) {
	    console.log(`constructor:`);
	    console.log(`index=${this.index}`);
	    console.log(`r=${this.r}`);
	    console.log(`theta=${this.theta}`);
	    console.log(`radius=${this.radius}`);
	    console.log(`hue=${this.hue}`);
	    console.log(`lightness=${this.lightness}`);
	    console.log(`prevRadius=${this.prevRadius}`);	
	}
    }
    update(t) {
        this.updatePosition(t);
        this.updateHue(t);
        this.updateLightness(t);
        this.updateRadius(t);
    }

    updatePosition(t) {
        if (this.shouldDebug(t)) {
            console.log(`Position perturbation:`);
	    console.log(` r=${this.r}`);
	    console.log(` theta=${this.theta}`);	    
        }

	let old_r = this.r;

        const dr = this.r * PRM;
        const dpr = randomGaussian(0, dr / 3);
        this.r += dpr;

        if (this.shouldDebug(t)) {
	    console.log(` dpr(${this.index},${t}) = ${dpr}`);
	    console.log(` new r=${this.r}`);
        }

        const dptheta = random(-DTHETA, DTHETA);
        this.theta += dptheta;
        this.theta = (this.theta + TWO_PI) % TWO_PI;

        if (this.shouldDebug(t)) {
	    console.log(` dpθ(${this.index},${t}) = ${dptheta}`);
	    console.log(` new theta=${this.theta}`);	    
        }

	
        if (this.r < 1) {
            console.error(`Error at time=${t} :`);
	    console.error(`r(${this.index},${t}) = ${this.r} < 1`);
	    console.error(`old_r=${old_r}`);
	    console.error(`dr=${dr}`);
	    console.error(`dpr=${dpr}`);	    
            noLoop();
        }

    }

    updateHue(t) {
        const candidateHue = random(0, 360);
        this.hue = metropolisHue(this.hue, candidateHue, this.theta, t, this.index);
    }

    updateLightness(t) {
        const candidateLightness = random(LMIN, LMAX);
        this.lightness = metropolisLightness(this.lightness, candidateLightness, this.r, t, this.index);
    }

    updateRadius(t) {
        const rate = sin(A_RADIUS * t) * (B_RADIUS + B1_RADIUS * sin(B2_RADIUS * t)) * sin(TWO_PI / (C_RADIUS + C1_RADIUS * sin(C2_RADIUS * t)) * t);
        this.prevRadius = this.radius;
        this.radius *= rate;

        if (this.shouldDebug(t)) {
            console.log(`Radius update: rate(${t}) = ${rate}, radius(${this.index},${t-DT}) = ${this.prevRadius}, radius(${this.index},${t}) = ${this.radius}`);
        }
    }

    draw() {
        const x = this.r * cos(this.theta);
        const y = this.r * sin(this.theta);
        
        stroke(this.hue, 100, this.lightness);
        fill(this.hue, 100, this.lightness);
        ellipse(x, y, this.radius * 2);

        if (this.shouldDebug(t)) {
            console.log(`Drawing point: x = ${x}, y = ${y}, radius = ${this.radius}, color = HSL(${this.hue}, 100, ${this.lightness})`);
        }
    }

    shouldDebug(t) {
        return DEBUG_MODE && this.index === DEBUG_POINT_INDEX && t >= DEBUG_START_TIME && t <= DEBUG_END_TIME;
    }

    getDebugInfo() {
        return `r(${this.index},${t}) = ${this.r}, θ(${this.index},${t}) = ${this.theta}, radius(${this.index},${t}) = ${this.radius}, H(${this.index},${t}) = ${this.hue}, L(${this.index},${t}) = ${this.lightness}\n\n`;
    }

    printDebugInfo(t) {
        if (this.shouldDebug(t)) {
            console.log(`Debug point (k=${this.index}) attributes: ${this.getDebugInfo()}`);
        }
    }
}
