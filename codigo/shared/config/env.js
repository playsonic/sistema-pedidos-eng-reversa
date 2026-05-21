import dotenv from 'dotenv';
dotenv.config();

export let envConfig = {
    port: process.env.PORT || 3000,
    numeroDono: process.env.NUMERO_DONO
};