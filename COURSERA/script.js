// Destination data
const destinations = {
    beach: [
        {
            name: "Maldives Paradise",
            description: "Crystal-clear turquoise waters and pristine white sand beaches await you in this tropical paradise.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
            emoji: "🏖️"
        },
        {
            name: "Bora Bora",
            description: "Experience luxury in overwater bungalows surrounded by stunning coral reefs and marine life.",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
            emoji: "🌴"
        },
        {
            name: "Seychelles",
            description: "Discover untouched beaches, granite boulders, and lush tropical forests in this island nation.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            emoji: "🏝️"
        }
    ],
    temple: [
        {
            name: "Angkor Wat, Cambodia",
            description: "Explore the largest religious monument in the world, a masterpiece of Khmer architecture.",
            image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
            emoji: "🕌"
        },
        {
            name: "Taj Mahal, India",
            description: "Marvel at this ivory-white marble mausoleum, a symbol of eternal love and architectural perfection.",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
            emoji: "🕌"
        },
        {
            name: "Borobudur, Indonesia",
            description: "Visit the world's largest Buddhist temple, featuring intricate stone carvings and stunning views.",
            image: "https://images.unsplash.com/photo-1588666309990-d6209adf0117?w=800&h=600&fit=crop",
            emoji: "🛕"
        }
    ],
    india: [
        {
            name: "Golden Triangle",
            description: "Discover Delhi, Agra, and Jaipur - three cities that showcase India's rich history and culture.",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
            emoji: "🇮🇳"
        },
        {
            name: "Kerala Backwaters",
            description: "Cruise through serene waterways surrounded by lush greenery and traditional villages.",
            image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&h=600&fit=crop",
            emoji: "🚣"
        },
        {
            name: "Goa Beaches",
            description: "Relax on beautiful beaches, enjoy vibrant nightlife, and experience Portuguese-influenced culture.",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
            emoji: "🏖️"
        }
    ],
    mountain: [
        {
            name: "Swiss Alps",
            description: "Breathtaking peaks, alpine meadows, and charming mountain villages await in the heart of Europe.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            emoji: "⛰️"
        },
        {
            name: "Himalayas, Nepal",
            description: "Trek through the world's highest mountain range and experience Sherpa culture and stunning vistas.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            emoji: "🏔️"
        },
        {
            name: "Rocky Mountains, Canada",
            description: "Explore pristine wilderness, glacial lakes, and diverse wildlife in this natural wonderland.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            emoji: "🗻"
        }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Navbar scroll effect
    setupNavbarScroll();
    
    // Setup destination card clicks
    setupDestinationCards();
    
    // Smooth scroll for anchor links
    setupSmoothScroll();
    
    // Form handling
    setupContactForm();
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Setup destination card clicks
function setupDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.dataset.destination;
            if (destination && destinations[destination]) {
                document.getElementById('searchInput').value = destination;
                search();
                scrollToDestinations();
            }
        });
    });
}

// Smooth scroll function
function scrollToDestinations() {
    const recommendationsSection = document.getElementById('recommendations');
    if (recommendationsSection) {
        recommendationsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Setup smooth scroll for all anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Handle Enter key press in search
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        search();
    }
}

// Enhanced search function
function search() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const results = document.getElementById("results");
    
    // Clear previous results
    results.innerHTML = "";
    
    // Add loading state
    results.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Searching amazing destinations...</p></div>';
    
    // Simulate search delay for better UX
    setTimeout(() => {
        displayResults(input, results);
    }, 500);
}

function displayResults(input, results) {
    // Find matching destinations
    let matchedDestinations = [];
    let searchTitle = "";
    
    // Check for exact matches first
    if (destinations[input]) {
        matchedDestinations = destinations[input];
        searchTitle = formatTitle(input);
    } else {
        // Check for partial matches
        for (const [key, places] of Object.entries(destinations)) {
            if (key.includes(input) || input.includes(key)) {
                matchedDestinations = places;
                searchTitle = formatTitle(key);
                break;
            }
        }
        
        // If still no match, search in destination names
        if (matchedDestinations.length === 0) {
            for (const [key, places] of Object.entries(destinations)) {
                const found = places.filter(place => 
                    place.name.toLowerCase().includes(input) ||
                    place.description.toLowerCase().includes(input)
                );
                if (found.length > 0) {
                    matchedDestinations = found;
                    searchTitle = `Results for "${input}"`;
                    break;
                }
            }
        }
    }
    
    // Display results
    if (matchedDestinations.length > 0) {
        results.innerHTML = `
            <h3 class="results-title">${searchTitle}</h3>
            <div class="results-grid">
                ${matchedDestinations.map((place, index) => `
                    <div class="result-card" style="animation-delay: ${index * 0.1}s">
                        <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(place.name)}'">
                        <div class="result-card-content">
                            <h3>${place.emoji} ${place.name}</h3>
                            <p>${place.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        results.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try searching for: <strong>beach</strong>, <strong>temple</strong>, <strong>india</strong>, or <strong>mountain</strong></p>
                <p style="margin-top: 20px; font-size: 0.9rem; color: #999;">Or click on one of the featured destinations above!</p>
            </div>
        `;
    }
}

function formatTitle(key) {
    return key.charAt(0).toUpperCase() + key.slice(1) + " Destinations";
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading-state {
        text-align: center;
        padding: 80px 20px;
    }
    
    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .results-title {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 40px;
        color: var(--text-dark);
    }
`;
document.head.appendChild(style);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    }
});
