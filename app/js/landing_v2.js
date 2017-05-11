import jQuery from 'jquery';

(($) => {

    const landingV2 = {

        elements: {
            animatedBlocks: $('.landing-2__image').add('.landing-2__title').add('.landing-2__cut')
                .add('.landing-info-block').add('.notify-text').add('.notify-form--main').add('.landing-2__bottom-content')
                .add('.landing-2__bottom-title').add('.landing-2__bottom-cut'),
            notifyFloatingForm: $('.notify-form--head'),
            notifyFloatingButton: $('.fake-notify--toggler'),
            fakeNotifyButton: $('.fake-notify').not('.fake-notify--toggler'),
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
            landingV2.elements.notifyFloatingButton.on('click', landingV2.notifyFormToggle);
            $(document).on('click', landingV2.hideFloatingForm);
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

            if (scrolledHeight >= $(window).height() && scrolledHeight < $('.landing-info-block--4').offset().top) {
                landingV2.elements.notifyFloatingForm.addClass('appear');
            } else {
                landingV2.elements.notifyFloatingForm.removeClass('appear toggled');
            }
        },

        notifyFormToggle: function (e) {
            e.preventDefault();

            const $this = $(this),
                $thisForm = $this.closest('.notify-form');

            if ($thisForm.hasClass('toggled')) {
                $this.siblings('input[type="submit"]').trigger('click');
            } else {
                $this.closest('.notify-form').addClass('toggled');
            }
        },

        hideFloatingForm: function (e) {
            if (landingV2.elements.notifyFloatingForm.hasClass('toggled') &&
                !landingV2.elements.notifyFloatingForm.is(e.target) &&
                landingV2.elements.notifyFloatingForm.has(e.target).length === 0) {
                landingV2.elements.notifyFloatingForm.removeClass('toggled');
            }
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
