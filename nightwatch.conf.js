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
        },
        start_process: true
      },
      globals: {
        waitForConditionTimeout: 15000,
        retryAssertionTimeout: 5000,
        throwOnMultipleElementsReturned: false
      }
    },
    
    chrome: {
      webdriver: {
        server_path: process.env.CHROMEDRIVER_PATH || require('chromedriver').path,
        port: 9515,
        cli_args: [
          '--verbose',
          '--log-level=DEBUG'
        ],
        timeout_options: {
          timeout: 60000,
          retry_attempts: 5
        },
        check_process: true
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
            '--window-size=1920,1080',
            '--enable-logging',
            '--v=1'
          ],
          w3c: true,
          excludeSwitches: ['enable-logging'],
          prefs: {
            'download.default_directory': '/tmp',
            'download.prompt_for_download': false
          }
        },
        acceptInsecureCerts: true,
        acceptSslCerts: true
      },
      globals: {
        waitForConditionTimeout: 15000,
        retryAssertionTimeout: 5000,
        throwOnMultipleElementsReturned: false
      }
    },
    
    safari: {
      webdriver: {
        server_path: process.env.SAFARI_DRIVER_PATH || '/usr/bin/safaridriver',
        port: 4444,
        host: 'localhost',
        check_process: true,
        default_path_prefix: '',
        timeout_options: {
          timeout: 60000,
          retry_attempts: 5
        },
        cli_args: [
          '--diagnose'
        ]
      },
      desiredCapabilities: {
        browserName: 'safari',
        platformName: 'macOS',
        'safari:options': {
          cleanSession: true
        },
        acceptInsecureCerts: true
      },
      globals: {
        waitForConditionTimeout: 15000,
        retryAssertionTimeout: 5000,
        throwOnMultipleElementsReturned: false
      }
    },
    
    firefox: {
      webdriver: {
        server_path: process.env.GECKODRIVER_PATH || require('geckodriver').path,
        port: 4444,
        cli_args: [
          '--log', 'trace',
          '--marionette-port', '2828'
        ]
      },
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['--headless'],
          prefs: {
            'browser.startup.homepage': 'about:blank',
            'browser.startup.page': 0
          }
        },
        acceptInsecureCerts: true,
        marionette: true
      }
    }
  }
};
