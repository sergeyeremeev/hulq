import $ from 'jquery';

const landingNotify = {

    elements: {
        topNotifyBlock: $('.notify-form--top').add('.notify-text'),
        notifyFloatingForm: $('.notify-form--head'),
        notifyEmailField: $('.notify-form').find('input[type="email"]'),
        fakeNotifyButton: $('.fake-notify').not('.fake-notify--toggler'),
        notifyThankyouClose: $('.notify-form__thank-you__close'),
        notifyFloatingButton: $('.fake-notify--toggler')
    },

    init: () => {
        landingNotify.animateTopForm();

        $(window).on('scroll', landingNotify.toggleNotifyGoTo);

        landingNotify.elements.fakeNotifyButton.on('click', landingNotify.notifyTriggerSubmit);

        landingNotify.elements.notifyEmailField.on('keyup touchend', landingNotify.notifyInputChange);

        landingNotify.elements.notifyThankyouClose.on('click', landingNotify.closeNotifyThankyouMessage);

        landingNotify.elements.notifyFloatingButton.on('click', landingNotify.notifyFormToggle);
        $(document).on('click', landingNotify.hideFloatingForm);

        $(window).scroll();
    },

    animateTopForm: () => {
        landingNotify.elements.topNotifyBlock.addClass('animate');
    },

    toggleNotifyGoTo: () => {
        const scrolledHeight = $(document).scrollTop(),
            lastBlock = $('.landing-block').last(),
            maxVisibleHeight = lastBlock.offset().top;

        if ($(document).width() < 768) {
            if (scrolledHeight >= $(window).height()) {
                landingNotify.elements.notifyFloatingForm.addClass('animate toggled');
            } else {
                landingNotify.elements.notifyFloatingForm.removeClass('animate toggled');
            }
            return;
        }

        if (scrolledHeight >= $(window).height() && scrolledHeight < maxVisibleHeight) {
            landingNotify.elements.notifyFloatingForm.addClass('animate');
        } else {
            landingNotify.elements.notifyFloatingForm.removeClass('animate toggled');
        }
    },

    notifyFormToggle: function (e) {
        e.preventDefault();

        const $this = $(this),
            $thisForm = $this.closest('.notify-form');

        if ($thisForm.hasClass('toggled')) {
            landingNotify.notifyTriggerSubmit.call(landingNotify.elements.notifyFloatingButton, e);
        } else {
            $this.closest('.notify-form').addClass('toggled');
        }
    },

    hideFloatingForm: (e) => {
        if (landingNotify.elements.notifyFloatingForm.hasClass('toggled') &&
            !landingNotify.elements.notifyFloatingForm.is(e.target) &&
            landingNotify.elements.notifyFloatingForm.has(e.target).length === 0) {
            landingNotify.elements.notifyFloatingForm.removeClass('toggled');
        }
    },

    notifyInputChange: function () {
        console.log(this);
        $(this).closest('.notify-form').removeClass('invalid');
    },

    validateEmail: (email) => {
        const pattern = /.+\@.+\..+/;
        return pattern.test(email);
    },

    notifyTriggerSubmit: function (e) {
        e.preventDefault();

        const $thisForm = $(this).closest('.notify-form'),
              email = $thisForm.find('input[type="email"]').val();

        if (landingNotify.validateEmail(email)) {
            $thisForm.submit();
            $thisForm.find('.notify-form__thank-you').addClass('animate');
        } else {
            $thisForm.addClass('invalid');
        }
    },

    closeNotifyThankyouMessage: function () {
        $(this).closest('.notify-form__thank-you').hide();
    }
};

$(() => {
    if ($('.landing-wrapper').length) {
        landingNotify.init();
    }
});
