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
        server_path: process.env.CHROMEDRIVER_PATH || (() => {
          try {
            return require('chromedriver').path;
          } catch (e) {
            console.error('ChromeDriver not found:', e.message);
            return null;
          }
        })(),
        port: 9515,
        cli_args: ['--verbose']
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer'
          ],
          w3c: true
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
        server_path: process.env.GECKODRIVER_PATH || require('geckodriver').path,
        port: 4444,
        cli_args: [
          '--log', 'debug',
          '--host', 'localhost'
        ]
      },
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: [
            '--headless',
            '--no-sandbox',
            '--disable-gpu',
            '--window-size=1920,1080'
          ],
          prefs: {
            'browser.download.folderList': 2,
            'browser.download.manager.showWhenStarting': false,
            'browser.download.dir': '/tmp',
            'browser.helperApps.neverAsk.saveToDisk': 'application/octet-stream'
          },
          log: { level: 'trace' }
        },
        acceptInsecureCerts: true,
        timeouts: { implicit: 5000, pageLoad: 10000, script: 10000 }
      }
    }
  }
};
