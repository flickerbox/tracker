/**
 * Matomo Channel
 *
 * Submit the provided event to Matomo Analytics via  function
 *
 * @param {string} eventType Type of event, provided by tracker.type
 * @param {string } eventLabel Label for event, contains granular identifiers constructed by LabelBuilder
 * @param {string|number} eventValue value of the event, provided by tracker.value
 * @param {object} callbackEvent Event to dispatch in callback
 * @returns {boolean|*} true if successful, error when thrown
 */
const Matomo = (eventType, eventLabel, eventValue, callbackEvent) => {
  try {
    window._paq.push([
      'trackEvent',
      window.location.href,
      eventType,
      eventLabel,
      eventValue
    ])
    return true
  } catch (error) {
    console.error(error)
  }
}

export default Matomo
