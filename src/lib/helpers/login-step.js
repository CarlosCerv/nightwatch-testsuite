const testData = require('../../config/data/testData.json');
const testUsers = require('../../config/data/userData.json');

/**
 * Login Steps class to handle all login-related functionality
 */
class LoginSteps {
    constructor(browser) {
        this.browser = browser;
        this.loginPage = browser.page.loginPage();
        this.mainPage = browser.page.mainPage();
    }

    async validateMainPage() {
        try {
            await this.mainPage
                .waitForElementVisible('body')
                .assert.visible('@logoTodoist')
                .assert.visible('@loginButton');
        } catch (error) {
            console.error('Error validating main page:', error);
            throw error;
        }
    }

    async mainPageDisplayed() {
        await this.validateMainPage();
    }

    async navigateToLogin() {
        try {
            await this.mainPageDisplayed();
            await this.mainPage
                .waitForElementVisible('@loginButton')
                .click('@loginButton')
                .assert.urlContains('/auth/login');
        } catch (error) {
            console.error('Error navigating to login page:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            await this.loginPage
                .waitForElementVisible('@emailInput')
                .setValue('@emailInput', email)
                .setValue('@passwordInput', password)
                .click('@loginButton');
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async attemptInvalidLogin(email, password, expectedError = testData.EmailWrongText) {
        try {
            await this.login(email, password);
            await this.loginPage
                .waitForElementVisible('@errorLoginText')
                .assert.textContains('@errorLoginText', expectedError);
        } catch (error) {
            console.error('Error attempting invalid login:', error);
            throw error;
        }
    }

    async loginWithStandardUser() {
        try {
            await this.login(testUsers.email[0], testUsers.password);
            await this.verifySuccessfulLogin();
        } catch (error) {
            console.error('Error logging in with standard user:', error);
            throw error;
        }
    }

    async verifySuccessfulLogin() {
        try {
            await this.browser
                .assert.urlContains('/app')
                .assert.not.elementPresent('@errorMessage');

            await this.mainPage
                .waitForElementVisible('@homeBtnApp')
                .assert.visible('@homeBtnApp');
        } catch (error) {
            console.error('Error verifying successful login:', error);
            throw error;
        }
    }

    async clearLoginFields() {
        try {
            await this.loginPage
                .clearValue('@emailInput')
                .clearValue('@passwordInput');
        } catch (error) {
            console.error('Error clearing login fields:', error);
            throw error;
        }
    }

    async verifyLoginPage() {
        try {
            await this.loginPage
                .waitForElementVisible('@emailInput')
                .assert.visible('@emailInput')
                .assert.visible('@passwordInput')
                .assert.visible('@loginButton')
                .assert.visible('@googleAccess')
                .assert.visible('@facebookAccess')
                .assert.visible('@appleAccess');
        } catch (error) {
            console.error('Error verifying login page:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.mainPage
                .waitForElementVisible('@userOptn')
                .click('@userOptn')
                .waitForElementVisible('@logOut')
                .click('@logOut');
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }
}

module.exports = (browser) => new LoginSteps(browser);
