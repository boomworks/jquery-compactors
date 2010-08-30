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
		// - Add custom events open & close so they can be triggered 
		// - Make opened/closed class names configurable
		// - Make initially open compactors configurable
		// - Make plugin defaults work like labeloverlay does

		var config = {
			trigger_selector: '.trigger',
			content_selector: '.content',
			animation_speed: null
		};
		if(settings) $.extend(config, settings);

		return this.each(function(){
			var $compactor = $(this);

			$compactor
				.addClass('enabled').addClass('closed')
				.find(config.content_selector).hide()
				.end()
				.find(config.trigger_selector)
				.attr('tabindex', 0)
				.bind('click keypress', function(e){
					if(e.type === 'click' || e.type === 'keypress' && (e.keyCode === 13 || e.keyCode === 10)){
						if(e.type === 'click') $(this).blur();
						if($compactor.hasClass('open')){
							$compactor
								.addClass('closed').removeClass('open')
								.find(config.content_selector).hide(config.animation_speed)
						}else{
							$compactor
								.removeClass('closed').addClass('open')
								.find(config.content_selector).show(config.animation_speed)
							;
						}
					}
				})
				.hover(function(){
					$(this).toggleClass('hover');
				})
			;
		});
	};

})(jQuery);

