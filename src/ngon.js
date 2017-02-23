export function lengthToRadius(sides, length) {
  return length / (2 * Math.sin(Math.PI / sides));
}

export function radiusToLength(sides, radius) {
  return radius * 2 * Math.sin(Math.PI / sides);
}

export class Ngon {
  constructor() {
    this.center = [0, 0];
    this.coords = [];
  }

  translate(vector) {
    this.center[0] += vector[0];
    this.center[1] += vector[1];

    for (let i = 0; i < this.coords.length; i += 1) {
      this.coords[i][0] += vector[0];
      this.coords[i][1] += vector[1];
    }
  }

  rotate(angle, center = this.center) {
    for (let i = 0; i < this.coords.length; i += 1) {
      const x = this.coords[i][0] - center[0];
      const y = this.coords[i][1] - center[1];

      this.coords[i][0] = ((x * Math.cos(angle)) - (y * Math.sin(angle))) + center[0];
      this.coords[i][1] = ((x * Math.sin(angle)) + (y * Math.cos(angle))) + center[1];
    }
  }

  contains(x, y) {
    let j = this.coords.length - 1;
    let result = false;

    for (let i = 0; i < this.coords.length; j = i, i += 1) {
      if ((this.coords[i][1] > y) !== (this.coords[j][1] > y) &&
        (x < (((this.coords[j][0] - this.coords[i][0]) * (y - this.coords[i][1])) /
          (this.coords[j][1] - this.coords[i][1])) + this.coords[i][0])) {
        result = !result;
      }
    }

    return result;
  }
}

export class CustomPolygon extends Ngon {
  constructor(coords) {
    super();
    this.coords = coords;
  }

  clone() {
    const clone = new CustomPolygon(this.coords.map(c => c.slice()));
    clone.center = this.center.slice();
    return clone;
  }
}

export class RegularPolygon extends Ngon {
  constructor(sides, length = 1) {
    super();
    this.sides = sides;
    this.length = length;
    this.radius = lengthToRadius(sides, length);

    for (let i = 0; i < sides; i += 1) {
      this.coords.push([
        Math.sin(-(i / sides) * 2 * Math.PI) * this.radius,
        Math.cos((i / sides) * 2 * Math.PI) * this.radius,
      ]);
    }
  }

  clone() {
    const clone = new RegularPolygon(this.sides, this.length);
    clone.center = this.center.slice();
    clone.coords = this.coords.map(c => c.slice());
    return clone;
  }
}
