// アニメーション付与【MV】
document.addEventListener('DOMContentLoaded', function () {
  const mv = document.querySelector('.p-mv');
  const activeSlide = document.querySelector('.p-mv-swiper .swiper-slide-active');

  if (!mv) return;

  if (activeSlide) {
    activeSlide.classList.add('is-first');
  }

  requestAnimationFrame(() => {
    mv.classList.add('is-show');
  });

  setTimeout(() => {
    mv.classList.add('is-intro-done');
    if (activeSlide) {
      activeSlide.classList.remove('is-first');
    }
  }, 1500);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const headerHeight = document.querySelector('.l-header').offsetHeight;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// ドロワー
document.addEventListener('DOMContentLoaded', () => {
  initDrawerMenu();
});

function initDrawerMenu() {
  const drawer = document.querySelector('.js-drawer');
  const drawerToggles = document.querySelectorAll('.js-drawer-toggle');
  const drawerLinks = drawer ? drawer.querySelectorAll('a[href]') : [];
  const icon = document.querySelector('.p-header__icon');

  if (!drawer || !drawerToggles.length) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    document.body.classList.add('is-fixed');
    drawer.setAttribute('aria-hidden', 'false');
    icon?.classList.add('is-open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-fixed');
    drawer.setAttribute('aria-hidden', 'true');
    icon?.classList.remove('is-open');
  };

  drawerToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });
}

// MVスワイパー
const mvSwiper = new Swiper('.p-mv-swiper', {
  speed: 1000,
  effect: 'fade',
  allowTouchMove: true,
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },

  //ページネーション
  pagination: {
    el: '.p-mv-swiper-pagination', //paginationのclass
    clickable: true, //クリックでの切り替えを有効に
    type: 'bullets' //paginationのタイプ (※2)
  },

  on: {
    init(swiper) {
      const slide = swiper.slides[swiper.activeIndex];
      slide.classList.add('is-first');
      slide.classList.add('is-animated');
    },

    slideChangeTransitionStart(swiper) {
      swiper.slides.forEach((slide) => {
        slide.classList.remove('is-animated');
      });

      swiper.slides[swiper.activeIndex].classList.add('is-animated');
    }
  }
});

// teacherスワイパー
const teacherSwiper = new Swiper('.l-teacher-swiper', {
  speed: 800,
  loop: false,
  loopedSlides: 4,
  initialSlide: 0,

  slidesPerView: 'auto',
  spaceBetween: 40,

  navigation: {
    prevEl: '.p-teacher-nav__prev',
    nextEl: '.p-teacher-nav__next'
  },

  pagination: {
    el: '.p-teacher-pagination',
    clickable: true,
    type: 'progressbar'
  }
});

// missionアニメーション
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.p-mission');
  const text = document.querySelector('.p-mission__textWrap');
  const cards = document.querySelectorAll('.p-mission__card');

  if (!section) return;

  // SP / PC 判定
  const mq = window.matchMedia('(max-width: 768px)');
  const threshold = mq.matches ? 0.05 : 0.4;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // テキスト表示
          if (text) {
            text.classList.add('is-show');
          }

          // カード表示（少し遅らせる）
          setTimeout(() => {
            cards.forEach((card) => {
              card.classList.add('is-show');
            });
          }, 400);

          // 一度だけ発火（←重要）
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: threshold
    }
  );

  observer.observe(section);
});

// reasonアニメーション
document.addEventListener('DOMContentLoaded', () => {
  const reasonTitle = document.querySelector('.p-reason__titleWrap');
  const reasonCards = document.querySelectorAll('.p-reason-card');

  if (!reasonTitle || !reasonCards.length) return;

  // タイトル用
  const titleObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0
    }
  );

  titleObserver.observe(reasonTitle);

  // カード用（1個ずつ監視）
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -30% 0px',
      threshold: 0
    }
  );

  reasonCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    cardObserver.observe(card);
  });
});

// タブ切り替え
document.addEventListener('DOMContentLoaded', () => {
  initCourseTabs();
});

function initCourseTabs() {
  const tabButtons = document.querySelectorAll('.p-course-tabs__button');
  const tabPanels = document.querySelectorAll('.p-course-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const targetId = this.dataset.tab;
      if (!targetId) return;

      tabButtons.forEach((btn) => btn.classList.remove('is-active'));
      tabPanels.forEach((panel) => panel.classList.remove('is-active'));

      this.classList.add('is-active');
      document.getElementById(targetId)?.classList.add('is-active');
    });
  });
}

// モーダル
document.addEventListener('DOMContentLoaded', function () {
  const openButtons = document.querySelectorAll('.js-modal-open');
  const closeButtons = document.querySelectorAll('.js-modal-close');
  const modals = document.querySelectorAll('.l-course-modal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-fixed');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-fixed');
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const targetId = this.dataset.modalTarget;
      const targetModal = document.getElementById(targetId);
      openModal(targetModal);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const modal = this.closest('.l-course-modal');
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', function (e) {
      if (e.target === modal.querySelector('.p-course-modal__overlay')) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.l-course-modal.is-open');
      if (openModalEl) {
        closeModal(openModalEl);
      }
    }
  });
});

// アコーディオン
document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.p-faq__item');

  faqItems.forEach((item) => {
    const summary = item.querySelector('.p-faq__item-question');
    const answer = item.querySelector('.p-faq__item-answer');

    if (!summary || !answer) return;

    let isAnimating = false;

    answer.style.overflow = 'hidden';
    answer.style.transition = 'height 0.4s ease';

    if (item.open) {
      item.classList.add('is-open');
      answer.style.height = 'auto';
    } else {
      item.classList.remove('is-open');
      answer.style.height = '0px';
    }

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return;

      if (item.open) {
        closeItem();
      } else {
        openItem();
      }
    });

    function openItem() {
      isAnimating = true;

      item.open = true;
      item.classList.add('is-open'); // ← 先に付ける

      answer.style.height = '0px';
      answer.offsetHeight;

      answer.style.height = `${answer.scrollHeight}px`;

      const onEnd = (e) => {
        if (e.propertyName !== 'height') return;
        answer.removeEventListener('transitionend', onEnd);
        answer.style.height = 'auto';
        isAnimating = false;
      };

      answer.addEventListener('transitionend', onEnd);
    }

    function closeItem() {
      isAnimating = true;

      answer.style.height = `${answer.scrollHeight}px`;
      answer.offsetHeight;
      answer.style.height = '0px';

      item.classList.remove('is-open'); // ← 先に外すと即 -→+ に変わる

      const onEnd = (e) => {
        if (e.propertyName !== 'height') return;
        answer.removeEventListener('transitionend', onEnd);
        item.open = false;
        isAnimating = false;
      };

      answer.addEventListener('transitionend', onEnd);
    }
  });
}

// コンタクトエラー
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.querySelector('.l-contact__form');
  if (!(contactForm instanceof HTMLFormElement)) return;

  const fields = contactForm.querySelectorAll('input, select, textarea');

  const updateFilled = (el) => {
    if (
      !(
        el instanceof HTMLInputElement ||
        el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement
      )
    ) {
      return;
    }

    const type = el instanceof HTMLInputElement ? el.type : '';
    const isCheckable = type === 'checkbox' || type === 'radio';
    const hasValue = isCheckable ? el.checked : String(el.value ?? '').trim().length > 0;

    el.classList.toggle('is-filled', hasValue);
  };

  fields.forEach((el) => {
    updateFilled(el);
    el.addEventListener('input', () => updateFilled(el));
    el.addEventListener('change', () => updateFilled(el));
    el.addEventListener('blur', () => updateFilled(el));
  });

  // 「ご用件」チェックボックス：1つ以上必須
  const purposeChecks = Array.from(contactForm.querySelectorAll('input[name="purpose[]"]')).filter(
    (el) => el instanceof HTMLInputElement && el.type === 'checkbox'
  );

  const validatePurpose = () => {
    const anyChecked = purposeChecks.some((el) => el.checked);
    purposeChecks.forEach((el) => {
      el.setCustomValidity(anyChecked ? '' : 'ご用件を1つ以上選択してください');
    });
  };

  if (purposeChecks.length > 0) {
    validatePurpose();
    purposeChecks.forEach((el) => el.addEventListener('change', validatePurpose));
  }

  contactForm.addEventListener('submit', (e) => {
    contactForm.classList.add('is-submitted');
    validatePurpose();

    if (!contactForm.checkValidity()) {
      e.preventDefault();
      const firstInvalid = contactForm.querySelector(':invalid');
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
    }
  });
}

// コンタクト固定ボタンアニメーション
document.addEventListener('DOMContentLoaded', () => {
  const mv = document.querySelector('.l-mv');
  const contact = document.querySelector('.l-contact');
  const btn = document.querySelector('.js-fixed-contact');

  if (!mv || !contact || !btn) return;

  const mq = window.matchMedia('(max-width: 768px)');

  const updateButton = () => {
    if (!mq.matches) {
      btn.classList.remove('is-show');
      return;
    }

    const scrollY = window.scrollY;
    const mvTop = mv.offsetTop;
    const mvHeight = mv.offsetHeight;
    const contactTop = contact.offsetTop;

    // FVの70%を過ぎたら表示
    const showPoint = mvTop + mvHeight * 0.7;

    // contactに入ったら消す
    const isPastMV = scrollY >= showPoint;
    const isBeforeContact = scrollY + window.innerHeight < contactTop + 100;

    if (isPastMV && isBeforeContact) {
      btn.classList.add('is-show');
    } else {
      btn.classList.remove('is-show');
    }
  };

  updateButton();
  window.addEventListener('scroll', updateButton, { passive: true });
  window.addEventListener('resize', updateButton);
  mq.addEventListener('change', updateButton);
});