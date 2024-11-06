import { produtos } from "../data/index.js";

// For Filters
document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("products-grid");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    produtos.forEach(produto => {
      // Crie o col Bootstrap
      const productCol = document.createElement("div");
      productCol.classList.add("col-md-3", "mb-4"); // 4 colunas por linha em telas médias
  
      // Crie o card Bootstrap para o produto
      productCol.innerHTML = `
        <div class="card">
          <img src="../assets/img/products/${produto.imagem}" class="card-img-top" alt="${produto.titulo}">
          <div class="card-body">
            <p class="card-title">${produto.titulo}</p>
            <p class="card-text">Preço: R$<span class="price text-danger">${produto.preco}</span></p>
            <p class="card-text">Desconto: R$<span class="price-d text-success">${produto.desconto}</span></p>
            <div class="d-flex align-items-center gap-2">
            <button class="add-cart-btn" data-produto='${JSON.stringify(produto)}'><i class="fa-solid fa-plus"></i></button>
    <a href="/product/index.html?id=${produto.id}" class="btn btn-success">Ver Mais</a>
           </div>
          </div>
        </div>
      `;
  
      // Adicione o card ao contêiner do grid
      gridContainer.appendChild(productCol);
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
      const cartDropdown = document.querySelector('#cart-dropdown .cart-items');
      const cartCount = document.getElementById('cart-count');
      cartDropdown.innerHTML = '';

      cart.forEach((item, index) => {
          const { produto, quantidade } = item;
          cartDropdown.innerHTML += `
              <li class="cart-item">
                  <img src="../assets/img/products/${produto.imagem}" alt="${produto.titulo}">
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

      cartCount.textContent = cart.reduce((total, item) => total + item.quantidade, 0);
      setupRemoveButtons();
  }

  function setupRemoveButtons() {
      document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', (e) => {
              const index = e.target.getAttribute('data-index');
              const item = cart[index];

              if (item.quantidade > 1) {
                  item.quantidade -= 1;
              } else {
                  cart.splice(index, 1);
              }
              updateCart();
          });
      });

      document.querySelectorAll('.remove-all').forEach(button => {
          button.addEventListener('click', (e) => {
              const index = e.target.getAttribute('data-index');
              cart.splice(index, 1);
              updateCart();
          });
      });
  }

  // Inicialize o carrinho ao carregar a página
  updateCart();
    });