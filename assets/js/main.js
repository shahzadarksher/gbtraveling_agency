// Global data storage
let destinationsData = [];
let packagesData = [];

// Load destinations data
async function loadDestinations(filterText = '') {
    try {
        const storedDest = localStorage.getItem('gbDestinations');
        if (storedDest) {
            destinationsData = JSON.parse(storedDest);
        } else {
            const response = await fetch('data/destinations.json');
            destinationsData = await response.json();
        }
        
        let filtered = destinationsData;
        if (filterText) {
            const search = filterText.toLowerCase();
            filtered = destinationsData.filter(d => 
                d.name.toLowerCase().includes(search) || 
                (d.region && d.region.toLowerCase().includes(search)) ||
                (d.activities && d.activities.some(a => a.toLowerCase().includes(search)))
            );
        }
        
        const grid = document.getElementById('destinationGrid');
        if (grid) {
            grid.innerHTML = '';
            if (filtered.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No destinations found matching your search.</p>';
                return;
            }
            filtered.forEach(destination => {
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
async function loadPackages(filterText = '') {
    try {
        const storedPkg = localStorage.getItem('gbPackages');
        if (storedPkg) {
            packagesData = JSON.parse(storedPkg);
        } else {
            const response = await fetch('data/packages.json');
            packagesData = await response.json();
        }
        
        let filtered = packagesData;
        if (filterText) {
            const search = filterText.toLowerCase();
            filtered = packagesData.filter(p => 
                p.name.toLowerCase().includes(search) || 
                p.description.toLowerCase().includes(search) ||
                (p.locations && p.locations.some(l => l.toLowerCase().includes(search))) ||
                (p.category && p.category.toLowerCase().includes(search))
            );
        }
        
        // Load featured packages
        const featuredGrid = document.getElementById('featuredPackages');
        if (featuredGrid) {
            featuredGrid.innerHTML = '';
            filtered.slice(0, 3).forEach(pkg => {
                const card = createPackageCard(pkg);
                featuredGrid.appendChild(card);
            });
        }
        
        // Load all packages on packages page
        const packagesGrid = document.getElementById('packagesGrid');
        if (packagesGrid) {
            packagesGrid.innerHTML = '';
            if (filtered.length === 0) {
                packagesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No packages found matching your search.</p>';
                return;
            }
            filtered.forEach(pkg => {
                const card = createPackageCard(pkg);
                packagesGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

function createPackageCard(pkg) {
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
                    <strong>${pkg.rating || '4.8'}</strong>
                    <span>Rating</span>
                </div>
            </div>
            <div class="package-price">$${pkg.price}</div>
            <button class="package-btn">Book Now</button>
        </div>
    `;
    return card;
}

// Load testimonials dynamically
async function loadTestimonials() {
    try {
        const storedTest = localStorage.getItem('gbTestimonials');
        let testimonials;
        if (storedTest) {
            testimonials = JSON.parse(storedTest);
        } else {
            const response = await fetch('data/testimonials.json');
            testimonials = await response.json();
        }
        
        const grid = document.querySelector('.testimonials-grid');
        if (grid) {
            grid.innerHTML = '';
            testimonials.slice(0, 3).forEach(t => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
                card.innerHTML = `
                    <div class="stars">${stars}</div>
                    <p>"${t.review}"</p>
                    <h4>${t.name}</h4>
                    <span>${t.destination}</span>
                `;
                grid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{7,20}$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

// Handle contact form submission with validation
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const name = form.querySelector('input[type="text"]')?.value;
            const email = form.querySelector('input[type="email"]')?.value;
            const subject = form.querySelector('input[placeholder="Subject"]')?.value;
            const message = form.querySelector('textarea')?.value;
            
            let errors = [];
            if (!validateRequired(name)) errors.push('Name is required');
            if (!validateRequired(email) || !validateEmail(email)) errors.push('Valid email is required');
            if (!validateRequired(subject)) errors.push('Subject is required');
            if (!validateRequired(message)) errors.push('Message is required');
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }
            
            // Save contact form to localStorage
            const contacts = JSON.parse(localStorage.getItem('gbContacts')) || [];
            contacts.push({
                id: 'CT' + Date.now().toString().slice(-6),
                name, email, subject, message,
                date: new Date().toISOString().split('T')[0]
            });
            localStorage.setItem('gbContacts', JSON.stringify(contacts));
            
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
}

// Handle newsletter form
function handleNewsletterForm() {
    const newsForm = document.querySelector('.newsletter-form');
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]')?.value;
            if (!email || !validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const subscribers = JSON.parse(localStorage.getItem('gbSubscribers')) || [];
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('gbSubscribers', JSON.stringify(subscribers));
            }
            
            alert('Thank you for subscribing! Check your email for exclusive offers.');
            newsForm.reset();
        });
    }
}

// Handle search form with filtering
function handleSearchForm() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const destination = form.querySelector('input[placeholder="Destination"]')?.value || '';
            const travelType = form.querySelector('select')?.value || '';
            
            // Store search criteria and redirect
            sessionStorage.setItem('searchDestination', destination);
            sessionStorage.setItem('searchType', travelType);
            
            if (travelType && travelType !== 'Travel Type') {
                window.location.href = `packages.html?search=${encodeURIComponent(travelType)}`;
            } else if (destination) {
                window.location.href = `destinations.html?search=${encodeURIComponent(destination)}`;
            } else {
                window.location.href = 'destinations.html';
            }
        });
    }
}

// Handle URL search parameters
function handleUrlSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
        if (document.getElementById('destinationGrid')) {
            loadDestinations(search);
        }
        if (document.getElementById('packagesGrid') || document.getElementById('featuredPackages')) {
            loadPackages(search);
        }
    }
}

// Handle package and destination buttons
function handleBookButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('package-btn') || e.target.classList.contains('destination-btn')) {
            const packageName = e.target.closest('.package-card')?.querySelector('.package-title')?.textContent || 
                               e.target.closest('.destination-card')?.querySelector('h3')?.textContent;
            window.location.href = 'booking.html?package=' + encodeURIComponent(packageName || '');
        }
    });
}

// Validate booking form
function validateBookingForm(form) {
    const errors = [];
    const firstName = form.firstName?.value;
    const lastName = form.lastName?.value;
    const email = form.email?.value;
    const phone = form.phone?.value;
    const travelType = form.travelType?.value;
    const travelers = parseInt(form.travelers?.value);
    const startDate = form.startDate?.value;
    const endDate = form.endDate?.value;
    const terms = form.terms?.checked;
    
    if (!validateRequired(firstName)) errors.push('First name is required');
    if (!validateRequired(lastName)) errors.push('Last name is required');
    if (!validateRequired(email) || !validateEmail(email)) errors.push('Valid email is required');
    if (!validateRequired(phone) || !validatePhone(phone)) errors.push('Valid phone number is required');
    if (!travelType) errors.push('Please select a package or destination');
    if (!travelers || travelers < 1 || travelers > 20) errors.push('Number of travelers must be between 1 and 20');
    if (!startDate || !endDate) errors.push('Please select travel dates');
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) errors.push('End date must be after start date');
    if (!terms) errors.push('You must agree to the terms and conditions');
    
    return errors;
}

// Save booking to localStorage
function saveBooking(bookingData) {
    const bookings = JSON.parse(localStorage.getItem('gbTravelingBookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('gbTravelingBookings', JSON.stringify(bookings));
    return bookings;
}

// Get booking parameter from URL
function getBookingPackage() {
    const urlParams = new URLSearchParams(window.location.search);
    const package = urlParams.get('package');
    if (package && document.getElementById('travelType')) {
        const select = document.getElementById('travelType');
        for (let option of select.options) {
            if (option.textContent.toLowerCase().includes(package.toLowerCase())) {
                select.value = option.value;
                updatePrice();
                break;
            }
        }
    }
}

// Update price based on selection
function updatePrice() {
    const travelTypeEl = document.getElementById('travelType');
    const travelersEl = document.getElementById('travelers');
    
    if (travelTypeEl && travelersEl) {
        const travelType = travelTypeEl.value;
        const travelers = parseInt(travelersEl.value) || 1;
        
        if (travelType) {
            const [name, price] = travelType.split('|');
            const perPersonPrice = parseInt(price);
            const totalPrice = perPersonPrice * travelers;
            
            const packagePriceEl = document.getElementById('packagePrice');
            const travelersDisplayEl = document.getElementById('travelersDisplay');
            const totalPriceEl = document.getElementById('totalPrice');
            
            if (packagePriceEl) packagePriceEl.textContent = '$' + perPersonPrice;
            if (travelersDisplayEl) travelersDisplayEl.textContent = travelers;
            if (totalPriceEl) totalPriceEl.textContent = '$' + totalPrice;
        }
    }
}

// Calculate days between dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0;
}

// Handle booking form submission
function handleBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const errors = validateBookingForm(bookingForm);
            if (errors.length > 0) {
                const errorMessage = document.getElementById('errorMessage');
                if (errorMessage) {
                    errorMessage.innerHTML = errors.join('<br>');
                    errorMessage.style.display = 'block';
                }
                return;
            }
            
            const formData = new FormData(bookingForm);
            const travelTypeValue = formData.get('travelType');
            const [packageName, packagePrice] = travelTypeValue.split('|');
            const numberOfPeople = parseInt(formData.get('travelers'));
            const totalPrice = parseInt(packagePrice) * numberOfPeople;
            const bookingId = 'BK' + Date.now().toString().slice(-6);
            
            const bookingData = {
                id: bookingId,
                packageName: packageName,
                customerName: formData.get('firstName') + ' ' + formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                numberOfPeople: numberOfPeople,
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate'),
                duration: calculateDays(formData.get('startDate'), formData.get('endDate')),
                accommodationType: formData.get('accommodationType'),
                specialRequests: formData.get('specialRequests'),
                totalPrice: totalPrice,
                status: 'Pending',
                bookingDate: new Date().toISOString().split('T')[0]
            };
            
            saveBooking(bookingData);
            
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            if (successMessage) {
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i> Your booking has been submitted successfully! 
                    <br><strong>Booking ID: ${bookingId}</strong>
                    <br>We'll contact you within 24 hours to confirm. View your booking at <a href="my-bookings.html" style="color: #155724;">My Bookings</a>.
                `;
                successMessage.style.display = 'block';
            }
            if (errorMessage) errorMessage.style.display = 'none';
            
            bookingForm.reset();
            updatePrice();
            window.scrollTo(0, 0);
        });
        
        // Update price on traveler count change
        document.getElementById('travelers')?.addEventListener('change', updatePrice);
        document.getElementById('travelType')?.addEventListener('change', updatePrice);
    }
}

// Load booking data from localStorage
function loadBookingHistory() {
    const bookings = JSON.parse(localStorage.getItem('gbTravelingBookings')) || [];
    return bookings;
}

// Filter functions
function applyFilters() {
    const search = document.getElementById('searchFilter')?.value || '';
    const priceRange = document.getElementById('priceFilter')?.value || '';
    const durationRange = document.getElementById('durationFilter')?.value || '';
    
    // Get current data
    let filtered = [...destinationsData];
    
    // Search filter
    if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(d => 
            d.name.toLowerCase().includes(s) ||
            (d.description && d.description.toLowerCase().includes(s)) ||
            (d.activities && d.activities.some(a => a.toLowerCase().includes(s)))
        );
    }
    
    // Price filter
    if (priceRange) {
        filtered = filtered.filter(d => {
            if (priceRange === '1000+') return d.price >= 1000;
            const [min, max] = priceRange.split('-').map(Number);
            return d.price >= min && d.price <= max;
        });
    }
    
    // Duration filter
    if (durationRange) {
        filtered = filtered.filter(d => {
            const dur = d.duration || 0;
            if (durationRange === '5+') return dur >= 5;
            const [min, max] = durationRange.split('-').map(Number);
            return dur >= min && dur <= max;
        });
    }
    
    renderFilteredDestinations(filtered);
}

function renderFilteredDestinations(data) {
    const grid = document.getElementById('destinationGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No destinations found matching your filters.</p>';
        return;
    }
    
    data.forEach(destination => {
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
                    <div class="info-item"><i class="fas fa-mountain"></i> <strong>${destination.altitude || 'N/A'}</strong></div>
                    <div class="info-item"><i class="fas fa-thermometer-half"></i> <strong>${destination.temperature || 'N/A'}</strong></div>
                    <div class="info-item"><i class="fas fa-clock"></i> <strong>${destination.duration || 'N/A'} days</strong></div>
                </div>
                <div class="activities-section"><strong>Activities:</strong> ${activities}</div>
                ${packages ? `<div class="packages-section"><strong>Available:</strong><div class="packages-container">${packages}</div></div>` : ''}
                <div class="destination-footer">
                    <div class="destination-price">from $${destination.price}</div>
                    <button class="destination-btn" onclick="document.location='booking.html'"><i class="fas fa-calendar-check"></i> Book</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function clearFilters() {
    if (document.getElementById('searchFilter')) document.getElementById('searchFilter').value = '';
    if (document.getElementById('priceFilter')) document.getElementById('priceFilter').value = '';
    if (document.getElementById('durationFilter')) document.getElementById('durationFilter').value = '';
    loadDestinations();
}

// Package filter functions
function applyPkgFilters() {
    const search = document.getElementById('pkgSearchFilter')?.value || '';
    const category = document.getElementById('pkgCategoryFilter')?.value || '';
    const priceRange = document.getElementById('pkgPriceFilter')?.value || '';
    const durationRange = document.getElementById('pkgDurationFilter')?.value || '';
    
    let filtered = [...packagesData];
    
    if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            (p.locations && p.locations.some(l => l.toLowerCase().includes(s)))
        );
    }
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (priceRange) {
        filtered = filtered.filter(p => {
            if (priceRange === '3500+') return p.price >= 3500;
            const [min, max] = priceRange.split('-').map(Number);
            return p.price >= min && p.price <= max;
        });
    }
    
    if (durationRange) {
        filtered = filtered.filter(p => {
            if (durationRange === '10+') return p.duration >= 10;
            const [min, max] = durationRange.split('-').map(Number);
            return p.duration >= min && p.duration <= max;
        });
    }
    
    renderFilteredPackages(filtered);
}

function renderFilteredPackages(data) {
    const grid = document.getElementById('packagesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No packages found matching your filters.</p>';
        return;
    }
    
    data.forEach(pkg => {
        const card = createPackageCard(pkg);
        grid.appendChild(card);
    });
}

function clearPkgFilters() {
    if (document.getElementById('pkgSearchFilter')) document.getElementById('pkgSearchFilter').value = '';
    if (document.getElementById('pkgCategoryFilter')) document.getElementById('pkgCategoryFilter').value = '';
    if (document.getElementById('pkgPriceFilter')) document.getElementById('pkgPriceFilter').value = '';
    if (document.getElementById('pkgDurationFilter')) document.getElementById('pkgDurationFilter').value = '';
    loadPackages();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Handle URL search parameters
    handleUrlSearch();
    
    // Load data
    loadDestinations();
    loadPackages();
    loadTestimonials();
    
    // Form handlers
    handleContactForm();
    handleNewsletterForm();
    handleSearchForm();
    handleBookingForm();
    handleBookButtons();
    getBookingPackage();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Set min date for date inputs (today)
    const startDateInput = document.querySelector('input[type="date"]');
    if (startDateInput) {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
    }
});
});
