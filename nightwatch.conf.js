require('dotenv').config();

module.exports = {
  src_folders: ['src/tests/e2e'],
  page_objects_path: ['src/pages'],
  custom_commands_path: ['src/lib/commands'],
  custom_assertions_path: ['src/lib/assertions'],
  
  test_settings: {
    default: {
      launch_url: process.env.BASE_URL || 'https://todoist.com',
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'tests_output/screenshots'
      },
      webdriver: {
        timeout_options: {
          timeout: 60000,
          retry_attempts: 3
        }
      }
    },
    
    chrome: {
      webdriver: {
        start_process: true,
        server_path: process.env.CHROMEDRIVER_PATH || require('chromedriver').path,
        port: 9515,
        cli_args: [
          '--verbose'
        ]
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--no-sandbox',
            '--headless=new',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--window-size=1920,1080'
          ],
          w3c: true
        },
        acceptInsecureCerts: true
      },
      globals: {
        waitForConditionTimeout: 10000,
        retryAssertionTimeout: 5000
      }
    },
    
    safari: {
      webdriver: {
        start_process: true,
        server_path: process.env.SAFARI_DRIVER_PATH || '/usr/bin/safaridriver',
        port: 4444,
        host: 'localhost',
        cli_args: [
          '--port', '4444',
          '--diagnostic-logging'
        ]
      },
      desiredCapabilities: {
        browserName: 'safari',
        'safari:options': {
          automaticInspection: false,
          automaticProfiling: false,
          acceptInsecureCerts: true
        },
        acceptSslCerts: true
      },
      globals: {
        waitForConditionTimeout: 10000,
        retryAssertionTimeout: 5000
      }
    },
    
    firefox: {
      webdriver: {
        start_process: true,
        server_path: process.env.GECKODRIVER_PATH || require('geckodriver').path,
        port: 4444,
        cli_args: [
          '--log', 'trace',
          '--marionette-port', '2828'
        ],
        skip_testcases_on_fail: false
      },
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['--headless'],
          binary: process.env.FIREFOX_BINARY,
          prefs: {
            'browser.startup.homepage': 'about:blank',
            'browser.startup.page': 0,
            'browser.startup.homepage_override.mstone': 'ignore'
          },
          log: { level: 'trace' }
        },
        acceptInsecureCerts: true,
        marionette: true
      },
      globals: {
        waitForConditionTimeout: 10000,
        retryAssertionTimeout: 5000,
        throwOnMultipleElementsReturned: false
      }
    }
  }
};
