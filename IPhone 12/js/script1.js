
    /*
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change')
    const cardDetailsTitle = document.querySelectorAll('.card-details__title')
    const cardImage = document.querySelectorAll('.card__image')
    */
    /* const tabs = () => {
    
            const hideAll = () => {
                for (let i = 0; i < cardDetailChangeElems.length; i++) {  //Убираем класс active
                    cardDetailChangeElems[i].classList.remove('active');
                    cardDetailsTitle[i].classList.remove('active');
                    cardImage[i].classList.remove('active');
                }
            }
    
            for (let i = 0; i < cardDetailChangeElems.length; i++) {
    
                cardDetailChangeElems[i].addEventListener('click', () => {
                    hideAll()
                    cardDetailChangeElems[i].classList.add('active');
                    cardDetailsTitle[i].classList.add('active');
                    cardImage[i].classList.add('active');
                })
            }
    
        };
    
        tabs()*/

    //------Моя версия-----------Тоже самое, что и выше, но вместо for делаем forEach-----------------//

    /*

    cardDetailChangeElems.forEach((elem, i) => {
        elem.addEventListener('click', () => {

            const deactive = () => { //Удаляем актив
                cardDetailChangeElems.forEach((elem, i) => {

                    elem.classList.remove('active');
                    cardDetailsTitle[i].classList.remove('active');
                    cardImage[i].classList.remove('active');

                })
            }

            deactive();
            elem.classList.add('active');
            cardDetailsTitle[i].classList.add('active');
            cardImage[i].classList.add('active');
        })

    })

    */

    //Второй вариант выполнения, делаем массив для карточек, для каждой модели своя цена и объем памяти-----
