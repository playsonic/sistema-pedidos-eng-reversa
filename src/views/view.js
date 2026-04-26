function limparHTML() {
    document.getElementById("lista").innerHTML = "";
    document.getElementById("total").innerText = 0;

}

//Funções para o HTML

function atualizarTela() {
    let listaHTML = document.getElementById("lista");
    listaHTML.innerHTML = "";


    for (let i = 0; i < pedidoAtual.itens.length; i++) {
        let item = pedidoAtual.itens[i];
        let li = document.createElement("li");

        li.innerHTML = `${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)}`;
        listaHTML.appendChild(li);
    }


    document.getElementById("total").innerText = pedidoAtual.total.toFixed(2);
}