/**
* @license
* jQuery compactors plugin
*
* Copyright (c) 2010 Boomworks <http://boomworks.com.au/>
* Author: Lindsay Evans
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
(function($){

 // TODO:
 // - Test in more screenreaders
 // - Allow it to work with the same HTML structure as UI accordion
 // - use better technique for creating unique IDs for content panels, also need to check if ID exists

	$.fn.compactors = function(settings){

		// Merge user supplied settings with defaults
		var
			config = $.extend({}, $.fn.compactors.defaults, settings),
			compactor_selector = this.selector
		;

		return this.each(function(i){
			var
				$compactor = $(this),
				$container = $compactor.parent(config.parent_container_selector)
			;

			// Attach ARIA role & properties to compactor container
			$container
				.attr('role', 'tablist')
				.attr('aria-multiselectable', 'true')
			;

			$compactor
				.addClass(config.enabled_class_name)

				// Custom open & close events do all the heavy lifting
				.bind({
					'open': function(){
						$compactor
							.removeClass(config.closed_class_name)
							.addClass(config.opened_class_name)
							.find(config.content_selector)
							.show(config.animation_speed)
							.attr('aria-expanded', 'true')
						;
					},
					'close': function(){
						$compactor
							.removeClass(config.opened_class_name)
							.addClass(config.closed_class_name)
							.find(config.content_selector)
							.hide(config.animation_speed)
							.attr('aria-expanded', 'false')
						;
					}
				})

				// Open/close initial compactors
				.filter(config.initially_open_selector)
				.trigger('open')
				.end()
				.not(config.initially_open_selector)
				.trigger('close')
				.end()

				.find(config.trigger_selector)
				// Make trigger keyboard navigable
				.attr('tabindex', 0)

				// Attach ARIA role to trigger
				.attr('role', 'tab')
				.attr('aria-controls', 'jq-compactor-content-'+i)

				// Bind various events to triggers
				.bind({
					'click keypress': function(e){

						if(e.type === 'click'){
							$compactor.trigger($compactor.hasClass(config.opened_class_name) ? 'close' : 'open');
						}

						// Keybord shortcuts - http://dev.aol.com/dhtml_style_guide#tabpanel

						/*
							# Down Arrow/Right Arrow
								* When focus is on the tab or accordion header, a press of down/right will move focus to the next logical accordion Header or Tab page.
								* When focus reaches the last header/tab page, further key presses will have optionally wrap to the first header
								* In the case of a tab the corresponding tab panel will activate
						*/
						else if(e.type === 'keypress' && (e.keyCode === 39 || e.keyCode === 40)){
							var next = $compactor.next(compactor_selector);
							if(!next.length){
								next = $container.find(compactor_selector).first();
							}
							next.find(config.trigger_selector).focus();
						}
						/*
							# Up Arrow/Left Arrow
								* When focus is on the tab or accordion header, a press of up/left will move focus to the previous logical accordion Header or Tab page.
								* When focus reaches the first header/tab page, further key presses will optionally wrap to the first header.
								* In the case of a tab the corresponding tab panel will activate.
						*/
						else if(e.type === 'keypress' && (e.keyCode === 37 || e.keyCode === 38)){
							var prev = $compactor.prev(compactor_selector);
							if(!prev.length){
								prev = $container.find(compactor_selector).last();
							}
							prev.find(config.trigger_selector).focus();
						}
						/*
							# Enter/Space
								* When focus is on an Accordion Header, this keystroke toggles the expansion of the corresponding panel.
									o If collapsed, the panel is expanded, and its aria-expanded state is set to 'true'.
									o If expanded, the panel is collapsed and its aria-expanded state is set to 'false'.
								* When focus is on a Tab in a Tab Panel, this keystroke has no effect.
									o Note: Tab Panel panels are auto-expanded when their corresponding Tab receives focus, and auto-collapsed when focus moves to another Tab.
								* When focus is on any other interactive element, this keystroke activates, or selects, that element.
									o In this case, the behaviour of depends on the role of the interactive element, and is defined elsewhere in this document (cf., Menu).
						*/
						else if(e.type === 'keypress' && (e.keyCode === 10 || e.keyCode === 13 || e.charCode === 32)){
							$compactor.trigger($compactor.hasClass(config.opened_class_name) ? 'close' : 'open');
						}

					},
					'mouseenter': function(){
						$(this).addClass(config.hover_class_name);
					},
					'mouseleave': function(){
						$(this).removeClass(config.hover_class_name);
					}
				})

				.end()
				.find(config.content_selector)

				
				// Bind various events to content panels
				.bind({
					'keypress': function(e){

						// Keybord shortcuts - http://dev.aol.com/dhtml_style_guide#tabpanel

						/*
							# Control+Up Arrow/Left Arrow
								* Moves focus from anywhere in the accordion content or tab page to its associated accordion Header or Tab respectively.
								* Note: This key combination is useful on browsers which already implement Control+PageUp/PageDown for other functions such as switching browser tabs.
						*/
						if(e.type === 'keypress' && e.ctrlKey && (e.keyCode === 37 || e.keyCode === 38)){
							$(this).parents(compactor_selector).find(config.trigger_selector).focus();
						}
						/*
							# Control+PageUp
								* When focus is inside of a tab panel / accordion pane, pressing ctrl-pageup moves focus to the tab or accordion header of the previous tab/accordion pane.
								* When focus is in the first tab panel in the tab list or the first accordion header content, pressing ctrl-pageup will optionally move focus to the last tab in the tab list or the last accordion header.
								* In the case of being in a tab panel the previous pane will be activated. In the case of an accordion focus will simply move to the header and will require Enter/space to expand/collapse the accordion pane.
						*/
						else if(e.type === 'keypress' && e.ctrlKey && e.keyCode === 33){
							var prev = $(this).parents(compactor_selector).prev(compactor_selector);
							if(!prev.length){
								prev = $container.find(compactor_selector).last();
							}
							prev.find(config.trigger_selector).focus();
							return false;
						}
						/*
							# Control+PageDown
								* When focus is inside of a tab panel / accordion pane, pressing ctrl-pagedown moves focus to the tab or accordion header of the next tab/accordion pane.
								* When focus is in the last tab panel in the tab list or the last accordion header content, pressing ctrl-pagedown will optionally move focus to the first tab in the tab list or the first accordion header.
								* In the case of being in a tab panel the next pane will be activated. In the case of an accordion focus will simply move to the header and will require Enter/space to expand/collapse the accordion pane.
						*/
						else if(e.type === 'keypress' && e.ctrlKey && e.keyCode === 34){
							var next = $(this).parents(compactor_selector).next(compactor_selector);
							if(!next.length){
								next = $container.find(compactor_selector).first();
							}
							next.find(config.trigger_selector).focus();
							return false;
						}

					}
				})

				// Attach ARIA role to content
				.attr('role', 'tabpanel')
				.attr('id', 'jq-compactor-content-'+i)

			;
		});
	};

	// Default settings
	$.fn.compactors.defaults = {
		parent_container_selector: '',
		trigger_selector: '.trigger',
		content_selector: '.content',
		initially_open_selector: '',
		enabled_class_name: 'enabled',
		opened_class_name: 'opened',
		closed_class_name: 'closed',
		hover_class_name: 'hover',
		animation_speed: null
	};

})(jQuery);

