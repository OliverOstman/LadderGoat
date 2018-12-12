'use strict';
const registerButton = document.querySelector('#register');
const uploadButton = document.querySelector('#upload');
const mainPageButton = document.querySelector('#home');
const pageRulesButton = document.querySelector('#pageRules');
const aboutButton = document.querySelector('#about');
const userButton = document.querySelector('#account');

const videoList = document.querySelector('#videolist');
const imageList = document.querySelector('#imagelist');

const loginForm = document.querySelector('#logger');
const searchForm = document.querySelector('#SearchImg');
const searchSom = document.querySelector('#Search');

const user = document.querySelector('#user');
const logout = document.querySelector('#logout');

let usern = "";
let userid = "";

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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

registerButton.classList.remove('hidden');
// userButton.classList.remove('hidden');
loginForm.classList.remove('hidden');
searchForm.classList.remove('hidden');

const getUsername = (evt) => {
  const settings = {
    method: 'get',
  };
  fetch('/username', settings).then((response) => {
    return response.json();
  }).then((json) => {
    user.innerHTML = json.pUsername + "<br>" + "ID: " + json.uID;
    loginForm.classList.add('hidden');
    registerButton.classList.add('hidden');
    user.classList.remove('hidden');
    logout.classList.remove('hidden');
    uploadButton.classList.remove('hidden');
  });
};

const getUser = (evt) => {
  const settings = {
    method: 'get',
  };
  fetch('/username', settings).then((response) => {
    return response.json();
  }).then((json) => {
    userid = json.uID;
  });
};

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    // clear list before adding upated data
    imageList.innerHTML = '';
    json.forEach((image) => {
      if (image.mimetype.includes('image/jpeg') || image.mimetype.includes('image/png')) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        const creator = document.createElement('p');
        creator.innerText = "Uploader ID: " + image.userID;
        creator.style.fontSize = "x-small";
        creator.style.width = "89%";
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        const img = document.createElement('img');
        img.src = image.url;
        li.appendChild(img);
        li.appendChild(creator);
        const a = document.createElement('a');
        li.appendChild(a);
        if (image.userID === userid) {

        } else {
          a.classList.add('hidden');
        }
        a.innerText = 'delete';
        a.setAttribute('href', '/images/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };
          fetch(url, settings).then((response)=>{
            return response.json();
          });
          getImages();
        });
        li.appendChild(text);
        imageList.appendChild(li);
      }
    });
  });
};

const getVideos = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    // clear list before adding upated data
    videoList.innerHTML = '';
    json.forEach((image) => {
      if (image.mimetype.includes('video') || image.mimetype.includes('image/gif')) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        const creator = document.createElement('p');
        creator.innerText = "Uploader ID: " + image.userID;
        creator.style.fontSize = "x-small";
        creator.style.width = "89%";
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        let video;
        if (image.mimetype.includes('video')) {
          video = document.createElement('video');
          video.controls = true;
        } else {
          video = document.createElement('img');
        }
        video.src = image.url;
        li.appendChild(video);
        li.appendChild(creator);
        const a = document.createElement('a');
        li.appendChild(a);
        if (image.userID === userid) {

        } else {
          a.classList.add('hidden');
        }
        a.innerText = 'delete';
        a.setAttribute('href', '/images/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };
          fetch(url, settings).then((response)=>{
            return response.json();
          });
          getVideos();
        });
        li.appendChild(text);
        videoList.appendChild(li);
      }
    });
  });
};

const searchMedia = (evt) => {
  evt.preventDefault();
  const settings = {
    method: 'get',
  };
  fetch('/search/' + searchSom.value, settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // clear list before adding upated data
    const reload = document.createElement('a');
    reload.innerText = 'Reload Page';
    reload.setAttribute('href', '');
    reload.addEventListener('click', (evt) => {
      evt.preventDefault();
      location.reload();
    });
    searchForm.appendChild(reload);
    videoList.innerHTML = '';
    imageList.innerHTML = '';
    json.forEach((image) => {
      if (image.mimetype.includes('image/jpeg') || image.mimetype.includes('image/png')) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        const creator = document.createElement('p');
        creator.innerText = "Uploader ID: " + image.userID;
        creator.style.fontSize = "x-small";
        creator.style.width = "89%";
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        const img = document.createElement('img');
        img.src = image.url;
        li.appendChild(img);
        li.appendChild(creator);
        const a = document.createElement('a');
        li.appendChild(a);
        if (image.userID === userid) {

        } else {
          a.classList.add('hidden');
        }
        a.innerText = 'delete';
        a.setAttribute('href', '/uploads/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };
          fetch(url, settings).then((response)=>{
            return response.json();
          });
        });
        li.appendChild(text);
        imageList.appendChild(li);
      } else if (image.mimetype.includes('video') || image.mimetype.includes('image/gif')) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        const creator = document.createElement('p');
        creator.innerText = "Uploader ID: " + image.userID;
        creator.style.fontSize = "x-small";
        creator.style.width = "89%";
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        let video;
        if (image.mimetype.includes('video')) {
          video = document.createElement('video');
          video.controls = true;
        } else {
          video = document.createElement('img');
        }
        video.src = image.url;
        li.appendChild(video);
        li.appendChild(creator);
        const a = document.createElement('a');
        li.appendChild(a);
        if (image.userID === userid) {

        } else {
          a.classList.add('hidden');
        }
        a.innerText = 'delete';
        a.setAttribute('href', '/images/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };
          fetch(url, settings).then((response)=>{
            return response.json();
          });
        });
        li.appendChild(text);
        videoList.appendChild(li);
      }
    });
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
searchForm.addEventListener('submit', searchMedia);

getUser();
getUsername();
getImages();
getVideos();

/*
const comment = document.createElement('textarea');
        comment.innerHTML = "Comment";
        comment.rows = 4;
        comment.cols = 50;
        li.appendChild(comment);
 */