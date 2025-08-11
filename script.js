// ตัวนับถอยหลัง
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// วันครบรอบเริ่มต้น
const startDate = new Date('2021-03-19T00:00:00');

function getNextAnniversary() {
    const now = new Date();
    let next = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (next < now) {
        next.setFullYear(next.getFullYear() + 1);
    }
    return next.getTime();
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = getNextAnniversary() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 0 ? 0 : days;
    hoursEl.textContent = hours < 0 ? 0 : hours;
    minutesEl.textContent = minutes < 0 ? 0 : minutes;
    secondsEl.textContent = seconds < 0 ? 0 : seconds;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// เฝ้าดูการเลื่อนเพื่อเฟดอิน
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

hiddenElements.forEach(el => observer.observe(el));

// โมดัลของแกลเลอรี
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

// เปิดโมดัลเมื่อคลิกรูป
const images = document.querySelectorAll('.gallery-grid img');
images.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('show');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
});

// ปิดโมดัลเมื่อคลิกปุ่มปิดหรือพื้นหลัง
closeBtn.addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});
