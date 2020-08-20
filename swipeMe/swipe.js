// Great explanations and Code examples: 
//  *** http://www.javascriptkit.com/javatutors/touchevents.shtml#eventobj ***

const section = document.querySelector('section');
// Swipe variables
const threshold = 15; // required min distance traveled (in px) to be considered a swipe.
const restraint = 100; // maximum distance allowed at the same time in perpendicular direction.
const allowedTime = 300; // maximum time allowed to travel the restraint distance.
// Keeping track of distance travelled by fingers
let startX = 0;
let startY = 0;
let dist = 0;
let swipeDir;
// Keeping track of time between 'touchstart' and 'touchend'
let startTime = 0;
let elapsedTime = 0;

// Event handlers for touchstart, touchmove and touchend:
section.addEventListener('touchstart', function(e){
    console.log('touch starts')
    let touchObj = e.changedTouches[0]; //references the first finger that touches the screen (first touch point)
    startX = parseInt(touchObj.clientX); // get X position of the touch point relative to the left edge of the browser.     
    startY = parseInt(touchObj.clientY); //get Y position
    startTime = new Date().getTime(); // records time when the finger first touch the touch surface
    e.preventDefault();  
},false);

section.addEventListener('touchmove', function(e){
    e.preventDefault() // prevent scrolling 
}, false);

section.addEventListener('touchend', function(e){
    console.log('touch ends');
    let touchObj = e.changedTouches[0];
    distX = touchObj.clientX - startX;
    distY = touchObj.clientY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime){ // The movement was shorter than 300ms
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
            swipeDir = (distX < 0)? 'left' : 'right'; // if distance traveled is negative, it indicates left swipe. 
        }
    }
    handleSwipe(swipeDir);
    e.preventDefault();
}, false);


// Function to handle the swipe based on swipeDir
let bgCol = window.getComputedStyle(section, null).getPropertyValue('background-color'); // "rgb(123, 123, 255)"
let r = Number(bgCol.slice(4,7));
let g = Number(bgCol.slice(9,12));
let b = Number(bgCol.slice(14,17));

function handleSwipe(sDirection){
    console.log('handleSwipe');
    if (sDirection == 'left'){
        r = r - 10;
        g = g - 10;
        section.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    }else if (sDirection == 'right'){
        r = r + 10;
        g = g + 10;
        section.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

}