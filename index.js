let carrinho = [];
let total = 0;

function adicionarItem(nome, preco){
    carrinho.push({ nome, preco });

    total += preco;

    atualizarCarrinho();
}

function excluirItem(nome){
    const index = carrinho.findIndex(
        item => item.nome === nome);

    if( index !== -1){
        total -= carrinho[index].preco;

        carrinho.splice(index, 1);

        atualizarCarrinho();
    }
    
}

function atualizarCarrinho(){
    const lista = document.getElementById("carrinho");
    lista.innerHTML = "";

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.nome + " - R$ " + item.preco;
        lista.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}