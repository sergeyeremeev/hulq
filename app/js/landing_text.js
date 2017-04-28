var jQuery = require('jquery');

(function ($) {

    var landing_text = {

        elements: {
            contentBlocks: $('.landing-block'),
            contentBlockFirst: $('.landing-block--top'),
            contentBlockLast: $('.landing-block--bottom'),
            landingSectionTop: $('.landing-section__top'),
            actionButtonMain: $('.button--landing-main')
        },

        init: function () {
            var that = this;

            this.showInitialText();

            $(window).on('scroll.animate-text', that.scrolling.bind(this));
            $(window).on('scroll.text-hide', that.scrollTextHide.bind(this));
            $(window).on('scroll', that.toggleActionButtonView.bind(this));
        },

        showInitialText: function () {
            var that = this;
            this.elements.contentBlockFirst.add(this.elements.actionButtonMain).addClass('appear');

            setTimeout(function () {
                that.elements.contentBlockFirst.addClass('appeared');
            }, 700);
        },

        scrolling: function () {
            var documentHeight = $(document).height(),
                scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height(),
                combinedHeight = scrolledHeight + windowHeight;

            this.elements.contentBlocks.not('.landing-block--top').each(function () {
                var $this = $(this);
                if (scrolledHeight + windowHeight + 50 >= $this.offset().top) {
                    $this.addClass('appear');
                }
            });

            if (!this.elements.contentBlocks.not('.visible').length) {
                console.log('unboun');
                $(window).off('scroll.animate-text');
            }
        },

        scrollTextHide: function () {
            if ($(document).scrollTop() === 0) {
                return;
            }

            var scrolledHeight = $(document).scrollTop(),
                operationHeight = this.elements.landingSectionTop.height() / 2,
                opacityValue;

            if (scrolledHeight <= operationHeight) {
                opacityValue = (1 - scrolledHeight / operationHeight).toFixed(2);
                this.elements.contentBlockFirst.attr('style', 'opacity: ' + opacityValue);
            } else {
                this.elements.contentBlockFirst.attr('style', 'opacity: ' + 0);
            }

        },

        toggleActionButtonView: function () {
            var scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height();

            if (scrolledHeight + windowHeight >= this.elements.contentBlockLast.offset().top) {
                this.elements.actionButtonMain.addClass('disappear');
            } else {
                this.elements.actionButtonMain.removeClass('disappear');
            }

        }
    };

    $(function () {
        landing_text.init();
    });

})(jQuery);