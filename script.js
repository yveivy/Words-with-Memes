$(document).ready(function() {

  const giphyApiKey = 'DQQk3Czth43tzR6goSHYIQXrKreMrWf2';

  function fetchGifs() {
    const query = 'dogs'; //!
    if (query) {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        displayGifs(data.data);
        console.log(data);
      });
    }
  }  document.getElementById('clicky').addEventListener('click', fetchGifs);
  

  function displayGifs(gifs) {
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '';

    const topGifs = gifs.slice(0,10);
    const randomIndex = Math.floor(Math.random() * topGifs.length);
    const randomGif = topGifs[randomIndex];

    const img = document.createElement('img');
    img.src = randomGif.images.fixed_width.url;
    img.classList.add('gif-item');
    gifContainer.appendChild(img);
  }
  
})