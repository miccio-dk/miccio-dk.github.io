// A simple Particle class

export default class Particle {
  constructor({ x, y, radius, color, velocity, dampening }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.dampening = dampening;
    // other configs
    this.ringDist = 15;
  }

  move() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
    this.velocity[0] *= 1 - this.dampening;
    this.velocity[1] *= 1 - this.dampening;
  }

  isSelected(sk) {
    var a = this.x * sk.width - sk.mouseX;
    var b = this.y * sk.height - sk.mouseY;
    var dist = Math.sqrt(a * a + b * b);
    return dist < this.radius + this.ringDist;
  }

  render(sk, opacity) {
    var { x, y, radius, color } = this;
    var cc = sk.color(...color);
    cc.setAlpha(sk.alpha(cc) * opacity);
    sk.fill(cc);
    sk.noStroke();
    sk.ellipse(x * sk.width, y * sk.height, radius * 2, radius * 2);
    sk.noFill();
    var weight = 2;
    var alpha = sk.alpha(cc) * 1.5;
    for (let j = 0; j < 5; j++) {
      radius += this.ringDist;
      weight *= 0.8;
      alpha *= 0.6;
      cc.setAlpha(alpha);
      sk.stroke(cc);
      sk.strokeWeight(weight);
      sk.ellipse(x * sk.width, y * sk.height, radius * 2, radius * 2);
    }
  }
}
