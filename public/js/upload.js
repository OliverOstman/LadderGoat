'use strict';
const rButton = document.querySelector('#cancel');
const frm = document.querySelector('#uploadform');
const done = document.querySelector('#done');

rButton.addEventListener("click", (event) => {
  event.preventDefault();
  location.replace(document.referrer);
});

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/upload', settings).then((response) => {
    return response;
  });
};

frm.addEventListener('submit', sendForm);