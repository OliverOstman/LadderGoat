'use strict';
const registerButton = document.querySelector('#register');
const uploadButton = document.querySelector('#upload');
const mainPageButton = document.querySelector('#home');
const pageRulesButton = document.querySelector('#pageRules');
const aboutButton = document.querySelector('#about');
const userButton = document.querySelector('#account');

const user = document.querySelector('#user');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#logger');

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "Register.html";
});

uploadButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "Upload.html";
});

mainPageButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "index.html";
});

pageRulesButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "sivunRules.html";
});

aboutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "About.html";
});

userButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "User.html";
});

registerButton.classList.remove('hidden');
// userButton.classList.remove('hidden');
loginForm.classList.remove('hidden');

const getUsername = (evt) => {
  const settings = {
    method: 'get',
  };
  fetch('/username', settings).then((response) => {
    return response.json();
  }).then((json) => {
    user.innerHTML = json.pUsername;
    loginForm.classList.add('hidden');
    registerButton.classList.add('hidden');
    user.classList.remove('hidden');
    logout.classList.remove('hidden');
    uploadButton.classList.remove('hidden');
  });
};



const Login = (evt) => {
  evt.preventDefault();
  const data = {
    username: loginForm.querySelector('#username').value,
    password: loginForm.querySelector('#password').value
  };

  const settings = {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  };


  fetch('/login', settings).then((response) => {
    return response;
  }).then (() => {
    location.reload();
  });
};

const Logout = (evt) => {
  evt.preventDefault();
  const settings = {
    method: 'get',
  };

  fetch('/logout', settings).then((response) => {
    return response;
  }).then(() => {
    location.reload();
  });
};

loginForm.addEventListener('submit', Login);
logout.addEventListener('click', Logout);

getUsername();