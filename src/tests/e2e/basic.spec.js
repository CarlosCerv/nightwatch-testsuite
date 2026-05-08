describe('Basic Test', function() {
    it('loads the homepage', async function(browser) {
        await browser.url(browser.launch_url);
        await browser.waitForElementVisible('body');
        await browser.assert.titleContains('Todoist');
    });
});
