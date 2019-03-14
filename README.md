# Flickerbox Tracker

This module endeavors to be a convenient packager for your event tracking needs. It supports both Google Analytics and Google Tag Manager implementations sending events.

## Overview

The tracker event method uses the provided event object to standardize the values submitted to Google Analytics for more consistent event tracking. In addition a custom event name can be provided that will be triggered in the tracker callback.

### Event Values

The following structure is used for tracked events.

**Category** - URL of the page where the event occurs.

**Action** - Tracker object `type` property.

**Label** - Created by LabelBuilder from tracker object `identifier` and `target` properties.

**Value** - Tracker object `value` property.

### Tracker Object

The tracker object can contain the following properties.

**type** - String value of the type of event: link_click, form_submission, etc.

**identifier** - String value of the identifier, or optionally an object made up of properties: dom_data, dom_id, dom_name.

**target** - String of the target, commonly link url, or form action

**value** - String of the event value

When using an object for the identifier the properties will be applied to the label in order: dom_data, dom_id, dom_name to standardize label creation.


## Setup

Include the module in your project:

```
$ npm install @flickerbox/tracker
```

### Add to Your Source

```
import Tracker from '@flickerbox/tracker';
var tracker = new Tracker();
```

### Optional Config

The constructor supports optional overrides for the following settings:

**timeout (default: 500)** - Integer value for the amount of time (in ms) to wait before forcing the complete event.

**tracker_method (default: GA)** - Which method (GA/GTM) to use when submitting the event.

- **1** - Use Google Analytics ga() method
- **2** - Use Google Tag Manager dataLayer.push() method

```tracker = new Tracker({tracker_method: 2})```

### Google Tag Manager Setup

When using GTM for event tracking the following data layer variables are required.

**Data Layer Variable Name** - Used For

- **ga_category** - Tag Event Category
- **ga_action** - Tag Event Action
- **ga_label** - Tag Event Label
- **ga_value** - Tag Event Value

In addition, a Universal Analytics tag with an `Event` track type should be added using these variables.

## Examples

The following examples illustrate how to add event tracking using a variety of jQuery event listeners, however, jQuery is not required.

### Link Tracking

```
$('body').on('click', 'a', function(event) {
	var clicked = $(this),
		link = clicked.attr('href'),
		target = link;

	// not all links need to be forwarded after tracking, but some do
	if (clicked.attr('target') !== '_blank' &&
		typeof link != 'undefined' &&
		link.indexOf('javascript:') !== 0 &&
		link.indexOf('#') !== 0
	) {
		event.preventDefault();

		$(document).one('track_complete', function() {
			window.location.href = link;
		});
	}

	tracker.event(
		{
			type: "link_click",
			identifier: {
				dom_data: clicked.attr('data-event'),
				dom_id: clicked.attr('id')
			},
			target: link
		},
		'track_complete'
	);
});
```

### Form Submission

```
$('#my_form').on('submit', function(event){
	tracker.event(
		{
			type: "form_submission",
			identifier: {
				dom_data: $(this).attr('data-event'),
				dom_id: $(this).attr('id'),
				dom_name: $(this).attr('action')
			},
			target: $(this).attr('src')
		}
	);
});
```

### Other Events

```
$('img').on('click', function(event) {
	if (!$(this).parent().is('a')) {
		tracker.event(
			{
				type: "image_click",
				identifier: {
					dom_data: $(this).attr('data-event'),
					dom_id: $(this).attr('id'),
					dom_name: $(this).attr('alt')
				},
				target: $(this).attr('src')
			}
		);
	}
});
```
