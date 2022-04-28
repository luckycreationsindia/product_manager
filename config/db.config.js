module.exports = {
    HOST: process.env.MONGO_DB_IP || "0.0.0.0",
    PORT: 27017,
    DB: process.env.DB_NAME || "product_manager"
};