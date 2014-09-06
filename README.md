jquery.lazyscript
=================

Simple jquery plugin to execute any javascript code in lazy mode. You only have to provide a callback to execute for each element appearing in the viewport.

Usage
-----

### Load images in lazy mode:

```html
<div class="lazy" data-src="1.jpg"></div>
<div class="lazy" data-src="2.jpg"></div>
<div class="lazy" data-src="3.jpg"></div>
<div class="lazy" data-src="4.jpg"></div>
<div class="lazy" data-src="5.jpg"></div>
<div class="lazy" data-src="6.jpg"></div>
<div class="lazy" data-src="7.jpg"></div>
<div class="lazy" data-src="8.jpg"></div>
```

```javascript
$(document).ready(function () {
	$(window).lazyscript({
		callback: function ($element) {
			var src = $element.data('src');
			$element.html('<img src="' + src + '">');
		}
	});
});
```

### Load ajax content

```html
<div class="lazy" data-url="http://example.com/ajax-widget1.html"></div>
<div class="lazy" data-url="http://example.com/ajax-widget2.html"></div>
<div class="lazy" data-url="http://example.com/ajax-widget3.html"></div>
```

```javascript
$(document).ready(function () {
	$(window).lazyscript({
		callback: function ($element) {
			var url = $element.data('src');
			$element.load(url);
		}
	});
});
```

Available options:
------------------

* **selectorClass** (string) Name of the class used to select the lazy elements. Note that the class will be remove after the callback execution. By default is *lazy*
* **callback** (function) The callback to be executed for each lazy element. The first argument is the jquery object with the element.
* **threshold** (integer) By default is 0
* **scrollInterval** (integer) Defines the duration of the timeout used to prevent the scroll execute the callback event too many times. By default is 500.

