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

            this.elements.contentBlocks.each(function () {
                that.wrapHeaderLetters($(this));
            });

            this.showInitialText();

            $(window).on('scroll.animate-text', that.scrolling.bind(this));
            $(window).on('scroll', that.toggleActionButtonView.bind(this));
        },

        showInitialText: function () {
            var charsLength = this.elements.contentBlockFirst.find('.char-mask').length,
                speed = Math.round(500 / charsLength),
                that = this,
                i;

            this.elements.contentBlockFirst.find('h1').removeClass('h_hidden');

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
            var documentHeight = $(document).height(),
                scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height(),
                combinedHeight = scrolledHeight + windowHeight;

            this.elements.contentBlocks.not('.landing-block--top').each(function () {
                var $this = $(this);

                if (combinedHeight >= $this.offset().top + $this.height()) {
                    var charsLength = $this.find('.char-mask').length,
                        speed = Math.round(500 / charsLength),
                        i;

                    for (i = 1; i <= charsLength; i++) {
                        (function (i) {
                            setTimeout(function () {
                                $this.find('.char-mask:nth-child(' + i + ')').addClass('appear');
                            }, speed * i);
                        })(i);
                    }

                    $this.find('p').add($this.find('h5')).addClass('appear');
                }
            });

            if (scrolledHeight >= documentHeight - windowHeight - 100) {
                $(window).off('scroll.animate-text');
            }
        },

        wrapHeaderLetters: function ($block) {
            var $this = $block.find(':header').not('h5'),
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

    $(window).on('load', function () {
        hulq_landing.init();
    });

})(jQuery);