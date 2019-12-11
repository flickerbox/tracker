import test from 'ava'
import ValidElement from '../src/valid-element'

/**
 * Invalid Elements
 */
test('Empty string is invalid', t => {
  const result = ValidElement('')
  t.false(result)
})

test('Undefined element is invalid', t => {
  const result = ValidElement(undefined)
  t.false(result)
})

/**
 * Valid Elements
 */
test('String is valid', t => {
  const result = ValidElement('this is a string')
  t.true(result)
})

test('Number is valid', t => {
  const result = ValidElement(55)
  t.true(result)
})
