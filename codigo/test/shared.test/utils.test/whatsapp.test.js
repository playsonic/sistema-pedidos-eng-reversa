import { WhatsappService } from '../../../src/shared/utils/linkWhatsapp.js';
import { jest } from '@jest/globals';

describe('Testes do WhatsappService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Método gerarLinkWaMe()', () => {

        test('Deve gerar o link wa.me removendo caracteres especiais do número', () => {
            const numeroSujo = '+55 (11) 99999-9999';
            const texto = 'Teste simples';

            const link = WhatsappService.gerarLinkWaMe(numeroSujo, texto);

            expect(link).toBe('https://wa.me/5511999999999?text=Teste%20simples');
        });

        test('Deve codificar corretamente o texto com quebras de linha e caracteres especiais', () => {
            const numero = '5511999999999';
            const textoComplicado = 'Olá!\n\nSeu total é R$ 50,00.';

            const link = WhatsappService.gerarLinkWaMe(numero, textoComplicado);

            expect(link).toContain('text=Ol%C3%A1!%0A%0ASeu%20total%20%C3%A9%20R%24%2050%2C00.');
        });

    });
});