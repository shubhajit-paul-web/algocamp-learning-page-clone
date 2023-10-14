// Wait for the page to load
window.addEventListener("load", () => {
    document.querySelector(".loader-container").style.display = "none";
});

// All Courses
const allCourses = [{
        thumbnail: "back-end-development-course-thumbnail.jpg",
        title: "Backend Development in NodeJS",
        lessons: 471,
        orignalPrice: 5500,
        discount: 28,
        purchased: false,
        progress: 0,
    },
    {
        thumbnail: "coding-interview-prep-course.jpg",
        title: "Top Coding Interview Problems | Solve 400+ problems | Live",
        lessons: 459,
        orignalPrice: 6000,
        discount: 17,
        purchased: false,
        progress: 0,
    },
    {
        thumbnail: "complete-java-course.png",
        title: "Master Complete Java + DSA + Backend + System Design",
        lessons: 467,
        orignalPrice: 8000,
        discount: 25,
        purchased: false,
        progress: 0,
    },
    {
        thumbnail: "dsa-with-javascript-course-thumbnail.png",
        title: "Data Structures And Algorithms In Javascript",
        lessons: 634,
        orignalPrice: 5450,
        discount: 28,
        purchased: false,
        progress: 0,
    },
    {
        thumbnail: "front-end-development-course-thumbnail.jpg",
        title: "Frontend Development With ReactJS",
        lessons: 289,
        orignalPrice: 5500,
        discount: 22,
        purchased: true,
        progress: 22,
    },
];

document.querySelector(".course-count").innerHTML = `
    <h4>Courses <span class="courses-count">0${allCourses.length}</span></h4>
    <div class="course-slide-options">
        <a href="#">View All</a>
        <div class="course-slide-btns">
            <i class="fa-solid fa-angle-left" id="slide-left-btn"></i>
            <i class="fa-solid fa-angle-right" id="slide-right-btn"></i>
        </div>
    </div>
`;

const coursesContainer = document.querySelector(".courses-container-main");

allCourses.forEach((elem) => {
    // Calculate discount
    const orignalPrice = elem.orignalPrice;
    const discountAmount = (orignalPrice * elem.discount) / 100;
    const discountPrice = parseInt(orignalPrice - discountAmount);
    const coursePurchased = elem.purchased;

    // Adding Courses
    coursesContainer.innerHTML += `
        <div class="course-box">
            <div class="left course-thumbnail">
                <img src="./images/${elem.thumbnail}" alt="backend development course thumbnail" draggable="false" />
            </div>
            <div class="right course-details">
                <p class="course-title">${elem.title.length > 42 ? elem.title.slice(0, 42) + "..." : elem.title}</p>
                <div class="purchased-course-progress">
                    ${coursePurchased ? elem.progress + "%" : ""}
                    <div class="${coursePurchased ? "course-progress-bar" : ""}"></div>
                </div>
                <div class="course-lectures-count">
                    <span class="lessons">${coursePurchased ? "" : elem.lessons + " lessons"}</span>
                </div>
                    <div class="course-price-details ${coursePurchased ? "purchased" : ""}">
                        <div class="course-price-details">
                            <p>${coursePurchased ? "" : "&#8377;" + discountPrice.toLocaleString("en-IN")}</p>
                            <p>
                                <span>${coursePurchased ? "" : "&#8377;" + elem.orignalPrice}</span>
                                <span>${coursePurchased ? "PURCHASED" : elem.discount + "% OFF"}</span>
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    `;
});

// When the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // References to HTML elements
    const body = document.body;
    const themeSwitch = document.querySelector(".theme-switcher");
    const searchBox = document.querySelector(".search-box");
    const inputSearchBox = searchBox.querySelector("input");
    const learnystLogo = document.querySelector(".learnyst-logo");
    const languageBtn = document.querySelector(".languages-btn");
    const darkModeBtnMob = document.querySelector(".dark-mode-btn");

    // Function to apply dark mode styles
    function applyDarkMode() {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        themeSwitch.classList.remove("dark-mode-style");
        languageBtn.classList.remove("dark-mode-style");
        darkModeBtnMob.classList.remove("active");
    }

    // Function to apply light mode styles
    function applyLightMode() {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        themeSwitch.classList.add("dark-mode-style");
        languageBtn.classList.add("dark-mode-style");
        darkModeBtnMob.classList.add("active");
    }

    // Function to handle changes in the media query
    function handleMediaQueryChange(event) {
        event.matches ? applyDarkMode() : applyLightMode();
    }

    // Define the media query
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Attach the event listener for the initial state
    handleMediaQueryChange(darkModeMediaQuery);

    // Attach the event listener for changes in the media query
    darkModeMediaQuery.addEventListener("change", handleMediaQueryChange);
    window.addEventListener("change", function() {
        document.querySelector("html").style.colorScheme = `${darkModeMediaQuery ? "dark" : "light"}`;
    });

    // Track the current theme (0 for light, 1 for dark)
    let themeCode = 0;

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        themeCode = 1 - themeCode;

        themeSwitch.innerHTML = `<i class="fa-regular fa-${themeCode !== 0 ? "moon" : "sun"}"></i> ${themeCode === 0 ? "LIGHT" : "DARK"}`;

        body.classList.remove(themeCode !== 0 ? "dark-mode" : "light-mode");
        body.classList.add(themeCode !== 0 ? "light-mode" : "dark-mode");

        // Dark/Light mode scrollbar
        document.querySelector("html").style.colorScheme = `${themeCode !== 0 ? "light" : "dark"}`;

        themeSwitch.classList.toggle("dark-mode-style", themeCode !== 0);
        languageBtn.classList.toggle("dark-mode-style", themeCode !== 0);

        darkModeBtnMob.classList.toggle("active", themeCode !== 0);
        learnystLogo.src = `./images/Powered by Learnyst Logo-${themeCode !== 0 ? "Light" : "Dark"}.svg`;
    };

    // Event listener for theme switch button click (For Desktop)
    themeSwitch.addEventListener("click", toggleTheme);

    // Event listener for theme switch button click (For Tablet, Mobile)
    darkModeBtnMob.addEventListener("click", () => {
        themeCode = 1 - themeCode;

        if (!themeCode) {
            darkModeBtnMob.classList.add("active");
            applyDarkMode();
        } else {
            darkModeBtnMob.classList.remove("active");
            applyLightMode();
        }
    });

    // Event listeners for search box focus and blur
    inputSearchBox.addEventListener("focus", () => {
        searchBox.classList.add("active");
    });

    inputSearchBox.addEventListener("blur", () => {
        searchBox.classList.remove("active");
    });

    // Toggle user menu bar
    const userLogo = document.querySelector(".user-logo");
    const userMenuBar = document.querySelector(".inner-menu");

    userLogo.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenuBar.classList.toggle("active-menu-bar");
    });

    // Close user menu bar on body click
    body.addEventListener("click", () => {
        if (userMenuBar.classList.contains("active-menu-bar")) {
            userMenuBar.classList.remove("active-menu-bar");
        }
    });

    // Mobile menu bar
    document.querySelector("#menu-icon")
        .addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(".user-menu-bar").classList.toggle("active-menu-bar");
        });

    // Courses Card Slider
    const slideLeftBtn = document.querySelector("#slide-left-btn");
    const slideRightBtn = document.querySelector("#slide-right-btn");

    slideRightBtn.addEventListener("click", () => {
        coursesContainer.scrollLeft = coursesContainer.scrollWidth;
    });

    slideLeftBtn.addEventListener("click", () => {
        coursesContainer.scrollLeft = 0;
    });
});
