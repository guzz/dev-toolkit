export function bindFunction<T, U extends Array<unknown>, R>(
  broker: T,
  cb: (...args: U) => R,
) {
  return cb.bind(broker)
}