import test from 'ava'
import browserEnv from 'browser-env'
import Matomo from '../src/channels/matomo'

browserEnv()

window.matomoResponse = ''
window._paq = {
  push: (event) => {
    window.matomoResponse = JSON.stringify(event)
  }
}

test('Event submission with Matomo channel', t => {
  const eventType = 'test_type'
  const eventLabel = 'some-label | ' + Date.now()
  const eventValue = Math.random()

  Matomo(eventType, eventLabel, eventValue)

  const responseObject = JSON.parse(window.matomoResponse)

  t.is(
    responseObject[0],
    'trackEvent',
    'This value is static if this test fails you broke something.'
  )

  t.is(
    responseObject[2],
    eventType,
    'Event action returned by channel does not match expected value.'
  )

  t.is(
    responseObject[3],
    eventLabel,
    'Event label returned by channel does not match expected value.'
  )

  t.is(
    responseObject[4],
    eventValue,
    'Event value returned by channel does not match expected value.'
  )
})
