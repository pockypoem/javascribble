const toggler = document.querySelector(".toggler");
const navMenu = document.querySelector("#navMenu");

toggler.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});

const scroll = document.getElementById("scroll");

scroll.addEventListener('click', () => {
    document.querySelector(".get-started").scrollIntoView({ behavior: 'smooth' });
})

// Changing Text

const changingText = document.getElementById('changingText');
const texts = ['Writer', 'Designer', 'Coder', 'Expert', 'Tutor', 'Coach', 'Trainer', 'Planner', 'Assistant', 'Nutritionist'];
let currentIndex = 0;

function changeText() {
  currentIndex = (currentIndex + 1) % texts.length;
  changingText.textContent = texts[currentIndex];
}

setInterval(changeText, 2000); // Ubah teks setiap 2 detik (2000 milidetik)
