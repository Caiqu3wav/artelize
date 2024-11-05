import { produtosDestaque, produtos, produtosHomeCarouselDecoracao } from "./data/index.js";

//Sistema de carrinho de compras

document.addEventListener('DOMContentLoaded', function () {
    const cartDropdown = document.querySelector('#cart-dropdown .cart-items');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    const productCardsContainer = document.querySelector('.product-cards');

    produtosDestaque.slice(0, 3).forEach(produto => {
        productCardsContainer.innerHTML += `
        <div class="product-card">
            <img src="/assets/img/products/${produto.imagem}" alt="${produto.titulo}">
            <h5 class="product-home-title">${produto.titulo}</h5>
            <p class="product-home-description">${produto.descricao}</p>
            <p class="price">Preço: R$ <s>${produto.preco.toFixed(2)}</s></p>
            <p>Desconto: <span class="desconto">R$ ${produto.desconto.toFixed(2)}</span></p>
            <div class="product-home-buttons">
                <button class="add-cart-btn" data-produto='${JSON.stringify(produto)}'><i class="fa-solid fa-plus"></i></button>
    <a href="/product/index.html?id=${produto.id}" target="_blank" class="btn btn-success">Ver Mais</a>
            </div>
        </div>
        `;
    });

  
    function updateCart() {
    cartDropdown.innerHTML = '';
    cart.forEach((item, index) => {
        console.log(item);
        const { produto, quantidade } = item;
        console.log(produto.imagem);
        cartDropdown.innerHTML += `
        <li class="cart-item">
            <img src="/assets/img/products/${produto.imagem}" alt="${produto.titulo}">
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
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
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

    const carousel = document.querySelector('.carousel');

    produtosHomeCarouselDecoracao.forEach((produto, index) => {
  const face = document.createElement('div');
  face.classList.add('carousel__face');
  face.style.transform = `rotateY(${index * 72}deg) translateZ(200px)`;

  face.innerHTML = `
    <img src="/assets/img/products/${produto.imagem}" alt="${produto.titulo}">
    <h5 class="product-carousel-title">${produto.titulo}</h5>
    <p class="product-carousel-preco">R$ <s>${produto.preco.toFixed(2)}</s></p>
    <p>Desconto: <span class="desconto">R$ ${produto.desconto.toFixed(2)}</span></p>
    <button class="add-cart-btn" data-produto='${JSON.stringify(produto)}'><i class="fa-solid fa-plus"></i></button>
    <a href="/product.html?id=${produto.id}" class="btn btn-success mt-2">Ver Mais</a>
  `;

  carousel.appendChild(face);
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

})

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

    function createCard(product) {
        return `
          <div class="card"> <div class="first">
                <span class="discount">NEW</span>
              </div>
            <div class="image-container">
              <img src="/assets/img/products/${product.imagem}" alt="${product.titulo}" class="thumbnail-image">
            </div>
            <div class="dress-name">${product.titulo}</div>
            <div class="new-price">R$ ${product.desconto}</div>
            <div class="buy">Compre agora</div>
          </div>
        `;
      }
    
      // Adiciona os últimos 4 produtos ao container
      const container = document.querySelector('.container-new-cards');
      produtos.slice(-4).forEach(product => {
        container.innerHTML += createCard(product);
      });
});