/**
 * Function which has neither argument nor return value.
 */
export interface CallableFunction {
  (): void
}

/**
 * Function which has a single argument, but does not return any value.
 * Use this function to consume a value.
 *
 * @template T - Type of the value to be consumed
 */
export interface ConsumerFunction<T> {
  (arg: T): void
}

/**
 * Function which has a single argument and returns a value.
 * Use this function to map a value into another value.
 *
 * @template T - Type of the argument
 * @template R - Type of the return value
 */
export interface MapperFunction<T, R> {
  (arg: T): R
}

/**
 * Function which has a single argument and returns a boolean value.
 * Use this function to test a value.
 *
 * @template T - Type of the argument to be tested
 */
export interface PredicateFunction<T> {
  (arg: T): boolean
}

/**
 * Function which does not have an argument, but returns a value.
 * Use this function to supply/produce a value without any argument.
 *
 * @template T - Type of the value to be supplied
 */
export interface SupplierFunction<T> {
  (): T
}
