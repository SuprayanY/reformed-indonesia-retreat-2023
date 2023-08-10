import { describe, test, expect } from 'vitest'

import { Predicate } from '@/utils/predicate'

function isEven (num: number) {
  return num % 2 === 0
}

function isGreaterThanTen (num: number) {
  return num > 10
}

describe('predicate.ts', () => {

  test('static#of_nullFn_throwsTypeError', () => {
    expect(() => Predicate.of(null))
        .throws(TypeError, 'predicateFn is null')
  })

  test('static#of_valid_success', () => {
    const isEvenPredicate = Predicate.of(isEven)
    expect(isEvenPredicate).instanceOf(Predicate)
    expect(isEvenPredicate.test(0)).toBe(true)
    expect(isEvenPredicate.test(1)).toBe(false)
  })

  test('static#not_nullFn_throwsTypeError', () => {
    expect(() => Predicate.not(null))
        .throws(TypeError, 'predicateFn is null')
  })

  test('static#not_valid_success', () => {
    const isOddPredicate = Predicate.not(isEven)
    expect(isOddPredicate).instanceOf(Predicate)
    expect(isOddPredicate.test(0)).toBe(false)
    expect(isOddPredicate.test(1)).toBe(true)
  })

  test('and_nullOther_throwsTypeError', () => {
    expect(() => Predicate.of(isEven).and(null))
        .throws(TypeError, 'other is not an instance of Predicate<T>')
  })

  test('and_valid_success', () => {
    const isEvenPredicate = Predicate.of(isEven)
    const isGreaterThanTenPredicate = Predicate.of(isGreaterThanTen)
    const andPredicate = isEvenPredicate.and(isGreaterThanTenPredicate)

    expect(andPredicate.test(1)).toBe(false)
    expect(andPredicate.test(0)).toBe(false)
    expect(andPredicate.test(10)).toBe(false)
    expect(andPredicate.test(12)).toBe(true)
    expect(andPredicate.test(13)).toBe(false)
  })

  test('or_nullOther_throwsTypeError', () => {
    expect(() => Predicate.of(isEven).or(null))
        .throws(TypeError, 'other is not an instance of Predicate<T>')
  })

  test('or_valid_success', () => {
    const isEvenPredicate = Predicate.of(isEven)
    const isGreaterThanTenPredicate = Predicate.of(isGreaterThanTen)
    const orPredicate = isEvenPredicate.or(isGreaterThanTenPredicate)

    expect(orPredicate.test(1)).toBe(false)
    expect(orPredicate.test(0)).toBe(true)
    expect(orPredicate.test(10)).toBe(true)
    expect(orPredicate.test(12)).toBe(true)
    expect(orPredicate.test(13)).toBe(true)
  })

  test('negate_valid_success', () => {
    const isEventPredicate = Predicate.of(isEven)
    const isOddPredicate = isEventPredicate.negate()
    expect(isOddPredicate.test(0)).toBe(false)
    expect(isOddPredicate.test(1)).toBe(true)
  })

})
