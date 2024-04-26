import { comments } from "./dom2.js";
import { doneButtonListners, editButtonListners, likeButtonListners, quoteElementsListners } from "./listeners.js";

export const renderComments = (listElement) => {
  const commentsHtml = comments.map((comment, index) => {
    let activeLikeClass;
    if (comments[index].isLiked === true) {
      activeLikeClass = "active-like"
    } else {
      activeLikeClass = ""
    }

    let massageHideClass;
    let doneHideClass;


    return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
              <p class ="done ${doneHideClass}" data-index="${index}"></p>
            <div class="comment-text ${massageHideClass}" data-index="${index}">
              ${comment.massage}
              <p class ="edit" data-index="${index}"></p>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likesCounter}</span>
              <button class="like-button ${activeLikeClass}" data-index="${index}" data-like="${comment.isLiked}"></button>
              </div>
          </div>
        </li>`
  }).join("")
  listElement.innerHTML = commentsHtml;

  likeButtonListners();
  editButtonListners();
  doneButtonListners();
  quoteElementsListners();

}