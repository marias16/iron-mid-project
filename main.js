

// menu mobile
const nav = document.querySelector('#navSideMenu')
const closeIcon = document.querySelector('#navClose')
const openIcon = document.querySelector('#navOpen')

const navOpen = () => {
    nav.className = 'navLinks navLinksVisible'
}

const navClose = () => {
    nav.className = 'navLinks'
}

openIcon.addEventListener('click', navOpen);
closeIcon.addEventListener('click', navClose);

