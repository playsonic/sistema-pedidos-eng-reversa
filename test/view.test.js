/**
 * @jest-environment jsdom
 */
/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals'; 
import {
    atualizarTela,
    mostrarOpcoesCorretas,
    obterSaborSelecionado,
    clickAdicionarPedido
} from '../src/views/view.js';

global.fetch = jest.fn();
global.alert = jest.fn();

describe('Testes do Front-end (view.js)', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        document.body.innerHTML = `
            <select id="categoria">
                <option value="pizzap">Pizza P</option>
                <option value="suco">Suco</option>
            </select>
            <input id="qtd" value="">
            <input id="numeroCliente" value="5511999999999">
            
            <div id="divPizza" class="escondido">
                <select id="saboresPizza"><option value="calabresa">Calabresa</option></select>
            </div>
            <div id="divSuco" class="escondido">
                <select id="saboresSuco"><option value="uva">Uva</option></select>
            </div>
            <div id="divRefri" class="escondido">
                <select id="tamanhoRefri"><option value="lata">Lata</option></select>
            </div>
            <div id="divSanduiche" class="escondido">
                <select id="saboresSanduiche"><option value="misto">Misto</option></select>
            </div>

            <ul id="lista"></ul>
            <span id="total">0.00</span>
        `;
    });

    describe('mostrarOpcoesCorretas()', () => {
        test('Deve mostrar apenas as opções de Suco quando Suco for selecionado', () => {
            // Simulamos o usuário selecionando "suco"
            document.getElementById('categoria').value = 'suco';

            mostrarOpcoesCorretas();

            expect(document.getElementById('divPizza').classList.contains('escondido')).toBe(true);
            expect(document.getElementById('divSuco').classList.contains('escondido')).toBe(false);
        });
    });

    describe('obterSaborSelecionado()', () => {
        test('Deve pegar o sabor correto do select de pizzas', () => {
            document.getElementById('saboresPizza').value = 'calabresa';

            const sabor = obterSaborSelecionado('pizzag');
            expect(sabor).toBe('calabresa');
        });
    });

    describe('atualizarTela()', () => {
        test('Deve buscar os dados na API e desenhar a lista no HTML', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    itens: [{ produto: 'suco uva', qtd: 2, preco: 4.00 }],
                    total: 8.00
                })
            });

            await atualizarTela();

            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/pedidos');

            const listaHTML = document.getElementById('lista').innerHTML;
            expect(listaHTML).toContain('suco uva');
            expect(listaHTML).toContain('Qtd: 2');

            expect(document.getElementById('total').innerText).toBe('8.00');
        });
    });

    describe('clickAdicionarPedido()', () => {
        test('Deve disparar um alert se tentar adicionar sem quantidade', async () => {
            document.getElementById('categoria').value = 'pizzap';
            document.getElementById('qtd').value = ''; 

            await clickAdicionarPedido();

            expect(global.alert).toHaveBeenCalledWith("Preencha a categoria e a quantidade!");
            expect(global.fetch).not.toHaveBeenCalled(); 
        });

        test('Deve enviar os dados para a API (POST) e limpar o campo quantidade', async () => {
            document.getElementById('categoria').value = 'suco';
            document.getElementById('saboresSuco').value = 'uva';
            document.getElementById('qtd').value = '2';

            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => ({ mensagem: "Produto adicionado com sucesso!" })
            });

            await clickAdicionarPedido();

            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/pedidos', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ produto: 'suco', sabor: 'uva', quantidade: '2' })
            }));

            expect(document.getElementById('qtd').value).toBe('');
        });
    });
});