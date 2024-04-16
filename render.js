export const renderComments = (comments) => {
    const listElement = document.querySelector('.comments');
    const commentsHtml = comments.map((comment, index) => {
       let activeLikeClass = comment.isLiked ? "active-like" : "";
       let massageHideClass = comment.isEdit ? "" : "hide";
       let doneHideClass = comment.isEdit ? "hide" : "";
   
       return `
         <li class="comment" data-index="${index}">
           <div class="comment-header">
             <div>${comment.name}</div>
             <div>${comment.date}</div>
           </div>
           <div class="comment-body">
             <p class="done ${doneHideClass}" data-index="${index}"></p>
             <div class="comment-text ${massageHideClass}" data-index="${index}">
               ${comment.massage}
               <p class="edit" data-index="${index}"></p>
             </div>
           </div>
           <div class="comment-footer">
             <div class="likes">
               <span class="likes-counter">${comment.likesCounter}</span>
               <button class="like-button ${activeLikeClass}" data-index="${index}" data-like="${comment.isLiked}"></button>
             </div>
           </div>
         </li>`;
    }).join("");
   
    listElement.innerHTML = commentsHtml;
   
    // После рендеринга комментариев, добавляем обработчики событий к кнопкам
    likeButtonListners();
    editButtonListners();
    doneButtonListners();
    quoteElementsListners();
   };
   
   // Функции для добавления обработчиков событий к кнопкам внутри комментариев
   const likeButtonListners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
       likeButtonElement.addEventListener('click', event => {
         event.stopPropagation();
         const index = likeButtonElement.dataset.index;
         // Логика обработки нажатия на кнопку "лайк"
       });
    }
   };
   
   const editButtonListners = () => {
    const editButtonElements = document.querySelectorAll(".edit");
    for (const editButtonElement of editButtonElements) {
       editButtonElement.addEventListener("click", (event) => {
         event.stopPropagation();
         // Логика обработки нажатия на кнопку "редактировать"
       });
    }
   };
   
   const doneButtonListners = () => {
    const doneButtonElements = document.querySelectorAll(".done");
    for (const doneButtonElement of doneButtonElements) {
       doneButtonElement.addEventListener("click", (event) => {
         event.stopPropagation();
         // Логика обработки нажатия на кнопку "готово"
       });
    }
   };
   
   const quoteElementsListners = () => {
    const quoteElements = document.querySelectorAll(".comment-text");
    for (const quoteElement of quoteElements) {
       quoteElement.addEventListener("click", () => {
         // Логика обработки нажатия на текст комментария
       });
    }
   };