const btnHamburger = document.querySelector('#hamburger');
const navList = document.querySelector('#nav-menu');

btnHamburger.addEventListener('click', () => {
    btnHamburger.classList.toggle("hamburger-active");
    navList.classList.toggle('hidden');
})