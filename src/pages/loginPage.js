/**
 * Page object for the login page.
 * Contains element selectors and methods for interacting with the login page.
 */
module.exports = {
    url: function() {
        return this.api.launch_url + '/auth/login';
    },

    elements: {
        // Form elements - using robust CSS selectors based on attributes
        emailInput: 'input[type="email"]',
        passwordInput: 'input[type="password"]',
        loginButton: 'button[type="submit"]',
        keepLoggedInCheckbox: 'input[type="checkbox"][name*="permanent"]',

        // Social login buttons - using CSS selectors with data attributes or classes
        googleLoginButton: 'button[data-provider="google"], a[href*="google"]',
        facebookLoginButton: 'button[data-provider="facebook"], a[href*="facebook"]',
        appleLoginButton: 'button[data-provider="apple"], a[href*="apple"]',

        // Validation elements
        errorMessage: '.error, [class*="error"], [data-testid*="error"]',
    },

    commands: [{
        /**
         * Login with email and password
         * @param {string} email - User's email
         * @param {string} password - User's password
         * @param {boolean} keepLoggedIn - Whether to keep user logged in
         * @returns {object} - Page object for chaining
         */
        login(email, password, keepLoggedIn = false) {
            this
                .waitForElementVisible('@emailInput')
                .setValue('@emailInput', email)
                .waitForElementVisible('@passwordInput')
                .setValue('@passwordInput', password);

            if (keepLoggedIn) {
                this.click('@keepLoggedInCheckbox');
            }

            return this
                .waitForElementVisible('@loginButton')
                .click('@loginButton');
        },

        /**
         * Verify that login error message is displayed
         * @param {string} expectedMessage - Expected error message
         * @returns {object} - Page object for chaining
         */
        verifyLoginError(expectedMessage) {
            return this
                .waitForElementVisible('@errorMessage')
                .assert.textContains('@errorMessage', expectedMessage);
        },

        /**
         * Login with a social provider
         * @param {string} provider - Social provider (google, facebook, apple)
         * @returns {object} - Page object for chaining
         */
        socialLogin(provider) {
            const buttonMap = {
                google: '@googleLoginButton',
                facebook: '@facebookLoginButton',
                apple: '@appleLoginButton'
            };

            const button = buttonMap[provider.toLowerCase()];
            if (!button) {
                throw new Error(`Unsupported social login provider: ${provider}`);
            }

            return this
                .waitForElementVisible(button)
                .click(button);
        },

        /**
         * Wait for page to be ready
         * @returns {object} - Page object for chaining
         */
        waitForPageReady() {
            return this
                .waitForElementPresent('@emailInput')
                .waitForElementPresent('@passwordInput')
                .waitForElementPresent('@loginButton');
        }
    }]
};
