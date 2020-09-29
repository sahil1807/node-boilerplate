module.exports = (queryInterface, DataTypes) => {
  const User = queryInterface.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  User.associate = () => {
    // User.belongsTo(models.author);
  };

  return User;
};
