import { WhatsappService } from '../src/services/whatsapp.js';
import { jest } from '@jest/globals';
global.fetch = jest.fn();

describe('Testes do WhatsappService', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        
        WhatsappService.TOKEN = 'token_de_teste_123';
        WhatsappService.PHONE_ID = 'id_telefone_teste';
    });

    test('Deve enviar mensagem com sucesso e formatar o número (remover traços e espaços)', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ messages: [{ id: 'wamid.123' }] })
        });

        const numeroSujo = '+55 (11) 99999-9999'; 
        const texto = 'Olá, este é um teste!';

        const resultado = await WhatsappService.enviarMensagem(numeroSujo, texto);

        expect(resultado).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(1);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://graph.facebook.com/v17.0/id_telefone_teste/messages',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer token_de_teste_123',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: "5511999999999",
                    type: "text",
                    text: { body: texto }
                })
            })
        );
    });

    test('Deve lançar erro padrão se a API do Facebook retornar falha (resposta.ok = false)', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => ({ error: { message: 'Token expirado' } })
        });

        await expect(WhatsappService.enviarMensagem('5511999999999', 'Teste'))
            .rejects
            .toThrow('Falha ao enviar mensagem no WhatsApp.');
    });

    test('Deve repassar o erro se ocorrer uma falha de rede (ex: servidor sem internet)', async () => {
        const erroDeRede = new Error('Falha de conexão com a internet');
        global.fetch.mockRejectedValue(erroDeRede);

        await expect(WhatsappService.enviarMensagem('5511999999999', 'Teste'))
            .rejects
            .toThrow('Falha de conexão com a internet');
    });

});