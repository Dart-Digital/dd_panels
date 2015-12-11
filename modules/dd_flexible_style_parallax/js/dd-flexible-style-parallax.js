/**
 * @file
 * A JavaScript file for tabs.
 */

(function ($, Drupal, window, document, undefined) {

Drupal.behaviors.dd_flexible_style_parallax = {
  attach: function(context, settings) {

    // Check if we're currently editing.
    var currently_editing = ($('.panels-ipe-editing').length > 0),
      parallax_running = (Drupal.behaviors.dd_flexible_style_parallax.controller != undefined);

    // If we're editing using the Panels IPE we want to destroy the animations.
    if (parallax_running) {
      Drupal.behaviors.dd_flexible_style_parallax.controller.destroy();
      Drupal.behaviors.dd_flexible_style_parallax.controller = null;
      parallax_running = false;
    }

    // Don't invoke parallax on smaller screens.
    // @TODO: Fix when doing responsive work.
    if (!window.matchMedia(Foundation.media_queries.large).matches) {
      return;
    }

    if (!currently_editing && !parallax_running) {

      // Initialise the ScrollMagic Controller.
      Drupal.behaviors.dd_flexible_style_parallax.controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          // ENABLE BELOW IN ORDER TO DEBUG
          // ALSO NEED TO ADD THE DEBUG SCRIPT
          // scripts[] = js/scrollmagic/uncompressed/plugins/debug.addIndicators.js
//          addIndicators: true, // add indicators (requires plugin)
          triggerHook: 'onLeave'
        }
      });

      // Iterate through each of the elements that have parallax.
      $('.dd-flexible-style-parallax').each(function() {

        var $this = $(this);

        new ScrollMagic.Scene({triggerElement: '#' + $this.attr('id')})
          .setTween('#' + $this.attr('id') + " > div.row", {y: "100%", ease: Linear.easeNone})
          .triggerHook("onEnter")
          .duration("200%")
          .addTo(Drupal.behaviors.dd_flexible_style_parallax.controller);

      });

    }

  }
};

})(jQuery, Drupal, this, this.document);
