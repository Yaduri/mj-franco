function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLucideIcons);
} else {
  initLucideIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();

  const WHATSAPP_PHONE = '5511930712250'; // (11) 93071-2250

  /* Header scroll */
  const header = document.querySelector('.site-header');
  const headerLogoImg = document.getElementById('header-logo-img');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      if (!header.classList.contains('is-scrolled')) {
        header.classList.add('is-scrolled');
        if (headerLogoImg) headerLogoImg.src = 'assets/images/logo-gold.png';
      }
    } else {
      if (header.classList.contains('is-scrolled')) {
        header.classList.remove('is-scrolled');
        if (headerLogoImg) headerLogoImg.src = 'assets/images/logo-white.png';
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile menu */
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
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
    menuToggle.innerHTML = '<i data-lucide="x"></i>';
    initLucideIcons();
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    initLucideIcons();
  }

  /* Vitrine filter */
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
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* Card interest WhatsApp */
  const propertyInterestBtns = document.querySelectorAll('.property-cta-btn');

  propertyInterestBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.property-card');
      const title = card.querySelector('.property-title')?.textContent.trim() || 'Imóvel';
      const code = card.querySelector('.property-code')?.textContent.trim() || '';
      const price = card.querySelector('.property-price')?.textContent.trim() || '';
      const location = card.querySelector('.property-location')?.textContent.trim() || '';

      const message = `Olá, Maria Julia! Tenho interesse no imóvel:
📌 *${title}* (${code})
📍 *Localização:* ${location}
💰 *Valor:* ${price}

Poderia me passar mais informações sobre visitas e financiamento?`;

      openWhatsApp(message);
    });
  });

  /* Funnel tabs */
  const tabBtns = document.querySelectorAll('.funnel-nav-btn');
  const tabContents = document.querySelectorAll('.funnel-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  /* Form Buyer */
  const formBuyer = document.getElementById('form-buyer');
  if (formBuyer) {
    formBuyer.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('buyer-name')?.value.trim() || 'Não informado';
      const type = document.getElementById('buyer-type')?.value || 'Qualquer';
      const budget = document.getElementById('buyer-budget')?.value || 'A definir';
      const financing = document.getElementById('buyer-financing')?.value || 'Não informado';

      const message = `Olá, Maria Julia! Busco opções de imóveis:
👤 *Nome:* ${name}
🏡 *Tipo:* ${type}
💵 *Valor:* ${budget}
🏦 *Financiamento:* ${financing}

Poderia me enviar opções selecionadas?`;

      openWhatsApp(message);
    });
  }

  /* Form Seller */
  const formSeller = document.getElementById('form-seller');
  if (formSeller) {
    formSeller.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('seller-name')?.value.trim() || 'Não informado';
      const type = document.getElementById('seller-type')?.value || 'Imóvel';
      const address = document.getElementById('seller-address')?.value.trim() || 'Não informado';
      const price = document.getElementById('seller-price')?.value.trim() || 'A avaliar';

      const message = `Olá, Maria Julia! Quero anunciar meu imóvel para venda com você:
👤 *Proprietário:* ${name}
🏡 *Tipo:* ${type}
📍 *Bairro/Cidade:* ${address}
💰 *Pretensão:* ${price}

Podemos conversar sobre a avaliação?`;

      openWhatsApp(message);
    });
  }

  function openWhatsApp(text) {
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
