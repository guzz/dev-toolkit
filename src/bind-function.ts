/**
 * Bind a function to a class.
 * You can use it to create reusable functions that depend on the class context
 * and create unit tests for these functions separately from the class.
 * @param {Class} baseClass - The class that will be binded to the function
 * @param {Function} cb - The function that will be binded to the class
 * @returns {Function} - The binded function
 * @example
 * class Person {
 *   name: string
 *   age: number
 *   constructor(name: string, age: number) {
 *     this.name = name;
 *     this.age = age;
 *   }
 *   greet = bindFunction(this, myFunction)
 * }
 * greet(this: Person, message: string) {
 *   return message.replace(/{name}/g, this.name).replace(/{age}/g, this.age.toString())
 * }
 * const person = new Person('Alice', 42)
 * person.greet('Hello, my name is {name} and I\'m {age} years old!') // Hello, my name is Alice and I'm 42 years old!
 */
export function bindFunction<T, U extends Array<unknown>, R>(
  baseClass: T,
  cb: (...args: U) => R,
) {
  return cb.bind(baseClass)
}