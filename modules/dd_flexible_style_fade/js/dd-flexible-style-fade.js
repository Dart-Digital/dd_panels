/**
 * @file
 * A JavaScript file for tabs.
 */

(function ($, Drupal, window, document, undefined) {

Drupal.behaviors.dd_flexible_style_fade = {
  attach: function(context, settings) {

    // Check if we're currently editing.
    var currently_editing = ($('.panels-ipe-editing').length > 0),
      fade_running = (Drupal.behaviors.dd_flexible_style_fade.controller != undefined);

    // If we're editing using the Panels IPE we want to destroy the animations.
    if (fade_running) {
      Drupal.behaviors.dd_flexible_style_fade.controller.destroy();
      Drupal.behaviors.dd_flexible_style_fade.controller = null;
      $('.fade').css('opacity','1');
      fade_running = false;
    }

    // Don't invoke animations on smaller screens.
    // @TODO: Fix when doing responsive work.
    if (!window.matchMedia(Foundation.media_queries.large).matches) {
      return;
    }

    if (!currently_editing && !fade_running) {

      // Initialise the ScrollMagic Controller.
      Drupal.behaviors.dd_flexible_style_fade.controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          // ENABLE BELOW IN ORDER TO DEBUG
          // ALSO NEED TO ADD THE DEBUG SCRIPT
          // scripts[] = js/scrollmagic/uncompressed/plugins/debug.addIndicators.js
//          addIndicators: true, // add indicators (requires plugin)
          triggerHook: 'onLeave'
        }
      });

      // Use a class for fades.
      $('.fade').each(function() {

        var $this = $(this),
          height = $this.height(),
          nav_height = $('#navigation').height(),
          window_height = $(window).height(),
          fade_in_duration = $this.data('fade-in-duration') != undefined ? parseInt($this.data('fade-in-duration')) : 300,
          fade_in_offset = $this.data('fade-in-offset') != undefined ? parseInt($this.data('fade-in-offset')) : 200,
          fade_out_duration = $this.data('fade-out-duration') != undefined ? parseInt($this.data('fade-out-duration')) : 300,
          fade_out_offset = $this.data('fade-out-offset') != undefined ? parseInt($this.data('fade-out-offset')) : 200;

        fade_out_offset = window_height + height - nav_height - fade_out_offset;

        $this.css('opacity', 0);

        // Fade in.
        new ScrollMagic.Scene({
          triggerElement: $this.get(),
          duration: fade_in_duration,
          offset: fade_in_offset
        })
          .addTo(Drupal.behaviors.dd_flexible_style_fade.controller)
          .triggerHook("onEnter")
          .setTween(
            new TimelineMax()
              .add(TweenMax.to($this.get(), 1, { opacity: 1 } ))
          );

        // Fade out.
        new ScrollMagic.Scene({
          triggerElement: $this.get(),
          duration: fade_out_duration,
          offset: fade_out_offset
        })
          .addTo(Drupal.behaviors.dd_flexible_style_fade.controller)
          .triggerHook("onEnter")
          .setTween(
            new TimelineMax()
              .add(TweenMax.to($this.get(), 1, { opacity: 0 } ))
          );

      });

    }

  }
};

})(jQuery, Drupal, this, this.document);
