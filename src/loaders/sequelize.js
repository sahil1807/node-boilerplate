const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');
const Sequelize = require('sequelize');

const config = require('../config');

const basename = path.basename(__filename);
const models = {};

const modelsPath = `${__dirname}/../models`;

Sequelize.Promise.config({
  longStackTraces: true,
});

const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
});

fs.readdirSync(modelsPath)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(modelsPath, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.runMigration = async function() {
  return new Promise((resolve, reject) => {
    if (process.env.AUTO_MIGRATE && process.env.AUTO_MIGRATE.toLowerCase() === 'true') {
      cmd.get('sequelize-cli db:migrate', (err, data, stderr) => {
        if (err) {
          reject(err);
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(data);
        }
      });
    } else {
      resolve();
    }
  });
};

module.exports = {
  sequelize,
  models,
};
