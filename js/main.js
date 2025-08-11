(() => {
  const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    modal: document.getElementById('modal'),
    modalImg: document.getElementById('modal-img'),
    closeBtn: document.querySelector('.close'),
    images: document.querySelectorAll('.gallery-grid img'),
    sections: document.querySelectorAll('.hidden')
  };

  const startDate = new Date('2021-03-19T00:00:00');

  const getNextAnniversary = () => {
    const now = new Date();
    const next = new Date(
      now.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    if (next < now) {
      next.setFullYear(next.getFullYear() + 1);
    }
    return next.getTime();
  };

  const updateCountdown = () => {
    const distance = getNextAnniversary() - Date.now();
    const time = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };

    Object.entries(time).forEach(([key, value]) => {
      elements[key].textContent = value < 0 ? 0 : value;
    });
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();

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

