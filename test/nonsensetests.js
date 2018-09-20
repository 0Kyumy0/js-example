const { expect } = require('chai');

describe('Aritmetic operations', () => {
  describe('sum', () => {
    it('should return 10 if we sum 5 + 5', () => {
      expect(5 + 5).to.equal(10);
    });
  });
});

describe('My name', () => {
  const myName = 'Julio Sandoval';
  it('should has 14 characters lenght', () => {
    expect(myName.length).to.equal(14);
  });

  it('should be a string', () => {
    expect(myName).to.be.a('string');
  });
});
