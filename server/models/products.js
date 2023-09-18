module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        min: 0,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: DataTypes.STRING,
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });

  return products;
};
