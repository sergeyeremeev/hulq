var jQuery = require('jquery');

(function ($) {

    var hulq_landing = {

        elements: {
            contentBlocks: $('.landing-block').not('.landing-block--top'),
            contentBlockFirst: $('.landing-block--top'),
            contentBlockLast: $('.landing-block--bottom'),
            actionButtonMain: $('.button--landing-main'),
            carCentral: $('.car-center')
        },

        init: function () {
            var that = this;
            this.showInitialText();

            $(window).on('scroll', that.scrolling.bind(this));
            $(window).on('scroll', that.toggleActionButtonView.bind(this));
        },

        showInitialText: function () {
            this.elements.contentBlockFirst.add(this.elements.actionButtonMain).addClass('appear');
        },

        scrolling: function () {
            var scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height();

            this.elements.contentBlocks.each(function () {
                var $this = $(this);
                if (scrolledHeight + windowHeight >= $this.offset().top + $this.height()) {
                    $this.addClass('appear');
                }
            });

            // if (!this.elements.contentBlocks.not('.visible').length) {
            //     $(window).off('scroll', this.scrolling);
            // }
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