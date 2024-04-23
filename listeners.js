import { postComment } from "./api.js";
import { comments, getComments, listElement} from "./dom2.js";
import { renderComments } from "./render.js";

const massageSendButton = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');

export const likeButtonListners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', event => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;

            if (comments[index].isLiked === false) {
                comments[index].likesCounter = comments[index].likesCounter + 1;
                comments[index].isLiked = true;

            } else {
                comments[index].isLiked = false;
                comments[index].likesCounter = comments[index].likesCounter - 1;

            }
            renderComments(listElement);

        })
    }
}

//Функции ответа на комментарий

export const editButtonListners = () => {
    const editButtonElements = document.querySelectorAll(".edit");
    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            comments[editButtonElement.dataset.index].isEdit = false;
            renderComments(listElement);
        })
    }
}

export const doneButtonListners = () => {
    const doneButtonElements = document.querySelectorAll(".done");
    for (const doneButtonElement of doneButtonElements) {
        doneButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const dune = doneButtonElement.dataset.index;
            const addFormTextEdit = document.querySelectorAll(".addformedit");
            comments[done].massage = addFormTextEdit[done].value;
            comments[done].isEdit = true;
            renderComments(listElement);
        })

    }
}


export const quoteElementsListners = () => {
    const quoteElements = document.querySelectorAll(".comment-text");
    for (const quoteElement of quoteElements) {
        quoteElement.addEventListener("click", () => {
            const quote = quoteElement.dataset.index;
            commitInputElement.value = ">" + comments[quote].massage + "\n" + comments[quote].name + "\n";
            renderComments(listElement);
        })
    }
}

export function initFormListeners() {
    massageSendButton.disabled = true;
    massageSendButton.addEventListener("click", addComment);
    checkForSpace()
    setDisableButton()
};


function checkForSpace (){
    nameInputElement.oninput = () => {
        if (nameInputElement.value.charAt(0) === ' ') {
          nameInputElement.value = '';
        }
      }
      
      commitInputElement.oninput = () => {
        if (commitInputElement.value.charAt(0) === ' ') {
          commitInputElement.value = '';
        }
      }
}

function setDisableButton (){
    nameInputElement.addEventListener("input", () => {
        massageSendButton.disabled = false;
    })
    
    commitInputElement.addEventListener("input", () => {
        massageSendButton.disabled = false;
    })
}

function addComment() {
    nameInputElement.classList.remove("errorinput");
    commitInputElement.classList.remove("errorinput");
    if (nameInputElement.value === "" && commitInputElement.value === "") {
      nameInputElement.classList.add("errorinput");
      commitInputElement.classList.add("errorinput");
      return
    } else if (nameInputElement.value === "") {
      nameInputElement.classList.add("errorinput");
      return
    } else if (commitInputElement.value === "") {
      commitInputElement.classList.add("errorinput");
      return
    }
  
    const loadingMessageElement = document.getElementById('loading-message');
    loadingMessageElement.style.display = 'block';
  
    // Скрываем форму добавления комментария
    const commentFormElement = document.querySelector('.add-form');
    commentFormElement.style.display = 'none';
  
    //Функция добавлений данных на сервер
  
    postComment(nameInputElement.value,
      commitInputElement.value).then(() => {
        return getComments();
      })
      .then(() => {
        nameInputElement.value = "";
        commitInputElement.value = "";
        massageSendButton.disabled = true;
      })
      .catch(error => {
        if (error.message !== 'Ответ сервера не был успешным') {
          console.error('Возникла проблема с операцией fetch:', error);
          alert("Кажется, у вас сломался интернет, попробуйте позже.");
        }
      })
      .finally(() => {
        loadingMessageElement.style.display = 'none';
        commentFormElement.style.display = 'flex';
      })
  }