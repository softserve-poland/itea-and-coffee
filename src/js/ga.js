(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-91380182-1', 'auto');
ga('send', 'pageview');

(function() {
  function onClick(event) {
    var eventCategory = 'common';
    var eventAction = 'click';
    var eventLabel = event.target && event.target.className || 'Unknown Element';

    ga('send', 'event', [eventCategory], [eventAction], [eventLabel]);
  }

  if (document.addEventListener) {
    document.addEventListener('click', onClick, false); 
  } else if (document.attachEvent)  {
    document.attachEvent('onclick', onClick);
  }
})();
