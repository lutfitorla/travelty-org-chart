// Simple JavaScript for interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for better UX
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to position cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all position cards
    const positionCards = document.querySelectorAll('.position-card');
    positionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print Chart';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);

    // Add responsive menu for mobile (if needed in future)
    console.log('Umrah Travel Agency Org Chart loaded successfully!');
});
