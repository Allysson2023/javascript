const produtos = [
    { id: 1, nome: "Hamburguer", preco: 10},
    { id: 2, nome: "Refrigerante", preco: 8},
    { id: 3, nome: "Pizza", preco: 20}
];

const botoes = document.querySelectorAll(".add-btn");

botoes.forEach(botao => {
    botao.addEventListener("click", ()=> {
        const id = botao.getAttribute("data-id");
        adicionarItemPorId(id);
    })
})

function adicionarItemPorId(id){
    const produto = produtos.find( p => p.id == id);

    adicionarItem(produto);
}

function formatarMoeda(valor){
    return valor.toFixed(2).replace(".", ",");
}

let carrinho = [];
let total = 0;

function adicionarItem(produto){
    const itemExistente = carrinho.find(
        item => item.id === produto.id
    );

    if(itemExistente){
        itemExistente.quantidade++;
    } else{
        carrinho.push({
            id: produto.id,
            nome : produto.nome,
            preco : produto.preco,
            quantidade : 1
        });
    }
    total += produto.preco

    atualizarCarrinho();

}


function excluirItem(id){
    const index = carrinho.findIndex(
        item => item.id === id);

    if( index !== -1){

        if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade--;
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

        const subtotal = item.preco * item.quantidade;

        li.innerHTML = `
            ${item.nome} x ${item.quantidade} - R$ ${formatarMoeda(subtotal)}
            <button onclick = "excluirItem(${item.id})">❌</button>
        `;

        lista.appendChild(li);
    });

    document.getElementById("total").textContent = formatarMoeda(total);
}