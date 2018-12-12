'use strict';
const rButton = document.querySelector('#cancel');
const frm = document.querySelector('#registerform');

rButton.addEventListener("click", (event) => {
  event.preventDefault();
  location.replace(document.referrer);
});

const register = (evt) => {
  evt.preventDefault();
    const data = {
      username: frm.querySelector('#username').value,
      password: frm.querySelector('#password').value
    };

    const settings = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    };

    fetch('/register', settings).then((response) => {
      return response;
    });
};

frm.addEventListener('submit', register);