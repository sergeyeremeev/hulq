import jQuery from 'jquery';

(($) => {

    const landingV2 = {

        elements: {
            animatedBlocks: $('.landing-info-block').add('.notify-form__container').add('.landing-2__bottom-content')
                .add('.landing-2__bottom-title').add('.landing-2__image').add('.landing-2__title').add('.landing-2__cut')
                .add('.landing-2__bottom-cut')
        },

        init: function () {
            $(window).on('scroll.animate-content-2', landingV2.animateContent);

            $(window).scroll();
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
        }
    };

    $(() => {
        if ($('.landing-section--2').length) {
            landingV2.init();
        }
    });

})(jQuery);
