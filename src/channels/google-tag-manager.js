/**
 * Google Tag Manager Channel
 *
 * Submit the provided event to Google Analytics via Tag Manager dataLayer.push() function
 *
 * @param {string} eventType Type of event, provided by tracker.type
 * @param {string } eventLabel Label for event, contains granular identifiers constructed by LabelBuilder
 * @param {string|number} eventValue value of the event, provided by tracker.value
 * @param {object} callbackEvent Event to dispatch in callback
 * @returns {boolean|*} true if successful, error when thrown
 */
const GoogleTagManager = (eventType, eventLabel, eventValue, callbackEvent) => {
  try {
    window.dataLayer.push({
      event: 'ga_event_tracking',
      ga_category: window.location.href,
      ga_action: eventType,
      ga_label: eventLabel,
      ga_value: eventValue,
      eventCallback: complete => document.dispatchEvent(callbackEvent)
    })
    return true
  } catch (error) {
    console.error(error)
  }
}

export default GoogleTagManager
