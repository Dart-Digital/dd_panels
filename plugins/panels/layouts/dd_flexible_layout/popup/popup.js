/**
 * @file
 * A JavaScript file for carousel.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.dd_flexible_layout_popup = {
    attach: function(context, settings) {

      var popups = Drupal.settings.dd_flexible_layout_popup;
      $('.popup-wrapper').once('dd-popup').hide();

      for(var key in popups) {
        $('.' + key).once('popup').each(function() {
          $(this).attr('data-open', popups[key]);
        });
      }

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
      var popups = Drupal.settings.dd_flexible_layout_popup;
        id = modal.attr('id');

      for(var key in popups) {
        if (popups[key] == id) return true;
      }
      return false;
    }
  };

})(jQuery, Drupal, this, this.document);
