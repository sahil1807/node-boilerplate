/* eslint-disable global-require */
(async () => {
  try {
    // loading env file
    const envPath = `${__dirname}/../../.env`;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'local') {
      process.env.NODE_ENV = 'local';
      // eslint-disable-next-line global-require
      require('dotenv').config({
        path: envPath,
      });
    } else {
      // add logic to get env from your deployed environment
    }

    // Loading main package
    await require('../app');
  } catch (e) {
    // Deal with the fact the chain failed
    console.error('Error', e);
  }
})();
