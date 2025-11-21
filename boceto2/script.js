// Fallback para navegadores que no soportan CSS Scroll-Driven Animations
document.addEventListener('DOMContentLoaded', function() {
    // Detectar soporte para animation-timeline
    const supportsScrollAnimations = CSS.supports('animation-timeline', 'scroll()');
    
    if (!supportsScrollAnimations) {
        console.log('CSS Scroll-Driven Animations no soportadas. Usando Intersection Observer.');
        
        // Intersection Observer para animaciones de aparición
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
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
        document.querySelectorAll('.scroll-animate, .section-title, .section-description, .btn-primary').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }

    // Efecto parallax suave con mouse move
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            const watch = document.querySelector('.hero-watch');
            if (watch) {
                watch.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }

    // Animación de rotación continua independiente del scroll
    const watchFaces = document.querySelectorAll('.watch-face');
    watchFaces.forEach(watch => {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            watch.style.transform = `rotate(${rotation}deg)`;
        }, 50);
    });
});