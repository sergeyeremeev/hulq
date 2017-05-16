import $ from 'jquery';

const landingV2 = {

    elements: {
        topBanner: $('.landing-section__top-banner'),
        bottomTitle: $('.landing-section__bottom-title'),
        bottomCut: $('.landing-section__bottom-cut'),
        bottomBackgroundFill: $('.landing-section__bottom-bg'),
    },

    init: () => {
        landingV2.animateTopBanner();

        $(window).on('resize', landingV2.setBottomCutSize);

        $(window).scroll();
        $(window).resize();
    },

    setBottomCutSize: () => {
        const bottomTitleSize = landingV2.elements.bottomTitle.height();

        landingV2.elements.bottomCut.height(bottomTitleSize);
        landingV2.elements.bottomBackgroundFill.attr('style', 'top: ' + bottomTitleSize + 'px;');
    },

    animateTopBanner: () => {
        landingV2.elements.topBanner.addClass('animate');
    }
};

$(window).on('load', () => {
    if ($('.landing-wrapper--v2').length) {
        landingV2.init();
    }
});
