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