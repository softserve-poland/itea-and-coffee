/**
 * Main script for itea&coffee
 *
 * @author Andrew Fedyk <https://github.com/fedyk>
 */
;(function(root) {
  var galleryId = 'gallery';
  var accessToken = '3900751104.ba870fe.01b95d10cb594df5b527a11489a9a407';
  var userId = 3900751104;
  var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  InstaGallery(galleryId, accessToken, userId).run();

  if (!isMobile) {
    ParallaxRunner()
      .attachLayout(ParallaxLayout('[parallax-cross-1]'), -0.303)
      .attachLayout(ParallaxLayout('[parallax-macbook]'), -0.4)
      .attachLayout(ParallaxLayout('[parallax-cup]'), -0.25)
      .attachLayout(ParallaxLayout('[parallax-lines-1]'), -0.5)
      .attachLayout(ParallaxLayout('[parallax-img-1]'), -0.1)
      .attachLayout(ParallaxLayout('[parallax-cross-2]'), -0.2)
      .attachLayout(ParallaxLayout('[parallax-lines-2]'), -0.18)
      .attachLayout(ParallaxLayout('[parallax-cross-3]'), -0.052)
      .run();
  }

  root.modal1 = FullEventModal('#event-1');
  root.modal2 = FullEventModal('#event-2');
})(window);
