# Nightwatch Test Suite

## Overview
A robust end-to-end testing framework built with Nightwatch.js, featuring support for Safari (default), Chrome, and Firefox browsers. This framework implements the Page Object Model pattern and includes advanced features like parallel test execution, custom commands, and detailed HTML reporting with GitHub Actions integration.

## Features
- **Multi-browser Support**: Safari (default), Chrome, and Firefox
- **Page Object Model**: Organized and maintainable test structure
- **GitHub Actions Integration**: Automated CI/CD pipeline
- **Custom Commands & Assertions**: Extended test capabilities
- **Parallel Test Execution**: Efficient test runs across browsers
- **HTML Reporting**: Detailed test execution reports
- **Screenshot Capture**: Automatic capture on test failures
- **Environment Management**: Support for multiple test environments
- **Error Handling**: Robust error catching and logging

## Project Structure
```
nightwatch-testsuite/
├── .github/workflows/          # GitHub Actions workflows
│   └── e2e-tests.yml          # E2E test pipeline configuration
├── src/                        # Source code directory
│   ├── components/            # Reusable test components
│   ├── config/               # Configuration files
├── test/                       # Test files directory
│   ├── assertions/            # Custom assertions
│   │   └── containsExactText.js
│   ├── commands/              # Custom commands
│   │   └── waitForElementWithRetry.js
│   ├── data/                  # Test data files
│   │   ├── testData.json     # Test-specific data
│   │   └── userData.json     # User credentials and data
│   ├── env/                   # Environment configurations
│   │   └── stage-env.js
│   ├── globals/              # Global test configurations
│   │   └── globals.js
│   ├── pages/               # Page Object Models
│   │   ├── loginPage.js
│   │   ├── mainPage.js
│   │   └── taskPage.js
│   ├── steps/              # Reusable test steps
│   │   └── login-step.js
│   └── tests/             # Test spec files
│       ├── testLogin.spec.js
│       └── testTodoistLogin.spec.js
├── tests_output/         # Test execution outputs
│   ├── screenshots/     # Test failure screenshots
│   ├── logs/           # Execution logs
│   └── reports/        # HTML test reports
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── nightwatch.conf.js # Nightwatch configuration
└── package.json       # Project dependencies and scripts
```

## Features
- Multi-browser support (Safari, Chrome, Firefox)
- Page Object Model implementation
- Custom commands and assertions
- Parallel test execution
- HTML reporting
- Screenshot capture on failure
- Environment-based configuration
- Reusable test steps
- Data-driven testing support
- Retry mechanism for flaky tests
- Detailed logging

## Prerequisites
- Node.js >= 20.x
- npm >= 9.x
- Safari 16.x+ (for Safari WebDriver)
- Chrome (optional)
- Firefox (optional)
- Git

## Setup

1. Clone the repository:
```bash
git clone https://github.com/CarlosCerv/nightwatch-testsuite.git
cd nightwatch-testsuite
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Enable Safari for automation:
```bash
npm run safaridriver:setup
```

5. Configure Safari:
   - Open Safari
   - Go to Safari > Preferences > Advanced
   - Check "Show Develop menu in menu bar"
   - Go to Develop > Allow Remote Automation

## Configuration

### Environment Variables (.env)
```bash
BASE_URL=https://todoist.com
WAIT_TIMEOUT=10000
RETRY_TIMEOUT=5000
PARALLEL=true
```

### Browser Configuration (nightwatch.conf.js)
- Safari (Default): Uses native SafariDriver
- Chrome: Uses ChromeDriver
- Firefox: Uses GeckoDriver
- Headless: Supports headless Chrome

## Running Tests

### Single Browser
```bash
# Run tests in Safari (default)
npm run test:safari

# Run tests in Chrome
npm run test:chrome

# Run tests in Firefox
npm run test:firefox
```

### Parallel Execution
```bash
# Run tests in all browsers simultaneously
npm run test:parallel
```

### Single Test
```bash
# Run a specific test file
npm run test:single path/to/test.js
```

### Test Reports
- HTML reports are generated in `tests_output/nightwatch-html-report/`
- Screenshots of failures are saved in `tests_output/screenshots/`
- Console logs are available in the terminal output

### GitHub Actions Integration
The repository includes a GitHub Actions workflow (`e2e-tests.yml`) that:
- Runs on push to main/develop branches
- Executes tests in parallel across browsers
- Generates and uploads test reports
- Notifies via Slack on completion (if configured)

## Framework Components

### Page Objects
Located in `test/pages/`, following the Page Object Model pattern:
```javascript
// Example: loginPage.js
module.exports = {
    url: function() {
        return this.api.launch_url + '/auth/login';
    },
    elements: {
        emailInput: {
            selector: 'input[type="email"]',
            locateStrategy: 'css'
        },
        // ...other elements
    },
    commands: [{
        login(email, password) {
            return this
                .setValue('@emailInput', email)
                .setValue('@passwordInput', password)
                .click('@loginButton');
        }
    }]
};
```

### Test Steps
Located in `test/steps/`, containing reusable test steps:
```javascript
// Example: login-step.js
class LoginSteps {
    async login(email, password) {
        await this.loginPage
            .waitForPageReady()
            .login(email, password);
    }
}
```

### Custom Commands
Located in `test/commands/`:
```javascript
// Example: waitForElementWithRetry.js
module.exports.command = function(selector, timeout = 10000, retries = 3) {
    let attemptCount = 0;
    
    const waitWithRetry = () => {
        return this.waitForElementVisible(selector, timeout)
            .catch(error => {
                attemptCount++;
                if (attemptCount < retries) {
                    return waitWithRetry();
                }
                throw error;
            });
    };

    return waitWithRetry();
};
```

### Custom Assertions
Located in `test/assertions/`:
```javascript
// Example: containsExactText.js
exports.assertion = function(selector, expectedText, msg) {
    this.message = msg || `Testing if element <${selector}> contains exact text: "${expectedText}"`;
    this.expected = expectedText;
    
    this.pass = function(value) {
        return value.trim() === this.expected;
    };
};
```

## Test Data Management
- `test/data/userData.json`: User credentials and test user data
- `test/data/testData.json`: Test-specific data and validation messages

## Reporting
- HTML reports generated after each test run
- Screenshots captured on test failures
- Execution logs stored in `tests_output/logs`
- Test results in JUnit XML format

## Best Practices
- Follow the Page Object Model pattern
- Add proper error handling using try-catch blocks
- Include detailed test descriptions
- Use appropriate assertions and wait strategies
- Maintain test data in config files
- Document custom commands and assertions
- Use meaningful variable and function names
- Keep tests atomic and independent
- Implement proper logging
- Follow the project's coding standards

## Contributing
1. Create a branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Create a Pull Request

## Troubleshooting
- **Safari WebDriver Issues**
  - Ensure SafariDriver is enabled (`npm run safaridriver:setup`)
  - Verify Safari settings: Develop > Allow Remote Automation
  - Check Safari version compatibility (16.x+)

- **Test Failures**
  - Check screenshots in `tests_output/screenshots/`
  - Review HTML reports for detailed error messages
  - Verify test environment configurations

- **Configuration Issues**
  - Validate `nightwatch.conf.js` settings
  - Check `.env` file configuration
  - Ensure proper browser driver versions

- **Browser Driver Errors**
  - Update browser drivers to latest versions
  - Check browser compatibility
  - Verify driver executable permissions

## License
This project is licensed under the MIT License.

2. Open the project and run the next command in the terminal to install the libraries from package.json:

   `npm install`

3. In the root folder create a new file with the next name:

   `.env`

4. Open the .env file and add the next variables. In BASE_URL add the home page url, in USER_SUCCESS and PASSWORD_SUCCESS add a valid email and password to login successfully in the todoist application:

   `BASE_URL=https://baseurl.com/`

   `USER_SUCCESS=validuser@email.com`

   `PASSWORD_SUCCESS=validpassword`

## Run the Test Cases Scripts:

5. Open the terminal and add the next commands to run the test scripts:

   `npm run TEST:001_TODOIST_USER_LOGIN_SUCCESS` : run all the test scripts

   `TEST:002_TODOIST_USER_LOGIN_INCORRECT_EMAIL` : run the login form test cases

   `TEST:003_TODOIST_USER_LOGIN_INCORRECT_PASSWORD` : run the creation of tasks test cases

## Create a Report: Run Test with Report

6. First, run the next command to generate a JSON file with the data provided:

   `npm run TEST:003_TODOIST_USER_LOGIN_INCORRECT_PASSWORD --reporter html-reporter.js`

7. Second, to open the HTML report run the next command. It going to open a browser to shows the assertions and results:

   `npm run Test:Login --reporter html-reporter-statistics.js`

## Review Code:

8. To analyzes the JavaScript code and quickly find problems on libraries, run the next command:

   `npm fund fix`

## API Testing:

9. To run the API tests use the next command:

   `npm run test-api`

## Slack Notifications: Integration

10. To run the tests with notifications eneable use the next command:

   `npm install --save-dev nightwatch-slack-reporter`

Options
-------

You can configure Slack reporter options in [test globals] or [configuration file].

```js
options = {
  slack_message: function(results, options) { // function or message string
    return {
      text: 'Test completed, passed ' + results.passed + ', failed ' + results.failed,
      username: 'Nightwatch',
      icon_emoji: ':ghost:'
    } // Message payload or string
  },
  slack_webhook_url: 'https://hooks.slack.com/services/...'
  // This can be specified with SLACK_WEBHOOK_URL environment variable
}
```

Author
------

[Carlos Eduardo Cervantes Arteaga]
Software QA Engineer



## Dependencies:

- nightwatch
- postman (API)
- dotenv
- html-reporter-handlebars
- slack integration
