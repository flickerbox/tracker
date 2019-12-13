import test from 'ava'
import LabelBuilder from '../src/label-builder/'

/**
 * Label building with objects
 */
test('Label built from object identifier', t => {
  const staticString = 'a static string'
  const somethingRandom = Math.round(((Math.random() * Math.random()) * 1000000))
  const rightNow = Date.now()
  const result = LabelBuilder({
    type: 'test_event',
    identifier: {
      domData: staticString,
      domId: somethingRandom,
      domName: rightNow
    }
  })

  t.is(
    result,
    `${staticString} | ${somethingRandom} | ${rightNow}`,
    'Expected label does not match built label.'
  )
})

/**
 * Label building with strings
 */
test('Label built from string identifier', t => {
  const staticString = 'a static string that should not be changec'
  const result = LabelBuilder({
    type: 'test_event',
    identifier: staticString
  })

  t.is(
    result,
    staticString,
    'Expected label does not match built label.'
  )
})
