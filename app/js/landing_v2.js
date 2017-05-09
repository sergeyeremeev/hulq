import jQuery from 'jquery';

(($) => {

    const landingV2 = {

        elements: {
            animatedBlocks: $('.landing-2__image').add('.landing-2__title').add('.landing-2__cut')
                .add('.landing-info-block').add('.notify-form__container').add('.landing-2__bottom-content')
                .add('.landing-2__bottom-title').add('.landing-2__bottom-cut'),
            notifyGoToButton: $('.notify-go-to'),
            fakeNotifyButton: $('.fake-notify'),
            bigTitle: $('.landing-2__bottom-title'),
            bottomCut: $('.landing-2__bottom-cut'),
            bottomBg: $('.landing-2__bottom-bg')
        },

        init: function () {
            $(window).on('resize', landingV2.setBottomCutSize);

            $(window).on('scroll.animate-content-2', landingV2.animateContent);
            $(window).on('scroll', landingV2.toggleNotifyGoTo);

            $(window).scroll();
            $(window).resize();

            landingV2.elements.fakeNotifyButton.on('click', landingV2.notifyTriggerSubmit);
            landingV2.elements.notifyGoToButton.on('click', landingV2.goToNotifyForm);
        },

        setBottomCutSize: () => {
            const bigTitleSize = landingV2.elements.bigTitle.height();

            landingV2.elements.bottomCut.height(bigTitleSize);
            landingV2.elements.bottomBg.attr('style', 'top: ' + bigTitleSize + 'px;');
        },

        animateContent: () => {
            const scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height();

            landingV2.elements.animatedBlocks.each(function () {
                const $this = $(this);

                if (scrolledHeight + windowHeight + $this.height() / 2 >= $this.offset().top) {
                    $this.addClass('animate');
                }
            });

            if (!landingV2.elements.animatedBlocks.not('.animate').length) {
                $(window).off('scroll.animate-content-2');
            }
        },

        toggleNotifyGoTo: () => {
            const scrolledHeight = $(document).scrollTop();

            if (scrolledHeight >= $(window).height() + 60 && scrolledHeight < $('.landing-info-block--4').offset().top) {
                landingV2.elements.notifyGoToButton.addClass('appear');
            } else {
                landingV2.elements.notifyGoToButton.removeClass('appear');
            }
        },

        goToNotifyForm: (e) => {
            e.preventDefault();

            const distanceScrolled = $(document).scrollTop(),
                windowHeight = $(window).height(),
                documentHeight = $(document).height(),
                distanceTop = distanceScrolled - windowHeight,
                distanceBottom = (documentHeight - windowHeight) - distanceScrolled,
                scrollTo = distanceTop < distanceBottom ? windowHeight : documentHeight - windowHeight;

            $('html, body').animate(
                { scrollTop: scrollTo },
                500, 'swing'
            );
        },

        notifyTriggerSubmit: (e) => {
            e.preventDefault();
            $(this).siblings('input[type="submit"]').trigger('click');
        }
    };

    $(window).on('load', () => {
        if ($('.landing-section--2').length) {
            landingV2.init();
        }
    });

})(jQuery);
