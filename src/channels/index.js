import GoogleAnalyticsLegacy from './google-analytics'
import GoogleTagManager from './google-tag-manager'

/**
 * Default channel selector: 1 = Google Analytics, 2 = Google Tag Manager
 *
 * @param {number} channelId of channel to activate for event submission
 * @returns {GoogleAnalyticsLegacy|GoogleTagManager} channel module
 * @constructor
 */
const ChannelSelector = (channelId) => {
  if (channelId === 1) {
    return GoogleAnalyticsLegacy
  } else if (channelId === 2) {
    return GoogleTagManager
  } else {
    console.error('Invalid Channel Id. Expected value of 1 or 2 when not using custom channel object.')
    return false
  }
}

export default ChannelSelector
