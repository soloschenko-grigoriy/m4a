define([
	'backbone',
	'hbs!tmpl/item/player',
  'jplayer',
],
function( Backbone, PlayerTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
      
    },
		
    template: PlayerTmpl,
      

  	/* ui selector cache */
  	ui: {
    },

		/* ui events hash */
		events: {
      'click .play-button':               "onClickPlayButton",
      'click .pause-button':              "onClickPauseButton",
      'mousedown #player-volume-block':   "onChangeVolume",
      'mousedown #player-progress-block': "onChangeProgress"
    },

    /* responsible for changing the songs progress */
    setProgress: function(progressVal) {
      this.$el.find("#player-progress-line").css("width", (progressVal * 100) + "%");
      this.$el.find("#jplayer").jPlayer("playHead", (progressVal * 100));
      this.changePlayerTime(progressVal);
    },

    /* responsible for the change in sound player */
    setVolume: function(volumeLevel) {
      volumeLevel = volumeLevel > 1     ? 1 : (
                    volumeLevel < 0.005 ? 0 : volumeLevel);

      this.$el.find("#player-volume-line").css("width", (volumeLevel * 100) + "%");

      this.$el.find("#jplayer").jPlayer("volume", volumeLevel);
    },

    changePlayerTime: function(progressVal) {
      var duration = this.$el.find("#jplayer").data("jPlayer").status.duration;
      var currentTime = duration * progressVal;

      var timePlus  = $.jPlayer.convertTime(currentTime);
      var timeMinus = "-" + $.jPlayer.convertTime(duration - currentTime);

      this.$el.find("#player-time-plus").html(timePlus);
      this.$el.find("#player-time-minus").html(timeMinus);
    },

    unbindProgressLine: function() {
      this.$el.find("#jplayer").unbind($.jPlayer.event.timeupdate);
    },

    bindProgressLine: function() {
      this.$el.find("#jplayer").bind($.jPlayer.event.timeupdate, _.bind(function(e) {
        this.$el.find("#player-progress-line").css("width", e.jPlayer.status.currentPercentRelative + "%");

        this.changePlayerTime(e.jPlayer.status.currentPercentRelative / 100);
      }, this));
    },

    onClickPauseButton: function() {
      this.$el.find('.pause-button').hide();
      this.$el.find('.play-button').show();

      this.$el.find("#jplayer").jPlayer("pause");
      this.unbindProgressLine();
      
      return false;
    },

    onClickPlayButton: function() {
        this.$el.find('.play-button').hide();
        this.$el.find('.pause-button').show();

        this.$el.find("#jplayer").jPlayer("play");
        this.bindProgressLine();
        
        return false;
    },

    /* on change progress callback */
    onChangeProgress: function(e) {
      /** Disable text selection and remove all selection and unbind jPlayer event - time update **/
      if(window.getSelection && window.getSelection().removeAllRanges) window.getSelection().removeAllRanges();
      $("body").addClass("disable-select");
      this.unbindProgressLine();

      var progressVal = (e.offsetX / this.$el.find("#player-progress-block").width()).toPrecision(5);
          progressVal = progressVal > 1     ? 1   : (
                        progressVal < 0.005 ? 0   : progressVal);

      this.$el.find("#player-progress-line > .player-progress-slider").css("display", "block");
      this.$el.find("#player-progress-line").css("width", (progressVal * 100) + "%");
      this.changePlayerTime(progressVal);

      /** Handler on the body element to adjust the slider worked for chapels item #player-progress-block **/
      $("body").on('mouseup', _.bind(function(e) {

        /** Enable text selection and disable mouseup and mousemove events on body **/
        $("body").removeClass("disable-select")
                 .off('mouseup')
                 .off('mousemove');

        this.$el.find("#player-progress-line > .player-progress-slider").css("display", "none");

        /** Bind jPlayer event - time update **/
        this.setProgress(progressVal);
        this.bindProgressLine();

      }, this)).on('mousemove', _.bind(function(e) {
        var position = e.pageX - $("#player-progress-block").position().left;
            position = position < 0                                   ? 0                                   : (
                       position > $("#player-progress-block").width() ? $("#player-progress-block").width() : position);

        progressVal = (position / $("#player-progress-block").width()).toPrecision(5);
        this.$el.find("#player-progress-line").css("width", (progressVal * 100) + "%");
        this.changePlayerTime(progressVal);

      }, this));
    },

    /* on change volume callback */
    onChangeVolume: function(e) {
      /** Disable text selection and remove all selection **/
      if(window.getSelection && window.getSelection().removeAllRanges) window.getSelection().removeAllRanges();
      $("body").addClass("disable-select");

      /** Target element or slider bar **/
      var animation = false;
      if ($(e.target).hasClass("player-volume-slider"))
      {
          var position = e.pageX - this.$el.find("#player-volume-block").position().left;
              position = position < 0 ? 0 : (
                         position > this.$el.find("#player-volume-block").width() ? this.$el.find("#player-volume-block").width() : position);
      }
      else
      {
          var position = e.offsetX;
      }

      var volumeLevel = (position / this.$el.find("#player-volume-block").width()).toPrecision(2);

      this.setVolume(volumeLevel);

      /** Handler on the body element to adjust the slider worked for chapels item #player-volume-block **/
      $("body").on('mouseup', function() {
          /** Enable text selection and disable mouseup and mousemove events on body **/
          $("body").removeClass("disable-select")
                   .off('mouseup')
                   .off('mousemove');

      }).on('mousemove', _.bind(function(e) {
          var position = e.pageX - this.$el.find("#player-volume-block").position().left;
              position = position < 0 ? 0 : (
                         position > this.$el.find("#player-volume-block").width() ? this.$el.find("#player-volume-block").width() : position);

          var volumeLevel = (position / this.$el.find("#player-volume-block").width()).toPrecision(2);

          this.setVolume(volumeLevel);
      }, this));
    },

		/* on render callback */
		onRender: function() {
      this.$el.find("#jplayer").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            title: "Bubble",
            m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
            oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
          });
        },
        swfPath: "/js",
        supplied: "m4a, oga"
      });

    }
	});

});
