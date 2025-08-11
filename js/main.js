(() => {
  const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    elapsed: document.getElementById('elapsed'),
    nextDate: document.getElementById('next-date'),
    modal: document.getElementById('modal'),
    modalImg: document.getElementById('modal-img'),
    closeBtn: document.querySelector('.close'),
    images: document.querySelectorAll('.gallery-grid img'),
    sections: document.querySelectorAll('.hidden')
  };

  const startDate = new Date('2021-03-19T00:00:00');

  const getNextAnniversary = () => {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), startDate.getDate());
    if (next <= now) {
      next.setMonth(next.getMonth() + 1);
    }
    return next;
  };

  const updateElapsed = () => {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    if (now.getDate() < startDate.getDate()) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    elements.elapsed.textContent = `เราอยู่ด้วยกันมาแล้ว ${years} ปี ${months} เดือน`;
  };

  let hasFired = false;

  const updateCountdown = () => {
    const next = getNextAnniversary();
    const distance = next.getTime() - Date.now();
    const time = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };

    Object.entries(time).forEach(([key, value]) => {
      elements[key].textContent = value < 0 ? 0 : value;
    });

    const nextStr = next.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    elements.nextDate.textContent = `ครบรอบครั้งต่อไป: ${nextStr}`;

    if (distance <= 0) {
      checkToday();
    }
  };

  const triggerFireworks = big => {
    if (typeof confetti !== 'function') return;
    const duration = big ? 5000 : 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: big ? 120 : 60,
        spread: 60,
        origin: { y: 0 },
        gravity: big ? 0.8 : 1.2
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const checkToday = () => {
    const now = new Date();
    if (!hasFired && now.getDate() === startDate.getDate()) {
      const big = now.getMonth() === startDate.getMonth();
      triggerFireworks(big);
      hasFired = true;
    }
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();
  updateElapsed();
  checkToday();

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.sections.forEach(section => observer.observe(section));

  elements.images.forEach(img => {
    img.addEventListener('click', () => {
      elements.modal.classList.add('show');
      elements.modalImg.src = img.src;
      elements.modalImg.alt = img.alt;
    });
  });

  const closeModal = () => elements.modal.classList.remove('show');
  elements.closeBtn.addEventListener('click', closeModal);
  elements.modal.addEventListener('click', e => {
    if (e.target === elements.modal) {
      closeModal();
    }
  });
})();

