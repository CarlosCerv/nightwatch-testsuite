/**
 * Page object for the login page.
 * Contains element selectors and methods for interacting with the login page.
 */
module.exports = {
    url: function() {
        return this.api.launch_url + '/auth/login';
    },

    elements: {
        // Form elements - using CSS selectors for better performance and maintainability
        emailInput: '#element-0',
        passwordInput: '#element-2',
        loginButton: 'button[type="submit"]', // Assuming it's a submit button
        keepLoggedInCheckbox: '#permanent_login',

        // Social login buttons - using CSS selectors with text content
        googleLoginButton: 'span:has-text("Continue with Google")',
        facebookLoginButton: 'span:has-text("Continue with Facebook")',
        appleLoginButton: 'span:has-text("Continue with Apple")',

        // Validation elements
        errorMessage: '#element-3',
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
