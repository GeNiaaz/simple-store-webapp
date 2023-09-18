module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define("auth", {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 17],
      },
    },
    password_hash: {
      type: DataTypes.STRING(64),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  });

  return auth;
};
