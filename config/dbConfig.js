module.exports = {
    HOST:'localhost',
    USER: 'postgres',
    PASSWORD: 'postom123',
    DB: 'task',
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    secretJWT : "thisismysecretKey",
    // user:'captainpandey101002@gmail.com',
    // pass:'mhdvkuvqwtgzijfe'

}