(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	var pluginName = "lazy", defaults = {
		selectorClass: 'lazy',
		callback: jQuery.noop,
		threshold: 0,
		scrollInterval: 500
	};

	function Plugin (element, options) {
		this.element = element;
		this.$element = $(element);
		this.settings = $.extend({}, defaults, options);

		this.init();
	}

	Plugin.prototype = {
		init: function () {
			var timeout;
			var self = this;

			this.$element.on('scroll.' + pluginName, function () {
				if (timeout) {
					return;
				}

				timeout = setTimeout(function() {
					self.update();
					timeout = null;
				}, self.settings.scrollInterval);
			});

			setTimeout(function () {
				self.update();
			}, 13);
		},

		destroy: function () {
			this.$element.off('.' + pluginName);
		},

		update: function () {
			var self = this;

			$('.' + self.settings.selectorClass).each(function () {
				var $this = $(this);

				if (self.inViewport($this)) {
					$this.removeClass(self.settings.selectorClass);
					self.settings.callback.call(this, $this);
				}
			});
		},

		inViewport: function ($element) {
			var offset = $element.offset(),
				threshold = this.settings.threshold,
				$window = this.$element;

			if (($window.height() + $window.scrollTop()) <= (offset.top - threshold)) {
				return false;
			}

			if (($window.width() + $window.scrollLeft()) <= (offset.left - threshold)) {
				return false;
			}

			if ($window.scrollTop() > (offset.top + threshold + $element.height())) {
				return false;
			}

			if ($window.scrollLeft() > (offset.left + threshold + $element.width())) {
				return false;
			}

			return true;
		}
	};

	$.fn[pluginName] = function (options) {
		if ((options === undefined) || (typeof options === 'object')) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options));
				}
			});
		}

		if ((typeof options === 'string') && (options[0] !== '_') && (options !== 'init')) {
			var returns, args = arguments;

			this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);

				if ((instance instanceof Plugin) && (typeof instance[options] === 'function')) {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}

				if (options === 'destroy') {
				  $.data(this, 'plugin_' + pluginName, null);
				}
			});

			return returns !== undefined ? returns : this;
		}
	};
}));
