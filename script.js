// Inicializace EmailJS
(function() {
    // Nastavte své EmailJS klíče zde:
    const PUBLIC_KEY = "mZb2yQCtMTq4tEqNB";  // Váš EmailJS Public Key
    const SERVICE_ID = "service_tm7web";      // Váš Service ID
    const TEMPLATE_ID = "template_contact";   // Template pro Tomáše
    const CONFIRMATION_TEMPLATE_ID = "template_confirm"; // Template pro zákazníky
    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
        
        // Globální konfigurace
        window.emailjsConfigured = true;
        window.emailjsServiceId = SERVICE_ID;
        window.emailjsTemplateId = TEMPLATE_ID;
        window.emailjsConfirmationTemplateId = CONFIRMATION_TEMPLATE_ID;
        
        console.log('✅ EmailJS je nakonfigurován a připraven k použití');
    } else {
        console.log('❌ EmailJS knihovna není dostupná');
    }
})();

// DOM elementy
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobilní navigace
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animace hamburgeru
    hamburger.classList.toggle('active');
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Zavření menu při kliknutí na odkaz
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Navigation system - simple scrolling with special TM view
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Smooth scrolling pro všechny odkazy
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#home') {
            // Pro "Domů" - normální režim
            document.body.classList.remove('tm-view-mode', 'tm7-view-mode', 'contact-form-mode');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId === '#about') {
            // Speciální TM + TM7 režim
            document.body.classList.remove('tm7-view-mode', 'contact-form-mode');
            document.body.classList.add('tm-view-mode');
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const navHeight = 80;
                const targetPosition = aboutSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else if (targetId === '#thermomix') {
            // Speciální TM7 režim - pouze Thermomix sekce
            document.body.classList.remove('tm-view-mode', 'contact-form-mode');
            document.body.classList.add('tm7-view-mode');
            const thermomixSection = document.querySelector('#thermomix');
            if (thermomixSection) {
                const navHeight = 80;
                const targetPosition = thermomixSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else if (targetId === '#contact') {
            // Normální kontakt režim - celá sekce
            document.body.classList.remove('tm-view-mode', 'tm7-view-mode', 'contact-form-mode');
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navHeight = 80;
                const targetPosition = contactSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Pro ostatní sekce - normální režim
            document.body.classList.remove('tm-view-mode', 'tm7-view-mode', 'contact-form-mode');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = 80;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll indikátor kliknutí
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const navHeight = 80;
        const targetPosition = aboutSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// Navbar změna při scrollování
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    // View mode zůstává aktivní - nezrušuje se při scrollování
    // Uživatel může volně scrollovat nahoru i dolů
});

// Animace při scrollování - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Přidání animace pro elementy
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .recipe-card, .passion-item, .contact-method'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Kontaktní formulář
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Získání hodnot formuláře
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validace - pouze jméno a email jsou povinné
    if (!formData.name || !formData.email) {
        showNotification('Prosím vyplňte jméno a email.', 'error');
        return;
    }
    
    // Validace emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Prosím zadejte platný email.', 'error');
        return;
    }
    
    // Validace telefonu (pokud je vyplněn)
    if (formData.phone) {
        const phoneRegex = /^[+]?[0-9\s\-()]+$/;
        if (!phoneRegex.test(formData.phone)) {
        }
    }
    
    // Skutečné odesílání přes EmailJS
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Odesílám...';
    submitBtn.disabled = true;
    
    // Kontrola dostupnosti EmailJS
    if (typeof emailjs === 'undefined' || !window.emailjsConfigured) {
        console.error('EmailJS není dostupný nebo nakonfigurován');
        showNotification('❌ Email služba není dostupná. Kontaktujte nás prosím přímo na +420 734 403 611.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Parametry pro EmailJS template
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Nezadáno',
        message: formData.message || 'Žádná zpráva nebyla zadána.',
        to_name: 'Tomáš Mutina',
        to_email: 't.mutina@email.cz',
        reply_to: formData.email
    };
    
    console.log('📤 Odesílám email s parametry:', templateParams);
    
    // Odeslání hlavního emailu pro Tomáše
    emailjs.send(
        window.emailjsServiceId,
        window.emailjsTemplateId,
        templateParams
    )
    .then(function(response) {
        console.log('✅ Email pro Tomáše odeslán:', response.status, response.text);
        
        // Odeslání potvrzovacího emailu zákazníkovi
        const customerParams = {
            to_name: formData.name,
            to_email: formData.email,
            from_name: 'Tomáš Mutina',
            customer_message: formData.message || 'Žádná specifická zpráva nebyla zadána.',
            reply_to: 't.mutina@email.cz'
        };
        
        console.log('📤 Odesílám potvrzovací email:', customerParams);
        
        return emailjs.send(
            window.emailjsServiceId,
            window.emailjsConfirmationTemplateId,
            customerParams
        );
    })
    .then(function(response) {
        console.log('✅ Potvrzovací email odeslán:', response.status, response.text);
        showNotification('✨ Zpráva odeslána! Tomáš se vám brzy ozve. 🍳', 'success');
        
        contactForm.reset();
        
        // Reset labelů
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.top = '16px';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--gray)';
            label.style.background = 'var(--white)';
        });
    })
    .catch(function(error) {
        console.error('❌ Chyba při odesílání emailu:', error);
        
        // Detailnější chybové hlášení
        let errorMessage = '❌ Ups! Něco se pokazilo při odesílání.';
        
        if (error.status === 400) {
            errorMessage = '❌ Neplatná emailová adresa nebo chybné údaje.';
        } else if (error.status === 403) {
            errorMessage = '❌ Email služba je dočasně nedostupná.';
        } else if (error.status === 404) {
            errorMessage = '❌ Email šablona nebyla nalezena.';
        }
        
        errorMessage += ' Kontaktujte nás prosím přímo na +420 734 403 611.';
        
        showNotification(errorMessage, 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// Notifikace funkce
function showNotification(message, type = 'info') {
    // Odstranění existující notifikace
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Vytvoření notifikace
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        </div>
    `;
    
    // Styly notifikace
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 350px;
        min-width: 280px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
        line-height: 1.4;
        border: 2px solid rgba(255,255,255,0.2);
        cursor: pointer;
    `;
    
    // Responsivní úpravy pro mobilní zařízení
    if (window.innerWidth <= 768) {
        notification.style.cssText += `
            right: 10px;
            left: 10px;
            max-width: none;
            min-width: auto;
            top: 80px;
        `;
    }
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        text-align: left;
    `;
    
    notification.querySelector('.close-notification').style.cssText = `
        background: none;
        border: none;
        color: rgba(255,255,255,0.8);
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        min-width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
    `;
    
    // Hover efekt pro close button
    notification.querySelector('.close-notification').addEventListener('mouseenter', function() {
        this.style.color = 'white';
    });
    
    notification.querySelector('.close-notification').addEventListener('mouseleave', function() {
        this.style.color = 'rgba(255,255,255,0.8)';
    });
    
    document.body.appendChild(notification);
    
    // Animace zobrazení
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Automatické skrytí po 7 sekundách (delší čas pro přečtení)
    setTimeout(() => {
        hideNotification(notification);
    }, 7000);
    
    // Kliknutí na zavření
    notification.querySelector('.close-notification').addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Kliknutí kdekoliv na notifikaci ji také zavře
    notification.addEventListener('click', (e) => {
        if (e.target !== notification.querySelector('.close-notification')) {
            hideNotification(notification);
        }
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Animace číslic a statistik
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target') || num.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                num.textContent = target;
                clearInterval(timer);
            } else {
                num.textContent = Math.ceil(current);
            }
        }, 20);
    });
}

// Přidání efektů pro tlačítka
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Loading animace pro stránku
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <i class="fas fa-utensils fa-3x"></i>
            <p>Připravujeme kuchařské zážitky...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #e74c3c, #f39c12);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        color: white;
        font-family: 'Poppins', sans-serif;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    loader.querySelector('.loader-content').style.cssText = `
        text-align: center;
        animation: pulse 1.5s infinite;
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }, 1500);
});

// Efekt písání pro nadpisy
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplikace efektu písání na hlavní nadpis
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const mainHeading = document.querySelector('.hero h1');
        const originalText = mainHeading.textContent;
        typeWriter(mainHeading, originalText, 80);
    }, 2000);
});

// Aktivní sekce v navigaci
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    // ODSTRANIT automatické vypínání view modes při scrollování!
    // View modes se vypnou pouze při explicitním kliknutí na menu
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Fallback pro home sekci
    if (window.scrollY < 100) {
        currentSection = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Lazy loading pro obrázky (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach((placeholder, index) => {
        setTimeout(() => {
            placeholder.style.opacity = '0.7';
            placeholder.style.animation = 'pulse 2s infinite';
        }, index * 200);
    });
});

// Kopírování telefonu do schránky
document.addEventListener('click', (e) => {
    if (e.target.closest('.contact-method')) {
        const phoneElement = e.target.closest('.contact-method').querySelector('p');
        if (phoneElement && phoneElement.textContent.includes('+420')) {
            navigator.clipboard.writeText(phoneElement.textContent).then(() => {
                showNotification('Telefonní číslo zkopírováno do schránky!', 'success');
            });
        }
    }
});

// Dynamické pozadí pro hero sekci
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    const elementsCount = 15;
    
    for (let i = 0; i < elementsCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s infinite linear;
            z-index: 1;
        `;
        hero.appendChild(element);
    }
}

// Spuštění po načtení DOM
document.addEventListener('DOMContentLoaded', createFloatingElements);

// Lightbox funkcionalita pro galerii
class PhotoGallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.currentImageSpan = document.getElementById('current-image');
        this.totalImagesSpan = document.getElementById('total-images');
        
        this.currentIndex = 0;
        this.images = [];
        
        this.init();
    }
    
    init() {
        // Získání všech obrázků
        this.galleryItems.forEach((item, index) => {
            const imgSrc = item.getAttribute('data-src');
            this.images.push(imgSrc);
            
            // Přidání event listeneru na každou položku
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
        
        // Nastavení celkového počtu obrázků
        this.totalImagesSpan.textContent = this.images.length;
        
        // Event listenery pro ovládání
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Zavření při kliknutí mimo obrázek
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Klávesové ovládání
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.lightbox.style.display = 'block';
        this.showImage();
        document.body.style.overflow = 'hidden'; // Zakáže scrollování stránky
    }
    
    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Obnoví scrollování stránky
    }
    
    showImage() {
        this.lightboxImg.src = this.images[this.currentIndex];
        this.currentImageSpan.textContent = this.currentIndex + 1;
        
        // Preload sousední obrázky pro rychlejší načítání
        this.preloadAdjacentImages();
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage();
    }
    
    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage();
    }
    
    preloadAdjacentImages() {
        // Preload předchozí obrázek
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        const prevImg = new Image();
        prevImg.src = this.images[prevIndex];
        
        // Preload následující obrázek
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        const nextImg = new Image();
        nextImg.src = this.images[nextIndex];
    }
}

// Inicializace galerie po načtení DOM
document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
});

// Re-inicializace při změně view mode - už není potřeba
document.addEventListener('click', (e) => {
    if (e.target.matches('nav a[href="#contact"]')) {
        // Ponechano pro budoucí použití
    }
});

console.log('🍴 Webová stránka kuchaře s Thermomix TM7 načtena!');
console.log('📞 Nezapomeňte aktualizovat kontaktní údaje v HTML souboru.');