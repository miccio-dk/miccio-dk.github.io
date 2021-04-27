// A simple Particle class
// Könnte auch in einer separaten Datei definiert werden
export default class Particle {
  //Konstruktor, wird beim Aufruf von new Particle() EIN MAL ausgefuehrt
  constructor(sk, h, s, b, r, x, y) {
    this.sk = sk;
    this.h = h; //der Farbton dieses Particle
    this.s = s; //Sättigung
    this.b = b; //Helligkeit
    this.alpha = 0.99; //Transparenz

    this.radius = r;
    this.count = 0;
    this.gravity = 0.2;
    this.resistance = 0.975;
    this.initSpeed = this.sk.random(0.5, 4);

    this.moveX = this.sk.random(-this.initSpeed*2, this.initSpeed*2); //Bewegungsrichtung für diese Instanz festlegen
    this.moveY = 0;
    this.x = x + this.moveX; //am Anfang ist das Particle fast unter der Maus
    this.y = y + this.moveY;
  }

  //wird aus dem draw() heraus aufgerufen, für jedes Particle
  move(x, y) {
    //an den Wänden abprallen (Vorzeichen der entsprechenden Bewegungskomponente ändern)
    if (this.x > this.sk.width - this.radius || this.x < this.radius) {
      this.moveX = -this.moveX;
      this.x = this.sk.constrain(this.x, this.radius, this.sk.width - this.radius);
    }
    // if (this.y > this.sk.height - this.radius || this.y < 0) {
    if (this.y < 0) {
        this.moveY = -this.moveY;
      this.y = this.sk.constrain(this.y, this.radius, this.sk.height - this.radius);
    }

    //Reibung & Gravitation
    this.moveX = this.moveX * this.resistance;
    this.moveY = this.moveY * this.resistance + this.gravity;

    //Abstossung von der Maus
    if (
      this.sk.dist(x, y, this.x, this.y) < this.radius &&
      this.count > 5
    ) {
      this.moveX = (this.x - x) / 10;
      this.moveY = (this.y - y) / 10;
      this.count = 0;
    }
    
    this.x = this.x + this.moveX; //neue Position ausrechnen
    this.y = this.y + this.moveY;

    this.drawParticle(this.sk); //Particle zeichnen, s. unten
    this.count++;
  }

  drawParticle(sk) {
    const n = 4;
    this.alpha -= 0.005; //Particle werden mit jedem Frame etwas durchsichtiger
    // sk.stroke(this.h, this.s, this.b, this.alpha / 2)
    // sk.fill(0, 0);
    // sk.ellipse(this.x, this.y, this.radius * 2.5, this.radius * 2.5);
    sk.noStroke();
    for (let i = 0; i < n; i++) {
      let r = this.radius * sk.pow(0.6, i);
      let a = this.alpha * (i + 1) / n;
      sk.fill(this.h, this.s, this.b, a);
      sk.ellipse(this.x, this.y, r * 2, r * 2);
    }
  }
}
