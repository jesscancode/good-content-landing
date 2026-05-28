(function () {
  var list = document.getElementById('servicesList');
  var items = list.querySelectorAll('.service-item');
  var gifBgs = document.querySelectorAll('.gif-layer .gif-bg');
  var sideQuest = list.querySelector('.side-quest-item');

  var hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ─── Card data ───────────────────────────────────────────────
  var cardData = [
    {
      label: 'What this means',
      title: 'Build smarter products and operations with AI',
      desc: 'Most businesses are drowning in manual work that AI tools can already handle. I map your workflows, identify exactly where AI saves time or money, and help you implement it.',
      points: [
        'AI audit of your existing tools and processes',
        'Specific automation recommendations with real tools',
        'Implementation support or a clean hand-off to your team'
      ]
    },
    {
      label: 'What this means',
      title: 'Create content strategies that last',
      desc: 'Not a content calendar. A real strategy — who you\'re talking to, what they care about, and how you show up consistently without burning out your team.',
      points: [
        'Content strategy document you\'ll actually use',
        'Channel prioritisation based on your audience\'s real behaviour',
        'Content pillars and formats that match your team\'s capacity'
      ]
    },
    {
      label: 'What this means',
      title: 'Show up in search and rank with AEO',
      desc: 'AEO (Answer Engine Optimisation) is what SEO is becoming. As people search via ChatGPT and Perplexity, your content needs to be structured to be the answer — not just appear on a results page.',
      points: [
        'AEO audit of your existing content',
        'Optimisation of your highest-value pages',
        'Authority-building strategy for your niche aligned with your business goals'
      ]
    },
    {
      label: 'What this means',
      title: 'Understand your competitive edge',
      desc: 'I talk to your customers — via WhatsApp, email, and real conversations — to find out why they chose you, what keeps them coming back, and what nearly sent them elsewhere. The insight is the product.',
      points: [
        'Customer interview synthesis (WhatsApp, email, video)',
        'Competitive positioning report',
        'Strategic recommendations built on real customer needs'
      ]
    }
  ];

  // ─── Card show / hide ─────────────────────────────────────────
  var card = document.getElementById('serviceCard');
  var overlay = document.getElementById('cardOverlay');
  var closeBtn = document.getElementById('cardClose');

  function lockScroll()   { document.body.style.overflow = 'hidden'; }
  function unlockScroll() { document.body.style.overflow = ''; }

  function showCard(idx) {
    var data = cardData[idx];
    if (!data) return;
    document.getElementById('cardLabel').textContent = data.label;
    document.getElementById('cardTitle').textContent = data.title;
    document.getElementById('cardDesc').textContent = data.desc;
    var ul = document.getElementById('cardPoints');
    ul.innerHTML = '';
    data.points.forEach(function (p) {
      var li = document.createElement('li');
      li.textContent = p;
      ul.appendChild(li);
    });
    card.classList.add('visible');
    card.setAttribute('aria-hidden', 'false');
    overlay.classList.add('visible');
    lockScroll();
  }

  function hideCard() {
    card.classList.remove('visible');
    card.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('visible');
    unlockScroll();
  }

  closeBtn.addEventListener('click', function () {
    var star = closeBtn.querySelector('.close-star');
    if (star) {
      star.classList.remove('spinning');
      void star.offsetWidth;
      star.classList.add('spinning');
      setTimeout(hideCard, 380);
    } else {
      hideCard();
    }
  });
  overlay.addEventListener('click', hideCard);

  // ─── GIF activate / deactivate ────────────────────────────────
  var leaveTimer = null;

  function activate(item) {
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
    var idx = parseInt(item.dataset.index, 10);
    deactivateAll();
    item.classList.add('active');
    list.classList.add('has-active');
    var bg = gifBgs[idx];
    if (bg) { loadGif(bg); bg.classList.add('active'); }
  }

  function deactivateAll() {
    items.forEach(function (i) { i.classList.remove('active'); });
    gifBgs.forEach(function (b) { b.classList.remove('active'); });
    list.classList.remove('has-active');
  }

  function deferDeactivate() {
    leaveTimer = setTimeout(deactivateAll, 90);
  }

  function loadGif(bg) {
    if (bg.querySelector('img')) return;
    var url = bg.dataset.gif;
    if (!url) return;
    var img = new Image();
    img.alt = '';
    img.src = url;
    bg.appendChild(img);
  }

  // ─── Hero star ────────────────────────────────────────────────
  var heroStar = document.querySelector('.hero-star');
  if (heroStar) {
    function triggerSpin() {
      heroStar.classList.remove('spinning');
      void heroStar.offsetWidth;
      heroStar.classList.add('spinning');
    }
    heroStar.addEventListener('mouseenter', triggerSpin);
    heroStar.addEventListener('click', triggerSpin);
    heroStar.addEventListener('animationend', function () {
      heroStar.classList.remove('spinning');
    });
  }

  // ─── Service item interactions ────────────────────────────────
  // Desktop: hover shows GIF; click opens card
  // Touch: tap opens card
  if (hasHover) {
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () { activate(item); });
      item.addEventListener('mouseleave', deferDeactivate);
    });
  }

  // Click → card (all devices, non-side-quest items only)
  items.forEach(function (item) {
    if (item === sideQuest) return;
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      var idx = parseInt(item.dataset.index, 10);
      showCard(idx);
    });
  });

  // Tap outside to deactivate GIF (touch only)
  if (!hasHover) {
    document.addEventListener('click', deactivateAll);
  }

  // ─── Polaroid flip (desktop) / bio modal (mobile) ────────────
  var polaroidFlip      = document.getElementById('polaroidFlip');
  var polaroidFlipInner = document.getElementById('polaroidFlipInner');
  var bioOverlay        = document.getElementById('bioOverlay');
  var bioModal          = document.getElementById('bioModal');
  var bioClose          = document.getElementById('bioClose');

  function showBioModal() {
    bioOverlay.classList.add('visible');
    bioModal.classList.add('visible');
    bioModal.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function hideBioModal() {
    bioOverlay.classList.remove('visible');
    bioModal.classList.remove('visible');
    bioModal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  }

  if (polaroidFlip && polaroidFlipInner) {
    polaroidFlip.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      if (window.matchMedia('(max-width: 767px)').matches) {
        showBioModal();
      } else {
        polaroidFlipInner.classList.toggle('flipped');
        polaroidFlip.classList.toggle('is-flipped');
      }
    });
  }

  bioClose.addEventListener('click', function () {
    var star = bioClose.querySelector('.close-star');
    if (star) {
      star.classList.remove('spinning');
      void star.offsetWidth;
      star.classList.add('spinning');
      setTimeout(hideBioModal, 380);
    } else {
      hideBioModal();
    }
  });

  bioOverlay.addEventListener('click', hideBioModal);

  // ─── Pikachu easter egg ───────────────────────────────────────
  var pikachu     = document.querySelector('.pikachu');
  var pikaOverlay = document.getElementById('pikaOverlay');
  var pikaModal   = document.getElementById('pikaModal');
  var pikaClose   = document.getElementById('pikaClose');
  var pikaWrap    = document.getElementById('pikaCardWrap');

  function showPika() {
    pikaOverlay.classList.add('visible');
    pikaModal.classList.add('visible');
    pikaModal.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function hidePika() {
    pikaOverlay.classList.remove('visible');
    pikaModal.classList.remove('visible');
    pikaModal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  }

  if (pikachu) {
    pikachu.addEventListener('click', showPika);
  }

  pikaOverlay.addEventListener('click', hidePika);

  pikaClose.addEventListener('click', function () {
    var star = pikaClose.querySelector('.close-star');
    if (star) {
      star.classList.remove('spinning');
      void star.offsetWidth;
      star.classList.add('spinning');
      setTimeout(hidePika, 380);
    } else {
      hidePika();
    }
  });

  // TCG tilt + shimmer
  if (pikaWrap) {
    var pikaShimmer = pikaWrap.querySelector('.pika-shimmer');

    pikaWrap.addEventListener('mouseenter', function () {
      pikaWrap.classList.add('is-tilting');
    });

    pikaWrap.addEventListener('mousemove', function (e) {
      var rect = pikaWrap.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / rect.width;
      var ny = (e.clientY - rect.top)  / rect.height;
      var rx =  (0.5 - ny) * 25;
      var ry =  (nx - 0.5) * 25;
      pikaWrap.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      pikaWrap.style.boxShadow = (ry * -1.2) + 'px ' + (rx * 1.2) + 'px 48px rgba(0,0,0,0.35)';
      if (pikaShimmer) {
        pikaShimmer.style.setProperty('--mx', (nx * 100) + '%');
        pikaShimmer.style.setProperty('--my', (ny * 100) + '%');
      }
    });

    pikaWrap.addEventListener('mouseleave', function () {
      pikaWrap.classList.remove('is-tilting');
      pikaWrap.style.transform = '';
      pikaWrap.style.boxShadow = '';
    });
  }
})();
