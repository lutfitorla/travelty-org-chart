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

    // Calculator functionality
    initializeCalculator();
});

// Calculator Functions
function initializeCalculator() {
    // Check if we're on the calculator page
    if (!document.querySelector('.calculator-section')) {
        return;
    }

    const paxCountInput = document.getElementById('pax-count');
    const costInputs = document.querySelectorAll('.cost-input');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const totalCostElement = document.getElementById('total-cost');
    const totalTripCostElement = document.getElementById('total-trip-cost');
    const paxCountDisplayElement = document.getElementById('pax-count-display');
    const tripPriceInput = document.getElementById('trip-price');
    const profitPerPaxElement = document.getElementById('profit-per-pax');
    const totalProfitElement = document.getElementById('total-profit');
    const groupTotalElement = document.getElementById('group-total');
    const individualTotalElement = document.getElementById('individual-total');

    // Add event listeners
    paxCountInput.addEventListener('input', calculateTotals);
    
    costInputs.forEach(input => {
        input.addEventListener('input', calculateTotals);
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateTotals);
    });
    
    tripPriceInput.addEventListener('input', calculateTotals);

    // Initial calculation
    calculateTotals();

    function calculateTotals() {
        const paxCount = parseInt(paxCountInput.value) || 1;
        let totalCost = 0;
        let groupTotal = 0;
        let individualTotal = 0;

        // Items that are divided by 4 (hotels - quad sharing)
        const hotelItems = ['hotel-makkah', 'hotel-madinah', 'hotel-taif'];
        
        // Items that are divided by pax count (group costs)
        const paxDividedItems = ['bus', 'mutawwif', 'photography', 'baksis', 'ground-staff'];
        
        // Individual cost items (per pax)
        const individualItems = ['flight', 'visa', 'zamzam', 'travel-kit', 'makan-mekah', 'makan-madinah', 'haramain-train', 'staff-admin', 'lain2'];

        // Calculate total for each item
        costInputs.forEach(costInput => {
            const itemName = costInput.getAttribute('data-item');
            const quantityInput = document.querySelector(`.quantity-input[data-item="${itemName}"]`);
            const itemTotalElement = document.querySelector(`.item-total[data-item="${itemName}"]`);
            
            const cost = parseFloat(costInput.value) || 0;
            const quantity = parseFloat(quantityInput.value) || 0;
            let itemTotal = cost * quantity;
            
            // Apply division logic based on item type
            if (hotelItems.includes(itemName)) {
                // Hotels: divide by 4 (quad sharing)
                itemTotal = itemTotal / 4;
            } else if (paxDividedItems.includes(itemName)) {
                // Bus, Mutawwif, Photography, Baksis, Ground staff: divide by pax count
                itemTotal = itemTotal / paxCount;
            }
            
            // Update item total display
            itemTotalElement.textContent = `RM ${itemTotal.toLocaleString()}`;
            
            // Add to appropriate total
            if (hotelItems.includes(itemName) || paxDividedItems.includes(itemName)) {
                groupTotal += itemTotal;
            } else if (individualItems.includes(itemName)) {
                individualTotal += itemTotal;
            }
            
            // Add to total cost
            totalCost += itemTotal;
        });

        // Calculate cost per pax and total trip cost
        const costPerPax = totalCost;
        const totalTripCost = totalCost * paxCount;

        // Update cost summary
        totalCostElement.textContent = `RM ${costPerPax.toLocaleString()}`;
        totalTripCostElement.textContent = `RM ${totalTripCost.toLocaleString()}`;
        paxCountDisplayElement.textContent = paxCount;

        // Update column totals
        groupTotalElement.textContent = `RM ${groupTotal.toLocaleString()}`;
        individualTotalElement.textContent = `RM ${individualTotal.toLocaleString()}`;

        // Calculate profit
        const tripPrice = parseFloat(tripPriceInput.value) || 0;
        const profitPerPax = tripPrice - costPerPax;
        const totalProfit = profitPerPax * paxCount;

        // Update profit summary
        profitPerPaxElement.textContent = `RM ${profitPerPax.toLocaleString()}`;
        totalProfitElement.textContent = `RM ${totalProfit.toLocaleString()}`;

        // Add animation to updated totals
        animateTotalUpdate();
    }

    function animateTotalUpdate() {
        const elements = [totalCostElement, totalTripCostElement, profitPerPaxElement, totalProfitElement, groupTotalElement, individualTotalElement];
        elements.forEach(element => {
            if (element) {
                element.style.transform = 'scale(1.1)';
                element.style.transition = 'transform 0.2s ease';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    // Add input validation
    function validateInputs() {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value < 0) {
                    this.value = 0;
                    calculateTotals();
                }
            });
        });
    }

    validateInputs();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            resetCalculator();
        }
    });

    function resetCalculator() {
        // Reset to default values
        paxCountInput.value = 30;
        
        const defaultValues = {
            'flight': { cost: 3550, quantity: 1 },
            'hotel-makkah': { cost: 270, quantity: 6 },
            'hotel-madinah': { cost: 600, quantity: 3 },
            'hotel-taif': { cost: 300, quantity: 1 },
            'visa': { cost: 500, quantity: 0 },
            'bus': { cost: 4500, quantity: 1 },
            'mutawwif': { cost: 8000, quantity: 1 },
            'zamzam': { cost: 20, quantity: 1 },
            'makan-mekah': { cost: 65, quantity: 0 },
            'makan-madinah': { cost: 150, quantity: 0 },
            'haramain-train': { cost: 200, quantity: 0 },
            'travel-kit': { cost: 200, quantity: 1 },
            'photography': { cost: 1000, quantity: 0 },
            'staff-admin': { cost: 100, quantity: 1 },
            'lain2': { cost: 200, quantity: 1 },
            'baksis': { cost: 1000, quantity: 1 },
            'ground-staff': { cost: 3000, quantity: 1 }
        };

        Object.keys(defaultValues).forEach(itemName => {
            const costInput = document.querySelector(`.cost-input[data-item="${itemName}"]`);
            const quantityInput = document.querySelector(`.quantity-input[data-item="${itemName}"]`);
            
            if (costInput && quantityInput) {
                costInput.value = defaultValues[itemName].cost;
                quantityInput.value = defaultValues[itemName].quantity;
            }
        });

        calculateTotals();
        
        // Show reset notification
        showNotification('Calculator telah direset ke nilai default', 'success');
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    console.log('Umrah Cost Calculator initialized successfully!');
}
