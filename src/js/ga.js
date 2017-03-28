(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-91380182-1', 'auto');
ga('send', 'pageview');

// On click events
(function() {
  function onClick(event) {
    var eventLabel = event.target && event.target.className || 'Unknown Element';

    ga('send', 'event', {
      eventCategory: 'General',
      eventAction: 'click',
      eventLabel: event.target.href || event.target.className || 'Unknown',
      transport: 'beacon'
    });
  }

  if (document.addEventListener) {
    document.addEventListener('click', onClick, false); 
  } else if (document.attachEvent)  {
    document.attachEvent('onclick', onClick);
  }
})();

// on error event
(function() {
  window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    var error = 'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' +  errorObj;

    ga('send', 'event', {
      eventCategory: 'Error',
      eventAction: 'error',
      eventLabel: error,
      transport: 'beacon'
    });
  };
})();
