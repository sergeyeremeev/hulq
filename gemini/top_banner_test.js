gemini.suite('top-banner', (suite) => {
    suite.setUrl('/')
        .setCaptureElements('.landing-section__top-content-container')
        .before(function(actions, find) {
            actions.waitForElementToShow('.landing-section__top-banner');
            actions.wait(2000);
        })
        .capture('plain', (actions, find) => {
            actions.waitForElementToShow('.sharethis-inline-share-buttons', 3000);
        });
});
