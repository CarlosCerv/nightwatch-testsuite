const LoginSteps = require('../../lib/helpers/login-step');
const Environment = require('../../config/environments/stage-env');
const testUsers = require('../../config/data/userData.json');

describe('Todoist Login Tests', function() {
    let loginSteps;
    let environment;

    before(async (browser) => {
        loginSteps = LoginSteps(browser);
        environment = Environment(browser);
        await environment.openBrowser();
    });

    beforeEach(async (browser) => {
        // Reset to main page before each test
        await browser.url(browser.launch_url);
    });

    it('successfully logs in with valid credentials', async (browser) => {
        await loginSteps.navigateToLogin();
        await loginSteps.login(testUsers.email[0], testUsers.password);
        await loginSteps.verifySuccessfulLogin();
    });

    it('shows error message with incorrect email', async (browser) => {
        await loginSteps.navigateToLogin();
        await loginSteps.attemptInvalidLogin(testUsers.invalidUser, testUsers.password);
    });

    it('shows error message with incorrect password', async (browser) => {
        await loginSteps.navigateToLogin();
        await loginSteps.attemptInvalidLogin(testUsers.email[0], testUsers.invalidPassword);
    });

    after(async (browser) => {
        await environment.closeBrowser();
    });
});