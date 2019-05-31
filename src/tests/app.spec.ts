import { hasDecimal } from '../app';

describe('hasDecimal', () => {
  it('should correctly identify a string containing a decimal', () => {
    expect(hasDecimal('0.')).toEqual(true);
    expect(hasDecimal('.0...')).toEqual(true);
  });

  it('should return false when no decimal is present', () => {
    expect(hasDecimal('01234')).toEqual(false);
    expect(hasDecimal('')).toEqual(false);
  });
});
