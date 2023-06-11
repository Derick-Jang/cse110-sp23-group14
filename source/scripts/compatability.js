import {compatibilityData} from "../jsons/compatibilityDataJson.js";

/**
 * This function takes in two signs and find the compatibility description between those signs.
 * @param {string} sign1
 * @param {string} sign2
 * @returns {string|null} user's compatibility description, or null if not found.
 */
function findDescription(sign1, sign2) {
    for (const compatibility of compatibilityData.compatibility) {
        const pair = compatibility.pair;
        const description = compatibility.description;
        if (pair.some(([a, b]) => {
            return (a === sign1 && b === sign2) || (a === sign2 && b === sign1);
        })) {
            return description;
        }
    }
    return null;
}
  
const sign1 = "aries";
const sign2 = "leo";
const description = findDescription(sign1, sign2);

// get the shape element
const shapeLeft = document.querySelector('.shape-left');
const shapeRight = document.querySelector('.shape-right');
const loveContent = document.getElementById('description');
const chooseSignWindow = document.getElementById('choose-sign');

const checkCompatibilityButton = document.getElementById('check-compatability-button');
const closeCompatability = document.getElementById('close-compatability-popup-new');

// Getting sign of each div within the compatability menu
const capricornSign=document.getElementById('capricorn');
const cancerSign=document.getElementById('cancer');
const aquariusSign=document.getElementById('aquarius');
const geminiSign=document.getElementById('gemini');
const leoSign=document.getElementById('leo');
const libraSign=document.getElementById('libra');
const piscesSign=document.getElementById('pisces');
const sagittariusSign=document.getElementById('sagittarius');
const scorpioSign=document.getElementById('scorpio');
const taurusSign=document.getElementById('taurus');
const virgoSign=document.getElementById('virgo');
const ariesSign=document.getElementById('aries');

// Parallel arrays, matching sign with sign name
const signArray = [capricornSign, cancerSign, aquariusSign, geminiSign, leoSign, libraSign, piscesSign, sagittariusSign, scorpioSign, taurusSign, virgoSign, ariesSign];
const signNamesArray = ['capricorn', 'cancer', 'aquarius', 'gemini', 'leo', 'libra', 'pisces', 'sagittarius', 'scorpio', 'taurus', 'virgo', 'aries'];

// Counter for keeping track of when enough clicks occur to show pop up, it starts at 0
// How it works: It starts at 0, then on each click of the menu, the counter goes up.
let clickCount = 0;

for (let i=0; i < signArray.length; i++) {
    signArray[i].addEventListener('click', function(){
        const image = `assets/zodiac_sign/${signNamesArray[i]}.png`;

        if(shapeLeft.querySelector('.sign-name').textContent=='' && shapeRight.querySelector('.sign-name').textContent==''){
            shapeLeft.style.backgroundImage = `url(${image})`;
            shapeLeft.style.backgroundSize ='cover';
            shapeLeft.querySelector('.sign-name').textContent = signNamesArray[i];
        } else {
            if(shapeLeft.querySelector('.sign-name').textContent=='') {
                shapeLeft.style.backgroundImage = `url(${image})`;
                shapeLeft.style.backgroundSize ='cover';
                shapeLeft.querySelector('.sign-name').textContent = signNamesArray[i];
    
            } else {
                shapeRight.style.backgroundImage=`url(${image})`;
                shapeRight.style.backgroundSize='cover';
                shapeRight.querySelector('.sign-name').textContent= signNamesArray[i];
            }
        }
        if(clickCount<2){
            clickCount++;
        }
        
        checkCompatibility();
        handleClick();
    });
}

/**
 * This function checks the compatibility between the two Zodiac signs by calling on the findDescription
 * function and displays the description on the popup page.
 */
function checkCompatibility() {
    const leftBox = document.querySelector(".shape-left .sign-name").textContent.trim();
    const rightBox = document.querySelector(".shape-right .sign-name").textContent.trim();
    if (leftBox && rightBox) {
        // Both left and right boxes are filled
        // Assuming the signs are stored as lowercase strings
        const sign1 = leftBox;
        const sign2 = rightBox;
        const capitalizedSign1 = sign1.charAt(0).toUpperCase() + sign1.slice(1);
        const capitalizedSign2 = sign2.charAt(0).toUpperCase() + sign2.slice(1);
        const description = findDescription(capitalizedSign1, capitalizedSign2);
        // Assuming you want to display the description in the element with id "description"
        document.querySelector(".abcd").textContent = description;
        checkCompatibilityButton.disabled=false; 
    }
}

/**
 * It is triggered when the checkCompatibilityButton is being clicked, it will alert that the button was clicked
 * The compatability popup page will appear
 * @param {Event} event - "click"
 */
checkCompatibilityButton.addEventListener('click', () => {
    alert('button was clicked');
    document.getElementById('compatability-popup-new').classList.add('visible');
});

/**
 * It is triggered when the closeCompatability is being clicked
 * The compatability popup page will disappear
 * @param {Event} event - "click"
 */
closeCompatability.addEventListener('click', function() {
    document.getElementById('compatability-popup-new').classList.remove('visible');
});

/**
 * Event listener for shapeLeft
 * @param {Event} event - "click"
 */
shapeLeft.addEventListener('click', function() {
    clickCount--;
    shapeLeft.style.backgroundImage = ''; // Remove background image from shapeLeft
    shapeLeft.querySelector('.sign-name').textContent='';

    handleClick();
});

/**
 * Event listener for shapeRight
 * @param {Event} event - "click"
 */
shapeRight.addEventListener('click', function() {
    clickCount--;
    shapeRight.style.backgroundImage = ''; // Remove background image from shapeRight
    shapeRight.querySelector('.sign-name').textContent='';
    handleClick();
});

/**
 * shows or hides the popup menu
 */
function handleClick() {
    if(clickCount === 2) {
        setTimeout(() => {
            // Show the pop-up
            // Hide the menu
            // chooseSignWindow.style.display='none';
            // Enable button
            checkCompatibilityButton.disabled = false;
        }, 300);
        
    } else {
        setTimeout(() => {
            //chooseSignWindow.style.display='block';
            checkCompatibilityButton.disabled = true;
        }, 300);
    }
}



// Function to hide the pop-up and reset the page
function hidePopup() {
    document.getElementById("compatibility-popup").style.display = "none";
}

/**
 * Attach event listener to the close button
 * @param {Event} event - "click"
 */
document.querySelector(".compatibility-popup-close").addEventListener("click", () => {
    hidePopup();
    clickCount=0;
    shapeLeft.style.backgroundImage='';
    shapeRight.style.backgroundImage='';
    shapeLeft.querySelector('.sign-name').textContent='';
    shapeRight.querySelector('.sign-name').textContent='';
    chooseSignWindow.style.display='block';
});