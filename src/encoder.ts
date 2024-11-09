export type Encodable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Encodable[]
  | { [key: string]: Encodable }

export const encode = <T extends Encodable>(data: T) => {
  return JSON.stringify(data);
}

export const decode = <T extends Encodable>(string: string) => {
  return JSON.parse(string) as T;
}