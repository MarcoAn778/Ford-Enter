// Array storage class
let carouselArr = [];

// class Carousel
class Carousel {
    // Construtor estruturado com imagem, título e url (link)
    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    static Start(arr) {
        if (arr) {
            if (arr.length > 0) {
                Carousel._slides = arr;
                Carousel._sequence = 0;
                Carousel._size = arr.length;
                
                Carousel.RenderStructure(); // Desenha a estrutura base com os botões laterais
                Carousel.ShowSlide();       // Exibe o primeiro slide
                Carousel.ResetInterval();   // Ativa o temporizador automático de 2 segundos [cite: 80]
            }
        } else {
            throw "Method Start needs an Array Variable.";
        }
    }

    // Cria os botões e as áreas do carrossel dinamicamente
    static RenderStructure() {
        const imgContainer = document.getElementById("Carousel");
        if (!imgContainer) return;

        // Monta os botões laterais e o espaço onde a foto com link vai entrar
        imgContainer.innerHTML = `
            <button id="carousel-prev" onclick="Carousel.MovePrev()">&#10094;</button>
            <div id="carousel-image-holder"></div>
            <button id="carousel-next" onclick="Carousel.MoveNext()">&#10095;</button>
        `;
    }

    // Exibe o slide atual baseado na sequência
    static ShowSlide() {
        const imageHolder = document.getElementById("carousel-image-holder");
        const titleContainer = document.getElementById("carousel-title");
        
        if (!imageHolder || !titleContainer) return;

        const currentSlide = Carousel._slides[Carousel._sequence];

        if (currentSlide) {
            // 1. A imagem agora fica obrigatoriamente dentro do link <a> tornando-se totalmente clicável 
            imageHolder.innerHTML = `
                <a href="${currentSlide.url}">
                    <img src="../img/${currentSlide.image}" alt="${currentSlide.title}">
                </a>
            `;

            // 2. A legenda passa a ser apenas texto comum [cite: 73]
            titleContainer.innerHTML = `
                <p>${currentSlide.title}</p>
            `;
        }
    }

    // Avança o slide
    static Next() {
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        Carousel.ShowSlide();
    }

    // Volta o slide
    static Prev() {
        Carousel._sequence = (Carousel._sequence - 1 + Carousel._size) % Carousel._size;
        Carousel.ShowSlide();
    }

    // Reseta o temporizador de 2 segundos para evitar conflito com cliques manuais [cite: 80]
    static ResetInterval() {
        clearInterval(Carousel._interval);
        Carousel._interval = setInterval(function() { 
            Carousel.Next(); 
        }, 2000); // 2 segundos conforme passo 5 [cite: 80]
    }

    // Funções disparadas pelos cliques nos botões de seta
    static MoveNext() {
        Carousel.Next();
        Carousel.ResetInterval();
    }

    static MovePrev() {
        Carousel.Prev();
        Carousel.ResetInterval();
    }
}