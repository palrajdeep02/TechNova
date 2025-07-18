document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle Functionality ---
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


    // --- Dropdown Menu Functionality ---
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) { // Check if dropdown exists on the page
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) { // Check if dropdown menu exists
            dropdown.addEventListener('mouseenter', function() {
                dropdownMenu.style.display = 'block'; // Make it visible
                setTimeout(() => {
                    dropdownMenu.classList.add('show'); // Add 'show' class for CSS transition
                }, 10); // Small delay to allow display property to apply before transition
            });

            dropdown.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('show'); // Remove 'show' class
                setTimeout(() => {
                    dropdownMenu.style.display = 'none'; // Hide after transition
                }, 300); // Match this with your CSS transition duration for .dropdown-menu
            });
        }
    }

    // --- Active Navigation Link Highlighting ---
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