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
        server_path: require('chromedriver').path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu'
          ]
        }
      }
    },
    
    safari: {
      webdriver: {
        start_process: true,
        server_path: '/usr/bin/safaridriver',
        port: 4444
      },
      desiredCapabilities: {
        browserName: 'safari',
        'safari:options': {
          automaticInspection: false
        }
      }
    },
    
    firefox: {
      webdriver: {
        start_process: true,
        server_path: require('geckodriver').path,
        port: 4444,
        cli_args: ['--log', 'debug']
      },
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['--headless']
        }
      }
    }
  }
};
