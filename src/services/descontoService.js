
export class Desconto {
    calcular(valor) {
        throw new Error("O método 'calcular' deve ser implementado nas classes filhas.");
    }
}

export class DescontoVintePorcento extends Desconto {
    calcular(valor) {
        return valor * 0.20;
    }
}

export class DescontoDezPorcento extends Desconto {
    calcular(valor) {
        return valor * 0.10;
    }
}

export class SemDesconto extends Desconto {
    calcular(valor) {
        return 0;
    }
}

export class CalculadoraDeDesconto {
    static obterEstrategia(total) {
        if (total > 100) {
            return new DescontoVintePorcento();
        }
        if (total > 50) {
            return new DescontoDezPorcento();
        }
        return new SemDesconto();
    }
}