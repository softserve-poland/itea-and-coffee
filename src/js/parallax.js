/**
 * Request animation polyfill
 *
 * @source http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function( callback ) { window.setTimeout(callback, 1000 / 60); };
})();


/**
 * ParallaxLayout Class
 *
 * @author Andrew Fedyk <https://github.com/fedyk>
 * @class
 * @depends es5-shim, es6-shim
 */
function ParallaxLayout(selector) {
  if (this === window) return new ParallaxLayout(selector);

  this.selector = selector;
  this.element = document.querySelector(selector);
  this.offsetY = 0;
}

/**
 * Move element on Y axis
 * @param {number} offset
 */
ParallaxLayout.prototype.moveToY = function(offsetY) {
  var _this = this;
  var transform;

  // Ignore if offset is tha same
  if (this.offsetY === offsetY) {
    return;
  }

  this.offsetY = offsetY;

  window.requestAnimationFrame(function updateTransform() {
    _this.element.style.transform = 'translate(0, ' + offsetY + 'px)';
  });
};

/**
 * Return absolute layout position
 *
 * @source jQuery
 * @return {object{top: number, left: number}}
 */
ParallaxLayout.prototype.offset = function() {
  var box = { top: 0, left: 0 };
  var element = this.element;
  var doc = element && element.ownerDocument;
  var docElem;

  if ( !doc ) {
    return;
  }

  docElem = doc.documentElement;

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if ( typeof element.getBoundingClientRect !== 'undefined' ) {
    box = element.getBoundingClientRect();
  }

  return {
    top: box.top  + ( window.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
    left: box.left + ( window.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
  };
};

/**
 * Parallax Dispatcher
 *
 * @author Andrew Fedyk <https://github.com/fedyk>
 */
function ParallaxRunner() {
  if (this === window) return new ParallaxRunner();

  this.layouts = [];

  this.callbacks = [];

  this.startScrollPos = 0;

  this.lastScrollPos = null;

  this.isTicking = false;

  this.clientHeight = null;
}

/**
 * Attach parallax layout to runner
 * @param {ParallaxLayout} layout
 * @param {float} speed
 * @returns {this}
 */
ParallaxRunner.prototype.attachLayout = function(layout, speed) {
  this.layouts.push(layout);
  this.callbacks.push(this._factoryCallback(layout, speed));

  return this;
};

/**
 * Set initial params and start listen to scroll event
 *
 * @returns {this}
 */
ParallaxRunner.prototype.run = function() {
  this.lastScrollPos  = window.scrollY;
  this.clientHeight = this._getClientHeight();

  window.addEventListener('scroll', this._onScroll.bind(this));

  return this;
};

/**
 * Return function which move layout regarding current scroll position
 *
 * @private
 * @returns {Function}
 */
ParallaxRunner.prototype._factoryCallback = function(layout, speed) {
  var _this = this;
  var offset = layout.offset().top;

  return function ParallaxRunnerCallback() {
    var diff;
    var moveTo;

    // Ignore change, if element is not visible
    if (_this.clientHeight + _this.lastScrollPos < offset) {
      // layout.moveToY(0);
      return;
    }

    // If element is visible by default, as diff we'll take scroll offser,
    // if not, calculate diff between total offset and layout element offset
    diff = (_this.clientHeight < offset) ? (_this.clientHeight + _this.lastScrollPos - offset) : _this.lastScrollPos;

    moveTo = parseInt(diff * speed);

    layout.moveToY(moveTo);
  };
};

/**
 * ParallaxRunner on scroll callback method
 *
 * @private
 * @param {ScrollEvent} event
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
ParallaxRunner.prototype._onScroll = function(event) {
  var _this = this;

  _this.lastScrollPos = window.scrollY;

  if (!_this.isTicking) {
    window.requestAnimationFrame(function onScrollFrame() {
      _this.callbacks.forEach(function(callback) { callback(); });

      _this.isTicking = false;
    });
  }

  this.isTicking = true;
};

/**
 * Get browser height
 *
 * @source http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
 * @private
 * @returns {number}
 */
ParallaxRunner.prototype._getClientHeight = function() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};
