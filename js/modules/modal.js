function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


    function openModal() { // Создали функцию, чтобы не дублировать код
            modal.classList.add('show'); 
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            setInterval(modalTimerId); // Если пользователь сам открыл окно, то мы отчищаем интервал
            // чтобы окно опять самостоятельно не открылось
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal); // Вынесли код отсюда в функцию openModal
    });
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show'); 
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 500000); // Поставили таймер чтобы окно через 3сек появлялось само

    function showModalByScroll() { // Создал функцию и перенес весь код из window....(scroll)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // после первого полного скролла, в след раз
        } // модальное окно не вылезет благодаря removeEventListener
    }

    window.addEventListener('scroll', showModalByScroll); 
}

module.exports = modal;