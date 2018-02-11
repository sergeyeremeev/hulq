import $ from 'jquery';

const landingContentElements = {
    onScrollAnimatedBlocks: $('.on-scroll-animate'),
    topContentBlock: $('.landing-section__top-content'),
    landingSectionTop: $('.landing-section__top'),
    fadingTopBlock: $('.landing-section__top-content--centered'),
    shareToggler: $('.share-toggle')
};

export default function initLandingContent() {
    animateTopContent();

    $(window).on('scroll.animate-content', animateContentOnScroll);
    $(window).on('scroll', fadeTopBlockOnScroll);

    landingContentElements.shareToggler.on('click', toggleShareIcons);
}

function animateTopContent() {
    landingContentElements.topContentBlock.addClass('animate');

    setTimeout(() => {
        landingContentElements.topContentBlock.addClass('animate-end');
    }, 700);
}

function animateContentOnScroll() {
    const scrolledHeight = $(document).scrollTop(),
        windowHeight = $(window).height();

    landingContentElements.onScrollAnimatedBlocks.each(function () {
        const $this = $(this);

        if (scrolledHeight + windowHeight >= $this.offset().top + ($this.height() / 2)) {
            $this.addClass('animate');
        }
    });

    if (!landingContentElements.onScrollAnimatedBlocks.not('.animate').length) {
        $(window).off('scroll.animate-content');
    }
}

function fadeTopBlockOnScroll() {
    const scrolledHeight = $(document).scrollTop(),
        fadingHeight = landingContentElements.landingSectionTop.height() / 2,
        opacityValue = (1 - (scrolledHeight - fadingHeight / 2) / fadingHeight).toFixed(2);

    landingContentElements.fadingTopBlock.attr('style', 'opacity: ' + (opacityValue <= 0 ? 0 : opacityValue));
}

function toggleShareIcons() {
    $('.sharethis-inline-share-buttons').toggleClass('visible');
}
