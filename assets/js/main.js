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
                const imageUrl = destination.image || 'https://via.placeholder.com/300x200';
                const packages = destination.packages ? destination.packages.map(pkg => `<span class="package-tag">${pkg}</span>`).join('') : '';
                const activities = destination.activities ? destination.activities.join(', ') : 'Various activities';
                
                card.innerHTML = `
                    <div class="destination-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center; height: 250px;">
                        <span class="destination-difficulty">${destination.emoji || '⛰️'}</span>
                    </div>
                    <div class="destination-content">
                        <h3>${destination.name}</h3>
                        <p>${destination.description || ''}</p>
                        
                        <div class="destination-info">
                            <div class="info-item">
                                <i class="fas fa-mountain"></i> <strong>${destination.altitude || 'N/A'}</strong>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-thermometer-half"></i> <strong>${destination.temperature || 'N/A'}</strong>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-clock"></i> <strong>${destination.duration || 'N/A'} days</strong>
                            </div>
                        </div>
                        
                        <div class="activities-section">
                            <strong>Activities:</strong> ${activities}
                        </div>
                        
                        ${packages ? `<div class="packages-section">
                            <strong>Available in Packages:</strong>
                            <div class="packages-container">
                                ${packages}
                            </div>
                        </div>` : ''}
                        
                        <div class="destination-footer">
                            <div class="destination-price">from $${destination.price}</div>
                            <button class="destination-btn" onclick="document.location='booking.html'"><i class="fas fa-calendar-check"></i> Book</button>
                        </div>
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
                const locations = pkg.locations ? pkg.locations.map(loc => `<span class="location-tag"><i class="fas fa-map-marker-alt"></i> ${loc}</span>`).join('') : '';
                card.innerHTML = `
                    <div class="package-image">
                        <i class="fas fa-suitcase"></i>
                    </div>
                    <div class="package-content">
                        <h3 class="package-title">${pkg.name}</h3>
                        <p class="package-description">${pkg.description}</p>
                        ${locations ? `<div class="package-locations">${locations}</div>` : ''}
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
                const locations = pkg.locations ? pkg.locations.map(loc => `<span class="location-tag"><i class="fas fa-map-marker-alt"></i> ${loc}</span>`).join('') : '';
                card.innerHTML = `
                    <div class="package-image">
                        <i class="fas fa-suitcase"></i>
                    </div>
                    <div class="package-content">
                        <h3 class="package-title">${pkg.name}</h3>
                        <p class="package-description">${pkg.description}</p>
                        ${locations ? `<div class="package-locations">${locations}</div>` : ''}
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
        if (e.target.classList.contains('package-btn') || e.target.classList.contains('destination-btn')) {
            const packageName = e.target.closest('.package-card')?.querySelector('.package-title')?.textContent || 
                               e.target.closest('.destination-card')?.querySelector('h3')?.textContent;
            // Redirect to booking page
            window.location.href = 'booking.html?package=' + encodeURIComponent(packageName || '');
        }
    });
}

// Get booking parameter from URL
function getBookingPackage() {
    const urlParams = new URLSearchParams(window.location.search);
    const package = urlParams.get('package');
    if (package && document.getElementById('travelType')) {
        const select = document.getElementById('travelType');
        // Find and select the matching package
        for (let option of select.options) {
            if (option.textContent.includes(package)) {
                select.value = option.value;
                updatePrice();
                break;
            }
        }
    }
}

// Load booking data from localStorage
function loadBookingHistory() {
    const bookings = JSON.parse(localStorage.getItem('gbTravelingBookings')) || [];
    console.log('Booking History:', bookings);
    return bookings;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDestinations();
    loadPackages();
    handleContactForm();
    handleNewsletterForm();
    handleSearchForm();
    handleBookButtons();
    getBookingPackage(); // Initialize booking if coming from package link
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});
});
