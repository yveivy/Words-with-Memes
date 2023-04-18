var query = localStorage.getItem('searchQuery');

function fetchDefinition(query) {
  const DictionaryApiKey = '42f40c1e-656e-47a8-9597-6b3c3c5fdbe0';

  if (query) {
  fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${DictionaryApiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log('Dictionary API data:', data); // Do something with the data
    })
    .catch(error => {
      console.error(error);
    });
  
}
}

// This API call uses the variable 'query' defined from local storage
function fetchGifs(query) {
  const giphyApiKey = 'DQQk3Czth43tzR6goSHYIQXrKreMrWf2';
  if (query) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayGifs(data.data);
        console.log(data);
      });
  }
}

function displayGifs(gifs) {
  const gifContainer = document.querySelector('.gif-container');
  gifContainer.innerHTML = '';

  // filter gifs with content rating of R
  const filteredGifs = gifs.filter(function (gif) {
    return gif.rating !== 'r';
  });

  const topGifs = filteredGifs.slice(0, 10);
  console.log(topGifs);
  const randomIndex = Math.floor(Math.random() * topGifs.length);
  const randomGif = topGifs[randomIndex];

  const img = document.createElement('img');
  img.src = randomGif.images.fixed_width.url;
  img.classList.add('gif-item');
  gifContainer.appendChild(img);
}

fetchGifs(query);
fetchDefinition(query);

