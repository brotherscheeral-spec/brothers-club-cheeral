/* ============================================================
   Brothers Club Cheeral – JavaScript
   ============================================================ */

'use strict';

// ─── HERO SLIDER ────────────────────────────────────────────
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let autoTimer = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5500);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  const nextBtn = document.getElementById('heroNext');
  const prevBtn = document.getElementById('heroPrev');
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });

  // Touch / swipe support
  let touchStartX = 0;
  const heroEl = document.querySelector('.hero');
  heroEl?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  heroEl?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  }, { passive: true });

  startAuto();
}

// ─── NAVBAR ─────────────────────────────────────────────────
function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks?.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle?.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Highlight active page
  const page = location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (href === 'index.html' && (page === '' || page === '/'))) {
      a.classList.add('active');
    }
  });
}

// ─── SCROLL REVEAL ──────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

// ─── COUNTER ANIMATION ──────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el      = e.target;
      const target  = parseInt(el.dataset.count, 10);
      const suffix  = el.dataset.suffix || '';
      const dur     = 1800;
      const start   = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / dur, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ─── GALLERY FILTER ─────────────────────────────────────────
function initGalleryFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let delay = 0;

      items.forEach(item => {
        const show = filter === 'all' || item.dataset.decade === filter;
        if (show) {
          item.style.display = '';
          item.style.animationDelay = delay + 'ms';
          item.classList.remove('visible');
          void item.offsetWidth; // reflow
          item.style.animation = 'none';
          requestAnimationFrame(() => {
            item.style.animation = '';
            item.style.opacity = '1';
            item.style.transform = 'none';
          });
          delay += 40;
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ─── LIGHTBOX ───────────────────────────────────────────────
function initLightbox() {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbCap   = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');

  function open(src, caption) {
    if (!lb) return;
    lbImg.src = src;
    if (lbCap) lbCap.textContent = caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb?.classList.remove('open');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  }

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => open(item.dataset.src, item.dataset.caption));
  });

  lbClose?.addEventListener('click', close);
  lb?.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// ─── UPLOAD DROPBOX ─────────────────────────────────────────
function initUpload() {
  const dropzone    = document.getElementById('uploadDropzone');
  const fileInput   = document.getElementById('fileInput');
  const preview     = document.getElementById('uploadPreview');
  const uploadBtn   = document.getElementById('uploadBtn');
  const saveBtn     = document.getElementById('saveGalleryBtn');
  const countEl     = document.getElementById('uploadCount');
  const statusEl    = document.getElementById('uploadStatus');
  const galleryGrid = document.getElementById('galleryGrid');

  if (!dropzone) return;

  const maxFiles = 10;
  let stagedPhotos = [];
  let savedPhotos = [];

  function updateCount(message) {
    if (!countEl) return;
    countEl.textContent = message || `${stagedPhotos.length} photo(s) ready to save`;
  }

  function updateStatus(message, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = message || '';
    statusEl.style.color = isError ? '#e05555' : 'var(--accent)';
  }

  function updateSaveButton() {
    if (!saveBtn) return;
    saveBtn.disabled = stagedPhotos.length === 0;
  }

  function persistGallery() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem('brothersClubUploadedPhotos', JSON.stringify(savedPhotos));
  }

  function loadSavedGallery() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const saved = JSON.parse(window.localStorage.getItem('brothersClubUploadedPhotos') || '[]');
      if (!Array.isArray(saved)) return;
      savedPhotos = saved;
      savedPhotos.forEach(photo => createGalleryItem(photo.src, photo.caption, photo.id));
    } catch (err) {
      console.warn('Unable to load saved gallery items', err);
    }
  }

  function createGalleryItem(src, caption, id) {
    if (!galleryGrid) return null;

    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.dataset.decade = 'uploaded';
    item.dataset.src = src;
    item.dataset.caption = caption || 'Uploaded photo';
    item.dataset.uploadId = id;
    item.innerHTML = `
      <img src="${src}" alt="${caption}" />
      <div class="gallery-overlay"><span class="gallery-overlay-text">📸 Uploaded Memory</span></div>
      <div class="gallery-zoom-icon">🔍</div>
    `;

    galleryGrid.appendChild(item);
    return item;
  }

  function appendPreview(photo) {
    if (!preview) return;

    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    previewItem.dataset.uploadId = photo.id;
    previewItem.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" />
      <button class="preview-remove" title="Remove" aria-label="Remove photo">✕</button>
    `;

    const removeButton = previewItem.querySelector('.preview-remove');
    removeButton?.addEventListener('click', () => {
      previewItem.remove();
      stagedPhotos = stagedPhotos.filter(item => item.id !== photo.id);
      updateCount();
      updateSaveButton();
      updateStatus('Photo removed from staging.');
    });

    preview.appendChild(previewItem);
  }

  function handleFiles(files) {
    if (!files || !files.length) return;
    const fileArray = Array.from(files);
    const usedCount = savedPhotos.length + stagedPhotos.length;
    const availableSlots = maxFiles - usedCount;

    if (availableSlots <= 0) {
      updateStatus(`Max ${maxFiles} saved photos reached. Remove saved items from storage to add more.`, true);
      return;
    }

    const toProcess = fileArray.slice(0, availableSlots);
    if (toProcess.length < fileArray.length) {
      updateStatus(`Only ${availableSlots} image(s) added. Max ${maxFiles} images allowed.`);
    }

    toProcess.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      const uploadId = `uploaded-${Date.now()}-${Math.random().toString(16).slice(2)}`;

      reader.onload = ev => {
        const src = ev.target.result;
        const caption = file.name;
        const photo = { id: uploadId, src, caption };

        stagedPhotos.push(photo);
        appendPreview(photo);
        updateCount();
        updateSaveButton();
        updateStatus('Photo ready to save. Click Save to add it to the gallery.');
      };

      reader.readAsDataURL(file);
    });
  }

  function saveStagedPhotos() {
    if (!stagedPhotos.length) {
      updateStatus('Select at least one photo before saving.', true);
      return;
    }

    stagedPhotos.forEach(photo => {
      createGalleryItem(photo.src, photo.caption, photo.id);
      savedPhotos.push(photo);
    });

    persistGallery();
    stagedPhotos = [];
    if (preview) preview.innerHTML = '';
    updateCount('Saved to gallery locally. Reload keeps the photos in this browser.');
    updateStatus('Photos saved successfully.');
    updateSaveButton();
  }

  uploadBtn?.addEventListener('click', () => fileInput?.click());
  saveBtn?.addEventListener('click', saveStagedPhotos);

  ['dragenter', 'dragover'].forEach(ev => {
    dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('dragover'); });
  });
  ['dragleave', 'dragend', 'drop'].forEach(ev => {
    dropzone.addEventListener(ev, () => dropzone.classList.remove('dragover'));
  });

  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  });

  fileInput?.addEventListener('change', () => { handleFiles(fileInput.files); fileInput.value = ''; });

  loadSavedGallery();
  updateCount('No photos selected yet.');
  updateSaveButton();
}

// ─── CONTACT FORM ────────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e05555';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) return;

    // Show success (in real app, you'd POST to a server)
    form.style.display = 'none';
    success?.classList.add('show');

    setTimeout(() => {
      form.reset();
      form.style.display = '';
      success?.classList.remove('show');
    }, 6000);
  });
}

// ─── SMOOTH HOVER TILT FOR CARDS ────────────────────────────
function initCardTilt() {
  const cards = document.querySelectorAll('.player-card, .trophy-card, .news-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSlider();
  initReveal();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initUpload();
  initContactForm();
  initCardTilt();
});
