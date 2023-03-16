// menu mobile
const nav = document.querySelector('#navSideMenu')
const closeIcon = document.querySelector('#navClose')
const openIcon = document.querySelector('#navOpen')

const navOpen = () => {
    nav.className = 'navLinks navLinksVisible'
    disableScroll();
}

const navClose = () => {
    nav.className = 'navLinks'
    enableScroll();
}

openIcon.addEventListener('click', navOpen);
closeIcon.addEventListener('click', navClose);

//when clicking on a menu link, close the menu

let arrNav = Array.prototype.slice.call(document.querySelectorAll("#navSideMenu > .htextMedium"))
arrNav.push(document.querySelector('#navCTAMobile'))

clickNavClose = (arr) => {
    arr.forEach((element) => {
        element.addEventListener('click', navClose)
    })
}

clickNavClose(arrNav)

//when clicking on the menu, disable scrolling

function disableScroll() {
    scrollTop = window.pageYOffset 
    scrollLeft = window.pageXOffset 
  
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

