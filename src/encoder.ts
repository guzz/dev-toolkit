export const encode = <T extends Record<string, unknown>>(data: T) => {
  return JSON.stringify(data);
}

export const decode = <T extends Record<string, unknown>>(string: string) => {
  return JSON.parse(string) as T;
}