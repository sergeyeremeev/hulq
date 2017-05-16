import $ from 'jquery';

const landingContent = {

    elements: {
        onScrollAnimatedBlocks: $('.on-scroll-animate'),
        topContentBlock: $('.landing-section__top-content'),
        landingSectionTop: $('.landing-section__top'),
        fadingTopBlock: $('.landing-section__top-content--centered')
    },

    init: () => {
        landingContent.animateTopContent();

        $(window).on('scroll.animate-content', landingContent.animateContentOnScroll);
        $(window).on('scroll', landingContent.fadeTopBlockOnScroll);

        $(window).scroll();
        $(window).resize();
    },

    animateTopContent: () => {
        landingContent.elements.topContentBlock.addClass('animate');

        setTimeout(() => {
            landingContent.elements.topContentBlock.addClass('animate-end');
        }, 700);
    },

    animateContentOnScroll: () => {
        const scrolledHeight = $(document).scrollTop(),
            windowHeight = $(window).height();

        landingContent.elements.onScrollAnimatedBlocks.each(function () {
            const $this = $(this);

            if (scrolledHeight + windowHeight >= $this.offset().top + ($this.height() / 2)) {
                $this.addClass('animate');
            }
        });

        if (!landingContent.elements.onScrollAnimatedBlocks.not('.animate').length) {
            $(window).off('scroll.animate-content');
        }
    },

    fadeTopBlockOnScroll: () => {
        const scrolledHeight = $(document).scrollTop(),
            fadingHeight = landingContent.elements.landingSectionTop.height() / 2,
            opacityValue = (1 - (scrolledHeight - fadingHeight / 2) / fadingHeight).toFixed(2);

        landingContent.elements.fadingTopBlock.attr('style', 'opacity: ' + (opacityValue <= 0 ? 0 : opacityValue));
    }
};

$(() => {
    if ($('.landing-wrapper').length) {
        landingContent.init();
    }
});
