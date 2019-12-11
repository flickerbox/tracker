import ValidElement from '../valid-element'

/**
 * Construct universal event label for submission to active analytics channel.
 *
 * @param {object} tracker object with event details
 * @returns {string} Label for event to submit
 */
const LabelBuilder = ({ identifier = {}, target = null }) => {
  const eventLabel = []

  if (typeof identifier === 'object') {
    const {
      domData,
      domId,
      domName
    } = identifier

    if (ValidElement(domData)) {
      eventLabel.push(domData)
    }

    if (ValidElement(domId)) {
      eventLabel.push(domId)
    }

    if (ValidElement(domName)) {
      eventLabel.push(domName)
    }
  } else if (typeof identifier === 'string') {
    eventLabel.push(identifier)
  }

  if (target !== null &&
    target !== 'javascript:;' &&
    target !== '#'
  ) {
    eventLabel.push(target)
  }

  return eventLabel.join(' | ')
}

export default LabelBuilder
