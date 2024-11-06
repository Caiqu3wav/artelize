import { produtos } from "../data/index.js";



document.addEventListener("DOMContentLoaded", function(event) {

    function change_image(image){

        var container = document.getElementById("main-image");
    
       container.src = image.src;
    }
        

const urlPar = new URLSearchParams(window.location.search);
const productId = urlPar.get('id');
const product = produtos.find(produto => produto.id == productId);

if (product) {

    document.getElementById('main-image').src = `/assets/img/products/${product.imagem}`;
  
    if (product.imagem2) {
        document.getElementById('thumbnail1').src = `/assets/img/products/${product.imagem2}`;
        document.getElementById('thumbnail1').style.display = 'block';
    } else {
        document.getElementById('thumbnail1').style.display = 'none';
    }

    if (product.imagem3) {
      document.getElementById('thumbnail2').src = `/assets/img/products/${product.imagem2}`;
      document.getElementById('thumbnail2').style.display = 'block';
  } else {
      document.getElementById('thumbnail2').style.display = 'none';
  }

    document.querySelector('.product h5').textContent = product.titulo;
    
    document.querySelector('.act-price').textContent = `$${product.preco}`;
  
    document.querySelector('.dis-price').textContent = `$${product.desconto}`;
  
    document.querySelector('.about').textContent = product.descricao;
  } else {
    console.error('Produto não encontrado');
  }
});