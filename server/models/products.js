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
      validate: {
        len: [1, 17],
      },
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1, 7],
      },
    },
    category: DataTypes.STRING,
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
  });

  return products;
};
