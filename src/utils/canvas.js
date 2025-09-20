/**
 * Draws a gradient in a p5.js sketch.
 * @param {object} sk - The p5.js sketch instance.
 * @param {number} x - The x-coordinate of the gradient.
 * @param {number} y - The y-coordinate of the gradient.
 * @param {number} w - The width of the gradient.
 * @param {number} h - The height of the gradient.
 * @param {object} c1 - The starting color.
 * @param {object} c2 - The ending color.
 * @param {string} axis - The axis of the gradient ('x' or 'y').
 */
export function drawGradient(sk, x, y, w, h, c1, c2, axis) {
  sk.noFill()
  sk.strokeWeight(1)

  if (axis === 'y') {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      const inter = sk.map(i, y, y + h, 0, 1)
      const c = sk.lerpColor(c1, c2, inter)
      sk.stroke(c)
      sk.line(x, i, x + w, i)
    }
  } else if (axis === 'x') {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      const inter = sk.map(i, x, x + w, 0, 1)
      const c = sk.lerpColor(c1, c2, inter)
      sk.stroke(c)
      sk.line(i, y, i, y + h)
    }
  }
}

/**
 * A sigmoid function.
 * @param {number} x - The input value.
 * @param {number} k - The steepness of the curve.
 * @returns {number} The sigmoid of x.
 */
export function sigmoid(x, k) {
  return 1.0 / (1 + Math.exp((0.5 - x) * k))
}

/**
 * Draws a picture in a p5.js sketch, fitting it to the canvas.
 * @param {object} sk - The p5.js sketch instance.
 * @param {object} photo - The p5.js image object.
 * @param {number} canvasWidth - The width of the canvas.
 * @param {number} canvasHeight - The height of the canvas.
 */
export function drawPicture(sk, photo, canvasWidth, canvasHeight) {
  const photoAspect = photo.width / photo.height
  const canvasAspect = canvasWidth / canvasHeight
  let drawWidth, drawHeight, x, y

  if (photoAspect > canvasAspect) {
    // photo is taller than canvas
    drawHeight = canvasHeight
    drawWidth = drawHeight * photoAspect
    x = (canvasWidth - drawWidth) / 2
    y = 0
  } else {
    // photo is wider than canvas
    drawWidth = canvasWidth
    drawHeight = drawWidth / photoAspect
    x = 0
    y = (canvasHeight - drawHeight) / 2
  }
  sk.image(photo, x, y, drawWidth, drawHeight)
}

/**
 * Draws an arrow in a p5.js sketch.
 * @param {object} sk - The p5.js sketch instance.
 * @param {p5.Vector} vec1 - The starting vector.
 * @param {p5.Vector} vec2 - The ending vector.
 * @param {number} arrowSize - The size of the arrowhead.
 * @param {any} color - The color of the arrow.
 */
export function drawArrow(sk, vec1, vec2, arrowSize, color) {
  // subtract vec1 from vec2
  vec2.sub(vec1)
  // save the current translation
  sk.push()
  sk.stroke(color)
  sk.strokeWeight(2)
  sk.translate(vec1.x, vec1.y)
  sk.line(0, 0, vec2.x, vec2.y)
  sk.fill(255)
  // Draw arrowhead at the end
  sk.push()
  sk.rotate(vec2.heading())
  sk.translate(vec2.mag() - arrowSize * 2, 0)
  sk.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize * 2, 0)
  sk.pop()
  // Draw arrowhead at the beginning
  sk.push()
  sk.rotate(vec2.heading() + sk.PI)
  sk.translate(-arrowSize * 2, 0)
  sk.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize * 2, 0)
  sk.pop()
  // undo translate
  sk.pop()
}
