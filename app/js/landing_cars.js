import jQuery from 'jquery';

(($) => {

    const landing_cars = {

        elements: {
            carCentral: $('.car-landing--center'),
            carYellow: $('.car-landing--yellow'),
            carWhite: $('.car-landing--white'),
            carRed: $('.car-landing--red'),
            carBlack: $('.car-landing--black'),
            carBeige: $('.car-landing--beige'),
            landingSectionTop: $('.landing-section__top')
        },

        init: () => {
            landing_cars.slideInTopCar();

            $(window).on('scroll', landing_cars.animateTopCar);
            $(window).on('scroll', landing_cars.animateYellowCar);
            $(window).on('scroll', landing_cars.animateWhiteCar);
            $(window).on('scroll', landing_cars.animateRedCar);
            $(window).on('scroll', landing_cars.animateBlackCar);
            $(window).on('scroll', landing_cars.animateBeigeCar);

            if ($(document).scrollTop() !== 0) {
                $(window).scroll();
            }
        },

        slideInTopCar: () => {

            landing_cars.elements.carCentral.addClass('appear');

            setTimeout(() => {
                landing_cars.elements.carCentral.addClass('appeared');
            }, 800);
        },

        animateTopCar: () => {

            // end target for central car transform = -40%
            // starting from -80%, finishing after 2x window heights scrolled

            const scrolledHeight = $(document).scrollTop(),
                doubleWindowHeight = $(window).height() * 2,
                scrolledPercent = scrolledHeight / doubleWindowHeight * 40,
                transformValue = scrolledPercent > 40 ? -40 : scrolledPercent - 80;

            landing_cars.elements.carCentral.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
        },

        animateYellowCar: () => {
            const scrolledHeight = $(document).scrollTop(),
                segmentHeight = $(window).height() / 3,
                appearPoint = landing_cars.elements.landingSectionTop.height() / 2;

            let scrolledFromStart = scrolledHeight - appearPoint,
                scrolledPercent = scrolledFromStart / segmentHeight * 125,
                transformValue = scrolledPercent - 100;

            if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 3) {
                landing_cars.elements.carYellow.attr('style', 'transform: translate(-50%, -100%)');
            } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight) {
                landing_cars.elements.carYellow.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
            } else if (scrolledHeight > appearPoint + segmentHeight && scrolledHeight <= appearPoint + segmentHeight * 2) {
                landing_cars.elements.carYellow.attr('style', 'transform: translate(-50%, 25%)');
            } else if (scrolledHeight > appearPoint + segmentHeight * 2 && scrolledHeight <= appearPoint + segmentHeight * 3) {
                scrolledFromStart = scrolledHeight - appearPoint - segmentHeight * 2;
                scrolledPercent = scrolledFromStart / segmentHeight * 125;
                transformValue = -scrolledPercent + 25;

                landing_cars.elements.carYellow.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
            }
        },

        animateWhiteCar: () => {
            const scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height(),
                segmentHeight = $(window).height() / 3,
                appearPoint = landing_cars.elements.landingSectionTop.height() / 2 + segmentHeight;

            let scrolledFromStart = scrolledHeight - appearPoint,
                scrolledPercent = scrolledFromStart / segmentHeight,
                transformValue = Math.round(-scrolledPercent * windowHeight) / 2;

            if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 4) {
                landing_cars.elements.carWhite.attr('style', 'transform: translate(-50%, 100%);');
            } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight * 4) {
                landing_cars.elements.carWhite.attr('style', 'transform: translate(-50%, ' + transformValue + 'px);');
            }
        },

        animateRedCar: () => {
            const scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height(),
                segmentHeight = $(window).height() / 3,
                appearPoint = landing_cars.elements.landingSectionTop.height() / 2 + segmentHeight * 3;

            let scrolledFromStart = scrolledHeight - appearPoint,
                scrolledPercent = scrolledFromStart / segmentHeight,
                transformValue = Math.round(-scrolledPercent * windowHeight) / 2;

            if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 4) {
                landing_cars.elements.carRed.attr('style', 'transform: translate(-50%, 100%);');
            } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight * 4) {
                landing_cars.elements.carRed.attr('style', 'transform: translate(-50%, ' + transformValue + 'px);');
            }
        },

        animateBlackCar: () => {
            const scrolledHeight = $(document).scrollTop(),
                segmentHeight = $(window).height() / 3,
                appearPoint = landing_cars.elements.landingSectionTop.height() / 2 + segmentHeight * 6;

            let scrolledFromStart = scrolledHeight - appearPoint,
                scrolledPercent = scrolledFromStart / segmentHeight * 125,
                transformValue = scrolledPercent - 100;

            if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 3) {
                landing_cars.elements.carBlack.attr('style', 'transform: translate(-50%, -100%)');
            } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight) {
                landing_cars.elements.carBlack.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
            } else if (scrolledHeight > appearPoint + segmentHeight && scrolledHeight <= appearPoint + segmentHeight * 2) {
                landing_cars.elements.carBlack.attr('style', 'transform: translate(-50%, 25%)');
            } else if (scrolledHeight > appearPoint + segmentHeight * 2 && scrolledHeight <= appearPoint + segmentHeight * 3) {
                scrolledFromStart = scrolledHeight - appearPoint - segmentHeight * 2;
                scrolledPercent = scrolledFromStart / segmentHeight * 125;
                transformValue = -scrolledPercent + 25;

                landing_cars.elements.carBlack.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
            }
        },

        animateBeigeCar: () => {
            const scrolledHeight = $(document).scrollTop(),
                windowHeight = $(window).height(),
                segmentHeight = $(window).height() / 3,
                appearPoint = landing_cars.elements.landingSectionTop.height() / 2 + segmentHeight * 9;

            let scrolledFromStart = scrolledHeight - appearPoint,
                scrolledPercent = scrolledFromStart / segmentHeight,
                transformValue = Math.round(-scrolledPercent * windowHeight) / 2;

            if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 4) {
                landing_cars.elements.carBeige.attr('style', 'transform: translate(-50%, 100%);');
            } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight * 4) {
                landing_cars.elements.carBeige.attr('style', 'transform: translate(-50%, ' + transformValue + 'px);');
            }
        }
    };

    $(() => {
        if ($('.landing-main').length) {
            landing_cars.init();
        }
    });

})(jQuery);
