let carrinho = [];
let total = 0;

function adicionarItem(nome, preco){

    const itemExistente = carrinho.find(
        item => item.nome === nome);

    if (itemExistente){
        itemExistente.quatidade += 1;
    }else{
        carrinho.push({ nome, preco, quatidade: 1});

    }

    total += preco;

    atualizarCarrinho();
}

function excluirItem(nome){
    const index = carrinho.findIndex(
        item => item.nome === nome);

    if( index !== -1){

        if(carrinho[index].quatidade > 1){
            carrinho[index].quatidade -= 1;
            total -= carrinho[index].preco;
        } else{
            total -= carrinho[index].preco;
            carrinho.splice(index, 1);
        }

        atualizarCarrinho();
    }
    
}

function atualizarCarrinho(){
    const lista = document.getElementById("carrinho");
    lista.innerHTML = "";

    carrinho.forEach(item => {
        const li = document.createElement("li");

        const subtotal = item.preco * item.quatidade;

        li.textContent = `${item.nome} x${item.quatidade} - R$ ${subtotal}`;

        lista.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}