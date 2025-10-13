/**
 * Page object for the login page.
 * Contains element selectors and methods for interacting with the login page.
 */
module.exports = {
    url: function() {
        return this.api.launch_url + '/auth/login';
    },

    elements: {
        // Form elements - using better selector strategies
        emailInput: {
            selector: '//*[@id="element-0"]',
            locateStrategy: 'xpath',
        },
        passwordInput: {
            selector: '//*[@id="element-2"]',
            locateStrategy: 'xpath',
        },
        loginButton: {
            selector: '//*[@id="todoist_app"]/div/div/div[2]/div[1]/div/div/form/button',
            locateStrategy: 'xpath',
        },
        keepLoggedInCheckbox: {
            selector: '#permanent_login',
            locateStrategy: 'css',
        },

        // Social login buttons
        googleLoginButton: {
            selector: '//span[text()="Continue with Google"]',
            locateStrategy: 'xpath',
        },
        facebookLoginButton: {
            selector: '//span[text()="Continue with Facebook"]',
            locateStrategy: 'xpath',
        },
        appleLoginButton: {
            selector: '//span[text()="Continue with Apple"]',
            locateStrategy: 'xpath',
        },

        // Validation elements
        errorMessage: {
            selector: '//*[@id="element-3"]',
            locateStrategy: 'xpath',
        },
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