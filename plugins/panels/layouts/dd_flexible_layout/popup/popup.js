/**
 * @file
 * A JavaScript file for carousel.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.dd_flexible_layout_popup = {
    popups: {
      "popup": "popup_1",
      "popup-1": "popup_1",
      "popup-2": "popup_2",
      "popup-3": "popup_3"
    },

    attach: function(context, settings) {

      var popups = Drupal.behaviors.dd_flexible_layout_popup.popups;
      $('.popup-wrapper').once('popup').each(function() {
        var $this = $(this);
        $this.hide();
      });

      for(var key in popups) {
        $('.' + key).once('popup').each(function() {
          $(this).attr('data-reveal-id', popups[key]);
        });
      }

      $(document).foundation('reveal', 'reflow');

      $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
        if (Drupal.behaviors.dd_flexible_layout_popup.isOurPopup($(this))) {
          $('body').addClass('popup-open');
        }
      });

      $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
        if (Drupal.behaviors.dd_flexible_layout_popup.isOurPopup($(this))) {
          $('body').removeClass('popup-open');
        }
      });
    },

    isOurPopup: function(modal) {
      var popups = Drupal.behaviors.dd_flexible_layout_popup.popups,
        id = modal.attr('id');

      for(var key in popups) {
        if (popups[key] == id) return true;
      }
      return false;
    }
  };

})(jQuery, Drupal, this, this.document);
