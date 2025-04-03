import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: Number(process.env.PORT) || 3000,
    HOST: process.env.HOST || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    IS_DEV_ENV: process.env.NODE_ENV === "development",
};
