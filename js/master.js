// Check if there's local storage color option
let mainColors = localStorage.getItem("color_option");


if(mainColors !== null){
    // console.log("Local Storage is not empty, you can set it on root now");
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    // Remove active class from all colors list items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // Add active class on element with data-color === local storage item
        if(element.dataset.color === mainColors){
            // Add active class
            element.classList.add("active");
        }
    });
}

// Random Backgrounds option
let backgroundOption = true;
// variable to control the background interval
let backgroundInterval;



// Check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
if(backgroundLocalItem !== null){
    // Remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    // console.log("Local Storage is not empty, you can set it on root now");
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active"); 
    }
    
    
}


// Toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};
// switch Random Backgrounds options
let randomBg = document.querySelectorAll(".random-backgrounds span");
randomBg.forEach(span=>{
    span.addEventListener("click", (e)=>{
        handleActive(e);
        // Set color on local storage
        
        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
       
    })
})

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // Set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // Set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});
// Select landing page element
let landingPage = document.querySelector(".landing-page");
// Get array of images
let imgsArray = ["cat-01.jpg", "cat-02.jpg", "cat-03.jpg", "cat-04.jpg", "cat-05.jpg"];
 


// function to randomize images
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            // change background image url
            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        
        }, 1000);
    }
}
randomizeImgs();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window height
    let windowHeight = this.innerHeight;
    // Window scroll top
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }    
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img"); 
ourGallery.forEach(img => {
    img.addEventListener("click",(e)=>{
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = "popup-overlay";
        // Append Overlay To The Body
        document.body.appendChild(overlay);
        // Create The Popup
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = "popup-box";
        if(img.alt !== null){
            // Create Heading
            let imgHeading = document.createElement("h3");
            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);
            // Append The Text To The Heading
            imgHeading.appendChild(imgText);
            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To Body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span");
        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");
        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);
        // Add Class To Close Button
        closeButton.className = "close-button";
        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    })
});
// Close Popup
document.addEventListener("click", function(e){
    if(e.target.className == "close-button"){
        // Remove The Current Popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");



function scrollTosSomeWhere(elements){
    elements.forEach(el=>{
        el.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    })

}
scrollTosSomeWhere(allBullets);
scrollTosSomeWhere(allLinks);

// Handle Active State
function handleActive(ev){
    // Remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add active class on self
    ev.target.classList.add("active");
}

// Bullets Navigation
let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null){
    bulletSpan.forEach(span=>{
        span.classList.remove("active");
    });
    if(bulletLocalItem === "true"){
        bulletContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletSpan.forEach(span=>{
    span.addEventListener("click", (e)=>{
        handleActive(e);
        // Set color on local storage
        if(e.target.dataset.display === "show"){
            bulletContainer.style.display = "block";
            localStorage.setItem("bullets_option", true);
        }
        else{
            bulletContainer.style.display = "none";
            localStorage.setItem("bullets_option", false);
        }
    })
})
// Reset Button
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    // Reload Window
    window.location.reload();
}
// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function(e){
    // Toggle Class "menu-active" on button
    this.classList.toggle("menu-active");
    // Toggle Class "open" on links
    tLinks.classList.toggle("open");
    e.stopPropagation();
}
// Stop Propagation on Menu
tLinks.onclick = function(e){
    e.stopPropagation();
}
// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e)=>{
    if(e.target !== toggleBtn && e.target !== tLinks){
        // Check If Menu Is Open
        if(tLinks.classList.contains("open")){
            // Toggle Class "menu-active" on button
            toggleBtn.classList.toggle("menu-active");
            // Toggle Class "open" on links
            tLinks.classList.toggle("open");
        }
    }
})
