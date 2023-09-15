
//this function is used to add event listeners to multiple elements
const addEventOnElements = function (elements, evenType, callback){

    /*this loop will iterate through each element in the elements array
    and adds an event for the specified event type, 
    the listener triggers the provided callback function when the event occurs.*/
    for(let i = 0, len = elements.length; i<len; i++){
        elements[i].addEventListener(evenType, callback);
    }
}


//navbar

/*holds a reference to the DOM element with the [data-navbar] attribute,
presumably representing the navigation bar. */
const navbar = document.querySelector("[data-navbar]");
/*holds a collection of DOM elements with the [data-nav-toggler] attribute
which likely represent the elements that trigger the navigation bar to toggle. */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
/* holds a reference to the DOM element with the [data-overlay] attribute,
 presumably representing an overlay that is displayed when the navigation bar is active. */
const overlay = document.querySelector("[data-overlay]");


//this function is used to toggle the appearance of the navigation bar, overlay, and body class when called
const toggleNavbar = function(){
    /*.toggle() method is used to add or remove the class active from the navbar and overlay elements,
    making them appear or disappear*/
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    /* .toggle() method is used on the document.body to add or remove the class nav-active,
    presumably used to control body overflow when the navigation bar is active. */
    document.body.classList.toggle("nav-active");
}

/*add event listeners of the "click" event type to the elements specified in the navTogglers collection*/
/*When any of the navTogglers elements is clicked, the toggleNavbar function is executed, 
toggling the appearance of the navigation bar, overlay, and body class */
addEventOnElements(navTogglers, "click", toggleNavbar); 

/**In summary, this code creates a toggle mechanism for the navigation bar and overlay.
 *  When the designated elements (navTogglers) are clicked, the toggleNavbar function is called to change the
 *  visibility of the navigation elements and body class.
 *  This type of code is often used to create responsive navigation menus or overlays in web design. */


/* header */
const header = document.querySelector("[data-header]");
let lastScrollPos = 0; //Initialize a variable to store the last scroll position

const hideHeader = function(){
    const isScrollButtom = lastScrollPos < scrollY; // Check if scrolling down
    if(isScrollButtom){
        header.classList.add("hide"); // Hide the header if scrolling down
    }else{
        header.classList.remove("hide"); // Show the header if scrolling up
    }

    lastScrollPos = scrollY; // Store the current scroll position
}

// Add scroll event listener to the window
addEventListener("scroll", ()=>{
    if(scrollY >= 50){
        header.classList.add("active"); // Add "active" class to the header when scrolled down
        hideHeader(); // Call the hideHeader function to manage header visibility
    }else{
        // Remove "active" class when scrolled back to the top
        header.classList.remove("active");
    }
})

//implementing the hero slider

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function(){
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function(){
    if(currentSlidePos>=heroSliderItems.length - 1){
        currentSlidePos = 0;
    }else{
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function(){
    if(currentSlidePos<=0){
        currentSlidePos = heroSliderItems.length -1;
    }else{
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/*auto slide */
let autoSlideInterval;

const autoSlide = function(){
    autoSlideInterval = setInterval(function(){
        slideNext();
    }, 7000)
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function(){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

addEventListener("load", autoSlide);


/***counter */

const counters = document.querySelectorAll(".counters span");
const container = document.querySelector(".counters");

let activated = false;

function updateCount(counter, target) {
    const increment = target / 100; // Adjust the increment based on your preference
    let count = 0;

    const interval = setInterval(() => {
        count += increment;
        counter.innerText = Math.floor(count);

        if (count >= target) {
            counter.innerText = target;
            clearInterval(interval);
        }
    }, 10);
}

window.addEventListener("scroll", () => {
    if (pageYOffset > container.offsetTop - container.offsetHeight - 200 && !activated) {
        counters.forEach(counter => {
            counter.innerText = 0;
            const target = parseInt(counter.dataset.count);
            updateCount(counter, target);
        });

        activated = true;
    } else if (pageYOffset < container.offsetTop - container.offsetHeight - 500 || pageYOffset === 0) {
        counters.forEach(counter => {
            counter.innerText = 0;
        });

        activated = false;
    }
});





/************* Swiper initialization ****************/
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});




const addEventsOnElements = function (elements, evenType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(evenType, callback);
    }
}

const scrollToSection = function (event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
    }

    // Close the navbar if needed
    toggleNavbar();
}

// Select all navigation links
const navLinks = document.querySelectorAll("[data-navbar] a");

// Add smooth scrolling to each navigation link
addEventOnElements(navLinks, "click", scrollToSection);




/***the hover-underline effect */

// Select all navigation links
const navLink = document.querySelectorAll(".navbar-link");

// Function to handle navigation link click
const handleNavLinkClick = function(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Remove "active-link" class from all navigation links
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    // Add "active-link" class to the clicked navigation link
    this.classList.add("active");

    // Get the target section id from the link's href attribute
    const targetSectionId = this.getAttribute("href");

    // Scroll to the target section using smooth behavior
    document.querySelector(targetSectionId).scrollIntoView({ behavior: "smooth" });
};

// Add click event listener to each navigation link
navLinks.forEach(link => {
    link.addEventListener("click", handleNavLinkClick);
});


