function FullEventModal(elementSelector) {
  if(this === window) {
    return new FullEventModal(elementSelector);
  }

  this.el = document.querySelector(elementSelector);
  this.body = document.getElementsByTagName('body')[0];
  this.isOpen = this.el.className.indexOf('open') !== -1;

  this.backdrop = this._factoryBackdrop();
  this.scrollbarWidth = this._measureScrollbar();
  this._bind();
}

FullEventModal.prototype.toggle = function(first_argument) {
  return this.isOpen ? this.close() : this.open();
};

FullEventModal.prototype.open = function() {
  var _this = this;

  addClass(this.el, 'open');
  addClass(this.body, 'full-event__open-modal');

  this.body.style.paddingRight = this.scrollbarWidth + 'px';
  this.body.appendChild(this.backdrop);

  setTimeout(function onOpenTimeout() {
    addClass(_this.backdrop, 'in');
  }, 0)

  this.isOpen = true;

  return false;
};

FullEventModal.prototype.close = function() {
  var _this = this;
  removeClass(this.el, 'open');
  removeClass(this.body, 'full-event__open-modal');
  removeClass(this.backdrop, 'in');
  setTimeout(function onCloseTimeout() {
    _this.body.removeChild(_this.backdrop);
  }, 150);
  this.body.style.paddingRight = 0;
  this.isOpen = false;
};

FullEventModal.prototype._bind = function() {
  var _this = this;
  var onToggle = function() { _this.toggle(); };

  this.backdrop.addEventListener('click', onToggle, false);
  this.el.querySelector('.full-event__close').addEventListener('click', onToggle, false);
  this.el.querySelector('.full-event__modal').addEventListener('click', function(e) {
    if (_this.isOpen && e.target.className === 'full-event__modal') {
      onToggle(e);
    }
  }, false);
};

FullEventModal.prototype._factoryBackdrop = function() {
  var backdrop = document.createElement('div');
  backdrop.className = 'full-event__backdrop fade';
  return backdrop;
};

/**
 * @source Twitter Bootstrap
 */
FullEventModal.prototype._measureScrollbar = function () { // thx walsh
  var scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  this.body.appendChild(scrollDiv);

  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  this.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

/**
 * CSS classes
 * @source vk.com
 */
window.whitespaceRegex = /[\t\r\n\f]/g;
function hasClass(obj, name) {
  if (obj && obj.nodeType === 1 &&
    (" " + obj.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + name + " ") >= 0) {
    return true;
  }

  return false;
}

function addClass(obj, name) {
  if (!hasClass(obj, name)) {
    obj.className = (obj.className ? obj.className + ' ' : '') + name;
  }
}

function removeClass(obj, name) {
  if (obj) {
    obj.className = ((obj.className || '').trim().replace((new RegExp('(\\s|^)' + name + '(\\s|$)')), ' ')).trim();
  }
}

function toggleClass(obj, name, v) {
  if (v === undefined) {
    v = !hasClass(obj, name);
  }
  (v ? addClass : removeClass)(obj, name);
  return v;
}

function replaceClass(obj, oldName, newName) {
  removeClass(obj, oldName);
  addClass(obj, newName);
}
