document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle Functionality (UNCHANGED) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i'); // Get the icon element inside the button

    // Function to set theme on page load
    function setThemeOnLoad() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark');
            // Ensure the correct icon is displayed for dark mode
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Show sun icon when in dark mode (to suggest switching to light)
        } else {
            body.classList.remove('dark');
            // Ensure the correct icon is displayed for light mode
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // Show moon icon when in light mode (to suggest switching to dark)
        }
    }

    // Function to toggle theme
    function toggleTheme() {
        body.classList.toggle('dark'); // Toggle the 'dark' class on the body

        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark'); // Save dark theme preference
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun'); // Change icon to sun
        } else {
            localStorage.setItem('theme', 'light'); // Save light theme preference
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon'); // Change icon to moon
        }
    }

    // Add event listener to the theme toggle button
    themeToggle.addEventListener('click', toggleTheme);

    // Call setThemeOnLoad when the DOM content is fully loaded
    setThemeOnLoad();


    // --- Dropdown Menu Functionality (REVISED FOR MOBILE TAP & DESKTOP HOVER) ---
    const dropdownParents = document.querySelectorAll('.nav-links .dropdown'); // Select all <li> with class 'dropdown'

    // Function to close all other open dropdowns (and reset 'tapped' state for mobile)
    function closeAllDropdowns(excludeParent = null) {
        dropdownParents.forEach(parent => {
            if (parent !== excludeParent) {
                parent.classList.remove('active');
                parent.classList.remove('tapped'); // Remove tapped state for mobile
            }
        });
    }

    dropdownParents.forEach(parentLi => {
        const dropdownLink = parentLi.querySelector('a'); // The <a> tag that acts as the toggle
        const dropdownMenu = parentLi.querySelector('.dropdown-menu');

        // Only proceed if both the link and the menu exist within the dropdown parent
        if (dropdownLink && dropdownMenu) {

            // Desktop Hover functionality
            parentLi.addEventListener('mouseenter', function() {
                // Only activate on desktop view (breakpoint 768px)
                if (!window.matchMedia("(max-width: 768px)").matches) {
                    closeAllDropdowns(parentLi); // Close others
                    parentLi.classList.add('active'); // Add 'active' class to show dropdown
                }
            });

            parentLi.addEventListener('mouseleave', function() {
                // Only deactivate on desktop view
                if (!window.matchMedia("(max-width: 768px)").matches) {
                    parentLi.classList.remove('active'); // Remove 'active' class to hide dropdown
                }
            });

            // Mobile Tap functionality
            dropdownLink.addEventListener('click', function(event) {
                const isMobile = window.matchMedia("(max-width: 768px)").matches;

                if (isMobile) {
                    // If dropdown is NOT active OR it's active but NOT yet "tapped" (first tap scenario)
                    if (!parentLi.classList.contains('active')) {
                        event.preventDefault(); // Prevent browser from navigating (important!)
                        closeAllDropdowns(parentLi); // Close any other open dropdowns
                        parentLi.classList.add('active'); // Open this dropdown
                        parentLi.classList.add('tapped'); // Mark that it has been tapped once
                    } else if (parentLi.classList.contains('tapped')) {
                        // If it's already active AND was "tapped" (second tap scenario)
                        // Allow the default navigation (the link will be followed)
                        parentLi.classList.remove('tapped'); // Reset tapped state for next interaction
                    } else {
                        // This case handles an active dropdown that wasn't "tapped" (e.g., opened by desktop and then resized)
                        // Treat it as a first tap on mobile to open/reopen.
                        event.preventDefault();
                        closeAllDropdowns(parentLi);
                        parentLi.classList.add('active');
                        parentLi.classList.add('tapped');
                    }
                }
                // For desktop clicks (not hover), the link will follow default behavior (go to href)
                // This means clicking "Services" on desktop without hovering first will go to services.html
            });
        }
    });

    // Close dropdowns when clicking anywhere else on the document
    document.addEventListener('click', function(event) {
        // If the click is not inside any dropdown parent element
        if (!event.target.closest('.nav-links .dropdown')) {
            closeAllDropdowns();
        }
    });

    // Close dropdowns on window resize, especially when switching from mobile to desktop view
    window.addEventListener('resize', function() {
        if (!window.matchMedia("(max-width: 768px)").matches) {
            closeAllDropdowns(); // Close all dropdowns if in desktop view
        }
    });


    // --- Active Navigation Link Highlighting (UNCHANGED) ---
    const currentPath = window.location.pathname; // Get the current URL path
    const navLinks = document.querySelectorAll('.nav-links a'); // Get all navigation links

    navLinks.forEach(link => {
        // Handle root index.html specifically
        if (currentPath === '/' || currentPath.endsWith('/index.html')) {
            if (link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        }
        // Handle general links (e.g., about.html, contact.html, blog.html)
        else if (link.getAttribute('href') === currentPath || currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }
        // Handle links within the dropdown menu (e.g., services/service-it.html)
        else if (link.parentElement.classList.contains('dropdown-menu')) {
            // Extract the service filename from the current path if it's a service sub-page
            const servicePageMatch = currentPath.match(/\/services\/(service-[a-z]+\.html)/);
            if (servicePageMatch && link.getAttribute('href').endsWith(servicePageMatch[1])) {
                link.classList.add('active');
            }
        }
    });

    // Ensure the main "Services" dropdown link is active if on any service sub-page
    const servicesDropdownLink = document.querySelector('.nav-links .dropdown > a');
    if (servicesDropdownLink) {
        const isServiceSubPage = currentPath.includes('/services/service-'); // Check if current page is a service sub-page
        // Check if any of the child service links are active
        let anyChildActive = false;
        document.querySelectorAll('.dropdown-menu a').forEach(childLink => {
            if (childLink.classList.contains('active')) {
                anyChildActive = true;
            }
        });
        // If it's a service sub-page and one of its children is active, activate the parent "Services" link
        if (isServiceSubPage && anyChildActive) {
            servicesDropdownLink.classList.add('active');
        }
    }
});