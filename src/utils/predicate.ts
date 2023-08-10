import { PredicateFunction } from '@/utils/functions'

function validateFunction (value, message) {
  if (typeof value !== 'function') {
    throw new TypeError(message)
  }
}

function validateInstance (value, message) {
  if (!(value instanceof Predicate)) {
    throw new TypeError(message)
  }
}

export class Predicate<T> {

  private readonly predicate: PredicateFunction<T>

  private constructor(predicate: PredicateFunction<T>) {
    this.predicate = predicate
  }

  static of<T>(predicateFn: PredicateFunction<T>): Predicate<T> {
    validateFunction(predicateFn, 'predicateFn is null')
    return new Predicate(predicateFn)
  }

  static not<T>(predicateFn: PredicateFunction<T>): Predicate<T> {
    validateFunction(predicateFn, 'predicateFn is null')
    return new Predicate<T>((x: T) => !predicateFn(x))
  }

  and(other: Predicate<T>): Predicate<T> {
    validateInstance(other, 'other is not an instance of Predicate<T>')
    const newFn = (x: T) => this.predicate(x) && other.predicate(x)
    return new Predicate<T>(newFn)
  }

  or(other: Predicate<T>): Predicate<T> {
    validateInstance(other, 'other is not an instance of Predicate<T>')
    const newFn = (x: T) => this.predicate(x) || other.predicate(x)
    return new Predicate<T>(newFn)
  }

  negate(): Predicate<T> {
    return Predicate.not(this.predicate)
  }

  test (value: T): boolean {
    return this.predicate(value)
  }

}
