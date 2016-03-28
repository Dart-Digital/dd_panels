/**
 * @file
 * A JavaScript file for vertically align elements.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.valign = {

    debounce: false,

    attach: function (context, settings) {
      Drupal.behaviors.valign.verticalAlign();
    },

    verticalAlign: function () {
      // First clear the margins from all elements so that doesn't affect the
      // calculations.
      $('.dd-valign').css('margin-top', '').each(function () {
        var parentSelector = '.dd-column, .dd-row',
          $this = $(this),
          media_query = $this.data('valign-mq').split(' '),
          directions = $this.data('valign-position').split(' '),
          direction = 'none';

        // Recalculate the distance to the top of the element to keep it centered
        var parentHeight = (parentSelector && $this.parents(parentSelector).length) ?
          $this.parents(parentSelector).first().height() : $this.parent().height();

        if (media_query) {
          $.each(media_query, function (i, mq) {
            // Compatibility fix for Foundation 5.
            if (Foundation.version.charAt(0) == 5) {
              mq = 'is_' + mq.replace(/-/g, '_') + '_up';
              if (Foundation.utils[mq]()) {
                direction = directions[i];
              }
            }
            else {
              mq = mq.replace(/-/g, '_');
              if (Foundation.MediaQuery.atLeast(mq)) {
                direction = directions[i];
              }
            }
          });
        }

        if (direction == 'bottom') {
          $this.css('margin-top', ( parentHeight - $this.height() ));
        }
        else if (direction == 'center') {
          $this.css('margin-top', ( ( ( parentHeight - $this.height() ) / 2 )));
        }
        else if (direction == 'top') {
          $this.css('margin-top', 0);
        }

      });
    }
  };

  // Call on resize. Opera debounces their resize by default.
  $(window).resize(function () {
    clearTimeout(Drupal.behaviors.valign.debounce);
    Drupal.behaviors.valign.debounce = setTimeout(Drupal.behaviors.valign.verticalAlign, 25);
  });

  $(window).load(function () {
    Drupal.behaviors.valign.verticalAlign();
  });

})(jQuery, Drupal, this, this.document);
