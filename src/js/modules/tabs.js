//*Вешаем обработчик на хедер со списком табов, и через делигирование отслеживаем по какому
//*элементу был клик, определяем его индекс, и в зависимости от индекса отображаем нужную информацию
//*активному названию таба добавляем класс активности 

const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
    
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

    function showTabContent(i = 0) { //отображаем только активный таб
        content[i].style.display = 'block';

        tab[i].classList.add(activeClass);//добавляем класс активному табу
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => { //делигируем события клика от контейнера родителя к списку табов
        const target = e.target;

        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, '')) ||//проверка кликнул ли user именно на таб,
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
                tab.forEach((item, i) =>{
                    if(target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
        }
    });
};

export default tabs;