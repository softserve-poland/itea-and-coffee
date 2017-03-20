/**
 * Instagram Gallery for Itea&Coffee(Softserve)
 *
 * @author Andrew Fedyk <https://github.com/fedyk>
 */
function InstaGallery(targetId) {

  if (this === window) {
    return new InstaGallery(targetId);
  }

  this.url = '/api/images.php';

  this.target = document.getElementById(targetId);
}

/**
 * Parse response and render it
 */
InstaGallery.prototype.parseResp = function(resp) {
  var data = ((resp || {}).data) || [];
  var images = data.map(function(item) {
    var images = item.images || {};
    var low_resolution = images.low_resolution || {};

    return {src: low_resolution.url};
  });

  this.render(images);
};

InstaGallery.prototype.handleError = function(e) {
  consolo.log('Handle exception');
};

/**
 * Spliting resp in two rows
 */
InstaGallery.prototype.render = function(images) {
  var half = Math.ceil(images.length / 2);
  var row = images.splice(0, half);
  var items = [images, row];
  var i = 2;
  var el;
  var img;

  while(i--) {
    el = document.createElement('div');
    el.className = 'gallery__row';
    this.target.appendChild(el);

    for (var j = items[i].length - 1; j >= 0; j--) {
      img = document.createElement('img');
      img.width = 288;
      img.height = 288;
      img.src = items[i][j].src;
      el.appendChild(img);
    }
  }
};

InstaGallery.prototype.run = function(e) {
  var _this = this;
  var xhr = new XMLHttpRequest();

  xhr.open('get', this.url, true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      // error
      if (xhr.status != 200) {
        if (window.console && window.console.error) {
          window.console.error(xhr.responseText);
        }
      }

      // Success
      if (xhr.status == 200) {
        var json;

        try {
          json = JSON.parse(xhr.responseText);
        } catch(e) {}

        _this.parseResp(json);
      }
    };

    xhr.send();

    return this;
};
