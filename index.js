import LabelBuilder from './src/label-builder/index.js'

/**
 * Package event details in a consistent way for submission to Google.
 *
 * The default tracking method is native Google Analytics - ga() - however this can be changed to Tag Manager dataLayer
 * push by setting window.gtm_event_tracking to true. Event details are the same for both tracking methods:
 *
 * Event Category: URL where the event occurs, set below with window.location.href
 * Event Action: tracker "type" property
 * Event Label: Ordered combination of available tracker "identifier" and "target" properties:
 * 				identifier.dom_data, identifier.dom_id, identifier.dom_name, target
 * Event Value: tracker "value" property
 *
 * Note: Event Label is constructed with consistent ordering without regard for the order of properties in the passed
 * object. This ensures standardized label format for tracked events. Label elements are separated with a pipe character.
 *
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
 * @param complete_event_name			String name of event to trigger after tracking is complete
 *
 *
 * @returns void 						triggers complete_event_name event when tracking complete, or fails
 */
export default class Tracker {

	constructor(config = {}) {
		this.config = Object.assign({
			timeout: 500,
			tracker_method: 0
		}, config)

		this.tracker_timeout = config.timeout
		this.tracker_method = config.tracker_method
	}

	event(tracker, complete_event_name) {
		let complete_event = document.createEvent('Event')
		complete_event.initEvent(complete_event_name, true, true)

		try {
			let event_label = LabelBuilder.build_label(tracker)

			if ( this.config.tracker_method === 2 ) {
				dataLayer.push({
					'event': 'ga_event_tracking',
					'ga_category': window.location.href,
					'ga_action': tracker.type,
					'ga_label': event_label,
					'ga_value': tracker.value,
					'eventCallback': complete => document.dispatchEvent(complete_event)
				})
			}
			else {
				ga(	'send',
					'event',
					window.location.href,
					tracker.type,
					event_label,
					{ 'hitCallback': complete => document.dispatchEvent(complete_event) }
				)
			}
		}

			/**
			 * we trigger the complete event regardless (notes below) and we don't worry about error handling,
			 * however, this would be a good spot to add error logging for this stuff if your needs require it
			 */
		catch (error) {}

			/**
			 * no matter what happens we always trigger the success event after 500 ms. this is critical for users who have
			 * ad blocking because that can disable google analytics and render our tracking useless - and error prone
			 *
			 * this also helps reduce click delay when the callback doesn't execute in a timely manner. this could result in
			 * lost tracking but errs on the side of slightly better user experience
			 */
		finally {
			setTimeout(function () {
				document.dispatchEvent(complete_event)
			}, this.tracker_timeout)
		}
	}
}
