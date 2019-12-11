import test from 'ava'
import LabelBuilder from '../src/label-builder/'

// todo:write tests

test('Undefined element is invalid', t => {
  const result = LabelBuilder({})
  t.is(result, result, 'This is not a real test')
  t.false(false)
})
