export default new class LabelBuilder {

	/**
	 * Takes tracker object and constructs label string for event
	 *
	 * @param tracker						Object with event details, identifier can be object or string
	 * 										{
	 * 											type: "String value of the type of event: link_click, form_submission, etc."
	 * 											identifier:	{
	 * 															dom_data: String, typically the data-event attribute
	 *															dom_id: String, typically the id attribute
	 *															dom_name: String, typically the name attribute
	 * 														}
	 * 											target: "String of the target, commonly link url, or form action"
	 * 											value: "String of the event value"
	 * 										}
	 *
	 * @returns {string}					Label for event to submit
	 */
	build_label(tracker) {
		let ga_label = []

		/**
		 * for object identifier validate and collect property values for label
		 */
		if (typeof tracker.identifier === 'object') {
			if (this.validate_element(tracker.identifier.dom_data)) {
				ga_label.push(tracker.identifier.dom_data)
			}

			if (this.validate_element(tracker.identifier.dom_id)) {
				ga_label.push(tracker.identifier.dom_id)
			}

			if (this.validate_element(tracker.identifier.dom_name)) {
				ga_label.push(tracker.identifier.dom_name)
			}
		}
		/**
		 * for string identifier add value to label
		 */
		else if (typeof tracker.identifier === 'string') {
			ga_label.push(tracker.identifier)
		}

		/**
		 * when set tracker target is added to label after identifier
		 */
		if (tracker.target != null && tracker.target != 'javascript:;' && tracker.target != '#') {
			ga_label.push(tracker.target)
		}

		return ga_label.join(' | ')
	}

	/**
	 * Validate tracker element to determine if it should be added to our event label.
	 * Helps us avoid pushing usless data to google (nulls, undefineds, etc.)
	 *
	 * @param element       parameter of the object being validated
	 * @returns {boolean}   whether the element is valid or not
	 */
	validate_element(element) {
		let valid = false

		if (typeof element !== 'undefined' &&
			element !== undefined &&
			element != ''
		) {
			valid = true
		}

		return valid
	}
}
