/**
 * MJ Franco Imóveis — Script Principal
 * Funcionalidades: Scroll do Header, Menu Mobile, Vitrine com Filtros,
 * Funil Duplo com integração WhatsApp personalizada e Lucide Icons.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Ícones Lucide
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Constantes do Negócio
  const WHATSAPP_PHONE = '5511930712250'; // (11) 93071-2250

  /* ==========================================================================
     1. HEADER SCROLL & LOGO TOGGLE
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const headerLogoImg = document.getElementById('header-logo-img');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      if (!header.classList.contains('is-scrolled')) {
        header.classList.add('is-scrolled');
        if (headerLogoImg) {
          headerLogoImg.src = 'assets/images/logo-gold.png';
        }
      }
    } else {
      if (header.classList.contains('is-scrolled')) {
        header.classList.remove('is-scrolled');
        if (headerLogoImg) {
          headerLogoImg.src = 'assets/images/logo-white.png';
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger inicial

  /* ==========================================================================
     2. MENU MOBILE DRAWER
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav a, .mobile-menu-cta');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
    menuToggle.innerHTML = '<i data-lucide="x"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /* ==========================================================================
     3. FILTROS DA VITRINE DE IMÓVEIS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      propertyCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     4. BOTÕES "TENHO INTERESSE" DOS IMÓVEIS
     ========================================================================== */
  const propertyInterestBtns = document.querySelectorAll('.property-cta-btn');

  propertyInterestBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.property-card');
      const title = card.querySelector('.property-title')?.textContent.trim() || 'Imóvel';
      const code = card.querySelector('.property-code')?.textContent.trim() || '';
      const price = card.querySelector('.property-price')?.textContent.trim() || '';
      const location = card.querySelector('.property-location')?.textContent.trim() || '';

      const message = `Olá, Maria Julia! Tenho interesse no imóvel anunciado no seu site:
📌 *${title}* (${code})
📍 *Localização:* ${location}
💰 *Valor:* ${price}

Poderia me enviar mais detalhes e informações sobre visitas e financiamento?`;

      openWhatsApp(message);
    });
  });

  /* ==========================================================================
     5. TABS DO FUNIL DUPLO (COMPRADOR VS VENDEDOR)
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.funnel-nav-btn');
  const tabContents = document.querySelectorAll('.funnel-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     6. FORMULÁRIO 1: BUSCA DE COMPRADOR / FINANCIAMENTO
     ========================================================================== */
  const formBuyer = document.getElementById('form-buyer');
  if (formBuyer) {
    formBuyer.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('buyer-name')?.value.trim() || 'Não informado';
      const type = document.getElementById('buyer-type')?.value || 'Qualquer tipo';
      const city = document.getElementById('buyer-city')?.value || 'Campo Limpo Paulista ou região';
      const bedrooms = document.getElementById('buyer-bedrooms')?.value || 'Não especificado';
      const budget = document.getElementById('buyer-budget')?.value || 'A definir';
      const financing = document.getElementById('buyer-financing')?.value || 'Não informado';
      const notes = document.getElementById('buyer-notes')?.value.trim() || 'Sem observações adicionais';

      const message = `Olá, Maria Julia! Preenchi o formulário de busca de imóveis no site:
👤 *Nome:* ${name}
🏡 *Tipo desejado:* ${type}
📍 *Região de interesse:* ${city}
🛏 *Dormitórios:* ${bedrooms}
💵 *Faixa de investimento:* ${budget}
🏦 *Pretende financiar?* ${financing}
📝 *Observações:* ${notes}

Gostaria de receber opções selecionadas com você!`;

      openWhatsApp(message);
    });
  }

  /* ==========================================================================
     7. FORMULÁRIO 2: CADASTRO DE PROPRIETÁRIO / VENDA DE IMÓVEL
     ========================================================================== */
  const formSeller = document.getElementById('form-seller');
  if (formSeller) {
    formSeller.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('seller-name')?.value.trim() || 'Não informado';
      const address = document.getElementById('seller-address')?.value.trim() || 'Não informado';
      const type = document.getElementById('seller-type')?.value || 'Não especificado';
      const price = document.getElementById('seller-price')?.value.trim() || 'A avaliar';
      const area = document.getElementById('seller-area')?.value.trim() || 'Não informado';
      const notes = document.getElementById('seller-notes')?.value.trim() || 'Sem observações';

      const message = `Olá, Maria Julia! Quero anunciar e vender meu imóvel com você:
👤 *Proprietário:* ${name}
📍 *Endereço / Bairro:* ${address}
🏡 *Tipo de imóvel:* ${type}
📐 *Área aproximada:* ${area}
💰 *Pretensão de valor:* ${price}
📝 *Detalhes:* ${notes}

Podemos agendar uma avaliação e conversar sobre a comercialização?`;

      openWhatsApp(message);
    });
  }

  /* ==========================================================================
     8. HELPER PARA ABRIR WHATSAPP
     ========================================================================== */
  function openWhatsApp(text) {
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Smooth scroll com offset para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
