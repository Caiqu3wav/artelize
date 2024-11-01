const produtosDestaque = [
    {
        titulo: "Bonsai Floresta com musgo preservado",
        descricao: "Bonsai sobre uma cachoeira com plantas estabilizadas 25*22 cm/ 9,8*8,6 polegadas É um ótimo presente para qualquer feriado. Composição de bonsai sobre rochas, feita de plantas estabilizadas. Parece muito refinado e caro. Não é necessário cuidar dessa decoração, basta não colocá-la ao sol, ela manterá sua aparência por mais de 5 anos. O reservatório brilha no escuro e na penumbra. Caso não queira esta opção, basta mencioná-la nos comentários do pedido.",
        preco: 859.99,
        desconto: 249.99,
        imagem: "https://i.etsystatic.com/44061559/r/il/30c9e0/5578191509/il_794xN.5578191509_8t6w.jpg"
    },
    {
        titulo: "Caixa de madeira incrustada com madrepérola",
        descricao: "Cinto de couro elegante e confortável, perfeito para o uso diário.",
        preco: 1449.99,
        desconto: 870.11,
        imagem: "https://i.etsystatic.com/25657482/r/il/9845d8/5675077553/il_794xN.5675077553_gebm.jpg"
    },
    {
        titulo: "Estátua de Sukhasiddhi | Um Yogini e Mestre em Meditação | Escultura Budista Artesanal Autêntica | Arte do Himalaia do Nepal | Ouro 24k dourado",
        descricao: "Estátua rara feita à mão de Sukhasiddhi DakiniSukhasiddhi foi um professor Vajrayana budista indiano nascido na Caxemira. Esta impressionante e rara estátua de Sukhasiddhi foi esculpida à mão em nosso estúdio em Katmandu. Somos um grupo de escultores de divindades budistas especializados na criação de obras de arte únicas. Esta estátua foi esculpida com um corpo de cobre e dourada com ouro genuíno 24k antes de ser pintada com ricas tintas acrílicas para lhe dar uma aparência luminosa. Tamanho: 16,9/43 cm (Altura) x 16,9/43 cm (Base)Peso: 9,49kg Material: ouro 24K dourado, corpo em cobre, pinturas acrílicas",
        preco: 15599.99,
        desconto: 10099.99,
        imagem: "https://i.etsystatic.com/27513826/r/il/c4ba9a/5262134012/il_794xN.5262134012_dwuy.jpg"
    }
]

const produtosArtesanais = [
    {
        titulo: "Cestas de Frutas",
        descricao: "Cestas de frutas frescas, feitas com frutas selecionadas e enfeites decorativas.",
        preco: 80.99,
        desconto: 39.99,
        imagem: "https://i.etsystatic.com/10278795/r/il/bab72d/4434146650/il_794xN.4434146650_53fw.jpg"
    }
]

document.addEventListener('DOMContentLoaded', () => {
  
  const carouselInner = document.getElementById('carousel-inner');
  const carouselIndicators = document.getElementById('carousel-indicators');

  produtosDestaque.forEach((produto, index) => {
    // Criar o item do carrossel
    const itemDiv = document.createElement('div');
    itemDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm-4';

    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'thumb-wrapper';

    const imgBox = document.createElement('div');
    imgBox.className = 'img-box';

    const img = document.createElement('img');
    img.src = produto.imagem;
    img.className = 'img-fluid';
    img.alt = produto.titulo;
    img.width = 300;
    img.height = 300;

    imgBox.appendChild(img);

    const thumbContent = document.createElement('div');
    thumbContent.className = 'thumb-content';

    const title = document.createElement('h4');
    title.textContent = produto.titulo;
    title.style.maxHeight = '60px';
    title.style.overflow = 'hidden';

    const description = document.createElement('p');
    description.textContent = produto.descricao;
    description.style.maxHeight = '100px';
    description.style.overflow = 'hidden';

    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'btn btn-primary';
    btn.innerHTML = `More <i class="fa fa-angle-right"></i>`;

    thumbContent.appendChild(title);
    thumbContent.appendChild(description);
    thumbContent.appendChild(btn);

    thumbWrapper.appendChild(imgBox);
    thumbWrapper.appendChild(thumbContent);

    colDiv.appendChild(thumbWrapper);
    rowDiv.appendChild(colDiv);
    itemDiv.appendChild(rowDiv);
    carouselInner.appendChild(itemDiv);

    // Criar os indicadores
    const indicator = document.createElement('li');
    indicator.dataset.bsTarget = '#myCarousel';
    indicator.dataset.bsSlideTo = index;
    if (index === 0) indicator.className = 'active';
    carouselIndicators.appendChild(indicator);
  });
});