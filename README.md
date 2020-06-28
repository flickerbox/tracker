# Flickerbox Tracker

[![Build Status](https://travis-ci.org/asdfdotdev/tracker.svg?branch=main)](https://travis-ci.org/asdfdotdev/tracker) [![codecov](https://codecov.io/gh/asdfdotdev/tracker/branch/main/graph/badge.svg)](https://codecov.io/gh/asdfdotdev/tracker)


Tracker endeavors to be a convenient packager for your event tracking needs no matter what analytics platform you use. It includes "channels" for Google Analytics, Google Tag Manager, and Console output (helpful for debugging) by default and it's easy to add your own for other services.

## Overview

Tracker uses the provided event object to standardize the values submitted to Google Analytics for more consistent event tracking. In addition a custom event name can be provided that can be triggered in the tracker callback.

### Tracker Object

The tracker object can contain the following properties (with recommended values).

**type** - String value of the type of event: link_click, form_submission, etc.

**identifier** - A string indentifier or an object made up of separate values.

- Identfier Object Properties: dom_data, dom_id, dom_name.

**target** - String of the target, commonly link url, or form action

**value** - The event value

When using an object for the identifier the properties will be applied to the label in order: dom_data, dom_id, dom_name to standardize label creation.


## Setup

Include the module in your project:

```
$ npm install @flickerbox/tracker
```

### Add to Your Build

```
import Tracker from '@flickerbox/tracker';
var tracker = new Tracker();
```

### Optional Config

The constructor supports optional overrides for the following settings:

**timeout (default: 500)** - Value for the amount of time (in ms) to wait before forcing the complete event.

**trackerChannel (default: GA)** - Which method (GA/GTM) to use when submitting the event.

- **1** - Use Google Analytics ga() method
- **2** - Use Google Tag Manager dataLayer.push() method

```tracker = new Tracker({tracker_method: 2})```

### Use Your Own Channel

A sample custom channel is included to output event data to the browser console. It can be used as a template for your own custom channel or used for debugging during development.

```
import Tracker from '@flickerbox/tracker'
import ConsoleOutput from "@flickerbox/tracker/src/channels/console";

let tracker = new Tracker({
	trackerChannel: ConsoleOutput
});
```

### Google Tag Manager Setup

Use of tracker with Google Tag Manager requires a few tags/variables to be configured.

#### Import

[Use the included template file](https://github.com/flickerbox/tracker/blob/master/_container/google-tag-manager.json) to import these assets to your Google Tag Manager container.

#### Manual Setup

When using GTM for event tracking the following data layer variables are required.

##### Variables

- **ga_category** - Tag Event Category
- **ga_action** - Tag Event Action
- **ga_label** - Tag Event Label
- **ga_value** - Tag Event Value
- **Google Analytics ID** - Tracking ID

##### Trigger

- **ga_event_tracking** - Custom Event Trigger

##### Tag

- **Global Event Tracking** - Google Analytics Universal Analytics Tag

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

## Upgrading From v1

### Tracker Config

`tracker_method` config property should be changed to `trackerChannel`. Values of 1 (Google Analytics) and 2 (Google Tag Manager) are still supported for this property.

#### v1

```
let tracker = new Tracker({
    tracker_method: 2)
});
```

#### v2

```
let tracker = new Tracker({
    trackerChannel: 2)
});
```

### Identifier Properties

`identifier` properties should be changed to camelCase

#### v1

```
tracker.event(
{
	type: "other_click",
	identifier: {
		dom_data: $(this).attr('data-event'),
		dom_id: $(this).attr('id'),
		dom_name: $(this).attr('alt')
	},
	target: $(this).attr('src')
}
```

#### v2

```
tracker.event(
{
	type: "other_click",
	identifier: {
		domData: $(this).attr('data-event'),
		domId: $(this).attr('id'),
		domName: $(this).attr('alt')
	},
	target: $(this).attr('src')
}
```
