
export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    db: {
        port: parseInt(process.env.DATABASE_PORT, 10) || 3001,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        schema: process.env.DATABASE_SCHEMA,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
});