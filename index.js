// Carrinho vazio
let carrinho = [];

// Valor Total das compras
let total = 0;

// Ids dos produtos ex: API
const produtos = [
    { id: 1, nome: "Hamburguer", preco: 10},
    { id: 2, nome: "Refrigerante", preco: 8},
    { id: 3, nome: "Pizza", preco: 20}
];

// Pegando todos os botoes que tem a class
const botoes = document.querySelectorAll(".add-btn");

// ao clica a função adiciona o Id selecionar o produto
botoes.forEach(botao => {
    botao.addEventListener("click", ()=> {
        const id = botao.getAttribute("data-id");
        adicionarItemPorId(id);
    })
})

// Adiciona item por Id
function adicionarItemPorId(id){
    const produto = produtos.find( p => p.id == id);

    adicionarItem(produto);
}

// Formatando a moeda para Real
function formatarMoeda(valor){
    return valor.toFixed(2).replace(".", ",");
}

// Adiconar Item no Produto
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

    salvarCarrinho();
    atualizarCarrinho();

}

// Excluir Item no carrinho
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

        salvarCarrinho();
        atualizarCarrinho();
    }
    
}

// Atualiza a Lista do Carrinho e o total
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

// Salvando n localStroge
function salvarCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    localStorage.setItem("total", total);
}

// carregar dados ao abrir o site
function carregarCarrinho(){
    const carrinhoSalvo = localStorage.getItem("carrinho");
    const totalSalvo = localStorage.getItem("total");

    if(carrinhoSalvo){
        carrinho = JSON.parse(carrinhoSalvo);
        total = Number(totalSalvo);
    }
    atualizarCarrinho();
}

// Limpando carrinho salvo do localStorage
function limparCarrinho(){
    const confirmar = confirm("Tem certeza que deseja excluir carrinho?");
    if(confirmar){
        carrinho = [];
        total = 0;
    
        localStorage.removeItem("carrinho");
        localStorage.removeItem("total");
    
        atualizarCarrinho();
        alert("Excluido com sucesso!")
    }
}

carregarCarrinho();