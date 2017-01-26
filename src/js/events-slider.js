/**
 * Get slider element with scroll
 * @return {Element}
 */
function getEventsSliderScrollEl() {
  return document.querySelector('#events-scroll');
}

/**
 * Scroll events slider
 *
 * @param {Number} direction
 * @return {Mixed}
 */
function scrollEventsSlider(direction) {
  var element = getEventsSliderScrollEl();
  var to = element.scrollLeft + direction;
  var duration = 200; // 200s
  var direction = 'scrollLeft';

  $scrollTo(element, to, duration, direction);
}
