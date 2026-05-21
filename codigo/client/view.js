import { config } from './linkAPI.js';
class CarrinhoSubject {
    constructor() {
        this.observadores = [];
    }

    inscrever(funcaoObservadora) {
        this.observadores.push(funcaoObservadora);
    }

    notificar() {
        this.observadores.forEach(observador => observador());
    }
}

const carrinhoSubject = new CarrinhoSubject();

async function atualizarTela() {
    try {
        let resposta = await fetch(`${config.API_URL}/pedidos`);

        if (!resposta.ok) {
            console.error("Erro ao buscar dados da API");
            return;
        }

        const dados = await resposta.json();

        let listaHTML = document.getElementById("lista");
        listaHTML.innerHTML = "";

        dados.itens.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = `${item.produto} | Qtd: ${item.qtd} | R$ ${item.preco.toFixed(2)}`;
            listaHTML.appendChild(li);
        });

        document.getElementById("total").innerText = dados.total.toFixed(2);

    } catch (erro) {
        console.error("Erro na comunicação com a API:", erro);
    }
}

carrinhoSubject.inscrever(atualizarTela);

function mostrarOpcoesCorretas() {
    document.getElementById('divPizza').classList.add('escondido');
    document.getElementById('divSuco').classList.add('escondido');
    document.getElementById('divRefri').classList.add('escondido');
    document.getElementById('divSanduiche').classList.add('escondido');

    const categoria = document.getElementById('categoria').value;

    if (categoria === 'pizzap' || categoria === 'pizzam' || categoria === 'pizzag') {
        document.getElementById('divPizza').classList.remove('escondido');
    } else if (categoria === 'suco') {
        document.getElementById('divSuco').classList.remove('escondido');
    } else if (categoria === 'refrigerante') {
        document.getElementById('divRefri').classList.remove('escondido');
    } else if (categoria === 'sanduiche') {
        document.getElementById('divSanduiche').classList.remove('escondido');
    }
}

function obterSaborSelecionado(categoria) {
    if (categoria.includes('pizza')) return document.getElementById('saboresPizza').value;
    if (categoria === 'suco') return document.getElementById('saboresSuco').value;
    if (categoria === 'refrigerante') return document.getElementById('tamanhoRefri').value;
    if (categoria === 'sanduiche') return document.getElementById('saboresSanduiche').value;
    return "";
}

async function clickAdicionarPedido() {
    const categoria = document.getElementById("categoria").value;
    const quantidade = document.getElementById("qtd").value;

    if (!categoria || !quantidade) {
        alert("Preencha a categoria e a quantidade!");
        return;
    }

    const sabor = obterSaborSelecionado(categoria);

    try {
        const resposta = await fetch(`${config.API_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'senha123' },
            body: JSON.stringify({
                produto: categoria,
                sabor: sabor,
                quantidade: quantidade
            })
        });

        const retorno = await resposta.json();

        if (resposta.ok) {
            carrinhoSubject.notificar();
            document.getElementById("qtd").value = "";
        } else {
            alert("Erro: " + retorno.erro);
        }
    } catch (erro) {
        alert("Erro de conexão com o servidor.");
    }
}

async function clickFinalizarPedido() {
    const numeroCliente = document.getElementById("numeroCliente")?.value || "";

    try {
        const resposta = await fetch(`${config.API_URL}/finalizar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'senha123' },
            body: JSON.stringify({ numeroCliente: numeroCliente })
        });

        const retorno = await resposta.json();

        if (resposta.ok) {
            alert(retorno.mensagem + "\nTotal pago: R$ " + retorno.totalPago.toFixed(2));

            if (retorno.linksWhatsapp) {
                if (retorno.linksWhatsapp.enviarParaEstabelecimento) {
                    window.open(retorno.linksWhatsapp.enviarParaEstabelecimento, '_blank');
                }

                if (retorno.linksWhatsapp.enviarParaCliente) {
                    setTimeout(() => {
                        window.open(retorno.linksWhatsapp.enviarParaCliente, '_blank');
                    }, 500);
                }
            }

            carrinhoSubject.notificar();
        } else {
            alert("Erro: " + retorno.erro);
        }
    } catch (erro) {
        alert("Erro de conexão com o servidor.");
    }
}

async function clickRemoverUltimo() {
    try {
        const resposta = await fetch(`${config.API_URL}/remover`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'senha123' 
            }
        });

        const retorno = await resposta.json();

        if (resposta.ok) {
            carrinhoSubject.notificar();
        } else {
            alert("Erro: " + retorno.erro);
        }
    } catch (erro) {
        alert("Erro de conexão com o servidor.");
    }
}

if (typeof window !== 'undefined') {
    window.onload = () => {
        atualizarTela();
    };
}

window.clickAdicionarPedido = clickAdicionarPedido;
window.clickFinalizarPedido = clickFinalizarPedido;
window.clickRemoverUltimo = clickRemoverUltimo;
window.mostrarOpcoesCorretas = mostrarOpcoesCorretas;

export {
    atualizarTela, mostrarOpcoesCorretas, obterSaborSelecionado,
    clickAdicionarPedido, clickFinalizarPedido, clickRemoverUltimo
};