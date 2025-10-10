/**
 * Login step definitions
 * Contains reusable login-related test steps
 */

const testData = require('../../config/data/testData.json');
const testUsers = require('../../config/data/userData.json');

class LoginSteps {
    constructor(browser) {
        this.browser = browser;
        this.loginPage = browser.page.loginPage();
        this.mainPage = browser.page.mainPage();
    }

    /**
     * Wait for main page elements to be visible
     * @returns {Promise<void>}
     */
    async validateMainPage() {
        try {
            await this.mainPage
                .waitForElementVisible('@logoTodoist')
                .assert.visible('@logoTodoist')
                .assert.visible('@loginButton');
        } catch (error) {
            console.error('Error validating main page:', error);
            throw error;
        }
    }

    /**
     * Navigate to the login page
     * @returns {Promise<void>}
     */
    async navigateToLogin() {
        try {
            await this.validateMainPage();
            await this.mainPage
                .waitForElementVisible('@loginButton')
                .click('@loginButton')
                .assert.urlContains('/auth/login');
        } catch (error) {
            console.error('Error navigating to login page:', error);
            throw error;
        }
    }

    /**
     * Perform login with given credentials
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @param {boolean} keepLoggedIn - Whether to keep user logged in
     * @returns {Promise<void>}
     */
    async login(email, password, keepLoggedIn = false) {
        try {
            await this.loginPage
                .waitForPageReady()
                .login(email, password, keepLoggedIn);
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    /**
     * Attempt login with invalid credentials
     * @param {string} email - Invalid email
     * @param {string} password - Password
     * @param {string} expectedError - Expected error message
     * @returns {Promise<void>}
     */
    async attemptInvalidLogin(email, password, expectedError = testData.EmailWrongText) {
        try {
            await this.loginPage
                .waitForPageReady()
                .login(email, password)
                .verifyLoginError(expectedError);
        } catch (error) {
            console.error('Error attempting invalid login:', error);
            throw error;
        }
    }

    /**
     * Attempt login with standard user
     * @returns {Promise<void>}
     */
    async loginWithStandardUser() {
        try {
            await this.login(testUsers.email[0], testUsers.password);
            await this.verifySuccessfulLogin();
        } catch (error) {
            console.error('Error logging in with standard user:', error);
            throw error;
        }
    }

    /**
     * Attempt login with invalid password
     * @returns {Promise<void>}
     */
    async attemptLoginWithInvalidPassword() {
        try {
            await this.attemptInvalidLogin(
                testUsers.email[0],
                testUsers.invalidPassword,
                testData.PasswordWrongText
            );
        } catch (error) {
            console.error('Error attempting login with invalid password:', error);
            throw error;
        }
    }

    /**
     * Verify successful login
     * @returns {Promise<void>}
     */
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
}

module.exports = (browser) => new LoginSteps(browser);

        //LOGIN INVALID PASSWORD
        this.setInvalidPassword = async () => {
            await loginPage.waitForElementVisible('@email')
            await loginPage.waitForElementVisible('@password')
            await loginPage.assert.visible('@email')
            await loginPage.click('@email')
            await loginPage.setValue('@email', usersTest.email[0])
            await loginPage.assert.visible('@password')
            await loginPage.click('@password')
            await loginPage.setValue('@password', usersTest.invalidPassword)
            await loginPage.assert.visible('@loginbutton')
            await loginPage.click('@loginbutton')
            await loginPage.waitForElementVisible('@errorLoginText',10000)
            await loginPage.assert.visible('@errorLoginText')
            await loginPage.assert.textContains('@errorLoginText',dataTest.EmailWrongText)
        };

        //VALIDATIONS SUCCESS
        this.successLogin = async () => {
            await mainPage.waitForElementVisible('@homeBtnApp')
            await mainPage.assert.visible('@homeBtnApp')
        };

        //VALIDATE MAIN PAGE VIEW ACCESS
        this.mainPageDisplayed = async () => {
            await mainPage.waitForElementVisible('@logoTodoist')
            await mainPage.assert.visible('@logoTodoist')
            await mainPage.assert.visible('@loginButton')
        };

        //VALIDATE INVALID USER BY EMAIL
        this.invalidUser = async () => {
            await loginPage.assert.visible('@errorLoginText')
            await loginPage.assert.containsText('@errorLoginText',dataTest.EmailWrongText)
        };

        //INVALID USER VALIDATION
        this.loginInvalidUser = async () => {
            await this.setCredentials()
            await this.invalidUser()
            await this.clearFields()
        };

        //CLEAR FIELDS IN LOGIN PAGE
        this.clearFields = async () => {
            await loginPage.clearValue('@email')
            await loginPage.clearValue('@password')
        };

        //VALIDATE LOGIN FORM 
        this.loginPageDisplayed = async ()  => {
            await loginPage.assert.visible('@email')
            await loginPage.assert.visible('@password')
            await loginPage.assert.visible('@loginbutton')
            await loginPage.assert.visible('@googleAccess')
            await loginPage.assert.visible('@facebookAccess')
            await loginPage.assert.visible('@appleAccess')
        };

        //NAVIGATE TO LOGOUT FUNCTION
        this.goToLogOut = async () => {
            await mainPage.assert.visible('@userOptn')
            await mainPage.verify.visible('@userOptn')
            await mainPage.click('@userOptn')
        }

        //LOG OUT 
        this.logOut = async () => {
            await mainPage.assert.visible('@logOut')
            await mainPage.click('@logOut')
        };

     return this;