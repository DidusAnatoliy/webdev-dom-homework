const buttonElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

buttonElement.addEventListener("click", () => {
   login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
   }).then((responseData) => {
      setToken(responseData.user.token);
   });
});