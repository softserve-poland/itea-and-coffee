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

InstaGallery.prototype.handleError = function(e) {
  consolo.log('Handle exception');
};

/**
 * Spliting resp in two rows
 */
InstaGallery.prototype.render = function(data) {
  var images = data && data.data || [];
  var half = Math.ceil(images.length / 2);
  var row = images.splice(0, half);
  var items = [images, row];
  var i = 2;
  var row;
  var item;
  var figure;
  var link;
  var img;
  var meta;

  while(i--) {
    row = ce('div');
    row.className = 'gallery__row';
    this.target.appendChild(row);

    for (var j = 0; j < items[i].length; j++) {
      item = items[i][j] || {};

    // for (var j = items[i].length - 1; j >= 0; j--) {
      figure = ce('figure');
      figure.className = 'gallery__figure';
      figure.setAttribute('itemprop', 'associatedMedia');
      figure.setAttribute('itemscope', '');
      figure.setAttribute('itemtype', 'http://schema.org/ImageObject');

      row.appendChild(figure);

      link = ce('a');
      link.className = 'gallery__link';
      link.href = item.link;
      link.setAttribute('itemprop', 'discussionUrl');

      figure.appendChild(link);

      img = ce('img');
      img.setAttribute('itemprop', 'contentUrl');
      img.width = 288;
      img.height = 288;
      img.src = item.images.standard_resolution.url;
      img.alt = item.caption.text;

      link.appendChild(img);

      meta = [
        ce('mata'),
        ce('meta')
      ];

      meta[0].setAttribute('itemprop', 'width');
      meta[0].setAttribute('content', item.images.standard_resolution.width);
      meta[1].setAttribute('itemprop', 'height');
      meta[1].setAttribute('content', item.images.standard_resolution.height);

      figure.appendChild(meta[0]);
      figure.appendChild(meta[1]);
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
        var json = {};

        try {
          json = JSON.parse(xhr.responseText);
        } catch(e) {}

        _this.render(json);
      }
    };

    xhr.send();

    return this;
};
