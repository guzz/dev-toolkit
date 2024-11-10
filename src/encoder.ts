export type Encodable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Encodable[]
  | { [key: string]: Encodable }
/**
 * Encode data to a string
 * @param {T} data - The data to be encoded
 * @returns {string} - The stringyfied data
 */
export const encode = <T extends Encodable>(data: T) => {
  return JSON.stringify(data);
}
/**
 * Decode a string to data
 * @param {string} string - The string to be decoded
 * @returns {T} - The decoded data
 */
export const decode = <T extends Encodable>(string: string) => {
  return JSON.parse(string) as T;
}