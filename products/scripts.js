import { produtos } from "../data/index.js";

// For Filters
document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("products-grid");

    produtos.forEach(produto => {
      // Crie o col Bootstrap
      const productCol = document.createElement("div");
      productCol.classList.add("col-md-3", "mb-4"); // 4 colunas por linha em telas médias
  
      // Crie o card Bootstrap para o produto
      productCol.innerHTML = `
        <div class="card h-100">
          <img src="/assets/img/products/${produto.imagem}" class="card-img-top" alt="${produto.titulo}">
          <div class="card-body">
            <h5 class="card-title">${produto.titulo}</h5>
            <p class="card-text">Preço: $${produto.preco}</p>
            <p class="card-text">Desconto: $${produto.desconto}</p>
            <a href="/produto.html?id=${produto.id}" class="btn btn-primary">Ver Detalhes</a>
          </div>
        </div>
      `;
  
      // Adicione o card ao contêiner do grid
      gridContainer.appendChild(productCol);
    });
    });