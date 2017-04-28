var jQuery = require('jquery');

(function ($) {

    var landing_cars = {

        elements: {
            carCentral: $('.car-landing--center')
        },

        init: function () {
            var that = this;

            this.animateTopCar();

            $(window).on('scroll.top-car', that.scrollTopCar.bind(this));
        },

        animateTopCar: function () {
            var that = this;
            this.elements.carCentral.addClass('appear');
            setTimeout(function () {
                that.elements.carCentral.addClass('appeared');
            }, 800);
        },

        scrollTopCar: function () {

            // end target for central car transform = -40%
            // starting from -80%, finishing after 2x window heights scrolled

            var scrolledHeight = $(document).scrollTop(),
                doubleWindowHeight = $(window).height() * 2,
                scrolledPercent = scrolledHeight / doubleWindowHeight * 40,
                transformValue = scrolledPercent > 40 ? -40 : scrolledPercent - 80;

            this.elements.carCentral.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
        }
    };

    $(function () {
        landing_cars.init();
    });

})(jQuery);