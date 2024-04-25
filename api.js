export function getTodos() {
  return fetch(
    'https://wedev-api.sky.pro/api/v1/DidusAnatoliy/comments',
    {
      method: "GET"
    }
  )
    .then((response) => {
      if (!response.ok) {
        if (response.status === 500) {
          alert("Сервер сломался, попробуй позже.");
        }
        throw new Error('Ответ сервера не был успешным');
      }
      return response.json();
    });
}

export function postComment(name,text) {
  return fetch(
    'https://wedev-api.sky.pro/api/v1/DidusAnatoliy/comments',
    {
      method: "POST",
      body: JSON.stringify({
        name, 
        text,
        forceError: true
      })
    }
  ).then(response => {
    if (!response.ok) {
      if (response.status === 400) {
        alert("Имя и комментарий должны быть не короче 3 символов.");
      } else if (response.status === 500) {
        alert("Сервер сломался, попробуй позже.");
      }
      throw new Error('Ответ сервера не был успешным');
    }
    return response.json();
  });
}