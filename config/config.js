import dotenv from "dotenv";
dotenv.config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    jwtsecret: process.env.JWT_SECRET,
    hostMail: process.env.HOST_MAIL,
    portMail: process.env.PORT_MAIL,
    userMail: process.env.USER_MAIL,
    passwordMail: process.env.PASSWORD_MAIL,
};

export default config;