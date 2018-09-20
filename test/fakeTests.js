const { expect } = require('chai');

describe('Fake suite of tests', () => {
  it('should expect 5 to equal 5', () => {
    expect(5).to.equal(5);
  });

  it('should expect an array to be an array', () => {
    expect(['hello', 'world']).to.be.an('array');
  });
});
