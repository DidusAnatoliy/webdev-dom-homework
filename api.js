export const getComments = () => {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
    return fetch('https://wedev-api.sky.pro/api/v1/DidusAnatoliy/comments', {
       method: "GET"
    })
       .then((response) => {
         if (!response.ok) {
           throw new Error('Ответ сервера не был успешным');
         }
         return response.json();
       })
       .then((responseData) => {
         const appComments = responseData.comments.map((comment) => {
           return {
             name: comment.author.name,
             date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
             massage: comment.text,
             likesCounter: comment.likes,
             isLiked: false,
           };
         });
         return appComments;
       })
       .catch(error => {
         console.error('Возникла проблема с операцией fetch:', error);
         alert("Кажется, у вас сломался интернет, попробуйте позже.");
       })
       .finally(() => {
         loadingElement.style.display = 'none';
       });
   };
   
   // Функция для добавления нового комментария на сервер
   export const addComment = (name, text) => {
    const loadingMessageElement = document.getElementById('loading-message');
    loadingMessageElement.style.display = 'block';
   
    return fetch('https://wedev-api.sky.pro/api/v1/DidusAnatoliy/comments', {
       method: "POST",
       body: JSON.stringify({
         name: name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
         text: text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("%BEGIN_QUOTE", "<div class='quote'>").replaceAll("END_QUOTE%", "</div>"),
         forceError: true
       })
    })
       .then(response => {
         if (!response.ok) {
           throw new Error('Ответ сервера не был успешным');
         }
         return response.json();
       })
       .catch(error => {
         console.error('Возникла проблема с операцией fetch:', error);
         alert("Кажется, у вас сломался интернет, попробуйте позже.");
       })
       .finally(() => {
         loadingMessageElement.style.display = 'none';
       });
   };