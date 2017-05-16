import $ from 'jquery';

const landingNotify = {

    elements: {
        topNotifyBlock: $('.notify-form--top').add('.notify-text'),
        notifyFloatingForm: $('.notify-form--head'),
        fakeNotifyButton: $('.fake-notify').not('.fake-notify--toggler'),
        notifyFloatingButton: $('.fake-notify--toggler')
    },

    init: () => {
        landingNotify.animateTopForm();

        $(window).on('scroll', landingNotify.toggleNotifyGoTo);

        landingNotify.elements.fakeNotifyButton.on('click', landingNotify.notifyTriggerSubmit);

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
            $this.siblings('input[type="submit"]').trigger('click');
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

    notifyTriggerSubmit: (e) => {
        e.preventDefault();
        $(this).siblings('input[type="submit"]').trigger('click');
    }
};

$(() => {
    if ($('.landing-wrapper').length) {
        landingNotify.init();
    }
});
