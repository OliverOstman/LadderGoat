const searchfrm = document.querySelector('#SearchImg');
let searchSom = document.querySelector('#Search');
const updateVideo = document.querySelector('#videolist');
const updateIma = document.querySelector('#imagelist');


/*
const Images = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);

    updateIma.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h3');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      li.appendChild(img);
      const a = document.createElement('a');
      a.innerText = 'delete';
      a.setAttribute('href', '/images/' + image.mID);
      a.addEventListener('click', (evt) => {
        evt.preventDefault();
        const url = evt.target.href;
        const settings = {
          method: 'get',
        };
        fetch(url, settings).then((response)=>{
          return response.json();
        }).then((json)=>{
          console.log(json);
          Images();
        });
      });
      li.appendChild(a);
      updateIma.appendChild(li);
    });
  });
};
*/

/*
const Images = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // clear list before adding upated data
    updateIma.innerHTML = '';
    json.forEach((image) => {
      if (image.mimetype.includes('image') && image.title.includes()) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        const img = document.createElement('img');
        img.src = image.url;
        li.appendChild(img);
        const a = document.createElement('a');
        a.innerText = 'delete';
        a.setAttribute('href', '/images/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };});
        li.appendChild(text);
        li.appendChild(a);
        updateIma.appendChild(li);
      }
    });
  });
}; */

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
    updateIma.innerHTML = '';
    updateVideo.innerHTML = '';
    json.forEach((image) => {
      if (image.mimetype.includes('image')) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        const img = document.createElement('img');
        img.src = image.url;
        li.appendChild(img);
        const a = document.createElement('a');
        a.innerText = 'delete';
        a.setAttribute('href', '/images/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };});
        li.appendChild(text);
        li.appendChild(a);
        updateIma.appendChild(li);
      } else if (image.mimetype.includes('video')) {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        text.innerText = image.details;
        title.innerHTML = image.title;
        li.appendChild(title);
        const video = document.createElement('video');
        video.controls = true;
        video.src = image.url;
        li.appendChild(video);
        const a = document.createElement('a');
        a.innerText = 'delete';
        a.setAttribute('href', '/images/' + image.mID);
        a.addEventListener('click', (evt) => {
          evt.preventDefault();
          const url = evt.target.href;
          const settings = {
            method: 'delete',
          };});
        li.appendChild(text);
        li.appendChild(a);
        videoList.appendChild(li);
      }
    });
  });
};

searchfrm.addEventListener('submit', searchMedia);