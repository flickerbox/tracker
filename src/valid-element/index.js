/**
 * Validate label element is appropriate for inclusion in the constructed label
 *
 * @param {string} label element to validate
 * @returns {boolean}
 */
const ValidElement = (element) => {
  let valid = false

  if (typeof element !== 'undefined' &&
    element !== undefined &&
    element !== ''
  ) {
    valid = true
  }

  return valid
}

export default ValidElement
