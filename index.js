import LabelBuilder from './src/label-builder'
import ChannelSelector from './src/channels'

/**
 * Package event data in a consistent way for submission to your analytics platform of choice.
 *
 * Support for event tracking in Google Analytics is supported through directly and via Tag Manager
 * using the included channels. Use the example channel to add your own custom channel to send events elsewhere.
 *
 *
 * Note: Event Label is constructed with consistent ordering without regard for the order of properties in the passed
 * object. This ensures standardized label format for tracked events. Label elements are separated with a pipe character.
 */
export default class Tracker {
  constructor (config = {}) {
    this.config = Object.assign({
      timeout: 500,
      trackerChannel: 1
    }, config)

    this.trackerTimeout = config.timeout

    if (typeof config.trackerChannel === 'function') {
      this.trackerChannel = config.trackerChannel
    } else {
      this.trackerChannel = ChannelSelector(config.trackerChannel)
    }
  }

  /**
   *
   * @param {object} tracker object with details of the event to track
   * @param {string} callbackEventName name of the callback event to generate & trigger
   */
  event (tracker, callbackEventName) {
    const callbackEvent = document.createEvent('Event')
    callbackEvent.initEvent(callbackEventName, true, true)

    try {
      const eventLabel = LabelBuilder(tracker)
      const eventType = (typeof tracker.type !== 'undefined') ? tracker.type : ''
      const eventValue = (typeof tracker.value !== 'undefined') ? tracker.value : ''
      this.trackerChannel(eventType, eventLabel, eventValue, callbackEvent)
    } catch (error) {
      /**
       * we trigger the complete event regardless (notes below) and we don't worry about error handling,
       * however, this would be a good spot to add error logging for this stuff if your needs require it
       */
      console.log(error)
    } finally {
      /**
       * No matter what happens we always trigger the success event. this is critical for users who have
       * ad blocking because that can disable google analytics and render our tracking useless - and error prone.
       *
       * This also helps reduce click delay when the callback doesn't execute in a timely manner. this could result in
       * lost tracking but errs on the side of slightly better user experience.
       */
      setTimeout(function () {
        document.dispatchEvent(callbackEvent)
      }, this.trackerTimeout)
    }
  }
}
