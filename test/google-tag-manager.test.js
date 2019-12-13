import test from 'ava'
import browserEnv from 'browser-env'
import GoogleTagManager from '../src/channels/google-tag-manager'

browserEnv()

window.gtmResponse = ''
window.dataLayer = {
  push: (event) => {
    window.gtmResponse = JSON.stringify(event)
  }
}

test('Event submission with Google Tag Manager channel', t => {
  const eventType = 'test_type'
  const eventLabel = 'some-label | ' + Date.now()
  const eventValue = Math.random()

  GoogleTagManager(eventType, eventLabel, eventValue)

  const responseObject = JSON.parse(window.gtmResponse)

  t.is(
    responseObject.event,
    'ga_event_tracking',
    'This value is static if this test fails you broke something.'
  )

  t.is(
    responseObject.ga_action,
    eventType,
    'Event action returned by channel does not match expected value.'
  )

  t.is(
    responseObject.ga_label,
    eventLabel,
    'Event label returned by channel does not match expected value.'
  )

  t.is(
    responseObject.ga_value,
    eventValue,
    'Event value returned by channel does not match expected value.'
  )
})
