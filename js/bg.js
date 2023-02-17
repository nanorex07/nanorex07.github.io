let canv =  document.getElementById("canvas");
let ctx = canv.getContext('2d');
let particles, gravity;
let background_gradient;
let runningAnim;
let timer; let randomSpawn;


class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getMag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    mult(v) {
        this.x *= v.x;
        this.y *= v.y;
    }
}

class Particle {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(-7 + Math.random() * 14, 0);
        this.acc = new Vector(0, 0);
        this.col = "#00a6fb";
        this.r = 10 + Math.floor(Math.random() * 5);
        this.resistance = 0.6;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.col;
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.shadowColor = '#E3EAEF';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fill();
        ctx.closePath();
    }

    applyForce(f) {
        this.acc.add(f);
    }

    burst() {
        let n = 2 * Math.floor(this.r / 2);
        for (let i = 0; i < n; i++) {
            particles.push(new MiniParticle(this.pos.x, this.pos.y, Math.min(Math.floor(this.r / 2), 3)))
        }
    }

    update() {
        this.pos.add(this.vel);
        this.applyForce(gravity);
        this.vel.add(this.acc);

        if (this.pos.x - this.r + this.vel.x < 0 || this.pos.x + this.r + this.vel.x > canv.width) {
            this.vel.x *= -1;
        }
        if (this.pos.y + this.r + this.vel.y >= canv.height) {
            this.vel.y = -1 * this.vel.y * this.resistance;
            this.burst();
            this.r -= 2;
        }
        if (this.acc.getMag() > 0) this.acc.mult(new Vector(0, 0));
    }

}

class MiniParticle extends Particle {
    constructor(x, y, r) {
        super(x, y);
        this.vel = new Vector(-6 + Math.random() * 12, -10 + Math.random() * (-20));
        this.acc = new Vector(0, 0);
        this.col = "rgba(150,155,155,0.6)";
        this.r = r;
        this.resistance = 0.4
    }

    update() {
        this.pos.add(this.vel);
        this.applyForce(gravity);
        this.vel.add(this.acc);

        if (this.pos.x - this.r + this.vel.x < 0 || this.pos.x + this.r + this.vel.x > canv.width) {
            this.vel.x *= -1;
        }
        if (this.pos.y + this.r + this.vel.y >= canv.height) {
            this.vel.y = -1 * this.vel.y * this.resistance;
            this.r -= 1;
        }
        if (this.acc.getMag() > 0) this.acc.mult(new Vector(0, 0));
    }
}

let repaint = () => {
    ctx.fillStyle = background_gradient;
    ctx.fillRect(0, 0, canv.width, canv.height);
    bgcut();
}

let anim = () => {
    repaint();
    particles.forEach((particle, index) => {
        particle.draw();
        particle.update();
        if (particle.r < 0) {
            particles.splice(index, 1);
        }
    })

    timer++;
    if (timer % randomSpawn == 0) {
        particles.push(new Particle(canv.width / 2, -400 * Math.random()));
        randomSpawn = Math.floor((Math.random() * 10) + 75)
        timer = 0;
    }

    runningAnim = window.requestAnimationFrame(anim);

}

let bgcut = () => {
    ctx.beginPath();
    ctx.moveTo(0, canv.height);
    ctx.lineTo(canv.width / 2, canv.height / 2);
    ctx.lineTo(canv.width, canv.height);
    ctx.fillStyle = "#003554";
    ctx.shadowBlur = 0;
    ctx.fill();
    ctx.closePath();
}

let init = () => {
    particles = new Array();
    particles.push(new Particle(canv.width / 2, -400 * Math.random()));
    background_gradient = ctx.createLinearGradient(0, 0, 0, canv.height);
    background_gradient.addColorStop(1, "#003554");
    background_gradient.addColorStop(0, "#051923");
    timer = 0;
    randomSpawn = Math.floor((Math.random() * 25) + 60)

}
let start = () => {
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    gravity = new Vector(0, 0.8);
    init();
    if (canv.width > 400) {
        anim();
    }
    else {
        repaint();
    }
}
let resizeWin = () => {
    canv.width = window.innerWidth;
    canv.height = document.querySelector(".active").scrollHeight
    if (canv.width <= 400) {
        repaint();
        window.cancelAnimationFrame(runningAnim);
        runningAnim = -1;
    }
    else if (runningAnim == -1) {
        init();
        anim();
    }
}
// document.onload = start;
// document.onresize = resizeWin;
// document.onscroll = resizeWin;
window.addEventListener("load", start);
window.addEventListener("resize", resizeWin);
window.addEventListener("scroll", resizeWin);

