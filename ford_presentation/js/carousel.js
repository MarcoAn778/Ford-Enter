//carousel
let carouselArr = [];


class Carousel {
 
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
                
                Carousel.RenderStructure();
                Carousel.ShowSlide();
                Carousel.ResetInterval();
            }
        } else {
            throw "Method Start needs an Array Variable.";
        }
    }

    static RenderStructure() {
        const imgContainer = document.getElementById("Carousel");
        if (!imgContainer) return;
        imgContainer.innerHTML = `
            <button id="carousel-prev" onclick="Carousel.MovePrev()">&#10094;</button>
            <div id="carousel-image-holder"></div>
            <button id="carousel-next" onclick="Carousel.MoveNext()">&#10095;</button>
        `;
    }

    static ShowSlide() {
        const imageHolder = document.getElementById("carousel-image-holder");
        const titleContainer = document.getElementById("carousel-title");
        
        if (!imageHolder || !titleContainer) return;

        const currentSlide = Carousel._slides[Carousel._sequence];

        if (currentSlide) {
            imageHolder.innerHTML = `
                <a href="${currentSlide.url}">
                    <img src="../img/${currentSlide.image}" alt="${currentSlide.title}">
                </a>
            `;

            titleContainer.innerHTML = `
                <p>${currentSlide.title}</p>
            `;
        }
    }

    static Next() {
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        Carousel.ShowSlide();
    }

    static Prev() {
        Carousel._sequence = (Carousel._sequence - 1 + Carousel._size) % Carousel._size;
        Carousel.ShowSlide();
    }

    static ResetInterval() {
        clearInterval(Carousel._interval);
        Carousel._interval = setInterval(function() { Carousel.Next(); }, 2000);
    }

    static MoveNext() {
        Carousel.Next();
        Carousel.ResetInterval();
    }

    static MovePrev() {
        Carousel.Prev();
        Carousel.ResetInterval();
    }
}