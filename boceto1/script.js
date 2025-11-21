// Sistema de Tema
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.htmlElement = document.documentElement;
        this.init();
    }

    init() {
        // Cargar tema guardado o detectar preferencia del sistema
        const savedTheme = localStorage.getItem('nexocat-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        }

        // Event listener para el toggle
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Detectar cambios en preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('nexocat-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // Inicializar partículas
        this.initParticles();

        // Fallback para navegadores sin CSS Scroll Animations
        this.initFallbackAnimations();
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('nexocat-theme', theme);
        this.updateMetaThemeColor(theme);
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);

        // Animación del toggle
        this.animateToggle();
    }

    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'light' ? '#FEFEFE' : '#0A0A0B';
        }
    }

    animateToggle() {
        const toggle = this.themeToggle;
        toggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            toggle.style.transform = 'scale(1)';
        }, 150);
    }

    // Generar partículas flotantes
    initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Fallback para navegadores antiguos
    initFallbackAnimations() {
        const supportsScrollAnimations = CSS.supports('animation-timeline', 'scroll()');

        if (!supportsScrollAnimations) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }
                });
            }, observerOptions);

            // Observar elementos
            const elements = document.querySelectorAll('.scroll-animate, .service-card, .project-card, .section-title');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();

    // Efecto parallax con mouse para el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 100;
            const y = (e.clientY - window.innerHeight / 2) / 100;

            const particles = document.getElementById('particles');
            if (particles) {
                particles.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }

    // Smooth scroll para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Animación de entrada del código
    const codeBody = document.querySelector('.code-body');
    if (codeBody) {
        const codeText = codeBody.innerHTML;
        codeBody.innerHTML = '';

        let i = 0;
        const typeWriter = () => {
            if (i < codeText.length) {
                codeBody.innerHTML = codeText.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 30);
            }
        };

        // Iniciar animación después de 1 segundo
        setTimeout(typeWriter, 1000);
    }
});