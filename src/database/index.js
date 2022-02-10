const 
  Sequelize = require('sequelize');
  config = require('config');

const dbConf = config.get('database');
console.log(dbConf);

// const sequelize = new Sequelize ("codica","postgres","admin",{host:"localhost", dialect:"postgres"});

const sequelize = new Sequelize(dbConf.database, dbConf.user, dbConf.password,{
  dialect: 'postgres',
  host: dbConf.host,
  port: dbConf.port,
  logging: console.log
});

sequelize.Model = Sequelize.Model;
const models = {
  User :require(__dirname+ '/models/user.js')(sequelize, Sequelize.DataTypes),
  Service : require(__dirname + '/models/service.js')(sequelize, Sequelize.DataTypes),
  Subscriber :require(__dirname+ '/models/subscriber.js')(sequelize, Sequelize.DataTypes),  
};

for(const model in models) {
 models[model].defineConstraints(models);
}

models.Op = Sequelize.Op;
models.sequelize = sequelize;

module.exports = models;