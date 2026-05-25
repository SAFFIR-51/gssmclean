/* ===========================================
   LU치과 — Branch Site / Interactions
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 모바일 메뉴는 최우선 — 다른 init이 throw해도 동작하도록
  try { initMobileMenu(); } catch (e) { console.error('initMobileMenu', e); }
  const inits = [
    initHeader, initHeroSlider, initDepartmentSlider, initWhyStage, initWhySlider,
    initLocationSlider, initSliders, initMediaTabs, initScrollReveal, initTopButton,
    initPopupWidget, initCondTabs, initHpTabs, initSpaPromise,
  ];
  inits.forEach(fn => { try { fn(); } catch (e) { console.error(fn.name, e); } });
});

/* ---------- SPA Our Promise — sticky scroll로 카드 swap ---------- */
function initSpaPromise() {
  const sec = document.querySelector('[data-spa-promise]');
  if (!sec) return;
  const cards = sec.querySelectorAll('.spa-promise-card');
  const dots = sec.querySelectorAll('.spa-promise-dot');
  const curEl = sec.querySelector('.spa-promise__counter .cur');
  const N = cards.length;
  if (!N) return;

  let lastIdx = -1;
  const setIdx = (idx) => {
    if (idx === lastIdx) return;
    lastIdx = idx;
    cards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
  };

  const onScroll = () => {
    const r = sec.getBoundingClientRect();
    const total = sec.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    let progress = -r.top / total;
    progress = Math.max(0, Math.min(1, progress));
    // 마지막 카드도 충분히 표시되도록 floor 대신 round + clamp
    const idx = Math.min(N - 1, Math.round(progress * (N - 1)));
    setIdx(idx);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // dot 클릭 시 해당 위치로 스크롤
  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      const total = sec.offsetHeight - window.innerHeight;
      const offset = sec.offsetTop + (total * i / N) + 5;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

/* ---------- 고혈압 원인 등 hp-tabs 내부 탭 ---------- */
function initHpTabs() {
  document.querySelectorAll('[data-hp-tabs]').forEach(tabsEl => {
    const wrap = tabsEl.closest('.hp-causes') || tabsEl.parentElement;
    const tabs = tabsEl.querySelectorAll('.hp-tab');
    const panels = wrap.querySelectorAll('.hp-panel');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.hpTab;
        tabs.forEach(t => t.classList.toggle('is-active', t === btn));
        panels.forEach(p => p.classList.toggle('is-active', p.dataset.hpPanel === idx));
      });
    });
  });
}

/* ---------- Condition tabs (sub-category master pages) ---------- */
function initCondTabs() {
  const tabsEls = document.querySelectorAll('.cond-tabs');
  if (!tabsEls.length) return;

  tabsEls.forEach(navEl => {
    const tabs = navEl.querySelectorAll('.cond-tab');
    const root = navEl.closest('main') || document;
    const panels = root.querySelectorAll('.cond-panel');
    if (!tabs.length || !panels.length) return;

    const activate = (key, scroll) => {
      let matched = false;
      tabs.forEach(t => {
        const on = t.dataset.cond === key;
        t.classList.toggle('is-active', on);
        if (on) matched = true;
      });
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.cond === key));
      if (!matched) return;
      if (scroll) {
        const top = navEl.getBoundingClientRect().bottom + window.scrollY;
        window.scrollTo({ top: top - 4, behavior: 'smooth' });
      }
      history.replaceState(null, '', `#${key}`);
    };

    tabs.forEach(t => {
      t.addEventListener('click', e => {
        e.preventDefault();
        activate(t.dataset.cond, true);
      });
    });

    // honor incoming #hash
    const hash = (location.hash || '').replace('#', '');
    if (hash) activate(hash, false);

    // react to back/forward
    window.addEventListener('hashchange', () => {
      const h = (location.hash || '').replace('#', '');
      if (h) activate(h, false);
    });
  });
}

/* ---------- Popup Widget toggle ---------- */
function initPopupWidget() {
  const w = document.getElementById('popupWidget');
  const trigger = document.getElementById('popupTrigger');
  if (!w || !trigger) return;
  trigger.addEventListener('click', () => {
    w.classList.toggle('open');
  });
  const closes = w.querySelectorAll('.popup-close, .popup-dismiss');
  closes.forEach(b => b.addEventListener('click', () => w.classList.remove('open')));
}

/* ---------- Hero Slider ---------- */
function initHeroSlider() {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const numEl = document.querySelector('.hero-page-num em');
  const totalEl = document.querySelector('.hero-page-num i');
  const arrows = document.querySelectorAll('[data-hero-dir]');

  let idx = 0;
  if (totalEl) totalEl.textContent = String(slides.length).padStart(2, '0');

  const hero = document.getElementById('hero');
  const sideEl = document.querySelector('.hero-side-cur');
  const update = () => {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    if (numEl) numEl.textContent = String(idx + 1).padStart(2, '0');
    if (sideEl) sideEl.textContent = String(idx + 1);
    if (hero) hero.classList.toggle('theme-light', slides[idx].classList.contains('hero-slide--minish'));
  };

  arrows.forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.heroDir;
      idx = dir === 'next'
        ? (idx + 1) % slides.length
        : (idx - 1 + slides.length) % slides.length;
      update();
    });
  });

  let autoplay = setInterval(() => {
    idx = (idx + 1) % slides.length;
    update();
  }, 10000);

  slider.addEventListener('mouseenter', () => clearInterval(autoplay));
  slider.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      idx = (idx + 1) % slides.length;
      update();
    }, 10000);
  });
}

/* ---------- Department Slider (1 card at a time) ---------- */
function initDepartmentSlider() {
  const slider = document.querySelector('[data-slider="department"]');
  if (!slider) return;

  const track = slider.querySelector('.department-track');
  const cards = track.querySelectorAll('.depart-card');
  const prev = slider.querySelector('[data-dir="prev"]')
    || document.querySelector('[data-slider-prev="department"]');
  const next = slider.querySelector('[data-dir="next"]')
    || document.querySelector('[data-slider-next="department"]');
  const dots = slider.querySelectorAll('.dept-dot');

  let idx = 0;

  const update = () => {
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  };
  track.style.transition = 'transform 0.6s cubic-bezier(0.6, 0.05, 0.01, 0.9)';

  prev && prev.addEventListener('click', () => {
    idx = (idx - 1 + cards.length) % cards.length;
    update();
  });
  next && next.addEventListener('click', () => {
    idx = (idx + 1) % cards.length;
    update();
  });
  dots.forEach((d, i) => d.addEventListener('click', () => { idx = i; update(); }));
}

/* ---------- Why Slider v2 (fade swap + book-shelf thumbs) ---------- */
function initWhyStage() {
  const stage = document.querySelector('[data-why-stage]');
  if (!stage) return;
  const items = Array.from(stage.querySelectorAll('[data-why-item]'));
  if (!items.length) return;
  const imgEl = stage.querySelector('[data-why-active-img]');
  const numEl = stage.querySelector('[data-why-active-num]');
  const titleEl = stage.querySelector('[data-why-active-title]');
  const descEl = stage.querySelector('[data-why-active-desc]');
  const featureEl = stage.querySelector('.why-feature');
  const curEl = document.querySelector('#why .slider-counter .cur');
  const totalEl = document.querySelector('#why .slider-counter .total');
  const prev = document.querySelector('#why [data-why-dir="prev"]');
  const next = document.querySelector('#why [data-why-dir="next"]');
  const N = items.length;
  if (totalEl) totalEl.textContent = String(N).padStart(2, '0');

  let idx = 0;
  let animating = false;

  const apply = () => {
    const it = items[idx];
    imgEl.src = it.dataset.img;
    numEl.textContent = it.dataset.num;
    titleEl.innerHTML = it.dataset.title;
    descEl.textContent = it.dataset.desc;
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
  };

  const goTo = (newIdx) => {
    if (animating || newIdx === idx) return;
    animating = true;
    featureEl.classList.add('is-fading');
    setTimeout(() => {
      idx = ((newIdx % N) + N) % N;
      apply();
      featureEl.classList.remove('is-fading');
      animating = false;
    }, 220);
  };

  prev && prev.addEventListener('click', () => { goTo(idx - 1); restartAuto(); });
  next && next.addEventListener('click', () => { goTo(idx + 1); restartAuto(); });

  apply();

  // 자동 루프
  let timer = null;
  const startAuto = () => { timer = setInterval(() => goTo(idx + 1), 5000); };
  const stopAuto = () => { if (timer) { clearInterval(timer); timer = null; } };
  const restartAuto = () => { stopAuto(); startAuto(); };
  stage.addEventListener('mouseenter', stopAuto);
  stage.addEventListener('mouseleave', startAuto);
  startAuto();
}

/* ---------- (Legacy) Why Slider — kept as no-op if old structure absent ---------- */
function initWhySlider() {
  const slider = document.querySelector('[data-why-slider]');
  if (!slider) return;

  const track = slider.querySelector('.why-track');
  const originals = Array.from(slider.querySelectorAll('.why-slide'));
  const N = originals.length;
  const curEl = slider.querySelector('.slider-counter .cur');
  const totalEl = slider.querySelector('.slider-counter .total');
  const prev = slider.querySelector('[data-why-dir="prev"]')
    || document.querySelector('#why [data-why-dir="prev"]');
  const nextBtn = slider.querySelector('[data-why-dir="next"]')
    || document.querySelector('#why [data-why-dir="next"]');

  if (N === 0) return;
  if (totalEl) totalEl.textContent = String(N).padStart(2, '0');

  // Clone first slide at end, last slide at start for seamless wrap
  const headClone = originals[0].cloneNode(true);
  headClone.classList.add('is-clone');
  track.appendChild(headClone);
  const tailClone = originals[N - 1].cloneNode(true);
  tailClone.classList.add('is-clone');
  track.insertBefore(tailClone, track.firstChild);

  let idx = 0;             // real-slide index 0..N-1
  let trackIdx = 1;        // physical position (starts at first real after the prepended tail clone)
  let animating = false;

  const getStep = () => {
    // 비활성 슬라이드의 width를 기준으로 step 계산 (활성/비활성 width가 다른 책-꽂힘 레이아웃)
    const narrow = track.querySelector('.why-slide:not(.is-active)');
    const ref = narrow || originals[0];
    if (!ref) return 0;
    const gap = parseInt(window.getComputedStyle(track).gap || '0', 10) || 0;
    return ref.getBoundingClientRect().width + gap;
  };

  const setTransform = (animate) => {
    track.style.transition = animate ? 'transform 0.75s cubic-bezier(0.6, 0.05, 0.01, 0.9)' : 'none';
    track.style.transform = `translateX(-${trackIdx * getStep()}px)`;
  };

  const markActive = () => {
    Array.from(track.children).forEach(el => el.classList.remove('is-active'));
    const el = track.children[trackIdx];
    if (el) el.classList.add('is-active');
  };

  const updateCounter = () => {
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
  };

  const goTo = (dir) => {
    if (animating) return;
    animating = true;
    trackIdx += dir;
    idx = ((idx + dir) % N + N) % N;
    setTransform(true);
    markActive();
    updateCounter();
  };

  track.addEventListener('transitionend', () => {
    animating = false;
    if (trackIdx === N + 1) {
      trackIdx = 1;
      setTransform(false);
      markActive();
      void track.offsetWidth;
    } else if (trackIdx === 0) {
      trackIdx = N;
      setTransform(false);
      markActive();
      void track.offsetWidth;
    }
  });

  prev && prev.addEventListener('click', () => { goTo(-1); restartAuto(); });
  nextBtn && nextBtn.addEventListener('click', () => { goTo(1); restartAuto(); });
  window.addEventListener('resize', () => setTransform(false));

  // initial
  setTransform(false);
  markActive();
  updateCounter();

  let timer = null;
  const startAuto = () => {
    stopAuto();
    timer = setInterval(() => goTo(1), 5500);
  };
  const stopAuto = () => { if (timer) clearInterval(timer); timer = null; };
  const restartAuto = () => { stopAuto(); startAuto(); };
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  startAuto();
}

/* ---------- Header ---------- */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Generic Sliders (location, ba) ---------- */
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    // Skip ones handled by dedicated functions
    if (slider.matches('[data-slider="department"], [data-slider="why"]')) return;
    const track = slider.querySelector(
      '.location-track, .ba-track'
    );
    if (!track) return;

    const prevBtn = slider.querySelector('[data-dir="prev"]');
    const nextBtn = slider.querySelector('[data-dir="next"]');
    const dotsWrap = slider.querySelector('.slider-dots');

    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    const getStep = () => {
      const card = cards[0];
      const cs = window.getComputedStyle(track);
      const gap = parseInt(cs.columnGap || cs.gap || '0', 10) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    // Dots (department slider only)
    if (dotsWrap) {
      const pages = Math.max(1, Math.ceil(cards.length / 2));
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `${i + 1} 페이지로 이동`);
        dot.addEventListener('click', () => {
          track.scrollTo({ left: getStep() * 2 * i, behavior: 'smooth' });
        });
        dotsWrap.appendChild(dot);
      }
      track.addEventListener('scroll', () => {
        const idx = Math.round(track.scrollLeft / (getStep() * 2));
        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('is-active', i === idx);
        });
      }, { passive: true });
    }

    // Drag-to-scroll (desktop)
    let isDown = false, startX = 0, startScroll = 0;
    track.addEventListener('mousedown', e => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      startScroll = track.scrollLeft;
    });
    ['mouseleave', 'mouseup'].forEach(evt =>
      track.addEventListener(evt, () => { isDown = false; track.style.cursor = ''; })
    );
    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = startScroll - (x - startX) * 1.2;
    });
  });
}

/* ---------- Media Tabs ---------- */
function initMediaTabs() {
  const tabs = document.querySelectorAll('.media-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mediaTab || tab.dataset.tab;
      tabs.forEach(t => {
        const active = (t.dataset.mediaTab || t.dataset.tab) === target;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      document.querySelectorAll('[data-media-panel]').forEach(p => {
        p.classList.toggle('is-active', p.dataset.mediaPanel === target);
      });
      document.querySelectorAll('[data-tab-content]').forEach(p => {
        if (p.dataset.tabContent === target) p.removeAttribute('hidden');
        else p.setAttribute('hidden', '');
      });
    });
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-head, .intro-text, .intro-visual, .depart-card, ' +
    '.team-card, .team-intro, .why-card, .equip-card, .loc-card, ' +
    '.ba-card, .media-card, .map-info, .map-wrap, .cta-title, .cta-btn, ' +
    '.hours-block, .visit-map, .visit-info, .depart-img, .depart-info, ' +
    '[data-reveal]'
  );
  targets.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('js-reveal-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));

  // Safety: ensure all visible after 1.5s (if user never scrolls / JS misses)
  setTimeout(() => {
    targets.forEach(el => el.classList.add('is-visible'));
  }, 1500);
}

/* ---------- Top Button ---------- */
function initTopButton() {
  const btn = document.getElementById('topBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Mobile Menu — 직접 바인딩 + 위임 이중 안전망 ---------- */
function initMobileMenu() {
  const bind = () => {
    const btn = document.querySelector('.mobile-menu-btn');
    const gnb = document.querySelector('.gnb');
    if (!btn || !gnb || btn.dataset.menuBound) return;
    btn.dataset.menuBound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = gnb.classList.toggle('is-open');
      btn.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    gnb.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        gnb.classList.remove('is-open');
        btn.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      }
    });
  };
  bind();
  // 위임 fallback — 어떤 이유로든 직접 바인딩이 실패해도 동작
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mobile-menu-btn');
    if (!btn) return;
    if (btn.dataset.menuBound) return; // 직접 바인딩이 이미 처리
    const gnb = document.querySelector('.gnb');
    if (!gnb) return;
    const open = gnb.classList.toggle('is-open');
    btn.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
}

/* ---------- Cursor glow on cards (no 3D tilt — kept too jumpy) ---------- */
function initCardTilt() {
  const cards = document.querySelectorAll('.symptom-card, .point-card, .value-card');
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach(card => {
    let raf = 0;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--glow-x', `${(e.clientX - rect.left)}px`);
        card.style.setProperty('--glow-y', `${(e.clientY - rect.top)}px`);
      });
    });
  });
}

/* ---------- Parallax disabled — full-page parallax felt uneven ---------- */
function initParallax() {
  // No-op. CSS-only `heroZoom` handles hero entry already.
}

/* ---------- Smooth Scroll for in-page links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('header')?.offsetHeight || 80) + 12;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
}

/* ---------- Number counter on reveal ---------- */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const dur = 1400;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => observer.observe(el));
}

/* ---------- Hero auto-rotate ---------- */
function initHeroAuto() {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider) return;
  const slides = slider.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    const cur = slider.querySelector('.hero-slide.is-active');
    if (cur && cur.matches(':hover')) return;
    i = (i + 1) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
    const numEl = document.querySelector('.hero-page-num em');
    if (numEl) numEl.textContent = String(i + 1).padStart(2, '0');
  }, 6500);
}

/* ---------- Init enhanced interactions ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initCardTilt();
  initParallax();
  initSmoothScroll();
  initCounters();
  initHeroAuto();
});

/* ---------- Location Slider (seamless infinite loop) ---------- */
function initLocationSlider() {
  const slider = document.querySelector('[data-loc-slider]');
  if (!slider) return;
  const track = slider.querySelector('.location-track');
  const viewport = slider.querySelector('.location-viewport');
  const originals = Array.from(slider.querySelectorAll('.loc-card'));
  const N = originals.length;
  const sliderScope = slider.closest('section') || document;
  const prev = slider.querySelector('[data-loc-dir="prev"]')
    || sliderScope.querySelector('[data-loc-dir="prev"]');
  const nextBtn = slider.querySelector('[data-loc-dir="next"]')
    || sliderScope.querySelector('[data-loc-dir="next"]');
  const curEl = slider.querySelector('.slider-counter .cur');
  const totalEl = slider.querySelector('.slider-counter .total');

  if (N === 0) return;
  if (totalEl) totalEl.textContent = String(N).padStart(2, '0');

  const visibleCount = () => {
    const vw = viewport.getBoundingClientRect().width;
    const cw = originals[0].getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(track).gap || '0', 10) || 16;
    return Math.max(1, Math.round((vw + gap) / (cw + gap)));
  };

  // Clone enough leading cards at end + trailing cards at start for seamless wrap
  const buildClones = () => {
    // remove any prior clones
    slider.querySelectorAll('.loc-card.is-clone').forEach(el => el.remove());
    const v = visibleCount();
    // append leading clones at end
    for (let i = 0; i < v; i++) {
      const c = originals[i].cloneNode(true);
      c.classList.add('is-clone');
      track.appendChild(c);
    }
    // prepend trailing clones at start
    for (let i = N - 1; i >= N - v; i--) {
      const c = originals[i].cloneNode(true);
      c.classList.add('is-clone');
      track.insertBefore(c, track.firstChild);
    }
    return v;
  };

  let leadCount = buildClones();
  let idx = 0;       // real-card index (0..N-1)
  let trackIdx = leadCount; // physical position in track (starts at first real card)
  let animating = false;

  const getStep = () => {
    const card = originals[0];
    if (!card) return 0;
    const gap = parseInt(window.getComputedStyle(track).gap || '0', 10) || 16;
    return card.getBoundingClientRect().width + gap;
  };

  const setTransform = (animate) => {
    track.style.transition = animate ? 'transform 0.75s cubic-bezier(0.6, 0.05, 0.01, 0.9)' : 'none';
    track.style.transform = `translateX(-${trackIdx * getStep()}px)`;
  };

  const updateCounter = () => {
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
  };

  const goTo = (dir) => {
    if (animating) return;
    animating = true;
    trackIdx += dir;
    idx = ((idx + dir) % N + N) % N;
    setTransform(true);
    updateCounter();
  };

  track.addEventListener('transitionend', () => {
    animating = false;
    // seamless jump if we passed into the cloned region
    if (trackIdx >= leadCount + N) {
      trackIdx = leadCount;
      setTransform(false);
      void track.offsetWidth; // reflow
    } else if (trackIdx < leadCount) {
      trackIdx = leadCount + N - 1;
      setTransform(false);
      void track.offsetWidth;
    }
  });

  prev && prev.addEventListener('click', () => { goTo(-1); restartAuto(); });
  nextBtn && nextBtn.addEventListener('click', () => { goTo(1); restartAuto(); });
  window.addEventListener('resize', () => {
    // rebuild clones if visible count changed
    const v = visibleCount();
    if (v !== leadCount) {
      leadCount = buildClones();
      trackIdx = leadCount + idx;
    }
    setTransform(false);
  });

  // initial position
  setTransform(false);
  updateCounter();

  let timer = null;
  const startAuto = () => {
    stopAuto();
    timer = setInterval(() => goTo(1), 4500);
  };
  const stopAuto = () => { if (timer) clearInterval(timer); timer = null; };
  const restartAuto = () => { stopAuto(); startAuto(); };
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  startAuto();

  // lu-tour thumbnail picker — 클릭 시 해당 인덱스로 이동, 슬라이드 전환에 따라 active 표시
  if (slider.matches('[data-tour-slider]')) {
    const thumbsEl = sliderScope.querySelector('[data-tour-thumbs]');
    if (thumbsEl) {
      const thumbs = thumbsEl.querySelectorAll('.tour-thumb');
      const syncThumbs = () => {
        thumbs.forEach((t, i) => t.classList.toggle('is-active', i === idx));
      };
      thumbs.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = parseInt(btn.dataset.tourIdx || '0', 10);
          const delta = target - idx;
          if (delta === 0) return;
          if (animating) return;
          animating = true;
          trackIdx += delta;
          idx = target;
          setTransform(true);
          syncThumbs();
          restartAuto();
        });
      });
      track.addEventListener('transitionend', syncThumbs);
      syncThumbs();
    }
  }
}
