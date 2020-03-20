import test from 'ava'
import browserEnv from 'browser-env'
import GoogleAnalytics from '../src/channels/google-analytics'

browserEnv()

window.gaResponse = ''
window.gtag = (
  command,
  action,
  event // { 'event_category': category, 'event_label': label, 'value': value, 'event_callback': callbackEvent }
) => {
  window.gaResponse = JSON.stringify({
    command: command,
    action: action,
    category: event.event_category,
    label: event.event_label,
    value: event.value
  })
}

test('Event submission with Google Analytic (gtag) channel', t => {
  const eventType = 'test_type'
  const eventLabel = 'some-label | ' + Date.now()
  const eventValue = Math.random()
  const eventCallback = 'a_test_event'

  GoogleAnalytics(eventType, eventLabel, eventValue, eventCallback)

  const responseObject = JSON.parse(window.gaResponse)

  t.is(
    responseObject.command,
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
