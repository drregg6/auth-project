const add = require('../math');

describe('MATH', () => {
  describe('#add', () => {
    let sum = add(2,2);
    let fail = add(2,'2');
    it('should should return a number', () => {
      expect(sum).toEqual(expect.any(Number));
    });
    it('should add two numbers together', () => {
      expect(sum).toBe(4);
    });
    it('should not add strings', () => {
      expect(fail).toBe(null);
    });
  });
});