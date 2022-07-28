import checkNumInputs from './checkNumInputs.js'

const forms = (state) => {
    const form = document.querySelectorAll('form'), // получаем все формы на странице
        inputs = document.querySelectorAll('input'); //получаем все инпуты на странице


        checkNumInputs('input[name="user_phone"]');

        const message = {
            loading:  'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся', 
            failure: 'Что-то пошло не так...'
        };

        const postData = async (url, data) => {//функция отправки данных на сурвер
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: 'POST',
                body: data
            })

            return await res.text();
        }
        const clearInputs = () => {// очистка всез инпутов
            inputs.forEach((item) => {
                item.value = ''
            })
        }

        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();//отменяем перезагрузку при отправке формы

                let statusMessage = document.createElement('div');//создаем новый блок с сообщением статуса
                statusMessage.classList.add('status');//добавляем новому блоку класс
                item.appendChild(statusMessage) //помещаем элемент на страницу

                const formData = new FormData(item); //собираем данные с формы для дальнейшей отправки
                if(item.getAttribute('data-calc') === 'end'){
                    for(let key in state){
                        formData.append(key, state[key]);
                    }
                }
                
                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() =>{
                            statusMessage.remove();
                        }, 5000)
                    })
            })
        })
    };

export default forms;