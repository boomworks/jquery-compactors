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
 // - Test in screenreaders

	$.fn.compactors = function(settings){

		// Merge user supplied settings with defaults
		var config = $.extend({}, $.fn.compactors.defaults, settings);

		return this.each(function(){
			var
				$compactor = $(this)
				$container = $compactor.parent(config.parent_container_selector)
			;

			$container.attr('role', 'tree');

			$compactor
				.addClass(config.enabled_class_name)
				.attr('role', 'treeitem')
				.attr('aria-expanded', 'false')

				// Custom open & close events do all the heavy lifting
				.bind('open', function(){
					$compactor
						.attr('aria-expanded', 'true')
						.removeClass(config.closed_class_name)
						.addClass(config.opened_class_name)
						.find(config.content_selector).show(config.animation_speed)
					;
				})
				.bind('close', function(){
					$compactor
						.attr('aria-expanded', 'false')
						.removeClass(config.opened_class_name)
						.addClass(config.closed_class_name)
						.find(config.content_selector).hide(config.animation_speed)
					;
				})

				// Open/close initial compactors
				.filter(config.initially_open_selector)
				.trigger('open')
				.end()
				.not(config.initially_open_selector)
				.trigger('close')
				.end()

				.find(config.trigger_selector)
				// make trigger keyboard navigable
				.attr('tabindex', 0)
				// Bind vaious events to triggers
				.bind('click keypress', function(e){
					if(e.type === 'click' || e.type === 'keypress' && (e.keyCode === 13 || e.keyCode === 10)){
						if(e.type === 'click') $(this).blur();
						if($compactor.hasClass(config.opened_class_name)){
							$compactor.trigger('close');
						}else{
							$compactor.trigger('open');
						}
					}
				})
				.hover(function(){
					$(this).toggleClass(config.hover_class_name);
				})

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

