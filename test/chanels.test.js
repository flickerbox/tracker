import test from 'ava'
import Channels from '../src/channels'
import GoogleAnalytics from '../src/channels/google-analytics'
import GoogleTagManager from '../src/channels/google-tag-manager'

/**
 * Channel set tests
 */

test('trackerChannel 1 is Google Analytics', t => {
  const retrievedChannel = Channels(1)
  t.is(retrievedChannel, GoogleAnalytics, 'Retrieved channel is not Google Analytics')
})

test('trackerChannel 2 is Google Tag Manager', t => {
  const retrievedChannel = Channels(2)
  t.is(retrievedChannel, GoogleTagManager, 'Retrieved channel is not Google Tag Manager')
})

test('Invalid value causes error', t => {
  const retrievedChannel = Channels(5)
  t.false(retrievedChannel)
})
