/**
 * @file
 * A JavaScript file for tabs.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.valign = {
    attach: function(context, settings) {
      $('.dd-valign').flexVerticalCenter({
        cssAttribute: 'margin-top',
        parentSelector: '.dd-column, .dd-row'
      });
    }
  };

})(jQuery, Drupal, this, this.document);
