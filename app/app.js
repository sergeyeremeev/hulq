// CSS imports
import './app.css';

// JS imports
import $ from 'jquery';

import initLandingContent from './js/landing_content.js';
import initAlternativeLanding from './js/landing_v2.js';

import initNotifyForms from './js/landing_notify';
import initLandingCars from './js/landing_cars.js';

$(() => {
    if ($('.landing-wrapper--v1').length) {
        initLandingCars();
    }
    if ($('.landing-wrapper--v2').length) {
        initAlternativeLanding();
    }
    if ($('.landing-wrapper').length) {
        initLandingContent();
        initNotifyForms();
    }

    $(window).scroll();
    $(window).resize();
});
