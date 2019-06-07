let dots  = document.querySelectorAll('slider__toggle'),
    dotsArea  = document.querySelector(".slider__toggles")[0],
    slides = document.querySelectorAll('slider__item'),
    slideIndex = 1;

showSlides(slideIndex);

function showSlides(n){
    if(n < 1){
        slideIndex = slides.length;
    } else if(n > slides.length){
        slideIndex = 1;
    }
    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }
    for(let i = 0; i < dots.length; i++){
        dots[i].classList.remove('active');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
dotsArea.onclick = function (dotNum) {
    for(let i = 0; i < dots.length + 1; i++){
        if(dotNum.target.classList.contains('slider__toggles') && dotNum.target == dots[i - 1]){
            currentSlide(i);
        }
    }
}
