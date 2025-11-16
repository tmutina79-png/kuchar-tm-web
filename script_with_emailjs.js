// Rozšířená verze script.js s EmailJS podporou
// Zkopírujte tento kód do script.js poté, co nastavíte EmailJS

// DOM elementy
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobilní navigace
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animace hamburger menu
    const bars = hamburger.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
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
            document.body.classList.remove('tm-view-mode', 'tm7-view-mode');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId === '#about') {
            // Speciální TM + TM7 režim
            document.body.classList.remove('tm7-view-mode');
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
            document.body.classList.remove('tm-view-mode');
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
            document.body.classList.remove('tm-view-mode', 'tm7-view-mode');
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
            document.body.classList.remove('tm-view-mode', 'tm7-view-mode');
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
    
    // Kontrola dostupnosti EmailJS
    if (typeof emailjs !== 'undefined' && window.emailjsConfigured) {
        sendEmailWithEmailJS(formData);
    } else {
        sendEmailSimulation(formData);
    }
});

// Funkce pro odeslání přes EmailJS
function sendEmailWithEmailJS(formData) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Odesílám...';
    submitBtn.disabled = true;
    
    // Parametry pro EmailJS template
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Nezadáno',
        message: formData.message || 'Žádná zpráva nebyla zadána.',
        to_name: 'Tomáš Mutina',
        to_email: 't.mutina@email.cz'
    };
    
    // Odeslání emailu přes EmailJS
    emailjs.send(
        window.emailjsServiceId,    // Vaš Service ID
        window.emailjsTemplateId,   // Vaš Template ID  
        templateParams
    )
    .then(function(response) {
        console.log('Email úspěšně odeslán:', response.status, response.text);
        
        // Odeslání potvrzovacího emailu zákazníkovi (volitelné)
        if (window.emailjsConfirmationTemplateId) {
            const customerParams = {
                to_name: formData.name,
                to_email: formData.email,
                from_name: 'Tomáš Mutina',
                customer_message: formData.message || 'Žádná specifická zpráva nebyla zadána.'
            };
            
            return emailjs.send(
                window.emailjsServiceId,
                window.emailjsConfirmationTemplateId,
                customerParams
            );
        }
        return Promise.resolve();
    })
    .then(function(response) {
        showNotification('✨ Zpráva odeslána! Tomáš se vám brzy ozve. 🍳', 'success');
        resetForm();
    })
    .catch(function(error) {
        console.error('Chyba při odesílání emailu:', error);
        showNotification('❌ Ups! Něco se pokazilo. Zkuste to prosím znovu nebo nás kontaktujte přímo na +420 734 403 611.', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Funkce pro simulaci emailu
function sendEmailSimulation(formData) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Odesílám...';
    submitBtn.disabled = true;
    
    // Simulace úspěšného odeslání
    setTimeout(() => {
        console.log('📧 SIMULACE EMAILU:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('👤 Jméno:', formData.name);
        console.log('📧 Email:', formData.email);
        console.log('📱 Telefon:', formData.phone || 'Nezadáno');
        console.log('💬 Zpráva:', formData.message || 'Žádná zpráva');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('ℹ️  Pro skutečné emaily nastavte EmailJS podle návodu v EMAILJS_SETUP.md');
        
        showNotification('✨ Zpráva odeslána! Tomáš se vám brzy ozve. 🍳', 'success');
        resetForm();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Pomocná funkce pro reset formuláře
function resetForm() {
    contactForm.reset();
    
    // Reset labelů
    document.querySelectorAll('.form-group label').forEach(label => {
        label.style.top = '16px';
        label.style.fontSize = '1rem';
        label.style.color = 'var(--gray)';
        label.style.background = 'var(--white)';
    });
}

// Inicializace EmailJS (pouze pokud jsou nastaveny hodnoty)
(function() {
    // Nastavte tyto hodnoty po konfiguraci EmailJS:
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const CONFIRMATION_TEMPLATE_ID = "YOUR_CONFIRMATION_TEMPLATE_ID"; // volitelné
    
    if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
        
        // Globální konfigurace
        window.emailjsConfigured = true;
        window.emailjsServiceId = SERVICE_ID;
        window.emailjsTemplateId = TEMPLATE_ID;
        window.emailjsConfirmationTemplateId = CONFIRMATION_TEMPLATE_ID !== "YOUR_CONFIRMATION_TEMPLATE_ID" ? CONFIRMATION_TEMPLATE_ID : null;
        
        console.log('✅ EmailJS je nakonfigurován a připraven k použití');
    } else {
        console.log('ℹ️  EmailJS není nakonfigurován - používá se simulace');
    }
})();

// [Zbytek kódu zůstává stejný...]