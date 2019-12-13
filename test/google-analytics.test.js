import test from 'ava'
import browserEnv from 'browser-env'
import GoogleAnalytics from '../src/channels/google-analytics'

browserEnv()

window.gaResponse = ''
window.ga = (command, hitType, category, action, label, value, callbackEvent) => {
  window.gaResponse = JSON.stringify({
    command: command,
    hitType: hitType,
    category: category,
    action: action,
    label: label,
    value: value
  })
}

test('Event submission with Google Tag Manager channel', t => {
  const eventType = 'test_type'
  const eventLabel = 'some-label | ' + Date.now()
  const eventValue = Math.random()

  GoogleAnalytics(eventType, eventLabel, eventValue)

  const responseObject = JSON.parse(window.gaResponse)

  t.is(
    responseObject.command,
    'send',
    'This value is static if this test fails you broke something.'
  )

  t.is(
    responseObject.hitType,
    'event',
    'This value is static if this test fails you broke something.'
  )

  t.is(
    responseObject.action,
    eventType,
    'Event action returned by channel does not match expected value.'
  )

  t.is(
    responseObject.label,
    eventLabel,
    'Event label returned by channel does not match expected value.'
  )

  t.is(
    responseObject.value,
    eventValue,
    'Event value returned by channel does not match expected value.'
  )
})
