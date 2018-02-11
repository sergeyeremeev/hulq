import $ from 'jquery';

const cars = {
    carMain: $('.car-landing--center'),
    secondary: {
        carYellow: {
            selector: $('.car-landing--yellow'),
            appearSegment: 0,
            pathStraight: false
        },
        carWhite: {
            selector: $('.car-landing--white'),
            appearSegment: 1,
            pathStraight: true
        },
        carRed: {
            selector: $('.car-landing--red'),
            appearSegment: 2,
            pathStraight: true
        },
        carBlack: {
            selector: $('.car-landing--black'),
            appearSegment: 4,
            pathStraight: false
        },
        carBeige: {
            selector: $('.car-landing--beige'),
            appearSegment: 6,
            pathStraight: true
        }
    }
},
landingSectionTop = $('.landing-section__top');

export default function initLandingCars() {
    slideInMainCar();

    $(window).on('scroll', animateMainCar);

    $(window).on('scroll', () => {
        for (let car of Object.values(cars.secondary)) {
            animateSecondaryCar(car);
        }
    });
}

function slideInMainCar() {
    cars.carMain.addClass('appear');

    setTimeout(() => {
        cars.carMain.addClass('appeared');
    }, 800);
}

function animateMainCar() {
    const scrolledHeight = $(document).scrollTop(),
        windowHeight = $(window).height(),
        doubleWindowHeight = $(window).height() * 2,
        scrolledPercent = scrolledHeight / doubleWindowHeight * 35,
        transformValue = scrolledPercent > 35 ? -45 : scrolledPercent - 80;

    cars.carMain.attr('style', 'transform: translate(-45%, ' + transformValue + '%);');

    if (scrolledHeight + windowHeight > $(document).height() - 100) {
        cars.carMain.addClass('drive-away').removeAttr('style');
    }
}

function animateSecondaryCar(car) {
    const scrolledHeight = $(document).scrollTop(),
          windowHeight = $(window).height(),
          segmentHeight = windowHeight / 3,
          appearPoint = landingSectionTop.height() / 2 + car.appearSegment * segmentHeight;

    let scrolledFromStart = scrolledHeight - appearPoint,
        scrolledPercent = car.pathStraight ?
            scrolledFromStart / segmentHeight :
            scrolledFromStart / segmentHeight * 125,
        transformValue = car.pathStraight ?
            Math.round(-scrolledPercent * windowHeight) / 2 :
            scrolledPercent - 100;

    if (car.pathStraight) {
        if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 4) {
            car.selector.attr('style', 'transform: translate(-50%, 100%);');
        } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight * 4) {
            car.selector.attr('style', 'transform: translate(-50%, ' + transformValue + 'px);');
        }
    } else {
        if (scrolledHeight <= appearPoint || scrolledHeight > appearPoint + segmentHeight * 3) {
            car.selector.attr('style', 'transform: translate(-50%, -100%)');
        } else if (scrolledHeight > appearPoint && scrolledHeight <= appearPoint + segmentHeight) {
            car.selector.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
        } else if (scrolledHeight > appearPoint + segmentHeight && scrolledHeight <= appearPoint + segmentHeight * 2) {
            car.selector.attr('style', 'transform: translate(-50%, 25%)');
        } else if (scrolledHeight > appearPoint + segmentHeight * 2 && scrolledHeight <= appearPoint + segmentHeight * 3) {
            scrolledFromStart = scrolledHeight - appearPoint - segmentHeight * 2;
            scrolledPercent = scrolledFromStart / segmentHeight * 125;
            transformValue = -scrolledPercent + 25;

            car.selector.attr('style', 'transform: translate(-50%, ' + transformValue + '%);');
        }
    }
}
