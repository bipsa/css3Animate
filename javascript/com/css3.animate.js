/**
 * @author Sebastian Romero || Zemoga
 * @class CSS3 Jquery Plugin.
 */
;(function($){
	
	$.fn.isCSSAnimable = function (){
		return true;
	}
	
	/**
	 * @author Sebastian Romero || Zemoga
	 * @param {Object} options
	 */
	$.fn.cssAnimate = function(options){
		var defaults = {
			"class" : "in",
			"oncomplete": null,
			"time": 1000,
			"property": "opacity",
			"css" : {},
			"transition": "ease-in-out",
			"delay" : 0
		};
		var settings = $.extend({}, defaults, options);
		this.each(function(index, current){
			var element = $(this);
			if ($("body").isCSSAnimable()) {
				if (typeof settings.property === "object") 
					settings.property = settings.property.join(",")
				var cssApply = $.extend({}, {
					"-webkit-animation-timing-function": settings.transition,
					"-webkit-transition-duration": (settings.time / 1000) + "s",
					"-webkit-transition-property": settings.property,
					"-webkit-transition-delay": (settings.delay / 1000) + "s",
					"-moz-transition-timing-function": settings.transition,
					"-moz-transition-duration": (settings.time / 1000) + "s",
					"-moz-transition-property" : settings.property
				}, settings.css);
				element.css(cssApply).addClass(settings["class"]);
				if (settings.oncomplete) 
					element.transitionEnded(settings.oncomplete);
			} else {
				if(settings.oncomplete)
					element.animate(settings.css, settings.oncomplete);
				else 
					element.animate(settings.css);
			}
		});
		return this;
	};
	
		
	/**
	 * @author Sebastian Romero || Zemoga
	 * @param {Function} oncomplete
	 */
	$.fn.transitionEnded = function(oncomplete){
		this.each(function(index, current){
			var element = $(this);
			var action = function (event) {
				if (oncomplete) {
					oncomplete(event, element);
					if((jQuery.browser.webkit != true))
						element.get(0).removeEventListener('transitionend', action, false);
					else 
						element.get(0).removeEventListener('webkitTransitionEnd', action, false);
				}
			};
			if((jQuery.browser.webkit == true))
				element.get(0).addEventListener('webkitTransitionEnd', action, false);
			else if (jQuery.browser.mozilla && (parseFloat(jQuery.browser.version.substr(0, 3)) > 1.9)) {
				element.get(0).addEventListener('transitionend', action, false);
			} else 
				oncomplete(null, element);
		});
		return this;
	};
	
	
})(jQuery);

/**
 * @author Sebastian Romero || Zemoga
*/
var Errors = {
	
}
