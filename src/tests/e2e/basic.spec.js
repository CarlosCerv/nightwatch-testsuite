describe('Basic Test', function() {
    it('loads the homepage', function(browser) {
        browser
            .url(browser.launch_url)
            .waitForElementVisible('body')
            .assert.titleContains('Todoist')
            .end();
    });
});