require('dotenv').config();

module.exports = {
  // Test file patterns
  src_folders: ['src/tests/e2e', 'src/tests/integration'],
  page_objects_path: ['src/pages', 'src/components'],
  custom_commands_path: ['src/lib/commands', 'src/lib/helpers'],
  custom_assertions_path: ['src/lib/assertions'],
  
  // Global settings
  globals_path: 'src/config/globals.js',
  persist_globals: true,
  
  // Output settings
  output_folder: 'tests_output',
  disable_colors: false,


  
  test_settings: {
    default: {
      launch_url: process.env.BASE_URL || 'https://todoist.com',
      
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'tests_output/screenshots',
        filename_prefix: 'test_'
      },

      webdriver: {
        start_process: true,
        port: 4444,
        server_path: '/usr/bin/safaridriver',
      },
      
      desiredCapabilities: {
        browserName: 'safari',
        platformName: 'macOS',
        'safari:options': {
          automaticInspection: false,
          automaticProfiling: false,
        }
      },
      
      globals: {
        waitForConditionTimeout: process.env.WAIT_TIMEOUT || 10000,
        retryAssertionTimeout: process.env.RETRY_TIMEOUT || 5000,
        throwOnMultipleElementsReturned: false,
        abortOnAssertionFailure: false,
        suppressWarningsOnMultipleElementsReturned: true
      },
      
      skip_testcases_on_fail: false,
      end_session_on_fail: false
    },

    chrome: {
      webdriver: {
        start_process: true,
        server_path: require('chromedriver').path,
        port: 9515,
        log_path: 'tests_output/logs'
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          args: [
            '--no-sandbox',
            '--window-size=1920,1080',
            '--disable-gpu',
            '--disable-dev-shm-usage'
          ],
          excludeSwitches: ['enable-automation']
        },
        acceptInsecureCerts: true
      }
    },

    headless: {
      extends: 'chrome',
      desiredCapabilities: {
        'goog:chromeOptions': {
          args: [
            '--headless',
            '--no-sandbox',
            '--disable-gpu',
            '--window-size=1920,1080',
            '--disable-dev-shm-usage'
          ]
        }
      }
    },

    firefox: {
      webdriver: {
        start_process: true,
        server_path: require('geckodriver').path,
        port: 4444,
        host: 'localhost'
      },
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: [
            '--window-size=1920,1080'
          ],
          prefs: {
            'browser.download.dir': './tests_output/downloads',
            'browser.download.folderList': 2,
            'browser.download.manager.showWhenStarting': false
          }
        },
        acceptInsecureCerts: true
      }
    },

    safari: {
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: '/usr/bin/safaridriver',
      },
      desiredCapabilities: {
        browserName: 'safari',
        platformName: 'macOS',
        'safari:options': {
          automaticInspection: false,
          automaticProfiling: false,
        }
      }
    }
  },

  test_runner: {
    type: 'mocha',
    options: {
      ui: 'bdd',
      reporter: 'config/html-reporter/html-reporter.js',
      reporterOptions: {
        filename: 'tests_output/report.html',
        openBrowser: true,
        reportsDirectory: 'tests_output/reports',
        themeName: 'default',
        preserveDescribeNesting: true,
        saveHtml: true,
        saveJson: true
      },
      timeout: 60000
    }
  },

  test_workers: {
    enabled: process.env.PARALLEL === 'true',
    workers: 'auto',
    detailed_output: false
  }
};