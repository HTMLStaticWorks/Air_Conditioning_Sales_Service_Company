document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const dashboardSidebar = document.getElementById('dashboardSidebar');
    
    if (mobileMenuToggle && dashboardSidebar) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing it
            dashboardSidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (dashboardSidebar.classList.contains('show') && 
                !dashboardSidebar.contains(e.target) && 
                e.target !== mobileMenuToggle) {
                dashboardSidebar.classList.remove('show');
            }
        });
        
        // Close sidebar when clicking a nav link (mobile only)
        const navLinks = dashboardSidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991) {
                    dashboardSidebar.classList.remove('show');
                }
            });
        });
    }
});
