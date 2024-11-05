import { produtos } from "../data";



document.addEventListener("DOMContentLoaded", function(event) {

    function change_image(image){

        var container = document.getElementById("main-image");
    
       container.src = image.src;
    }
        

const urlPar = new URLSearchParams(window.location.search);
const productId = urlPar.get('id');
const product = produtos.find(produto => produto.id = productId)

if (product) {
    console.log(productId)

    document.getElementById('main-image').src = product.imagem;

    document
  
    document.querySelector('.product h5').textContent = product.titulo;
    
    document.querySelector('.act-price').textContent = `$${product.preco}`;
  
    document.querySelector('.dis-price').textContent = `$${product.desconto}`;
  
    document.querySelector('.about').textContent = product.descricao;
  } else {
    console.error('Produto não encontrado');
  }
});