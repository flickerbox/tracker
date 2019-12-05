import ValidElement from '../valid-element'

/**
 * Construct universal event label for submission to active analytics channel.
 *
 * @param {object} tracker object with event details
 * @returns {string} Label for event to submit
 */
const LabelBuilder = (tracker) => {
  const eventLabel = []

  if (typeof tracker.identifier === 'object') {
    if (ValidElement(tracker.identifier.dom_data)) {
      eventLabel.push(tracker.identifier.dom_data)
    }

    if (ValidElement(tracker.identifier.dom_id)) {
      eventLabel.push(tracker.identifier.dom_id)
    }

    if (ValidElement(tracker.identifier.dom_name)) {
      eventLabel.push(tracker.identifier.dom_name)
    }
  } else if (typeof tracker.identifier === 'string') {
    eventLabel.push(tracker.identifier)
  }

  if (tracker.target !== null &&
    tracker.target !== 'javascript:;' &&
    tracker.target !== '#'
  ) {
    eventLabel.push(tracker.target)
  }

  return eventLabel.join(' | ')
}

export default LabelBuilder
