/**
 * @file
 * A JavaScript file for vertically align elements.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.valign = {
    attach: function (context, settings) {
      $('.dd-valign').each(function () {
        var $this = $(this);

        $this.flexVerticalAlign({
          cssAttribute: 'margin-top',
          parentSelector: '.dd-column, .dd-row',
        });
      });
    },
  };

  $.fn.flexVerticalAlign = function (options) {
    var settings = $.extend({
      cssAttribute: 'margin-top', // the attribute to apply the calculated value to
      verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
      parentSelector: null,         // a selector representing the parent to vertically center this element within
      debounceTimeout: 25,          // a default debounce timeout in milliseconds
      deferTilWindowLoad: false,     // if true, nothing will take effect until the $(window).load event
    }, options || {});

    return this.each(function () {
      var $this = $(this); // store the object
      var debounce;
      // recalculate the distance to the top of the element to keep it centered
      var resizer = function () {
        var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
          $this.parents(settings.parentSelector).first().height() : $this.parent().height();

        var media_query = $this.data('valign-mq').split(' '),
          directions = $this.data('valign-position').split(' ');
        settings.direction = $this.data('valign-position');

        if (media_query) {
          $.each(media_query, function (i, mq) {
            // Compatibitly fix for Foundation 5.
            if (Foundation.version.charAt(0) == 5) {
              mq = 'is_' + mq.replace(/-/g, '_') + '_up';
              if (Foundation.utils[mq]()) {
                settings.direction = directions[i];
              }
            }
            else {
              mq = mq.replace(/-/g, '_');
              if (Foundation.MediaQuery.atLeast(mq)) {
                settings.direction = directions[i];
              }
            }
          });
        }

        if (settings.direction == 'bottom') {
          $this.css(settings.cssAttribute, ( parentHeight - $this.height() ));
        }
        else if (settings.direction == 'center') {
          $this.css(settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) ));
        }
        else if (settings.direction == 'top') {
          $this.css(settings.cssAttribute, 0);
        }
        if (settings.complete !== undefined) {
          settings.complete();
        }
      };

      // Call on resize. Opera debounces their resize by default.
      $(window).resize(function () {
        clearTimeout(debounce);
        debounce = setTimeout(resizer, settings.debounceTimeout);
      });

      if (!settings.deferTilWindowLoad) {
        // call it once, immediately.
        resizer();
      }

      // Call again to set after window (frames, images, etc) loads.
      $(window).load(function () {
        resizer();
      });

    });

  };

})(jQuery, Drupal, this, this.document);
