/*let slides = document.getElementsByClassName("slider__item");
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
}*/
//let slides = document.getElementsByClassName("slider__item");
let slider = document.getElementsByClassName("slider");
//let dots = document.getElementsByClassName("slider__toggle");
let arrowLeft = document.getElementsByClassName("slider__arrow--left");
let arrowRight = document.getElementsByClassName("slider__arrow--right");

arrowRight[0].addEventListener('click',moveSlide);
//arrowLeft.addEventListener('click',moveSlide);
function moveSlide(){
    slider[0].style.left = "-" + 100 + '%';
}