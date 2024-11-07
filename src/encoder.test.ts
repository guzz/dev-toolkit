import { encode, decode } from './encoder';

describe('encoder', () => {
  it('should encode an object to a JSON string', () => {
    const data = { key: 'value' };
    const encoded = encode(data);
    expect(encoded).toBe(JSON.stringify(data));
  });

  it('should decode a JSON string to an object', () => {
    const jsonString = '{"key":"value"}';
    const decoded = decode<{ key: string }>(jsonString);
    expect(decoded).toEqual({ key: 'value' });
  });

  it('should encode and decode an object correctly', () => {
    const data = { key: 'value', num: 42, bool: true };
    const encoded = encode(data);
    const decoded = decode<typeof data>(encoded);
    expect(decoded).toEqual(data);
  });

  it('should throw an error when decoding an invalid JSON string', () => {
    const invalidJsonString = '{"key": "value"';
    expect(() => decode(invalidJsonString)).toThrow(SyntaxError);
  });
});