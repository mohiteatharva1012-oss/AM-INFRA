/* ==========================================================================
   AM Group & Co. - Redesigned Trading Website Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mouse coordinates for Glassmorphic Glow
  // ==========================================
  const cards = document.querySelectorAll('.glass-card, .product-card, .brand-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // ==========================================
  // 1.5. Continuous Hero Background Slider
  // ==========================================
  const sliderTrack = document.querySelector('.hero-slider-track');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentHeroSlide = 0;
  const totalHeroSlides = 7;
  let heroSliderInterval;

  function showHeroSlide(index) {
    if (index >= totalHeroSlides) {
      currentHeroSlide = 0;
    } else if (index < 0) {
      currentHeroSlide = totalHeroSlides - 1;
    } else {
      currentHeroSlide = index;
    }
    
    // Slide the track
    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(-${currentHeroSlide * (100 / totalHeroSlides)}%)`;
    }
    
    // Update dots
    sliderDots.forEach((dot, idx) => {
      if (idx === currentHeroSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startHeroSlider() {
    stopHeroSlider();
    heroSliderInterval = setInterval(() => {
      showHeroSlide(currentHeroSlide + 1);
    }, 4000); // Change slides every 4 seconds
  }

  function stopHeroSlider() {
    if (heroSliderInterval) {
      clearInterval(heroSliderInterval);
    }
  }

  // Setup dot click events
  sliderDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showHeroSlide(idx);
      startHeroSlider(); // Restart interval on manual click
    });
  });

  // Start the slider
  if (sliderTrack) {
    startHeroSlider();
  }

  // ==========================================
  // 2. Continuous Brands Marquee (Duplicate Cards)
  // ==========================================
  const marqueeTrack = document.getElementById('brandsMarquee');
  if (marqueeTrack) {
    const originalCards = Array.from(marqueeTrack.children);
    // Duplicate the cards once to create a seamless infinite loop
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      // Re-register mousemove on the clones since event listeners aren't copied by cloneNode
      clone.addEventListener('mousemove', e => {
        const rect = clone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        clone.style.setProperty('--x', `${x}px`);
        clone.style.setProperty('--y', `${y}px`);
      });
      marqueeTrack.appendChild(clone);
    });
  }

  // ==========================================
  // 2b. Continuous CSR Marquee (Duplicate Cards)
  // ==========================================
  const csrTrack = document.getElementById('csrMarquee');
  if (csrTrack) {
    const originalCards = Array.from(csrTrack.children);
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      // Re-register mousemove on the clones since event listeners aren't copied by cloneNode
      clone.addEventListener('mousemove', e => {
        const rect = clone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        clone.style.setProperty('--x', `${x}px`);
        clone.style.setProperty('--y', `${y}px`);
      });
      csrTrack.appendChild(clone);
    });
  }

  // ==========================================
  // 2c. Continuous Association Marquee (Duplicate Items)
  // ==========================================
  const associationTrack = document.getElementById('associationTicker');
  if (associationTrack) {
    const originalItems = Array.from(associationTrack.children);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      associationTrack.appendChild(clone);
    });
  }

  // ==========================================
  // 3. Sticky Header Scroll Effect
  // ==========================================
  const header = document.querySelector('.main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Background opacity shift
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting on scroll
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. Mobile Nav Drawer Toggle
  // ==========================================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileNavDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  }

  function closeDrawer() {
    mobileNavDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // ==========================================
  // 5. Animated Statistics Counters
  // ==========================================
  const statsNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500; // ms
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        let suffix = '+';
        if (target === 26) suffix = ' Years+';
        if (target === 100000) {
          element.textContent = '1 Lac+';
        } else {
          element.textContent = target.toLocaleString() + suffix;
        }
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  };

  // Trigger when scrolled into view
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsNumbers.forEach(num => countUp(num));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 6. Interactive Materials Estimator logic
  // ==========================================
  const builtAreaInput = document.getElementById('builtArea');
  const builtAreaSlider = document.getElementById('builtAreaSlider');
  const buildingTypeSelect = document.getElementById('buildingType');
  const floorsCountSelect = document.getElementById('floorsCount');
  
  const floorsVisual = document.getElementById('floorsVisual');
  
  const calcCement = document.getElementById('calcCement');
  const calcSteel = document.getElementById('calcSteel');
  const calcSand = document.getElementById('calcSand');
  const calcAggregate = document.getElementById('calcAggregate');
  const calcAacBlocks = document.getElementById('calcAacBlocks');
  const calcAdhesives = document.getElementById('calcAdhesives');
  const calcBindingWire = document.getElementById('calcBindingWire');
  const calcWireNails = document.getElementById('calcWireNails');
  const calcStirrups = document.getElementById('calcStirrups');

  // Brand prices configuration (Approximate market rates)
  const prices = {
    cement: {
      super: 340, // ₹ per bag
      ppc: 320,
      opc: 350
    },
    steel: {
      jsw: 65000, // ₹ per ton
      sail: 63000,
      srj: 60000
    },
    aacBlocks: 55, // ₹ per block
    adhesives: 300, // ₹ per bag (UltraTech Tilefix reference)
    sand: 8000, // ₹ per brass (Approx. market rate)
    aggregate: 4500, // ₹ per brass (Approx. market rate)
    bindingWire: 80, // ₹ per kg
    wireNails: 80, // ₹ per kg
    stirrups: 25 // ₹ per pc
  };

  // Multipliers based on structure formulas
  const multipliers = {
    residential: { cement: 0.40, steel: 0.0040, sand: 0.0180, aggregate: 0.0260, aacBlocks: 1.0, adhesives: 0.15 },
    commercial:  { cement: 0.45, steel: 0.0050, sand: 0.0160, aggregate: 0.0280, aacBlocks: 0.8, adhesives: 0.12 },
    industrial:  { cement: 0.50, steel: 0.0060, sand: 0.0140, aggregate: 0.0320, aacBlocks: 0.5, adhesives: 0.05 },
    school:      { cement: 0.42, steel: 0.0045, sand: 0.0170, aggregate: 0.0270, aacBlocks: 0.9, adhesives: 0.10 },
    hospital:    { cement: 0.48, steel: 0.0055, sand: 0.0155, aggregate: 0.0295, aacBlocks: 1.1, adhesives: 0.14 },
    mall:        { cement: 0.52, steel: 0.0065, sand: 0.0145, aggregate: 0.0330, aacBlocks: 0.7, adhesives: 0.11 }
  };

  function updateEstimator() {
    const area = parseFloat(builtAreaInput.value) || 0;
    const type = buildingTypeSelect.value;
    const floors = parseInt(floorsCountSelect.value, 10);
    
    // Total built-up area = Footprint Area * Floors
    const totalArea = area * floors;
    const factors = multipliers[type];

    // Calculations
    const cement = Math.round(totalArea * factors.cement);
    const steel = (totalArea * factors.steel).toFixed(1);
    const sand = (totalArea * factors.sand).toFixed(1);
    const aggregate = (totalArea * factors.aggregate).toFixed(1);
    const aacBlocks = Math.round(totalArea * factors.aacBlocks);
    const adhesives = Math.round(totalArea * factors.adhesives);
    
    // Specialty items calculations
    const bindingWire = Math.round(parseFloat(steel) * 12); // ~12kg per ton of steel
    const wireNails = Math.round(totalArea * 0.01); // ~10kg per 1000 sqft (0.01 kg/sqft)
    const stirrups = Math.round(totalArea * 1.5); // ~1.5 stirrups per sqft on average

    // Update Text Outputs
    if (calcCement) calcCement.textContent = cement.toLocaleString();
    if (calcSteel) calcSteel.textContent = steel;
    if (calcSand) calcSand.textContent = sand;
    if (calcAggregate) calcAggregate.textContent = aggregate;
    if (calcAacBlocks) calcAacBlocks.textContent = aacBlocks.toLocaleString();
    if (calcAdhesives) calcAdhesives.textContent = adhesives.toLocaleString();
    if (calcBindingWire) calcBindingWire.textContent = bindingWire.toLocaleString();
    if (calcWireNails) calcWireNails.textContent = wireNails.toLocaleString();
    if (calcStirrups) calcStirrups.textContent = stirrups.toLocaleString();

    // Cost Calculations
    const selectedCementBrand = document.querySelector('input[name="cementBrand"]:checked')?.value || 'super';
    const selectedSteelBrand = document.querySelector('input[name="steelBrand"]:checked')?.value || 'jsw';

    const cementCost = cement * prices.cement[selectedCementBrand];
    const steelCost = Math.round(parseFloat(steel) * prices.steel[selectedSteelBrand]);
    const sandCost = Math.round(parseFloat(sand) * prices.sand);
    const aggregateCost = Math.round(parseFloat(aggregate) * prices.aggregate);
    const aacCost = aacBlocks * prices.aacBlocks;
    const adhesivesCost = adhesives * prices.adhesives;
    const specialtyCost = (bindingWire * prices.bindingWire) + (wireNails * prices.wireNails) + (stirrups * prices.stirrups);
    const totalCost = cementCost + steelCost + sandCost + aggregateCost + aacCost + adhesivesCost + specialtyCost;

    // Formatting helper
    const formatCost = (amount) => {
      if (amount >= 100000) {
        return '₹' + (amount / 100000).toFixed(2) + ' Lakh*';
      }
      return '₹' + amount.toLocaleString() + '*';
    };

    // Update Cost Outputs to Market Rates
    const costCementEl = document.getElementById('costCement');
    const costSteelEl = document.getElementById('costSteel');
    const costSandEl = document.getElementById('costSand');
    const costAggregateEl = document.getElementById('costAggregate');
    const costAacEl = document.getElementById('costAac');
    const costAdhesivesEl = document.getElementById('costAdhesives');
    const costSpecialtyEl = document.getElementById('costSpecialty');
    const costTotalEl = document.getElementById('costTotal');

    if (costCementEl) costCementEl.textContent = formatCost(cementCost);
    if (costSteelEl) costSteelEl.textContent = formatCost(steelCost);
    if (costSandEl) costSandEl.textContent = formatCost(sandCost);
    if (costAggregateEl) costAggregateEl.textContent = formatCost(aggregateCost);
    if (costAacEl) costAacEl.textContent = formatCost(aacCost);
    if (costAdhesivesEl) costAdhesivesEl.textContent = formatCost(adhesivesCost);
    if (costSpecialtyEl) costSpecialtyEl.textContent = formatCost(specialtyCost);
    if (costTotalEl) costTotalEl.textContent = formatCost(totalCost);

    // Update Building Floors Visual model
    if (floorsVisual) {
      floorsVisual.innerHTML = ''; // Clear
      for (let i = 1; i <= floors; i++) {
        const floorEl = document.createElement('div');
        floorEl.className = `floor-level lvl-${i}`;
        floorEl.innerHTML = `<span>Floor ${i}</span>`;
        floorsVisual.appendChild(floorEl);
      }
    }
  }

  // Sync Input and Slider
  if (builtAreaInput && builtAreaSlider) {
    builtAreaInput.addEventListener('input', () => {
      let val = parseInt(builtAreaInput.value, 10);
      if (val > 50000) val = 50000;
      builtAreaSlider.value = val;
      updateEstimator();
    });

    builtAreaSlider.addEventListener('input', () => {
      builtAreaInput.value = builtAreaSlider.value;
      updateEstimator();
    });
  }

  if (buildingTypeSelect) buildingTypeSelect.addEventListener('change', updateEstimator);
  if (floorsCountSelect) floorsCountSelect.addEventListener('change', updateEstimator);

  // Listen for brand changes to update costs immediately
  document.querySelectorAll('input[name="cementBrand"], input[name="steelBrand"]').forEach(radio => {
    radio.addEventListener('change', updateEstimator);
  });

  // Initialize Calculator on load
  updateEstimator();

  // ==========================================
  // 7. Product Catalog Filter
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          // Subtle fade-in animation
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 8. Add to Enquiry Button Handlers
  // ==========================================
  const addToEnquiryBtns = document.querySelectorAll('.add-to-enquiry');
  const materialsCheckboxes = document.querySelectorAll('input[name="materials"]');
  const customMessageTextarea = document.getElementById('customMessage');

  addToEnquiryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product');
      
      // Attempt to check appropriate materials box
      materialsCheckboxes.forEach(cb => {
        const cbVal = cb.value.toLowerCase().replace(/&amp;/g, '&');
        const prodVal = product.toLowerCase().replace(/&amp;/g, '&');
        if (cbVal === prodVal || cbVal.includes(prodVal) || prodVal.includes(cbVal)) {
          cb.checked = true;
        } else if (product.toLowerCase().includes('cement') && cb.value.toLowerCase().includes('cement')) {
          cb.checked = true;
        } else if (product.toLowerCase().includes('steel') && cb.value.toLowerCase().includes('steel')) {
          cb.checked = true;
        } else if (product.toLowerCase().includes('rings') && cb.value.toLowerCase().includes('stirrups')) {
          cb.checked = true;
        } else if (product.toLowerCase().includes('tilefix') && cb.value.toLowerCase().includes('adhesives')) {
          cb.checked = true;
        }
      });

      // Append product name to message textarea
      if (customMessageTextarea) {
        const text = customMessageTextarea.value;
        const addText = `Interested in procuring: ${product}.\n`;
        if (!text.includes(product)) {
          customMessageTextarea.value = addText + text;
        }
      }

      // Show toast confirmation
      showToast('Catalog Added', `Added ${product} to your enquiry checklist!`, 'fa-circle-check', 'success');

      // Scroll to Contact Section
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Estimator Action button
  const btnRequestQuote = document.getElementById('btnRequestQuote');
  if (btnRequestQuote) {
    btnRequestQuote.addEventListener('click', () => {
      const cementAmt = calcCement ? calcCement.textContent : '';
      const steelAmt = calcSteel ? calcSteel.textContent : '';
      const sandAmt = calcSand ? calcSand.textContent : '';
      const aggregateAmt = calcAggregate ? calcAggregate.textContent : '';
      const aacAmt = calcAacBlocks ? calcAacBlocks.textContent : '';
      const adhesiveAmt = calcAdhesives ? calcAdhesives.textContent : '';
      const bindingWireAmt = calcBindingWire ? calcBindingWire.textContent : '';
      const nailsAmt = calcWireNails ? calcWireNails.textContent : '';
      const stirrupsAmt = calcStirrups ? calcStirrups.textContent : '';

      const areaAmt = builtAreaInput ? builtAreaInput.value : '';
      const typeLabel = buildingTypeSelect ? buildingTypeSelect.options[buildingTypeSelect.selectedIndex].text : '';
      const floorsLabel = floorsCountSelect ? floorsCountSelect.options[floorsCountSelect.selectedIndex].text : '';

      let quoteDetails = `Estimated Quote Request:\n`;
      quoteDetails += `- Built Area: ${areaAmt} Sq Ft (${floorsLabel})\n`;
      quoteDetails += `- Structure: ${typeLabel}\n`;
      quoteDetails += `- Est. Cement: ${cementAmt} Bags\n`;
      quoteDetails += `- Est. Steel: ${steelAmt} Tons\n`;
      quoteDetails += `- Est. Sand: ${sandAmt} Brass\n`;
      quoteDetails += `- Est. Aggregate: ${aggregateAmt} Brass\n`;
      quoteDetails += `- Est. AAC Blocks: ${aacAmt} Pcs\n`;
      quoteDetails += `- Est. Tile Adhesive: ${adhesiveAmt} Bags\n`;
      quoteDetails += `- Est. GI Binding Wire: ${bindingWireAmt} Kg\n`;
      quoteDetails += `- Est. Wire Nails: ${nailsAmt} Kg\n`;
      quoteDetails += `- Est. Pre-made Stirrups: ${stirrupsAmt} Pcs\n`;
      quoteDetails += `\nPlease provide today's current market rates.\n`;

      if (customMessageTextarea) {
        // Prepend quote details if not already present
        if (!customMessageTextarea.value.includes("Estimated Quote Request:")) {
          customMessageTextarea.value = quoteDetails + customMessageTextarea.value;
        }
      }

      showToast('Calculator Loaded', 'Loaded estimator details into Enquiry form!', 'fa-sliders', 'success');
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================
  // 9. Enquiry Form Submission & Toast Alert
  // ==========================================
  const enquiryForm = document.getElementById('enquiryForm');
  const toastBox = document.getElementById('toastBox');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  function showToast(title, message, iconClass = 'fa-circle-check', type = 'success') {
    if (!toastBox) return;

    toastTitle.textContent = title;
    toastMsg.textContent = message;
    
    // Set icon
    toastIcon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    
    // Toast styling
    if (type === 'success') {
      toastBox.style.borderColor = 'var(--success)';
      toastIcon.style.color = 'var(--success)';
    } else {
      toastBox.style.borderColor = 'var(--primary)';
      toastIcon.style.color = 'var(--primary)';
    }

    toastBox.classList.add('active');
    
    // Auto remove toast
    setTimeout(() => {
      toastBox.classList.remove('active');
    }, 4000);
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const email = document.getElementById('clientEmail') ? document.getElementById('clientEmail').value.trim() : '';
      const customMessage = document.getElementById('customMessage') ? document.getElementById('customMessage').value.trim() : '';

      // Simple phone format verification (10 digits)
      if (!/^\d{10}$/.test(phone.replace(/[\s\-()]/g, ''))) {
        showToast('Submission Error', 'Please enter a valid 10-digit mobile number.', 'fa-circle-exclamation', 'error');
        return;
      }

      // Collect selected materials
      const selectedMaterials = [];
      const checkboxes = document.querySelectorAll('input[name="materials"]:checked');
      checkboxes.forEach(cb => {
        selectedMaterials.push(cb.value);
      });

      // Construct WhatsApp message text
      let msg = `*New Enquiry from Website*\n\n`;
      msg += `*Name:* ${name}\n`;
      msg += `*Phone:* ${phone}\n`;
      if (email) {
        msg += `*Email:* ${email}\n`;
      }
      
      if (selectedMaterials.length > 0) {
        msg += `\n*Materials Selected:*\n`;
        selectedMaterials.forEach(m => {
          msg += `• ${m}\n`;
        });
      }
      
      if (customMessage) {
        msg += `\n*Special Requirements / Notes:*\n${customMessage}\n`;
      }

      const whatsappUrl = `https://wa.me/919850938888?text=${encodeURIComponent(msg)}`;

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      // Loading State animation
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Forwarding to WhatsApp...';

      // Open WhatsApp in a new tab synchronously (prevents popup blockers)
      const waWindow = window.open(whatsappUrl, '_blank');

      // Mock completion animation for UI feedback
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        
        // Success feedback
        showToast('Enquiry Sent!', `Thank you ${name}. Opened WhatsApp to send your enquiry. Aniket Bhaiya will assist you.`, 'fa-circle-check', 'success');
        
        // Reset form
        enquiryForm.reset();
      }, 1200);
    });
  }

  // ==========================================
  // NEW FEATURES JS
  // ==========================================



  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Contact Floating Hub Speed Dial Toggle
  const contactFloatHub = document.getElementById('contactFloatHub');
  if (contactFloatHub) {
    const trigger = contactFloatHub.querySelector('.float-trigger-btn');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      contactFloatHub.classList.toggle('active');
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!contactFloatHub.contains(e.target)) {
        contactFloatHub.classList.remove('active');
      }
    });
  }

});
