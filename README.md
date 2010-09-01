# jQuery compactor plugin

## What on earth is a compactor?
Essentially an accordion widget which allows you to have all (or none, or any combination you like) panels open at the same time.

See example.html for a demo.

## Compatibility
Requirements: jQuery 1.4.x (tested with 1.4.2, may work in earlier versions)
Browser compatibility: see browser_compatibility.txt

## Usage
See example.html

## Options
Options can be set per compactor() call by passing them in as an object, e.g.
	$('.foo').compactors({animation_speed: 'fast'});

or by setting global plugin defaults:
	$.compactors.defaults.animation_speed = 'fast';

For available options, see jquery.compactors-0.0.1.js (down the bottom of the file)
