import { jest } from '@jest/globals';

jest.unstable_mockModule('fs/promises', () => ({
    default: {
        writeFile: jest.fn(),
        readFile: jest.fn()
    }
}));

const fs = (await import('fs/promises')).default;
const { PedidoSalvar } = await import('../../src/repositories/repositorio.js');


describe('Testes do PedidoSalvar (Repository)', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('salvarDados()', () => {
        test('Deve converter os dados para JSON e salvar no arquivo', async () => {
            const dadosMock = { total: 50, itens: [{ produto: 'suco', qtd: 1 }] };

            fs.writeFile.mockResolvedValue();

            await PedidoSalvar.salvarDados(dadosMock);

            expect(fs.writeFile).toHaveBeenCalledTimes(1);

            expect(fs.writeFile).toHaveBeenCalledWith(
                expect.any(String),
                JSON.stringify(dadosMock, null, 2),
                'utf-8'
            );
        });

        test('Deve lançar erro genérico se o writeFile falhar', async () => {
            fs.writeFile.mockRejectedValue(new Error("Disco cheio"));

            await expect(PedidoSalvar.salvarDados({}))
                .rejects
                .toThrow("Não foi possível salvar os dados.");
        });
    });

    describe('buscarDados()', () => {
        test('Deve ler o arquivo, converter de JSON e retornar os dados', async () => {
            const dadosEsperados = { total: 30, itens: [] };
            const jsonString = JSON.stringify(dadosEsperados);

            fs.readFile.mockResolvedValue(jsonString);

            const resultado = await PedidoSalvar.buscarDados();

            expect(fs.readFile).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(dadosEsperados);
        });

        test('Deve retornar um array vazio [] se o arquivo não existir (Erro ENOENT)', async () => {
            const erroEnoent = new Error("Arquivo não encontrado");
            erroEnoent.code = 'ENOENT';

            fs.readFile.mockRejectedValue(erroEnoent);

            const resultado = await PedidoSalvar.buscarDados();

            expect(resultado).toEqual([]);
        });

        test('Deve retornar um array vazio [] para qualquer outro tipo de erro de leitura', async () => {
            fs.readFile.mockRejectedValue(new Error("Erro bizarro de leitura"));

            const resultado = await PedidoSalvar.buscarDados();

            expect(resultado).toEqual([]);
        });
    });
});