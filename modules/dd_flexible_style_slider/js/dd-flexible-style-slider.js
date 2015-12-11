/**
 * @file
 * A JavaScript file for tabs.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.dd_flexible_style_slider = {
    attach: function(context, settings) {
      // Check if we're currently editing.
      var currently_editing = ($('.panels-ipe-editing').length > 0);

      $('.dd-flexible-style-slider').each(function() {
        var $this = $(this);
        if (currently_editing) {
          $this.children('.slick-initialized').slick('unslick');
        }
        else {
          $this.children('.row').not('.slick-initialized').slick($this.data('slick'));
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);
