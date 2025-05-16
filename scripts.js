/* Place your JavaScript in this file */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if(navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
                    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                }
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Success Stories Slider
    const stories = document.querySelectorAll('.story');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentStory = 0;

    function showStory(index) {
        stories.forEach(story => story.classList.remove('active'));
        stories[index].classList.add('active');
    }

    function nextStory() {
        currentStory = (currentStory + 1) % stories.length;
        showStory(currentStory);
    }

    function prevStory() {
        currentStory = (currentStory - 1 + stories.length) % stories.length;
        showStory(currentStory);
    }

    nextBtn.addEventListener('click', nextStory);
    prevBtn.addEventListener('click', prevStory);

    // Auto-rotate stories every 5 seconds
    let storyInterval = setInterval(nextStory, 5000);

    // Pause auto-rotation when hovering over slider
    const slider = document.querySelector('.stories-slider');
    slider.addEventListener('mouseenter', () => clearInterval(storyInterval));
    slider.addEventListener('mouseleave', () => {
        storyInterval = setInterval(nextStory, 5000);
    });

    // Payment Method Toggle
    const paymentMethods = document.querySelectorAll('.payment-method');
    const creditCardFields = document.getElementById('creditCardFields');

    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            if(this.dataset.method === 'credit') {
                creditCardFields.style.display = 'block';
            } else {
                creditCardFields.style.display = 'none';
            }
        });
    });

    // Form Submissions
    const donationForm = document.getElementById('donationForm');
    const volunteerForm = document.getElementById('volunteerForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const contactForm = document.getElementById('contactForm');

    function showAlert(message, isSuccess = true) {
        const alert = document.createElement('div');
        alert.className = `alert ${isSuccess ? 'success' : 'error'}`;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 3000);
    }

    if(donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would process the payment here
            showAlert('Thank you for your donation! Your support helps educate girls in rural areas.', true);
            this.reset();
        });
    }

    if(volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('Thank you for your interest in volunteering! We will contact you soon.', true);
            this.reset();
        });
    }

    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('Thank you for subscribing to our newsletter!', true);
            this.reset();
        });
    }

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('Your message has been sent. We will get back to you soon!', true);
            this.reset();
        });
    }

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if(cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s+/g, '');
            if(value.length > 16) {
                value = value.substr(0, 16);
            }
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            this.value = value;
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    if(expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if(value.length > 2) {
                value = value.substr(0, 2) + '/' + value.substr(2, 2);
            }
            this.value = value;
        });
    }
});

// Add some basic styling for alerts
const style = document.createElement('style');
style.textContent = `
.alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    color: white;
    font-weight: 600;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateX(150%);
    transition: transform 0.3s ease;
    z-index: 9999;
}

.alert.show {
    transform: translateX(0);
}

.alert.success {
    background-color: #4caf50;
}

.alert.error {
    background-color: #f44336;
}
`;
document.head.appendChild(style);