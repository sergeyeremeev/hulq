gemini.suite('whole-page-screen', (suite) => {
    suite.setUrl('/')
        .setCaptureElements('.landing-wrapper')
        .before(function(actions, find) {
            actions.waitForElementToShow('.landing-section__top-banner');
            console.log(find('body'));
            actions.executeJS(function (window) {
                window.alert(window.document.body.offsetHeight);
                window.document.body.scrollTop = window.document.body.offsetHeight;
                window.document.body.scrollTop = 0;
            });
            actions.wait(2000);
        })
        .capture('plain', (actions, find) => {
            actions.waitForElementToShow('.sharethis-inline-share-buttons', 3000);
        });
});
