import $ from 'jquery';

const notifyFormElements = {
    topNotifyBlock: $('.notify-form--top').add('.notify-text'),
    notifyFloatingForm: $('.notify-form--head'),
    notifyEmailField: $('.notify-form').find('input[type="email"]'),
    fakeNotifyButton: $('.fake-notify').not('.fake-notify--toggler'),
    notifyThankYouClose: $('.notify-form__thank-you__close'),
    notifyFloatingButton: $('.fake-notify--toggler')
};

export default function notifyFormsInit() {
    animateTopForm();

    $(window).on('scroll', toggleNotifyGoTo);

    notifyFormElements.fakeNotifyButton.on('click', notifyTriggerSubmit);

    notifyFormElements.notifyEmailField.on('keyup touchend', notifyInputChange);

    notifyFormElements.notifyThankYouClose.on('click', closeNotifyThankYouMessage);

    notifyFormElements.notifyFloatingButton.on('click', notifyFormToggle);
    $(document).on('click', hideFloatingForm);
}

function animateTopForm() {
    notifyFormElements.topNotifyBlock.addClass('animate');
}

function toggleNotifyGoTo() {
    const scrolledHeight = $(document).scrollTop(),
        lastBlock = $('.landing-block').last(),
        maxVisibleHeight = lastBlock.offset().top;

    if ($(document).width() < 768) {
        if (scrolledHeight >= $(window).height()) {
            notifyFormElements.notifyFloatingForm.addClass('animate toggled');
        } else {
            notifyFormElements.notifyFloatingForm.removeClass('animate toggled');
        }
        return;
    }

    if (scrolledHeight >= $(window).height() && scrolledHeight < maxVisibleHeight) {
        notifyFormElements.notifyFloatingForm.addClass('animate');
    } else {
        notifyFormElements.notifyFloatingForm.removeClass('animate toggled');
    }
}

function notifyFormToggle(e) {
    e.preventDefault();

    const $this = $(this),
        $thisForm = $this.closest('.notify-form');

    if ($thisForm.hasClass('toggled')) {
        notifyTriggerSubmit.call(notifyFormElements.notifyFloatingButton, e);
    } else {
        $this.closest('.notify-form').addClass('toggled');
    }
}

function hideFloatingForm(e) {
    if (notifyFormElements.notifyFloatingForm.hasClass('toggled') &&
        !notifyFormElements.notifyFloatingForm.is(e.target) &&
        notifyFormElements.notifyFloatingForm.has(e.target).length === 0) {
        notifyFormElements.notifyFloatingForm.removeClass('toggled');
    }
}

function notifyInputChange() {
    console.log(this);
    $(this).closest('.notify-form').removeClass('invalid');
}

function validateEmail(email) {
    const pattern = /.+\@.+\..+/;
    return pattern.test(email);
}

function notifyTriggerSubmit(e) {
    e.preventDefault();

    const $thisForm = $(this).closest('.notify-form'),
        email = $thisForm.find('input[type="email"]').val();

    if (validateEmail(email)) {
        $.post(
            'subscribe.php',
            {email: email}
        ).done(() => {
            $thisForm.find('.notify-form__thank-you').addClass('animate');
            $thisForm.find('input[type="email"]').val('');

            window.dataLayer.push({
                'event': 'trackEvent',
                'eventCategory': 'Pre-registration',
                'eventAction': 'Email Signup'
            });
        }).fail(() => {
            console.log('error');
        });
    } else {
        $thisForm.addClass('invalid');
    }
}

function closeNotifyThankYouMessage() {
    $(this).closest('.notify-form__thank-you').hide().addClass('hidden');
}
