/* =============================================================================
   BROWNIE PARADISE - JAVASCRIPT CUSTOMIZADO
   ========================================================================== */
/*
   ARQUIVO: custom.js
   DESCRIÇÃO: Scripts personalizados para funcionalidades do site
   VERSÃO: 2.0 (Refatorada e otimizada)
   DATA: 05/10/2025
*/

/* =============================================================================
   SUMÁRIO
   ========================================================================== */
/*
   1. Inicialização e Configurações
   2. Owl Carousel (Depoimentos)
   3. Google Maps (Página Contato)
   4. Validação de Formulários
   5. Smooth Scroll
   6. Utilitários
*/

(function($) {
    'use strict';

    /* =============================================================================
       1. INICIALIZAÇÃO E CONFIGURAÇÕES
       ========================================================================== */
    
    // ===== INÍCIO: DOCUMENT READY =====
    $(document).ready(function() {
        console.log('Brownie Paradise - Scripts carregados com sucesso!');
        
        // Inicializa componentes
        initOwlCarousel();
        initMapsInteraction();
        initFormValidation();
        initSmoothScroll();
    });
    // ===== FIM: DOCUMENT READY =====

    /* =============================================================================
       2. OWL CAROUSEL (DEPOIMENTOS)
       ========================================================================== */
    
    // ===== INÍCIO: INICIALIZAÇÃO OWL CAROUSEL =====
    function initOwlCarousel() {
        // Verifica se o elemento existe na página
        if ($('#owl-brand').length) {
            $('#owl-brand').owlCarousel({
                autoPlay: 3000,           // Tempo de transição automática (ms)
                items: 1,                 // Número de itens por vez
                itemsDesktop: [1199, 1],  // Desktop grande
                itemsDesktopSmall: [979, 1], // Desktop pequeno
                itemsTablet: [768, 1],    // Tablet
                itemsMobile: [479, 1],    // Mobile
                navigation: false,        // Desabilita setas de navegação
                pagination: true,         // Habilita paginação (bolinhas)
                slideSpeed: 300,          // Velocidade da transição
                paginationSpeed: 400,     // Velocidade ao clicar na paginação
                singleItem: true,         // Um item por vez
                transitionStyle: 'fade',  // Estilo de transição
                autoHeight: true,         // Altura automática
                stopOnHover: true         // Pausa ao passar o mouse
            });
            
            console.log('Owl Carousel inicializado com sucesso!');
        }
    }
    // ===== FIM: INICIALIZAÇÃO OWL CAROUSEL =====

    /* =============================================================================
       3. GOOGLE MAPS (PÁGINA CONTATO)
       ========================================================================== */
    
    // ===== INÍCIO: INTERAÇÃO COM MAPAS =====
    function initMapsInteraction() {
        var $maps = $('.maps');
        
        // Verifica se o elemento existe na página
        if ($maps.length) {
            // Habilita interação ao clicar no mapa
            $maps.on('click', function() {
                $(this).addClass('active');
                $(this).find('iframe').css('pointer-events', 'auto');
                console.log('Mapa ativado para interação');
            });
            
            // Desabilita interação ao sair do mapa (previne scroll acidental)
            $maps.on('mouseleave', function() {
                $(this).removeClass('active');
                $(this).find('iframe').css('pointer-events', 'none');
                console.log('Mapa desativado');
            });
            
            console.log('Interação com mapas configurada com sucesso!');
        }
    }
    // ===== FIM: INTERAÇÃO COM MAPAS =====

    /* =============================================================================
       4. VALIDAÇÃO DE FORMULÁRIOS
       ========================================================================== */
    
    // ===== INÍCIO: VALIDAÇÃO DE FORMULÁRIOS =====
    function initFormValidation() {
        var $contactForm = $('#contact_form');
        var $commentForm = $('.comment-form form');
        
        // Validação do Formulário de Contato
        if ($contactForm.length) {
            $contactForm.on('submit', function(e) {
                if (!validateContactForm()) {
                    e.preventDefault();
                    showValidationError('Por favor, preencha todos os campos corretamente.');
                    return false;
                }
            });
            
            console.log('Validação do formulário de contato configurada!');
        }
        
        // Validação do Formulário de Comentários
        if ($commentForm.length) {
            $commentForm.on('submit', function(e) {
                if (!validateCommentForm($(this))) {
                    e.preventDefault();
                    showValidationError('Por favor, preencha seu nome e comentário.');
                    return false;
                }
            });
            
            console.log('Validação do formulário de comentários configurada!');
        }
        
        // Remove classe de erro ao digitar
        $('input, textarea').on('input', function() {
            $(this).removeClass('error');
        });
    }
    
    // Valida formulário de contato
    function validateContactForm() {
        var isValid = true;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Valida campos obrigatórios
        $('#contact_form input[required], #contact_form textarea[required]').each(function() {
            var $field = $(this);
            var value = $field.val().trim();
            
            if (value === '') {
                isValid = false;
                $field.addClass('error');
            } else {
                $field.removeClass('error');
            }
        });
        
        // Valida formato de email
        var $emailField = $('#email');
        var emailValue = $emailField.val().trim();
        
        if (emailValue && !emailRegex.test(emailValue)) {
            isValid = false;
            $emailField.addClass('error');
        }
        
        return isValid;
    }
    
    // Valida formulário de comentários
    function validateCommentForm($form) {
        var isValid = true;
        
        $form.find('input[required], textarea[required]').each(function() {
            var $field = $(this);
            var value = $field.val().trim();
            
            if (value === '') {
                isValid = false;
                $field.addClass('error');
            } else {
                $field.removeClass('error');
            }
        });
        
        return isValid;
    }
    
    // Exibe mensagem de erro
    function showValidationError(message) {
        // Remove alertas anteriores
        $('.validation-alert').remove();
        
        // Cria novo alerta
        var $alert = $('<div class="alert alert-danger validation-alert" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Fechar">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<strong>Erro!</strong> ' + message +
            '</div>');
        
        // Insere antes do formulário
        $alert.prependTo('.container').hide().slideDown(300);
        
        // Remove após 5 segundos
        setTimeout(function() {
            $alert.slideUp(300, function() {
                $(this).remove();
            });
        }, 5000);
    }
    // ===== FIM: VALIDAÇÃO DE FORMULÁRIOS =====

    /* =============================================================================
       5. SMOOTH SCROLL
       ========================================================================== */
    
    // ===== INÍCIO: SMOOTH SCROLL =====
    function initSmoothScroll() {
        // Smooth scroll para links internos
        $('a[href*="#"]:not([href="#"]):not([data-toggle])').on('click', function(e) {
            var target = $(this.hash);
            
            if (target.length) {
                e.preventDefault();
                
                $('html, body').animate({
                    scrollTop: target.offset().top - 70 // Offset para navbar fixa
                }, 800, 'swing');
                
                // Fecha menu mobile se estiver aberto
                if ($('.navbar-collapse').hasClass('in')) {
                    $('.navbar-collapse').collapse('hide');
                }
            }
        });
        
        console.log('Smooth scroll configurado!');
    }
    // ===== FIM: SMOOTH SCROLL =====

    /* =============================================================================
       6. UTILITÁRIOS
       ========================================================================== */
    
    // ===== INÍCIO: UTILITÁRIOS =====
    
    // Adiciona classe ao rolar a página (para efeitos)
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        
        // Adiciona classe quando rolar mais de 100px
        if (scrollTop > 100) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    });
    
    // Lazy loading para imagens (opcional)
    function lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            var lazyImages = document.querySelectorAll('img.lazy');
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }
    
    // Inicializa lazy loading
    lazyLoadImages();
    
    // Console log para debug (remover em produção)
    console.log('Scripts customizados carregados!');
    // ===== FIM: UTILITÁRIOS =====

})(jQuery);

/* =============================================================================
   FIM DO ARQUIVO custom.js
   ========================================================================== */
