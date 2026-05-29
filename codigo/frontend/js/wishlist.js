function adicionarWishlist(produto) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const existe = wishlist.find(item => item.id === produto.id);

    if (existe) {
        alert("Produto já está na lista!");
        return;
    }

    wishlist.push(produto);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Produto adicionado à lista de desejos!");
}



function carregarWishlist() {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const container = document.getElementById("wishlist-container");

    if (!container) return;

    container.innerHTML = "";

    wishlist.forEach(produto => {

        container.innerHTML += `
            <div class="produto-card">
                <img src="${produto.imagem}" width="150">

                <h3>${produto.nome}</h3>

                <p>R$ ${produto.preco}</p>

                <button onclick="removerWishlist(${produto.id})">
                    Remover
                </button>
            </div>
        `;
    });
}

function removerWishlist(id) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(produto => produto.id != id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    carregarWishlist();
}

carregarWishlist();