/**
* @license
* jQuery compactors plugin
*
* Copyright (c) 2010 Boomworks <http://boomworks.com.au/>
* Author: Lindsay Evans
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
(function($){

	$.fn.compactors = function(settings){

		// TODO:
		// - Make initially open compactors configurable

		// Merge user supplied options with defaults
		if(settings) $.extend({}, $.fn.compactors.defaults, settings);

		return this.each(function(){
			var $compactor = $(this);

			$compactor
				.addClass(config.enabled_class_name)

				// Custom open & close events
				.bind('open', function(){
					$compactor
						.removeClass(config.closed_class_name)
						.addClass(config.opened_class_name)
						.find(config.content_selector).show(config.animation_speed)
					;
				})
				.bind('close', function(){
					$compactor
						.removeClass(config.opened_class_name)
						.addClass(config.closed_class_name)
						.find(config.content_selector).hide(config.animation_speed)
					;
				})
				.trigger('close')

				// Bind events to triggers
				.find(config.trigger_selector)
				.attr('tabindex', 0)
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
		trigger_selector: '.trigger',
		content_selector: '.content',
		enabled_class_name: 'enabled',
		opened_class_name: 'opened',
		closed_class_name: 'closed',
		hover_class_name: 'hover',
		animation_speed: null
	};

})(jQuery);

