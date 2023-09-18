module.exports = (sequelize, DataTypes) => {
  const logs = sequelize.define("logs", {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "product_id",
      },
      allowNull: false,
    },
    action: DataTypes.STRING,
    details: DataTypes.STRING,
  });

  return logs;
};
