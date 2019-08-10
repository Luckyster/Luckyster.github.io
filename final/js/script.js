let slider = document.getElementsByClassName("slider");
let dots = document.getElementsByClassName("slider__toggle");
let arrowLeft = document.getElementsByClassName("slider__arrow--left");
let arrowRight = document.getElementsByClassName("slider__arrow--right");
var currentSlide = 0;
arrowRight[0].onclick = moveSlideRight;
arrowLeft[0].onclick = moveSlideLeft;
function moveSlideRight(){
    moveSlide('right');

}
function moveSlideLeft(){
    moveSlide('left');
}
function moveSlide(arg){
    currentSlide = (arg === "right") ? (currentSlide + 1) : (currentSlide - 1);
    currentSlide === 4 ? currentSlide = 0 : currentSlide === -1 ? currentSlide = 3: false;
    console.log(currentSlide);
    slider[0].style.left = "-" + currentSlide * 100 + '%';
    for(let i = 0; i < dots.length; i++){
      dots[i].className = dots[i].className.replace(" slider__toggle--active", "");
    }
     dots[currentSlide].className += ' slider__toggle--active';
}
