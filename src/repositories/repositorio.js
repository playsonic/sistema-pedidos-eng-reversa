import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAMINHO_ARQUIVO = path.resolve(__dirname, '..', 'data', 'pedidos.json');
export class PedidoSalvar {

    static async salvarDados(dados) {
        try {
            const jsonString = JSON.stringify(dados, null, 2);
            await fs.writeFile(CAMINHO_ARQUIVO, jsonString, 'utf-8');
        } catch (erro) {
            console.error("Erro ao salvar no arquivo JSON:", erro);
            throw new Error("Não foi possível salvar os dados.");
        }
    }

    static async buscarDados() {
        try {
            
            const dadosRaw = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8');
            return JSON.parse(dadosRaw);
        } catch (erro) {
            if (erro.code === 'ENOENT') {
                return [];
            }
            console.error("Erro ao ler o arquivo JSON:", erro);
            return [];
        }
    }
}