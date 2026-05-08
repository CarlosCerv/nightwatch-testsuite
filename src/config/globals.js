module.exports = {
    // this controls whether to abort the test execution when an assertion failed and skip the rest
    // it's being used in waitFor commands and expect assertions
    abortOnAssertionFailure: false,

    // this will overwrite the default polling interval (currently 500ms) for waitFor commands
    // and expect assertions that use retry
    waitForConditionPollInterval: 500,

    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout: process.env.TIMEOUT || 10000,

    // this will cause waitFor commands on elements to throw an error if multiple
    // elements are found using the given locate strategy and selector
    throwOnMultipleElementsReturned: false,

    // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
    asyncHookTimeout: 10000,

    // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
    unitTestsTimeout: 2000,

    // controls the timeout value for when executing the global async reporter. Expects the done() callback to be invoked within this time
    customReporterCallbackTimeout: 20000,

    // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions until a given timeout is reached
    retryAssertionTimeout: process.env.RETRY_TIMEOUT || 5000,

    before: function(done) {
    // called before starting the test runner
        done();
    },

    beforeEach: function(browser, done) {
    // called before every test suite
        done();
    },

    after: function(done) {
    // called after the test runner completes
        done();
    },

    afterEach: function(browser, done) {
    // called after every test suite
        browser.end();
        done();
    }
};
