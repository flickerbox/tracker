/**
 * Console Output Channel
 *
 * Display the provided event in the browser console, also an example of a custom channel
 *
 * @param {string} eventType Type of event, provided by tracker.type
 * @param {string} eventLabel Label for event, contains granular identifiers constructed by LabelBuilder
 * @param {string|number} eventValue value of the event, provided by tracker.value
 * @param {object} callbackEvent Event to dispatch in callback
 * @returns {boolean|*} true if successful, error when thrown
 */
const ConsoleOutput = (eventType, eventLabel, eventValue, callbackEvent) => {
  try {
    console.table({
      eventValues: {
        Category: window.location.href,
        Action: eventType,
        Label: eventLabel,
        Value: eventValue
      }
    })
    return true
  } catch (error) {
    console.error(error)
  }
}

export default ConsoleOutput
