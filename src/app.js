// Load this package first because it will load environment variables
const express = require('express');
const path = require('path');
const config = require('./config');
const Logger = require('./config/Logger');
const initLoader = require('./loaders');

Logger.init({ level: config.logs.level });

global.appRoot = path.resolve(__dirname);

(async () => {
  try {
    const app = express();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     * */
    await initLoader({ expressApp: app });

    app.listen(config.port, err => {
      if (err) {
        Logger.log('error', '', err);
        process.exit(1);
        return;
      }
      Logger.log(
        'info',
        `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `,
      );
    });
  } catch (e) {
    // Deal with the fact the chain failed
    Logger.log('error', '', e);
  }
})();
