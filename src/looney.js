(function() {
  'use strict';

  var _requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
    || function(callback) { window.setTimeout(callback, 1000 / 60); };

  function dist2(x, y) {
    return x * x + y * y;
  }

  function looney(elem, options) {
    // Either parameter can be omitted
    if (!(elem instanceof HTMLElement)) {
      options = elem;
      elem = document.body;
    }
    options = options || {};

    var defaults = {
      selector: 'a',
      fill: '#000',
      blur: 0,
      playAudio: true,
      duration: 6900, // ms
      pause: 0,
      invert: false
    };

    // Apply defaults
    for (var prop in defaults) {
      if (!options.hasOwnProperty(prop))
        options[prop] = defaults[prop];
    }

    var links = elem.querySelectorAll(options.selector);

    // Bind playOutro to each element
    for (var i = 0; i < links.length; ++i) {
      var link = links[i];
      link.addEventListener('click',    playOutro, false);
      link.addEventListener('touchend', playOutro, false);
    }

    var hasPlayed = false;

    function playOutro(event) {
      if (hasPlayed)
        return;

      hasPlayed = true;

      event.preventDefault();
      event.stopImmediatePropagation();

      var clickLeft = event.clientX,
        clickTop    = event.clientY,
        clickScrollLeft = document.body.scrollLeft,
        clickScrollTop  = document.body.scrollTop,
        element = this;

      // The mask doesn't work when creating the SVG using the DOM API, but unserializing like this works fine
      document.body.insertAdjacentHTML('beforeend',
        '<svg version="1.1" style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 999999999">' +
          '<mask id="looney-mask">' +
            '<rect x="0" y="0" width="100%" height="100%" fill="#fff" />' +
            '<circle id="looney-circle" cx="0" cy="0" r="999999" fill="#000"' + (options.blur > 0 ? ' filter="url(#looney-blur)"' : '') + ' />' +
          '</mask>' +
          '<defs>' +
            '<filter id="looney-blur">' +
              '<feGaussianBlur in="SourceGraphic" stdDeviation="' + options.blur + '" />' +
            '</filter>' +
          '</defs>' +
          '<rect x="0" y="0" width="100%" height="100%" fill="' + options.fill + '" mask="url(#looney-mask)" />' +
        '</svg>');

      var maskCircle = document.getElementById('looney-circle'),
          startTime = new Date();;

      // Get the greatest distance from the click position to the corners for the starting radius

      var maxRadius = dist2(clickLeft, clickTop); // top left corner

      var temp = dist2(window.innerWidth - clickLeft, clickTop); // top right corner
      if (temp > maxRadius) maxRadius = temp;

      temp = dist2(window.innerWidth - clickLeft, window.innerHeight - clickTop); // bottom right corner
      if (temp > maxRadius) maxRadius = temp;

      temp = dist2(clickLeft, window.innerHeight - clickTop); // bottom left corner
      if (temp > maxRadius) maxRadius = temp;

      maxRadius = Math.sqrt(maxRadius);
      maxRadius += options.blur * 2;

      function start() {
        _requestAnimationFrame(function setClipPath() {
          var left = clickLeft - document.body.scrollLeft + clickScrollLeft,
              top  = clickTop  - document.body.scrollTop  + clickScrollTop;

          var now = new Date(),
            progress = (now - startTime) / options.duration;

          // Ease quadratic
          progress *= progress;

          var radius = maxRadius * (1 - progress);

          if (progress < 1) {
            _requestAnimationFrame(setClipPath);
          }
          else {
            radius = 0;

            // Perform the action
            setTimeout(function () {
              var event;
              if (document.createEvent) {
                event = document.createEvent('HTMLEvents');
                event.initEvent('click', true, true);
              }
              else {
                event = document.createEventObject();
                event.eventType = 'click';
              }

              event.eventName = 'click';

              if (document.createEvent) {
                element.dispatchEvent(event);
              }
              else {
                element.fireEvent('on' + event.eventType, event);
              }
            }, options.pause);
          }

          maskCircle.setAttribute('cx', left);
          maskCircle.setAttribute('cy', top);
          maskCircle.setAttribute('r', radius);
        });
      }

      if (options.playAudio && window.Audio) {
        var audio = new Audio('music.mp3');
        audio.addEventListener('playing', start); // start after loaded
        audio.playbackRate = defaults.duration / options.duration;
        audio.play();
      }
      else {
        start();
      }
    }
  }

  window.looney = looney;
})();