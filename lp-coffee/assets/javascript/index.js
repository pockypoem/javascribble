let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let imageHome = document.querySelector('.homeProduct');

menuToggle.onclick = function() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

//change image on click
function imgSlider(anything) {
    setTimeout(() => {
        imageHome.src = anything;
    }, 30);
}

//add active class in selected thumbnails
let el = document.querySelectorAll('.thumb li');
for (let i = 0; i < el.length; i++) {
    el[i].onclick = function() {
        var c = 0;
        while (c < el.length) {
            el[c++].className = 'check';
        }
        el[i].className = 'check active';
    }
}