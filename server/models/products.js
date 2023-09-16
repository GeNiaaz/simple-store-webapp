module.exports = (sequelize,DataTypes) => {

    const products = sequelize.define('products',{

        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        category: DataTypes.STRING,
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return products;
}