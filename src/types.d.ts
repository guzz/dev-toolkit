export type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown

export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;