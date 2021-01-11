/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
/*eslint-env es6*/


const menuButtons = document.getElementById('navbar__list');

const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// function to check which section currently on the view port;

const findActiveSection = () => {

    let onViewSection = sections[0];

    let rect = 1000000;

    for ( let section of sections ) {

        let rectValue = section.getBoundingClientRect();

        if ( rectValue.top > -300 & rectValue.top < rect ) {

            rect = rectValue.top;

            onViewSection = section;

      }

    }

    return onViewSection;

};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// function to build the navigation buttons and include it to the ul of the navbar
const navigationMenu = () => {
        menuButtons.innerHTML = '';
        sections.forEach(element => {
        menuButtons.insertAdjacentHTML('beforeend', `<li><a class="menu__link" href="#${element.id}" data-section-id="${element.id}"  >${element.dataset.nav}</a></li>`);
    });
}

// Add class 'active' to section when near top of viewport


const addActiveToSection = () => {

  window.addEventListener('scroll', function(){

    // Add Active Class To Section

    let activeSection = findActiveSection();

    activeSection.classList.add('your-active-class');

    for ( let section of sections ) {

      if ( section.id != activeSection.id && section.classList.contains('your-active-class') ) {

        section.classList.remove('your-active-class');

      }

    }

    // Add Active Class To Navigation buttons

    const buttons = document.querySelectorAll('.menu__link');

    let activeButton = document.querySelector(`li a[data-section-id=${activeSection.id}]`)

    activeButton.classList.add('link__active');
    

    for ( let button of buttons ) {
      
      if ( button.dataset.sectionId != activeButton.dataset.sectionId && button.classList.contains('link__active') ) {

        button.classList.remove('link__active');
      

      }
    
    }

  })

}


// Scroll to anchor using scrollintoview event
const buttonScrollSection = () => {
menuButtons.addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById(event.target.dataset.sectionId).scrollIntoView({ behavior: "smooth"});

});
}

//scroll to top button
//Get the button
var scrollToTop = document.getElementById("scrollToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTop.style.display = "block";
    scrollToTop.textContent=`You Are Currently Browsing ${findActiveSection().id} ,Go Top ⇯?`;
  } else {
    scrollToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


/**
 * End Main Functions
 * Begin Events
 *
*/
//calling page functions

// Build menu

navigationMenu();

// Scroll to section on link click

buttonScrollSection();

// Set sections as active

addActiveToSection();
