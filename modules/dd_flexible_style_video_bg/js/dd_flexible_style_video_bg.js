/**
 * @file
 * A JavaScript file for background video.
 */

(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.dd_flexible_style_video_bg = {

    previous_edit_mode: false,
    processed: false,

    attach: function (context, settings) {
      var self = Drupal.behaviors.dd_flexible_style_video_bg,
        // Check if we're currently editing.
        current_edit_mode = ($('.panels-ipe-editing').length > 0);

      // We've just entered edit mode, destroy all vids.
      if (current_edit_mode && !self.previous_edit_mode) {
        self.destroyVideoBg();
      }
      else if (!current_edit_mode && self.previous_edit_mode) {
        self.createVideoBg();
      }

      // Set the mode to the current.
      self.previous_edit_mode = current_edit_mode;

      if (self.processed) {
        return;
      }
      self.processed = true;

        // Watch for changing media queries
      $(window).on('changed.zf.mediaquery', function() {
        self.destroyVideoBg();
        self.createVideoBg();
      });

      // Create the video background.
      self.createVideoBg();

    },

    createVideoBg: function () {

      $('.dd_flexible_style_video_bg').each(function () {
        var $region = $(this),
          self = Drupal.behaviors.dd_flexible_style_video_bg,
          region_id = $region.data('region-id'),
          video_bg_interchange = $region.data('video-bg'),
          $video_bg_wrapper = false,
          webm = false,
          mp4 = false,
          playing = false,
          canplaythrough = false,
          listeningForResize = false;

        $.each(video_bg_interchange, function (mq, videos) {
          if (window.Foundation.MediaQuery.atLeast(mq)) {
            if (videos.webm) {
              webm = videos.webm;
            }
            if (videos.mp4) {
              mp4 = videos.mp4;
            }
          }
        });
        $region.find('.video-bg-wrapper').remove();
        $region.removeClass('has-background-video');

        if (webm === false && mp4 === false ) {
          return;
        }

        $region.append("<div class='video-bg-wrapper'></div>");

        $video_bg_wrapper = $region.find('.video-bg-wrapper');

        var video = $('<video />', {
          id: region_id + '-video',
          controls: false,
          autoplay: true,
          loop: true,
          class: 'video-bg'
        });

        if (webm != false) {
          video.append($('<source />', {
            src: webm,
            type: 'video/webm'
          }));
        }

        if (mp4 != false) {
          video.append($('<source />', {
            src: mp4,
            type: 'video/mp4'
          }));
        }

        video.on("loadedmetadata", function () {
          video.data('width', this.videoWidth);
          video.data('height', this.videoHeight);
          self.resizeVideoBg($region, video);
        });

        // We show the video as soon as it is playing and can play through so
        // we listen for both events.
        // NOTE: canplaythrough doesn't actually work properly with Chrome so
        // it's not really that useful.
        // https://code.google.com/p/chromium/issues/detail?id=73609
        video.on('canplaythrough', function () {
          if (!canplaythrough && playing) {
            self.playVideo($region, video, listeningForResize);
            listeningForResize = true;
          }
          canplaythrough = true;
        });

        video.on('playing', function () {
          if (!playing && canplaythrough) {
            self.playVideo($region, video, listeningForResize);
            listeningForResize = true;
          }
          playing = true;
          // Show the actual video
          $('.video-bg-wrapper').show();
        });

        $video_bg_wrapper.prepend(video);
        $video_bg_wrapper.append($('<div class="video-bg-overlay"></div>'));

      });

    },

    destroyVideoBg: function () {
      $('.dd_flexible_style_video_bg').removeClass('has-background-video');
      $('.video-bg-wrapper').remove();
    },

    playVideo: function ($region, video, listeningForResize) {
      var self = Drupal.behaviors.dd_flexible_style_video_bg;
      self.resizeVideoBg($region, video);

      // Remove the background image on the container.
      setTimeout(function () {
        $region.addClass('has-background-video');
      }, 100);

      if (!listeningForResize) {
        $region.on('resizeme.zf.trigger', self.resizeVideoBg($region, video));
      }
    },

    resizeVideoBg: function ($region, video) {
      var regionHeight = $region.innerHeight(),
        regionWidth = $region.innerWidth(),
        regionRatio = regionWidth / regionHeight,
        videoHeight = video.data('height'),
        videoWidth = video.data('width'),
        videoRatio = videoWidth / videoHeight,
        newHeight = videoHeight,
        newWidth = videoWidth,
        left,
        top;

      // This acts like the background-size: cover.
      if (videoRatio > regionRatio) {
        // Constrain the height.
        newHeight = regionHeight;
        newWidth = newHeight * videoRatio;
      } else {
        // Constrain the width.
        newWidth = regionWidth;
        newHeight = newWidth / videoRatio;
      }

      // This acts like background-position: center center;
      left = (newWidth - regionWidth) / 2;
      top = (newHeight - regionHeight) / 2;

      video.css({
        height: newHeight,
        width: newWidth,
        left: -left,
        top: -top
      });

      if (newHeight > regionHeight) {
        $('.video-bg-wrapper').css({
          height: regionHeight,
          width: newWidth,
        });
      }

    }
  }

})(jQuery, Drupal, this, this.document);
