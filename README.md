jquery.lazy
===========

Simple jquery plugin to execute js code in lazy mode. You only have to provide a callback to execute for each element appearing in the viewport.

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
	$(window).lazy({
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
	$(window).lazy({
		callback: function ($element) {
			var url = $element.data('src');
			$element.load(url);
		}
	});
});
```

Available options:
------------------

* **selectorClass** (string) Name of the class used to select the lazy elements. Note that the class is removed after the callback to avoid being executed twice. By default is *lazy*
* **callback** (function) The callback executed for each lazy element. The argument provided is the jquery object with the element.
* **threshold** (integer) By default is 0
* **scrollInterval** (integer) Defines the duration of the timeout used while scrolling to prevent trigger the scroll callback too many times and improve the performance. By default is 500.

