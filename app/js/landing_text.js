import jQuery from 'jquery';

(($) => {

    const landing_text = {

        elements: {
            contentBlocks: $('.landing-block'),
            contentBlockFirst: $('.landing-block--top'),
            contentBlockLast: $('.landing-block--bottom'),
            landingSectionTop: $('.landing-section__top'),
            actionButtonMain: $('.button--landing-main')
        },

        init: () => {
            landing_text.showInitialText();

            $(window).on('scroll.animate-text', landing_text.scrolling);
            $(window).on('scroll', landing_text.scrollTextHide);
            $(window).on('scroll', landing_text.toggleActionButtonView);

            if ($(document).scrollTop() !== 0) {
                $(window).scroll();
            }
        },

        showInitialText: () => {
            landing_text.elements.contentBlockFirst.add(landing_text.elements.actionButtonMain).addClass('appear');

            setTimeout(() => {
                landing_text.elements.contentBlockFirst.add(landing_text.elements.actionButtonMain).addClass('appeared');
            }, 700);
        },

        scrolling: () => {
            const scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height();

            landing_text.elements.contentBlocks.not('.landing-block--top').each(function () {
                const $this = $(this);

                if (scrolledHeight + windowHeight + 50 >= $this.offset().top) {
                    $this.addClass('appear');
                }
            });

            if (!landing_text.elements.contentBlocks.not('.appear').length) {
                $(window).off('scroll.animate-text');
            }
        },

        scrollTextHide: () => {
            const scrolledHeight = $(document).scrollTop(),
                operationHeight = landing_text.elements.landingSectionTop.height() / 2,
                opacityValue = (1 - (scrolledHeight - operationHeight / 2) / operationHeight).toFixed(2);

            landing_text.elements.contentBlockFirst.attr('style', 'opacity: ' + (opacityValue <= 0 ? 0 : opacityValue));
        },

        toggleActionButtonView: () => {
            const scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height();

            if (scrolledHeight + windowHeight >= landing_text.elements.contentBlockLast.offset().top) {
                landing_text.elements.actionButtonMain.addClass('disappear');
            } else {
                landing_text.elements.actionButtonMain.removeClass('disappear');
            }

        }
    };

    $(() => {
        landing_text.init();
    });

})(jQuery);
