document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-item a');

  
    const toggleMenu = () => {
        mainNav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-active');
    };

    // Evento para el botón de hamburguesa
    menuToggle.addEventListener('click', toggleMenu);

    // Evento para cerrar el menú al hacer clic en un enlace (solo en móvil)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Cierra el menú solo si está abierto
            if (mainNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // Cierra el menú si se hace clic fuera de él (opcional, pero mejora la UX en móvil)
    document.addEventListener('click', (event) => {
        if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('is-open')) {
            toggleMenu();
        }
    });

    // Manejar el redimensionamiento de la ventana para el comportamiento en escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) { // Usamos el mismo breakpoint que usaremos en CSS
            mainNav.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
        }
    });
});


// Script para la animación de la línea de cambio de color en la sección "Activar Token"

document.addEventListener('DOMContentLoaded', () => {
    const colorChangeLine = document.querySelector('.color-change-line');
    const roadmapSection = document.getElementById('activar');

    if (!colorChangeLine || !roadmapSection) {
        console.warn('Elementos para la animación de línea no encontrados.');
        return;
    }

    // Función para cambiar la tonalidad de la línea
    function updateLineColor() {
        const sectionRect = roadmapSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calcular el progreso del scroll dentro de la sección
        // Cuando la sección empieza a entrar en el viewport (sectionRect.top < viewportHeight)
        // y cuando la sección sale del viewport (sectionRect.bottom > 0)
        let scrollProgress = 0;

        if (sectionRect.top < viewportHeight && sectionRect.bottom > 0) {
            // Calcular qué tan lejos ha entrado la sección en el viewport
            // 0 cuando la parte superior de la sección está en la parte inferior del viewport
            // 1 cuando la parte inferior de la sección está en la parte superior del viewport
            scrollProgress = (viewportHeight - sectionRect.top) / (viewportHeight + sectionRect.height);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress)); // Clampear entre 0 y 1
        }

        // Mapear el progreso del scroll a un valor HSL (Hue, Saturation, Lightness)
        // Aquí un ejemplo de cambio de tonalidad (Hue)
        // Puedes ajustar los valores de inicio y fin de H (Hue) para diferentes colores
        // Por ejemplo, de púrpura (aprox 270) a un azul (aprox 240) o rojo (aprox 0)
        const startHue = 270; // Púrpura
        const endHue = 240;   // Azul
        const hue = startHue - (startHue - endHue) * scrollProgress;

        // Puedes también variar la saturación o la luminosidad
        const saturation = 70 + (30 * scrollProgress); // De 70% a 100%
        const lightness = 60 - (10 * scrollProgress);  // De 60% a 50%

        colorChangeLine.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    // Escucha el evento de scroll para actualizar el color
    window.addEventListener('scroll', updateLineColor);

    // Llama la función una vez al cargar para establecer el color inicial
    updateLineColor();
});

// Script para la funcionalidad de Acordeón en FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');

            // Toggle la clase 'active' en el botón de la pregunta
            question.classList.toggle('active');
            // Toggle la clase 'open' en la respuesta
            faqAnswer.classList.toggle('open');

            // Ajustar la altura máxima para la transición
            if (faqAnswer.classList.contains('open')) {
                // Si se está abriendo, establece la altura en scrollHeight
                // Esto permite que la transición de max-height funcione correctamente
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            } else {
                // Si se está cerrando, vuelve a 0
                faqAnswer.style.maxHeight = "0";
            }

            // Cierra otras preguntas si están abiertas (opcional)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherFaqItem = otherQuestion.closest('.faq-item');
                    const otherFaqAnswer = otherFaqItem.querySelector('.faq-answer');

                    if (otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherFaqAnswer.classList.remove('open');
                        otherFaqAnswer.style.maxHeight = "0";
                    }
                }
            });
        });
    });
});