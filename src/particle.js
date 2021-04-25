import p5 from "p5";

// A simple Particle class
// Könnte auch in einer separaten Datei definiert werden
export default class Particle {
  //Konstruktor, wird beim Aufruf von new Particle() EIN MAL ausgefuehrt
  constructor(sk, h, r, x, y) {
    this.sk = sk;
    this.h = h; //der Farbton dieses Particle
    this.s = 200; //Sättigung
    this.b = 50; //Helligkeit
    this.alpha = 0.9; //Transparenz

    this.radius = r;
    this.count = 0;
    this.gravity = 0.01;
    this.resistance = 0.99;
    this.initSpeed = p5.random(5, 9);

    this.moveX = p5.random(-this.initSpeed, this.initSpeed); //Bewegungsrichtung für diese Instanz festlegen
    this.moveY = p5.random(-this.initSpeed, this.initSpeed);
    this.x = x + this.moveX; //am Anfang ist das Particle fast unter der Maus
    this.y = y + this.moveY;
  }

  //wird aus dem draw() heraus aufgerufen, für jedes Particle
  move(x, y) {
    //an den Wänden abprallen (Vorzeichen der entsprechenden Bewegungskomponente ändern)
    if (this.x > this.sk.width || this.x < 0) {
      this.moveX = -this.moveX;
    }
    if (this.y > this.sk.height || this.y < 0) {
      this.moveY = -this.moveY;
    }

    //Reibung & Gravitation
    this.moveX = this.moveX * this.resistance;
    this.moveY = this.moveY * this.resistance + this.gravity;

    //Abstossung von der Maus
    if (
      p5.dist(x, y, this.x, this.y) < this.radius * 2 &&
      this.count > 6
    ) {
      this.moveX = (this.x - x) / 3;
      this.moveY = (this.y - y) / 3;
      this.count = 0;
    }
    this.x = this.x + this.moveX; //neue Position ausrechnen
    this.y = this.y + this.moveY;
    this.drawParticle(this.sk); //Particle zeichnen, s. unten
    this.count++;
  }

  drawParticle(sk) {
    this.alpha -= 0.01; //Particle werden mit jedem Frame etwas durchsichtiger
    sk.fill(this.h, this.s, this.b, this.alpha);
    sk.strokeWeight(3);
    sk.stroke(this.h, this.s, this.b - 20, this.alpha + 0.1);
    sk.noStroke();
    sk.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
