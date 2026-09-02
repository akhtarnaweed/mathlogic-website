document.addEventListener("DOMContentLoaded", function () {

    const componentPath = window.location.pathname.includes("/pages/")
    ? "../components/"
    : "components/";
    /*
     * MathLogic Component Loader
     */

    const components = [

        {
            file: componentPath + "header.html",
            element: "header"
        },

        {
            file: componentPath + "hero.html",
            element: "hero"
        },

        {
            file: componentPath + "classes.html",
            element: "classes"
        },

        {
            file: componentPath + "youtube.html",
            element: "youtube"
        },

        {
            file: componentPath + "resources.html",
            element: "resources"
        },

        {
            file: componentPath + "advertisements.html",
            element: "advertisements"
        },

        {
            file: componentPath + "about.html",
            element: "about"
        },

        {
            file: componentPath + "footer.html",
            element: "footer"
            
        }

    ];


    async function loadComponent(component) {

        const container = document.getElementById(component.element);

        if (!container) {
            return;
        }

        try {

            const response = await fetch(component.file);

            if (!response.ok) {

                throw new Error(
                    `Could not load ${component.file}`
                );

            }

            const html = await response.text();

            container.innerHTML = html;

        }

        catch (error) {

            console.error(
                "MathLogic component error:",
                error
            );

        }

    }



    async function loadAllComponents() {

        for (const component of components) {

            await loadComponent(component);

        }


        initializeMobileMenu();

        initializeDropdown();

        initializeCurrentYear();

        handleHashNavigation();

    }



    function initializeMobileMenu() {

        const menuToggle =
            document.querySelector(".menu-toggle");

        const navigation =
            document.querySelector(".main-navigation");


        if (!menuToggle || !navigation) {

            return;

        }


        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navigation.classList.toggle(
                        "mobile-menu-open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        const navigationLinks =
            navigation.querySelectorAll("a");


        navigationLinks.forEach(function (link) {


            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove(
                        "mobile-menu-open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );


        });


    }




    function initializeDropdown() {


        const dropdown =
            document.querySelector(".nav-dropdown");


        const dropdownButton =
            document.querySelector(
                ".nav-dropdown-button"
            );


        if (!dropdown || !dropdownButton) {

            return;

        }


        dropdownButton.addEventListener(
            "click",
            function () {


                const isOpen =
                    dropdown.classList.toggle(
                        "dropdown-open"
                    );


                dropdownButton.setAttribute(
                    "aria-expanded",
                    isOpen
                );


            }
        );



        document.addEventListener(
            "click",
            function (event) {


                if (!dropdown.contains(event.target)) {


                    dropdown.classList.remove(
                        "dropdown-open"
                    );


                    dropdownButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


            }
        );


    }




    function initializeCurrentYear() {


        const yearElement =
            document.getElementById(
                "current-year"
            );


        if (yearElement) {


            yearElement.textContent =
                new Date().getFullYear();


        }


    }




    function handleHashNavigation() {


        if (!window.location.hash) {

            return;

        }


        const targetId =
            window.location.hash.substring(1);


        const target =
            document.getElementById(targetId);



        if (!target) {

            return;

        }


        setTimeout(function () {


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


        }, 100);


    }



    loadAllComponents();


});