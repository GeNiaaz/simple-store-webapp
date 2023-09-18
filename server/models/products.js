module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 17],
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 90],
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1, 7],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 12],
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 9999,
      },
    },
  });

  return products;
};
