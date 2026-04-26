import fs from 'fs';
const CAMINHO_ARQUIVO = './src/data/pedidos.json';

export class PedidoSalvar {

    static salvarDados(dados) {
        try {
            const jsonString = JSON.stringify(dados, null, 2);
            fs.writeFileSync(CAMINHO_ARQUIVO, jsonString, 'utf-8');
        } catch (erro) {
            console.error("Erro ao salvar no arquivo JSON:", erro);
        }
    }

    static buscarDados() {
        try {
            if (!fs.existsSync(CAMINHO_ARQUIVO)) return [];

            const dadosRaw = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8');
            return JSON.parse(dadosRaw);
        } catch (erro) {
            console.error("Erro ao ler o arquivo JSON:", erro);
            return [];
        }
    }
}