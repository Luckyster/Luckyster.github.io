let slides = document.getElementsByClassName("slider__item");
let dots = document.getElementsByClassName("slider__toggle");
var slideIndex = 1;
console.log(slides);
showSlides(slideIndex);
addEvents();
function addEvents() {
   for(let i = 0; i < dots.length; i++){
       dots[i].addEventListener('click',currentSlide);
   }
}

function currentSlide() {
    showSlides(parseInt(this.innerHTML));
    console.log(typeof (parseInt(this.innerHTML)));
}
function showSlides(slideIndex) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" slider__toggle--active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " slider__toggle--active";
}