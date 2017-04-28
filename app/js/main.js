var jQuery = require('jquery');

(function ($) {

    var hulq_landing = {

        elements: {
            contentBlocks: $('.landing-block'),
            contentBlockFirst: $('.landing-block--top'),
            contentBlockLast: $('.landing-block--bottom'),
            actionButtonMain: $('.button--landing-main'),
            carCentral: $('.car-center')
        },

        init: function () {
            var that = this;

            this.showInitialText();

            $(window).on('scroll.animate-text', that.scrolling.bind(this));
            $(window).on('scroll', that.toggleActionButtonView.bind(this));
        },

        showInitialText: function () {
            this.elements.contentBlockFirst.add(this.elements.actionButtonMain).addClass('appear');
        },

        scrolling: function () {
            var documentHeight = $(document).height(),
                scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height(),
                combinedHeight = scrolledHeight + windowHeight;

            this.elements.contentBlocks.not('.landing-block--top').each(function () {
                var $this = $(this);
                if (scrolledHeight + windowHeight + 100 >= $this.offset().top) {
                    $this.addClass('appear');
                }
            });

            if (!this.elements.contentBlocks.not('.visible').length) {
                console.log('unboun');
                $(window).off('scroll.animate-text');
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
        hulq_landing.init();
    });

})(jQuery);