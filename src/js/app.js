const header = () => {
    const items = document.querySelectorAll('.menu__item');

    const setActive = (item) => {
        items.forEach(i => i.classList.remove('menu__item_active'));
        item.classList.add('menu__item_active');

        localStorage.setItem('activeMenuIndex', [...items].indexOf(item));
    };

    const savedIndex = localStorage.getItem('activeMenuIndex');
    if (savedIndex !== null && items[savedIndex]) {
        items[savedIndex].classList.add('menu__item_active');
    }

    items.forEach(item => {
        item.addEventListener('click', () => setActive(item));
    });
};

const popup = () => {
    const overlay = document.querySelector('.overlay'),
        openBtn = document.querySelector('.header__block_btn'),
        closeBtn = document.querySelector('.popup-cross')

    openBtn.addEventListener('click', () => {
        overlay.classList.add('active-overlay')
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active-overlay')
        })
    })
};

document.addEventListener('DOMContentLoaded', function() {
    header();
    popup();
})