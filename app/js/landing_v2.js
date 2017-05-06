import jQuery from 'jquery';

(($) => {

    const landingV2 = {

        elements: {
            animatedBlocks: $('.landing-2__image').add('.landing-2__title').add('.landing-2__cut')
                .add('.landing-info-block').add('.notify-form__container').add('.landing-2__bottom-content')
                .add('.landing-2__bottom-title').add('.landing-2__bottom-cut'),
            notifyGoToButton: $('.notify-go-to'),
            fakeNotifyButton: $('.fake-notify')
        },

        init: function () {
            console.log('animation started');
            $(window).on('scroll.animate-content-2', landingV2.animateContent);
            $(window).on('scroll', landingV2.toggleNotifyGoTo);

            $(window).scroll();

            landingV2.elements.fakeNotifyButton.on('click', landingV2.notifyTriggerSubmit);
            landingV2.elements.notifyGoToButton.on('click', landingV2.goToNotifyForm);
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

        goToNotifyForm: () => {
            $('html, body').animate(
                { scrollTop: $(window).height() },
                300, 'swing'
            );
        },

        notifyTriggerSubmit: (e) => {
            e.preventDefault();
            $(this).siblings('input[type="submit"]').trigger('click');
        }
    };

    $(() => {
        console.log('doc ready');
        if ($('.landing-section--2').length) {
            $(window).on('load', function () {
                console.log('window loaded');
                landingV2.init();
            });
        }
    });

})(jQuery);
