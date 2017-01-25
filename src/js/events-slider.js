function EventsSlider(options) {

  if (this === window) {
    return new EventsSlider(options);
  }

  this.$$element = document.querySelector(options.element);
  this.$$scroll = document.querySelector(options.scroll);
  this.animationDuration = 150;
}

EventsSlider.prototype.scrollTo = function(direction) {
  var element = this.$$scroll;
  var to = this.$$scroll.scrollLeft + direction;
  var duration = 200; // s
  var direction = 'scrollLeft';

  $scrollTo(element, to, duration, direction)
};

EventsSlider.prototype.scrollLeft = function() {
  return this.scrollTo(-356);
};

EventsSlider.prototype.scrollRight = function() {
  return this.scrollTo(356);
};
