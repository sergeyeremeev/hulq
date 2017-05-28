import $ from 'jquery';

const landingAlternativeElements = {
    topBanner: $('.landing-section__top-banner'),
    bottomTitle: $('.landing-section__bottom-title'),
    bottomCut: $('.landing-section__bottom-cut'),
    bottomBackgroundFill: $('.landing-section__bottom-bg-fill'),
};

export default function initAlternativeLanding() {
    animateTopBanner();

    $(window).on('resize', setBottomCutSize);
}

function setBottomCutSize() {
    const bottomTitleSize = landingAlternativeElements.bottomTitle.height();

    landingAlternativeElements.bottomCut.height(bottomTitleSize);
    landingAlternativeElements.bottomBackgroundFill.attr('style', 'top: ' + bottomTitleSize + 'px;');
}

function animateTopBanner() {
    landingAlternativeElements.topBanner.addClass('animate');
}
