// Load destinations data
async function loadDestinations() {
    try {
        const response = await fetch('data/destinations.json');
        const destinations = await response.json();
        
        const grid = document.getElementById('destinationGrid');
        if (grid) {
            grid.innerHTML = '';
            destinations.forEach(destination => {
                const card = document.createElement('div');
                card.className = 'destination-card';
                card.innerHTML = `
                    <div class="destination-image">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="destination-content">
                        <h3>${destination.name}</h3>
                        <p>${destination.description}</p>
                        <div class="destination-price">$${destination.price}</div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading destinations:', error);
    }
}

// Load packages data
async function loadPackages() {
    try {
        const response = await fetch('data/packages.json');
        const packages = await response.json();
        
        // Load featured packages
        const featuredGrid = document.getElementById('featuredPackages');
        if (featuredGrid) {
            featuredGrid.innerHTML = '';
            packages.slice(0, 3).forEach(pkg => {
                const card = document.createElement('div');
                card.className = 'package-card';
                card.innerHTML = `
                    <div class="package-image">
                        <i class="fas fa-suitcase"></i>
                    </div>
                    <div class="package-content">
                        <h3 class="package-title">${pkg.name}</h3>
                        <p class="package-description">${pkg.description}</p>
                        <div class="package-details">
                            <div class="detail-item">
                                <strong>${pkg.duration}</strong>
                                <span>Days</span>
                            </div>
                            <div class="detail-item">
                                <strong>4.8</strong>
                                <span>Rating</span>
                            </div>
                        </div>
                        <div class="package-price">$${pkg.price}</div>
                        <button class="package-btn">Book Now</button>
                    </div>
                `;
                featuredGrid.appendChild(card);
            });
        }
        
        // Load all packages on packages page
        const packagesGrid = document.getElementById('packagesGrid');
        if (packagesGrid) {
            packagesGrid.innerHTML = '';
            packages.forEach(pkg => {
                const card = document.createElement('div');
                card.className = 'package-card';
                card.innerHTML = `
                    <div class="package-image">
                        <i class="fas fa-suitcase"></i>
                    </div>
                    <div class="package-content">
                        <h3 class="package-title">${pkg.name}</h3>
                        <p class="package-description">${pkg.description}</p>
                        <div class="package-details">
                            <div class="detail-item">
                                <strong>${pkg.duration}</strong>
                                <span>Days</span>
                            </div>
                            <div class="detail-item">
                                <strong>4.8</strong>
                                <span>Rating</span>
                            </div>
                        </div>
                        <div class="package-price">$${pkg.price}</div>
                        <button class="package-btn">Book Now</button>
                    </div>
                `;
                packagesGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

// Handle contact form submission
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Handle newsletter form
function handleNewsletterForm() {
    const newsForm = document.querySelector('.newsletter-form');
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! Check your email for exclusive offers.');
            newsForm.reset();
        });
    }
}

// Handle search form
function handleSearchForm() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Redirecting to search results...');
        });
    }
}

// Handle package and destination buttons
function handleBookButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('package-btn')) {
            alert('Booking feature coming soon!');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDestinations();
    loadPackages();
    handleContactForm();
    handleNewsletterForm();
    handleSearchForm();
    handleBookButtons();
});
