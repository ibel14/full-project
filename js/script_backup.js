"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Tabs
            // Создал переменные под каждую вкладку
    const tabs = document.querySelectorAll('.tabheader__item'), // Каждая вкладка
          tabsContent = document.querySelectorAll('.tabcontent'), // Описание вкладок
          tabsParent = document.querySelector('.tabheader__items'); // Отвечает за весь блок вкладок

    
    function hideTabContent() { // Скрываем ненужные вкладки
        tabsContent.forEach(item => { // Перебираем каждый контент отдельно через форич
            item.classList.add('hide'); // Скрыли весь контент которые есть на сайте
            item.classList.remove('show', 'fade');
        }); // Эта функция занимается только скрытием вкладок (табов)

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // Показываем нужные вкладки
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent(); // Итог: создали две функции чтобы скрывать ненужные вкладки и показывать дефолтную Фитнес


    // Создаем делегирование событий, назначаем обработчик событий клика

    tabsParent.addEventListener('click', (event) => { // создаем колбек, добавляем объект событие event
        const target = event.target; // создали переменную для скоращения event.target

        if (target && target.classList.contains('tabheader__item')) { // C помощью контейнс будет точно определять 
          tabs.forEach((item, i) => { // что мы кликнули в таб чтобы не кликать в родителя (в пустое место)
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
    });

    // Timer

    const deadline = '2020-10-11'; // Создали дедлайн и поместили туда дату дедлайна

    function getTimeRemaining(endtime) { // Создаем функцию под дедлайн
        const t = Date.parse(endtime) - Date.parse(new Date()), // когда функция запускается мы в эту переменную t
        // получим разницу в миллисекундах
              days = Math.floor(t / (1000 * 60 * 60 * 24)), // Match.floor используем для округления
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), // Операции рассчитывающие оставшиеся время
              minutes = Math.floor((t / 1000 / 60) % 60), // Операции рассчитывающие оставшиеся время
              seconds = Math.floor((t / 1000) % 60); // Операции рассчитывающие оставшиеся время внутри этой функции

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function getZero(num) { // Создали функцию с условием, чтобы у цифр от 1 до 9 был 0 вначале
            if (num >= 0 && num < 10) { // Далее поместили эту функцию в updateClock
                return `0${num}`;
            } else {
                return num;
            }
        }

        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);

            updateClock(); // Вызвали функцию для корректного отображения таймера

            function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }

        }

        setClock('.timer', deadline);

    
    // Modal

    // разобрать подробно тему с data-modal, data-close. то что я прописал сейчас в классах в HTML


    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    // Первый вариант

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => { // Повесили клик на кнопку, открывается окно
            modal.classList.add('show'); 
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden'; // Отключили скролл по сайту при открытом окне
    
        });
    });
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show'); // При закрытии окна скролл на сайте опять включили
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    // Второй вариант с помощью toggle

//     modalTrigger.addEventListener('click', () => { // Повесили клик на кнопку, открывается окно
//         modal.classList.toggle('show'); // Если такого класса нет то мы его покажем
//         document.body.style.overflow = 'hidden'; // Отключили скролл по сайту при открытом окне

//     });

//     modalCloseBtn.addEventListener('click', () => { // Повесили клик на конпку, закрывается окно
//         modal.classList.toggle('show');
//         document.body.style.overflow = ''; // При закрытии окна скролл на сайте опять включили

//     });


    // При нажатии на пустое место (вне окна) закрывается окно
    // Чтобы не повторять код внутри условия 
            // modal.classList.add('hide');
            // modal.classList.remove('show');
            // document.body.style.overflow = '';, выше создал отдельную функцию

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(); // Заменили код на функцию, которую обязательно вызываем
        }
    });

    document.addEventListener('keydown', (e) => { // При нажатии на кнопку Esc окно будет закрываться
        if (e.code === "Escape" && modal.classList.contains('show')) { // после && добавили условие чтобы
            closeModal(); // без окна Esc не срабатывал
        }
    });

});