/**
 * Main script for itea&coffee
 *
 * @author Andrew Fedyk <https://github.com/fedyk>
 */
;(function(root) {
  var galleryId = 'gallery';
  var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  InstaGallery(galleryId).run();

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

  root.modalDragon = FullEventModal('#event-modal__dragon');
  root.modalOrange = FullEventModal('#event-modal__orange');
  root.modalPomegranate = FullEventModal('#event-modal__pomegranate');
  root.modalPear = FullEventModal('#event-modal__pear');
  root.modalApple = FullEventModal('#event-modal__apple');
  root.modalBlueberry = FullEventModal('#event-modal__blueberry');
  root.modalKiwi = FullEventModal('#event-modal__kiwi');
  root.modalPapaya = FullEventModal('#event-modal__papaya');
  root.modalStrawberry = FullEventModal('#event-modal__strawberry');
  root.modalCherry = FullEventModal('#event-modal__cherry');

})(window);
