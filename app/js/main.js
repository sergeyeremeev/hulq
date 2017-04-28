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
            this.wrapLetters(this.elements.contentBlockFirst);
            this.showInitialText(500);

            $(window).on('scroll', that.scrolling.bind(this));
            $(window).on('scroll', that.toggleActionButtonView.bind(this));
        },

        showInitialText: function (animationTime) {
            var chars = this.elements.contentBlockFirst.find('.char-mask'),
                charsLength = chars.length,
                speed = Math.round(animationTime / charsLength),
                that = this,
                i;

            for (i = 1; i <= charsLength; i++) {
                (function (i) {
                    setTimeout(function () {
                        that.elements.contentBlockFirst.find('.char-mask:nth-child(' + i + ')').addClass('appear');
                    }, speed * i);
                })(i);
            }

            this.elements.contentBlockFirst.find('p').add(this.elements.actionButtonMain).addClass('appear');
        },

        scrolling: function () {
            var scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height();

            this.elements.contentBlocks.each(function () {
                var $this = $(this);
                if (scrolledHeight + windowHeight >= $this.offset().top + $this.height()) {
                    $this.find('p').addClass('appear');
                }
            });

            // if (!this.elements.contentBlocks.not('.visible').length) {
            //     $(window).off('scroll', this.scrolling);
            // }
        },

        wrapLetters: function ($block) {
            var $this = $block.find('h1'),
                $lineSpans = $this.find('.line-span'),
                chars,
                $currentSpan;

            $.each($lineSpans, function (i, el) {
                $currentSpan = $(el);
                chars = $currentSpan.text().split('');

                $currentSpan.empty();
                $.each(chars, function (i, el) {
                    $currentSpan.append('<span class="char-mask">' + el + '</span>');
                });
            });
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