import { Horoscope } from "./horoscope.js";

/**
 * Event listener function for the 'DOMContentLoaded' event.
 * @param {Event} event -The 'DOMContentLoaded' event object
 */
window.addEventListener('DOMContentLoaded', async (event)=> {
    const navButton = document.getElementById('nav-button');
    const navMenu = document.getElementsByClassName('nav-content')[0];
    const navIconBars = document.getElementsByClassName('fa-bars')[0];
    const navIconXMark = document.getElementsByClassName('fa-xmark')[0];
    const navContainer = document.getElementsByClassName('nav-container')[0];
    const horoscopeButton = document.getElementById('horoscope-button');
    const horoscopeDetect = document.getElementById('horoscope-detect');
    let isNavOpen = false;
    let isHoroscopeDisplayed = false;
    const dailyReport = document.querySelector('.daily-report');

    if (!localStorage.getItem('birthdayYear')) {
        // Hide the button
        horoscopeButton.style.display = 'none';
        horoscopeDetect.style.display = 'block';
    }else{
        horoscopeDetect.style.display = 'none';
    }



    /**
     * Toggles the navigation bar state
     * @param {boolean} isOpen - Indicates whether to open or close the navigation bar
     */
    function toggleNav(isOpen) {
        isNavOpen = isOpen;
        navMenu.classList.toggle('nav-show', isOpen);
        navMenu.classList.toggle('nav-hide', !isOpen);
        navIconBars.classList.toggle('icon-hide', isOpen);
        navIconXMark.classList.toggle('icon-hide', !isOpen);
        navContainer.classList.toggle('nav-show-background', isOpen);
        navContainer.classList.toggle('nav-background-hide', !isOpen);
    }

    /**
    * Event listener function for the 'click' event on the navButton.
    *
    * @param {Event} event -The 'click' event object
    */
    navButton.addEventListener('click', (event) => {
        if (isNavOpen) {
            // closeNav();
            toggleNav(false);
        } else {
            // openNav();
            toggleNav(true);
        }
    });

    const currentDate = new Date();
    const currentDateStr = currentDate.toDateString();
    const reportDate = new Date();
    const reportDateStr = reportDate.toDateString();

    /**
     * get the last visted date from localStorage
     * report being highlighted on the next day
    */
    const lastVisitDate = localStorage.getItem('last_visit');
    if (lastVisitDate !== currentDateStr) {
        localStorage.removeItem('report_read');
    }

    if (currentDateStr === reportDateStr) {
        const isRead = localStorage.getItem('report_read');
        if(!isRead) {
            dailyReport.classList.add('highlight');
        }
    }

    /**
    * When the user clicks on the dailyReport, it is marked as read
    * @param {Event} event -The 'click' event object
    */
    dailyReport.addEventListener('click', function() {
        dailyReport.classList.remove('highlight');
        localStorage.setItem('report_read', true);
    });

    localStorage.setItem('last_visit', currentDateStr);

    // Set horoscope popup text
    const dailyTitle = document.getElementsByClassName("daily-title")[0];
    const sign = Horoscope.getSign();
    if (!sign) {
        dailyTitle.innerHTML = "We don't know your sign yet! <br>Please fill out your settings!";
    } else {
        dailyTitle.innerHTML = `${sign}`;
    }
    
    const dailyDate = document.getElementsByClassName("daily-date")[0];
    const date = new Date().toLocaleDateString();
    dailyDate.innerHTML = `${date}`;
    
    // Animate the text for the Daily Content inside horoscope pop up box
    const dailyContent = document.getElementsByClassName("daily-content")[0];
    dailyContent.innerHTML = Horoscope.generateHoroscope();
    dailyContent.innerHTML = ""; // Clear the initial content
    
    /**
    * type writer animation for the horoscope popup
    * @param {string} text
    * @param {number} i
    */
    function typeWriter(text, i) {
        if (i < text.length) {
            dailyContent.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => {
                typeWriter(text, i);
            }, 10);
        }
    }

    const contentText = Horoscope.generateHoroscope(); // Retrieve the content text
    
    // only start animating horoscope text once popup appears
    horoscopeButton.onclick = function() {
        if (isHoroscopeDisplayed==false) {
            typeWriter(contentText,0);
            isHoroscopeDisplayed=true;
        }
    };

    const shareBtn = document.querySelector('.share-btn');
    const shareContent = contentText;

    /**
     * If the user hasn't inputted their information yet, don't display the share button.
     */
    if (!sign) {
        shareBtn.style.display = 'none';
    } else {
        shareBtn.style.display = 'default';
    }
    /**
     * Copy daily-horoscope to clipboard when share button is clicked
     * @param {Event} event -The 'click' event object
     */
    shareBtn.addEventListener('click', async (event) => {
        try {
            await navigator.clipboard.writeText('Hey 💖, I just checked my daily horoscope ✨ and I couldn\'t wait to share it with you! According to the stars 🌌, for ' + sign + ':\n' + shareContent + '\nHow about you? Open our app and check your own forecast 🌤️, and let\'s compare our results 📈. Who knows what the universe has in store for us today!');
            console.log('Copy success');    // only for testing purpose
            const shareConfirm = document.querySelector('.share-confirm');
            shareConfirm.innerHTML = "Copied!";
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });

    const menuLinks = document.querySelectorAll('.nav a');
    for (const link of menuLinks) {
        link.addEventListener('click', (event) => {
            // closeNav();
            toggleNav(false);
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            scrollToElement(target);
        });
    }

    /**
     * FAQ dropdown functionality
     */
    const questions = document.getElementsByClassName('question');
    const answers = document.getElementsByClassName('answer');
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', (event) => {
            if (answers[i].classList.contains('hide')) {
                answers[i].classList.remove('hide');
            } else {
                answers[i].classList.add('hide');
            }
        });
    }
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    /**
     * Scrolls to the target element smoothly.
     * @param {Element} target - The target element to scroll to
     */
    function scrollToElement(target) {
        if (isMobile) {
            const offset = target.getBoundingClientRect().top + document.documentElement.scrollTop;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            },100);
        } else {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }    
});
