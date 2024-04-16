import { getComments, addComment } from './api.js';
import { renderComments } from './render.js';

// Выбор элементов DOM
const massageSendButton = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const lastCommentDeleteButton = document.querySelector('.delete-last-comment');

// Инициализация переменной для хранения комментариев
let comments = [];

// Функция для обработки отправки комментария
const handleAddComment = () => {
 if (nameInputElement.value === "" || commitInputElement.value === "") {
    alert("Пожалуйста, введите имя и комментарий.");
    return;
 }

 addComment(nameInputElement.value, commitInputElement.value)
    .then(() => {
      // После успешной отправки комментария, обновляем список комментариев
      return getComments();
    })
    .then((newComments) => {
      comments = newComments;
      renderComments(comments);
      nameInputElement.value = "";
      commitInputElement.value = "";
    })
    .catch((error) => {
      console.error("Ошибка при добавлении комментария:", error);
      alert("Произошла ошибка при добавлении комментария. Пожалуйста, попробуйте позже.");
    });
};

// Обработчики событий
massageSendButton.addEventListener("click", handleAddComment);
nameInputElement.addEventListener("input", () => {
 massageSendButton.disabled = false;
});
commitInputElement.addEventListener("input", () => {
 massageSendButton.disabled = false;
});
lastCommentDeleteButton.addEventListener("click", () => {
 if (comments.length > 0) {
    comments.pop();
    renderComments(comments);
 }
});

// Инициализация приложения
getComments().then((initialComments) => {
 comments = initialComments;
 renderComments(comments);
});



