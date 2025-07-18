document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle Functionality (UNCHANGED) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    function setThemeOnLoad() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    setThemeOnLoad();


    // --- Dropdown Menu Functionality (REVISED for Mobile Tap & Desktop Hover - UNCHANGED from last provided version) ---
    const dropdownParents = document.querySelectorAll('.nav-links .dropdown');

    function closeAllDropdowns(excludeParent = null) {
        dropdownParents.forEach(parent => {
            if (parent !== excludeParent) {
                parent.classList.remove('active');
                parent.classList.remove('tapped');
            }
        });
    }

    dropdownParents.forEach(parentLi => {
        const dropdownLink = parentLi.querySelector('a');
        const dropdownMenu = parentLi.querySelector('.dropdown-menu');

        if (dropdownLink && dropdownMenu) {
            parentLi.addEventListener('mouseenter', function() {
                if (!window.matchMedia("(max-width: 768px)").matches) {
                    closeAllDropdowns(parentLi);
                    parentLi.classList.add('active');
                }
            });

            parentLi.addEventListener('mouseleave', function() {
                if (!window.matchMedia("(max-width: 768px)").matches) {
                    parentLi.classList.remove('active');
                }
            });

            dropdownLink.addEventListener('click', function(event) {
                const isMobile = window.matchMedia("(max-width: 768px)").matches;

                if (isMobile) {
                    if (!parentLi.classList.contains('active')) {
                        event.preventDefault();
                        closeAllDropdowns(parentLi);
                        parentLi.classList.add('active');
                        parentLi.classList.add('tapped');
                    } else if (parentLi.classList.contains('tapped')) {
                        parentLi.classList.remove('tapped');
                    } else {
                        event.preventDefault();
                        closeAllDropdowns(parentLi);
                        parentLi.classList.add('active');
                        parentLi.classList.add('tapped');
                    }
                }
            });
        }
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links .dropdown')) {
            closeAllDropdowns();
        }
    });

    window.addEventListener('resize', function() {
        if (!window.matchMedia("(max-width: 768px)").matches) {
            closeAllDropdowns();
        }
    });


    // --- Active Navigation Link Highlighting (UNCHANGED) ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (currentPath === '/' || currentPath.endsWith('/index.html')) {
            if (link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href') === currentPath || currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        } else if (link.parentElement.classList.contains('dropdown-menu')) {
            const servicePageMatch = currentPath.match(/\/services\/(service-[a-z]+\.html)/);
            if (servicePageMatch && link.getAttribute('href').endsWith(servicePageMatch[1])) {
                link.classList.add('active');
            }
        }
    });

    const servicesDropdownLink = document.querySelector('.nav-links .dropdown > a');
    if (servicesDropdownLink) {
        const isServiceSubPage = currentPath.includes('/services/service-');
        let anyChildActive = false;
        document.querySelectorAll('.dropdown-menu a').forEach(childLink => {
            if (childLink.classList.contains('active')) {
                anyChildActive = true;
            }
        });
        if (isServiceSubPage && anyChildActive) {
            servicesDropdownLink.classList.add('active');
        }
    }

    // --- NEW: Navbar Hide/Reveal on Scroll Functionality for Mobile ---
    let lastScrollY = 0;
    const navbar = document.querySelector('.navbar'); // Get your navbar element
    const scrollThreshold = 50; // Amount of pixels to scroll down before hiding

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const isMobile = window.matchMedia("(max-width: 768px)").matches; // Use your mobile breakpoint

        if (isMobile) {
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Scrolling down past the threshold, hide navbar
                navbar.classList.add('navbar-hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY < scrollThreshold) {
                // Scrolling up, or scrolled back to top
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            // On desktop, ensure the navbar is always visible
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollY = currentScrollY; // Update last scroll position
    });
});