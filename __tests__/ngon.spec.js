import * as ngon from '../src/ngon';

describe('lengthToRadius', () => {
  test('a hexagon with side length 1 has radius 1', () => {
    expect(ngon.lengthToRadius(6, 1)).toBeCloseTo(1, 6);
  });
});

describe('radiusToLength', () => {
  test('a hexagon with radius 1 has side length 1', () => {
    expect(ngon.radiusToLength(6, 1)).toBeCloseTo(1, 6);
  });
});

describe('Ngon', () => {
  describe('translate', () => {
    test('move a triangle by (1.5, 1.5)', () => {
      const triangle = new ngon.RegularPolygon(3);
      const expected = [
        [1.5, (1 / Math.sqrt(3)) + 1.5],
        [1, (-1 / (2 * Math.sqrt(3))) + 1.5],
        [2, (-1 / (2 * Math.sqrt(3))) + 1.5],
      ];

      triangle.translate([1.5, 1.5]);
      expect(triangle.center).toEqual([1.5, 1.5]);

      triangle.coords.forEach((c, i) => {
        expect(c[0]).toBeCloseTo(expected[i][0]);
        expect(c[1]).toBeCloseTo(expected[i][1]);
      });
    });
  });

  describe('rotate', () => {
    test('rotate a triangle by 120 degrees', () => {
      const triangle = new ngon.RegularPolygon(3);
      const expected = [
        [-0.5, -1 / (2 * Math.sqrt(3))],
        [0.5, -1 / (2 * Math.sqrt(3))],
        [0, 1 / Math.sqrt(3)],
      ];

      triangle.rotate((2 * Math.PI) / 3);

      triangle.coords.forEach((c, i) => {
        expect(c[0]).toBeCloseTo(expected[i][0]);
        expect(c[1]).toBeCloseTo(expected[i][1]);
      });
    });
  });

  describe('contains', () => {
    test('(-0.4, 0.207) is inside of a square with length 1', () => {
      expect(new ngon.RegularPolygon(4).contains(-0.4, 0.207)).toBeTruthy();
    });

    test('(-0.6, 0.207) is outside of a square with length 1', () => {
      expect(new ngon.RegularPolygon(4).contains(-0.6, 0.207)).toBeFalsy();
    });
  });

  describe('RegularPolygon', () => {
    test('create a triangle with the correct coordinates', () => {
      const triangle = new ngon.RegularPolygon(3);
      const expected = [
        [0, 1 / Math.sqrt(3)],
        [-0.5, -1 / (2 * Math.sqrt(3))],
        [0.5, -1 / (2 * Math.sqrt(3))],
      ];

      expect(triangle.coords).toHaveLength(3);

      triangle.coords.forEach((c, i) => {
        expect(c[0]).toBeCloseTo(expected[i][0]);
        expect(c[1]).toBeCloseTo(expected[i][1]);
      });
    });

    test('create a square with the correct coordinates', () => {
      const square = new ngon.RegularPolygon(4);
      const expected = [
        [0, 1 / Math.sqrt(2)],
        [-1 / Math.sqrt(2), 0],
        [0, -1 / Math.sqrt(2)],
        [1 / Math.sqrt(2), 0],
      ];

      expect(square.coords).toHaveLength(4);

      square.coords.forEach((c, i) => {
        expect(c[0]).toBeCloseTo(expected[i][0]);
        expect(c[1]).toBeCloseTo(expected[i][1]);
      });
    });

    test('create a pentagon with the correct coordinates', () => {
      const pentagon = new ngon.RegularPolygon(5);
      const expected = [
        [0, 0.850651],
        [-0.809017, 0.262866],
        [-0.5, -0.688191],
        [0.500000, -0.688191],
        [0.809017, 0.262866],
      ];

      expect(pentagon.coords).toHaveLength(5);

      pentagon.coords.forEach((c, i) => {
        expect(c[0]).toBeCloseTo(expected[i][0]);
        expect(c[1]).toBeCloseTo(expected[i][1]);
      });
    });

    describe('clone', () => {
      test('a cloned triangle has the same properties', () => {
        const triangle = new ngon.RegularPolygon(3);
        expect(triangle).toEqual(triangle.clone());
      });

      test('a cloned triangle is not return by reference', () => {
        const triangle = new ngon.RegularPolygon(3);
        const clone = triangle.clone();

        clone.translate([1.5, 1.5]);
        expect(triangle).not.toEqual(clone);
      });
    });
  });

  describe('CustomPolygon', () => {
    test('create a rectangle with the supplied coordinates', () => {
      const coords = [
        [15, 15],
        [100, 15],
        [100, 50],
        [15, 50],
      ];
      const rectangle = new ngon.CustomPolygon(coords);

      expect(rectangle.coords).toHaveLength(4);

      rectangle.coords.forEach((c, i) => {
        expect(c[0]).toBeCloseTo(coords[i][0]);
        expect(c[1]).toBeCloseTo(coords[i][1]);
      });
    });

    describe('clone', () => {
      test('a cloned rectangle has the same properties', () => {
        const coords = [
          [15, 15],
          [100, 15],
          [100, 50],
          [15, 50],
        ];
        const rectangle = new ngon.CustomPolygon(coords);
        expect(rectangle).toEqual(rectangle.clone());
      });

      test('a cloned rectangle is not return by reference', () => {
        const coords = [
          [15, 15],
          [100, 15],
          [100, 50],
          [15, 50],
        ];
        const rectangle = new ngon.CustomPolygon(coords);
        const clone = rectangle.clone();

        clone.translate([1.5, 1.5]);
        expect(rectangle).not.toEqual(clone);
      });
    });
  });
});
