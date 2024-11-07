import { bindFunction } from './bind-function';

class Mammal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Mammal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

class Person extends Mammal {
  age: number;
  dog?: Dog;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  greet = bindFunction(this, greet);
  yell = bindFunction(this, yell);
  getADog = bindFunction(this, getADog);
}

function greet(this: Person) {
  return `Hello, my name is ${this.name} and I'm ${this.age} years old!`;
}

async function yell(this: Person, message: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (this.age > 60) {
    return 'sorry, I cannot yell';
  } else {
    return `${message.toUpperCase()}!`;
  }
}

function getADog(this: Person, {
  breed,
  name
}: {
  breed: string;
  name: string;
}, save: boolean) {
  if (this.dog) return this.dog;
  const dog = new Dog(name, breed);
  if (save) this.dog = new Dog(name, breed);
  return dog;
}

describe('bindFunction', () => {
  it('should bind a function to an object', () => {
    const person = new Person('Alice', 42);
    expect(person.greet()).toBe("Hello, my name is Alice and I'm 42 years old!");
  });

  it('should bind a function to an object with arguments', async () => {
    const person = new Person('Alice', 42);
    expect(await person.yell('hello')).toBe('HELLO!');
  });

  it('should bind a function to an object with arguments and return a value', () => {
    const person = new Person('Alice', 42);
    const dog = person.getADog({ breed: 'Golden Retriever', name: 'Buddy' }, true);
    expect(dog).toBeInstanceOf(Dog);
    expect(dog).toEqual({ breed: 'Golden Retriever', name: 'Buddy' });
    expect(person.dog).toEqual({ breed: 'Golden Retriever', name: 'Buddy' });
  });
});