import { produtosDestaque } from "./data/index.js";

//Sistema de carrinho de compras

document.addEventListener('DOMContentLoaded', function () {
    const cartDropdown = document.querySelector('#cart-dropdown .cart-items');
    const cartCount = document.getElementById('cart-count');
    let cart = [];

    const productCardsContainer = document.querySelector('.product-cards');

    produtosDestaque.forEach(produto => {
        productCardsContainer.innerHTML += `
        <div class="product-card">
            <img src="${produto.imagem}" alt="${produto.titulo}">
            <h5 class="product-carousel-title">${produto.titulo}</h5>
            <p class="product-carousel-description">${produto.descricao}</p>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            <p>Desconto: R$ ${produto.desconto.toFixed(2)}</p>
            <div class="product-carousel-buttons">
                <button class="add-cart-btn" data-produto='${JSON.stringify(produto)}'><i class="fa-solid fa-plus"></i></button>
                <button class="btn btn-success">Ver Mais</button>
            </div>
        </div>
        `;
    });

    document.querySelectorAll('.add-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const produto = JSON.parse(button.getAttribute('data-produto'));
            const existingProductIndex = cart.findIndex(item => item.produto.id === produto.id);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantidade += 1;
            } else {
                cart.push({ produto, quantidade: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartDropdown.innerHTML = '';
        cart.forEach((item, index) => {
            const { produto, quantidade } = item;
            cartDropdown.innerHTML += `
            <li class="cart-item">
                <img src="${produto.imagem}" alt="${produto.titulo}">
                <div>
                    <p class="cart-item-title">${produto.titulo} (Quantidade: ${quantidade})</p>
                    <p class="cart-item-price">R$ ${produto.preco.toFixed(2)} cada</p>
                </div>
                <div class="cart-item-total">
                    <p>Total: R$ ${(produto.preco * quantidade).toFixed(2)}</p>
                </div>
                <div class="d-flex flex-column gap-2">
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Remover</button>
                    ${quantidade > 1 ? `<button class="btn btn-sm btn-warning remove-all" data-index="${index}">Remover Todos</button>` : ''}
                </div>
            </li>
            `;
        });

        cartCount.textContent = cart.reduce((total, item) => total + item.quantidade, 0); // Atualiza a contagem total
        setupRemoveButtons(); // Configura os botões de remover
    }

    function setupRemoveButtons() {
        // Configura o botão para remover um único item
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const item = cart[index];

                // Se a quantidade for maior que 1, diminui a quantidade
                if (item.quantidade > 1) {
                    item.quantidade -= 1;
                } else {
                    // Se a quantidade for 1, remove o produto do carrinho
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        // Configura o botão para remover todos os itens do mesmo produto
        document.querySelectorAll('.remove-all').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                // Remove o produto do carrinho
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do link
        dropdownMenu.classList.toggle('show'); // Alterna a classe 'show' para exibir/ocultar o menu
    });

    // Fechar o dropdown se clicar fora dele
    document.addEventListener('click', function (e) {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show'); // Remove a classe 'show' para ocultar o menu
        }
    });
});