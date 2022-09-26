document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const getDatan = (url, callback) => {
        const request = new XMLHttpRequest(); //нулевая стадия
        request.open('GET', url); //первое соединение 
        request.send();

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                console.error(new Error('Ошибка: ' + request.status));
            }

        });
    };



    const tabs = () => {

        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitleElem = document.querySelector('.card-details__title');
        const cardImageItemElem = document.querySelector('.card__image_item');
        const cardDetailsPriceElem = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory');


        const data = [ //Массив с данными для карточки товаров
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95990,
                memoryROM: 128,
                userName: 'Смартфон Apple iPhone 12 Pro 128GB Graphite'
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: 'img/iPhone-silver.png',
                price: 197990,
                memoryROM: 256,
                userName: 'Смартфон Apple iPhone 12 Pro 256GB Silver'
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 92990,
                memoryROM: 128,
                userName: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue'
            },
        ];

        const deactive = () => {
            cardDetailChangeElems.forEach(btn => btn.classList.remove('active')) //удаляем класс актив
        }

        cardDetailChangeElems.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    deactive(); //запускаем функцию удаления
                    btn.classList.add('active');
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailsPriceElem.textContent = data[i].price + '₽';
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;

                }
            });
        })

    };

    const accordion = () => {
        const characteristicsListElem = document.querySelector('.characteristics__list');
        const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

        const open = (button, dropDown) => {
            closeAllDrops();
            dropDown.style.height = dropDown.scrollHeight + 'px';
            button.classList.add('active')
            dropDown.classList.add('active')
        };

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = () => {
            characteristicsItemElems.forEach((elem) => {
                close(elem.children[0], elem.children[1]);
            })
        }

        characteristicsListElem.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? //Если в description класс будет active, то выполнит close, иначе open
                    close(target, description) :
                    open(target, description);
            }
        });

        document.body.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.closest('.characteristics__list')) {
                closeAllDrops();
            }
        })
    };

    const modal = () => {
        const carDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const modalTitle = modal.querySelector('.modal__title');
        const modalSubTitle = modal.querySelector('.modal__subtitle');
        const modalTitleSubmit = modal.querySelector('.modal__title-submit');



        const openModal = (event) => {  //Функция открытия всплывающей(Modal) части
            const target = event.target;
            modal.classList.add('open');
            document.addEventListener('keydown', escapeHandler);
            modalTitle.textContent = cardDetailsTitle.textContent; //После нажатия оплаты, название в modal было такое же как у товара
            modalTitleSubmit.value = cardDetailsTitle.textContent; //value значения для отправки на сервер, для заказов
            modalSubTitle.textContent = target.dataset.buttonBuy; //Обращение через атрибуты, Доставка и оплата, и оплата
        };

        const closeModal = () => { //Функция закрытия всплывающей(Modal) части
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
        };

        const escapeHandler = event => { //Функция закрытия всплывающего окна кнопкой Escape
            if (event.code === "Escape") { // Если нажимается Escape, то вызывается функция закрытияю
                closeModal()
            };
        };

        modal.addEventListener('click', (event) => { //Функция закрытия всплывающей(Modal) по клику
            const target = event.target; // где был клик?
            if (target.classList.contains('modal__close') || target === modal) { //Если клик происходит на кнопку закрытия или мимо окна 
                closeModal()
            }
        });


        carDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);
    }

    const rendercrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');
        const crossSellAdd = document.querySelector('.cross-sell__add');
        const allGoods = [];

        const shuffle = arr => arr.sort(() => Math.random() - 0.5); //рандомная функция
        
        const createCrossSellItem = ({ photo: picture, name, price }) => {

            const liItem = document.createElement('li');
            liItem.innerHTML = `
                <article class="cross-sell__item">
					<img class="cross-sell__image" src="${picture}" alt="${name}">
					<h3 class="cross-sell__title">${name}</h3>
					<p class="cross-sell__price">${price}₽</p>
					<button type="button" class="button button_buy cross-sell__button">Купить</button>
			    </article>
            `;
            return liItem; //Возврат li
        }

        const render = arr => {
            arr.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            })
            
        }

        const wrapper = (fn, count) => {
            let counter = 0
            return(...args) => {
                if (counter === count) return;
                counter++;
                return fn(...args)
            }
        };

        const wrapRender = wrapper(render, 5); //Ограничения нажатий на кнопку "Показать еще", выводит 

        const createCrossSellList = (goods = []) => {
            allGoods.push(...shuffle(goods));
            const fourItem = allGoods.splice(0, 4); //делаем вывод 4 товаров
            wrapRender(fourItem)
        };

        const closeCrossSellAdd = (() => {
            crossSellAdd.style.display = 'none'; //Функция закрытия "Показать еще"
        }); 

        crossSellAdd.addEventListener('click', () => {
            wrapRender(allGoods);
            closeCrossSellAdd(); //Запускаем функцию, либо crossSellAdd.remove();
        })

        getDatan('cross-sell-dbase/dbase.json', createCrossSellList) //Подключаем JSON файл
    }


    tabs();
    accordion();
    modal();
    rendercrossSell();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger'); //Скрытое меню
});

/*
const a = 5;
const b = 6;
const c = a < b ? b : a; //a < b = True, поэтому выводится b, иначе выведется a. 
console.log(c); 
*/