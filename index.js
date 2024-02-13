const userCount = document.querySelector(".user-count");
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
userCount.textContent = carrito.length;

document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let counter = 0;
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = slides.length;
    const autoSlideInterval = 5000;

    // Configurar la transición
    slides.forEach((slide) => {
        slide.style.transition = 'transform 0.5s ease';
    });

    function nextSlide() {
        counter = counter < totalSlides - 1 ? counter + 1 : 0;
        updateSlider();
    }

    function prevSlide() {
        counter = counter > 0 ? counter - 1 : totalSlides - 1;
        updateSlider();
    }

    function updateSlider() {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        });
    }

    prevBtn.addEventListener('click', function () {
        prevSlide();
    });

    nextBtn.addEventListener('click', function () {
        nextSlide();
    });

    let autoSlideTimer = setInterval(nextSlide, autoSlideInterval);

    // Detener el slider  al pasar el mouse sobre él
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', function () {
        clearInterval(autoSlideTimer);
    });

    // Reanudar el slider  al sacar el mouse del slider
    slider.addEventListener('mouseleave', function () {
        autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
    });
});
