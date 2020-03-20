/**
 * Google Analytics Channel
 *
 * Submit the provided event to Google Analytics directly via ga() function
 *
 * @param {string} eventType Type of event, provided by tracker.type
 * @param {string } eventLabel Label for event, contains granular identifiers constructed by LabelBuilder
 * @param {string|number} eventValue value of the event, provided by tracker.value
 * @param {object} callbackEvent Event to dispatch in callback
 * @returns {boolean|*} true if successful, error when thrown
 */
const GoogleAnalyticsLegacy = (eventType, eventLabel, eventValue, callbackEvent) => {
  try {
    window.ga('send',
      'event',
      window.location.href,
      eventType,
      eventLabel,
      eventValue,
      { hitCallback: complete => document.dispatchEvent(callbackEvent) }
    )
    return true
  } catch (error) {
    console.error(error)
  }
}

export default GoogleAnalyticsLegacy
