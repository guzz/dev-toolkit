/**
 * Make better intelicense for custom types, unions, and intersections
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown
/**
 * Make all properties of an object optional
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;