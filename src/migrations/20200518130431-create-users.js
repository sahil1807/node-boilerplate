module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    }),

  down: queryInterface => queryInterface.dropTable('users'),
};
