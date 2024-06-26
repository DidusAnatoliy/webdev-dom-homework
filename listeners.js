import { getPromise, postPromise, token } from "./api.js";
import { sanitize , normalizeComments} from "./helpers.js";
import {renderComments} from "./render.js"
import {comments, setComments} from "./index.js"

//функция добавления лайка
export const initEventListeners = ({comments}) => {
  
    const likesElements = document.querySelectorAll(".like-button");
    for (const likesElement of likesElements) {    
      likesElement.addEventListener('click', (event) => {
        event.stopPropagation();

        if (!token) {
          return
        }

        const index = likesElement.dataset.index;
        const comment = comments[index]
    
        console.log(comment.likes);
        if (comment.isLiked) {
          comment.isLiked = false;
          comment.likes--;
          
        } else {
          comment.isLiked = true;
          comment.likes++;
        }

        let commentTextElement = document.querySelector(".add-form-text")

        renderComments(comments)

        // if (!commentTextElement)
        //   return
        //
        // const commentText = commentTextElement.value
        //
        // if (!commentText)
        //   return
        //
        // commentTextElement = document.querySelector(".add-form-text")
        //
        // if (commentTextElement)
        //   commentTextElement.value = commentText

        if (commentTextElement) {
          const commentText = commentTextElement.value

          if (commentText) {
            const commentTextElement = document.querySelector(".add-form-text")

            if (commentTextElement)
              commentTextElement.value = commentText
          }
        }
      });
    }
};

export const initEventAndCommentListener = () => {
    const nameElement = document.querySelector(".add-form-name");
    const textElement = document.querySelector(".add-form-text");
    const buttonElement = document.querySelector(".add-form-button");

    if (!token) {
      return
    }

    buttonElement.addEventListener("click", () => {
        nameElement.classList.remove("error");
        textElement.classList.remove("error");
        if (nameElement.value === "" || textElement.value === "") {
          nameElement.classList.add("error");
          textElement.classList.add("error");
          return;
        }
        postPromise({

            text: sanitize(textElement.value),
        
            name: sanitize(nameElement.value)
        
        }).then(() => {
        
        getPromise()
        .then((responseData) => {
            // console.log(responseData);
            const appComments = normalizeComments(responseData.comments);
              
            // получили данные и рендерим их в приложении
            setComments(appComments);
            //console.log(comments)
            renderComments(comments, initEventListeners, answerComment);
            
          })
        
        })
        .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        nameElement.value = "";
        textElement.value = "";
        })
        .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        
        if (error.message === "Сервер упал") {
          alert("Сервер упал, попробуй еще раз")
        }
        if (error.message === "Недопустимое количество символов") {
          alert("Имя и комментарий должны быть не короче 3-х символов")
        }
        if (error.message === 'Failed to fetch') {
          alert('Интернет не работает, попробуйте позже');
        }
        console.warn(error);
        })
      
        buttonElement.disabled = true;
        buttonElement.textContent = 'Еще чуть-чуть и все появится...';
      
      });
}
//функция ответа на комментарии
   export function answerComment() {
    if (!token) {
      return
    }
    const comment = document.querySelectorAll('.comment');
    const formElementText = document.querySelector('.add-form-text');
    comment.forEach((el, index) => {
    el.addEventListener('click', () => {
    formElementText.value = `>${comments[index].name} \n ${comments[index].comment}`
    })
    });
    }
