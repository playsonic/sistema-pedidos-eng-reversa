import {
    Desconto,
    DescontoVintePorcento,
    DescontoDezPorcento,
    SemDesconto,
    CalculadoraDeDesconto
} from '../../../../src/modules/payments/services/descontoService.js';

describe('Testes do DescontoService (Padrão Strategy)', () => {

    describe('Interface Abstrata (Desconto)', () => {
        test('Deve lançar erro se tentar usar o método calcular diretamente da classe mãe', () => {
            const descontoBase = new Desconto();

            expect(() => {
                descontoBase.calcular(100);
            }).toThrow("O método 'calcular' deve ser implementado nas classes filhas.");
        });
    });

    describe('Estratégias de Desconto (Classes Filhas)', () => {
        test('DescontoVintePorcento: Deve calcular exatamente 20% do valor', () => {
            const estrategia = new DescontoVintePorcento();
            expect(estrategia.calcular(100)).toBe(20);
            expect(estrategia.calcular(50)).toBe(10);
        });

        test('DescontoDezPorcento: Deve calcular exatamente 10% do valor', () => {
            const estrategia = new DescontoDezPorcento();
            expect(estrategia.calcular(100)).toBe(10);
            expect(estrategia.calcular(50)).toBe(5);
        });

        test('SemDesconto: Deve retornar 0 independente do valor', () => {
            const estrategia = new SemDesconto();
            expect(estrategia.calcular(100)).toBe(0);
            expect(estrategia.calcular(999)).toBe(0);
        });
    });

    describe('Fábrica de Estratégias (CalculadoraDeDesconto)', () => {
        test('Deve retornar DescontoVintePorcento para valores acima de 100', () => {
            const estrategia = CalculadoraDeDesconto.obterEstrategia(101);
            expect(estrategia).toBeInstanceOf(DescontoVintePorcento);
        });

        test('Deve retornar DescontoDezPorcento para valores entre 51 e 100', () => {
            const estrategia = CalculadoraDeDesconto.obterEstrategia(100);
            expect(estrategia).toBeInstanceOf(DescontoDezPorcento);

            const estrategia2 = CalculadoraDeDesconto.obterEstrategia(51);
            expect(estrategia2).toBeInstanceOf(DescontoDezPorcento);
        });

        test('Deve retornar SemDesconto para valores de 50 ou menos', () => {
            const estrategia = CalculadoraDeDesconto.obterEstrategia(50);
            expect(estrategia).toBeInstanceOf(SemDesconto);

            const estrategia2 = CalculadoraDeDesconto.obterEstrategia(10);
            expect(estrategia2).toBeInstanceOf(SemDesconto);
        });
    });

});