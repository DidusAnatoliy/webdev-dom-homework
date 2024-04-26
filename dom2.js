import { getTodos } from './api.js';
import { initFormListeners } from './listeners.js';
import { renderComments } from './render.js';


export const listElement = document.querySelector('.comments');





//Функция получения и преобразования данных с сервера

export function getComments() {
  const loadingElement = document.getElementById('loading');
  loadingElement.style.display = 'block';
  getTodos().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        massage: comment.text,
        likesCounter: comment.likes,
        isLiked: false,
      };
    });
    comments = appComments;
    initFormListeners()
    renderComments(listElement);
    loadingElement.style.display = 'none';
  })
    .catch(error => {
      loadingElement.textContent = 'Не удалось загрузить страницу';
      if (error.message !== 'Ответ сервера не был успешным') {
        console.error('Возникла проблема с операцией fetch:', error);
        alert("Кажется, у вас сломался интернет, попробуйте позже."); 
      }
    })

};
getComments();


//массив пользователей
export let comments = [];