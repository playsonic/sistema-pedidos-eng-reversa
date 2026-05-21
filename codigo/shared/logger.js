export const logger = {
    info: (mensagem) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${mensagem}`);
    },
    erro: (mensagem, erroOriginal = '') => {
        console.error(`[ERRO] ${new Date().toISOString()} - ${mensagem}`, erroOriginal);
    }
};