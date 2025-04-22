document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navbarHeight = 60; // Corrigindo a referência à variável CSS

    // Menu Mobile
    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('active');

        // Animar links do menu
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Adicionar classe ativa
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Efeito de scroll na navbar
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = 'none';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > navbarHeight) {
            // Scroll para baixo
            navbar.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll) {
            // Scroll para cima
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // Ativar link ativo na navegação
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (navbarHeight - 10),
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Seção Equipe - Interação dos Cards
document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        card.addEventListener('click', function () {
            // Fecha todos os outros cards abertos
            teamCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });

            // Abre/fecha o card clicado
            this.classList.toggle('active');
        });
    });

    // Fecha o card ao clicar fora
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.team-card')) {
            teamCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });

    // Carrossel do Cliente
    const clientCarousel = document.querySelector('.client-carousel');
    const clientImages = clientCarousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showImage(index) {
        clientImages.forEach(img => img.classList.remove('active'));
        clientImages[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : clientImages.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < clientImages.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    setInterval(() => {
        currentIndex = (currentIndex < clientImages.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    }, 5000); // Troca a cada 5 segundos

    document.addEventListener('DOMContentLoaded', function () {
        const carousel = document.querySelector('.client-carousel');
        const images = carousel.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        // Inicia com a primeira imagem visível
        showImage(0);
    });
});