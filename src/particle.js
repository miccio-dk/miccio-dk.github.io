// A simple Particle class

export default class Particle {
  constructor({ x, y, radius, color, velocity, dampening }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.dampening = dampening
    // other configs
    this.nRings = 5
    this.ringDist = 15
    this.ringWeightBase = 3
  }

  move() {
    this.x += this.velocity[0]
    this.y += this.velocity[1]
    this.velocity[0] *= 1 - this.dampening
    this.velocity[1] *= 1 - this.dampening
  }

  mouseDist(sk) {
    var a = this.x * sk.width - sk.mouseX
    var b = this.y * sk.height - sk.mouseY
    return Math.sqrt(a * a + b * b)
  }

  isSelected(sk) {
    var dist = this.mouseDist(sk)
    return dist < this.radius + 2 * this.ringDist
  }

  render(sk, opacity) {
    var ringWeightDecay = 0.8
    var ringAlphaDecay = 0.6
    var weight = this.ringWeightBase
    // skip rendering if opacity is too low
    if (opacity <= 0.000001) {
      return
    }
    // emphasize particle if selected
    if (this.isSelected(sk)) {
      opacity *= 3
      weight *= 3
      ringWeightDecay = 0.64
      ringAlphaDecay = 0.45
    }
    var { x, y, radius, color } = this
    var cc = sk.color(...color)
    cc.setAlpha(sk.alpha(cc) * opacity)
    sk.fill(cc)
    sk.noStroke()
    sk.ellipse(x * sk.width, y * sk.height, radius * 2, radius * 2)
    sk.noFill()
    var alpha = sk.alpha(cc) * 1.5
    // draw rings
    for (let j = 0; j < this.nRings; j++) {
      radius += this.ringDist
      weight *= ringWeightDecay
      alpha *= ringAlphaDecay
      cc.setAlpha(alpha)
      sk.stroke(cc)
      sk.strokeWeight(weight)
      sk.ellipse(x * sk.width, y * sk.height, radius * 2, radius * 2)
    }
    // debugging: show distance to mouse
    // sk.fill(0, 0, 0, 0.5);
    // sk.noStroke();
    // sk.text(opacity.toFixed(2), x * sk.width, y * sk.height);
  }
}
