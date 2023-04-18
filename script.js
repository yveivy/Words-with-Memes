// $(document).ready(function() {

const searchInput = document.getElementById('input');
const searchBtn = document.getElementById('search');

function saveToLocalStorage(event){
  event.preventDefault();


var inputValue = searchInput.value.trim();

if (inputValue) {
  localStorage.setItem('searchQuery', inputValue);
  window.location.href = 'results.html';
}

searchForm.addEventListener('submit', saveToLocalStorage);
searchBtn.addEventListener('click', saveToLocalStorage);

}





const giphyApiKey = 'DQQk3Czth43tzR6goSHYIQXrKreMrWf2';

  // the query constant is a placeholder for search input from local storage.
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
  }  document.getElementById('clicky').addEventListener('click', fetchGifs); // This button wont exist in the end
  

  function displayGifs(gifs) {
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '';

    const topGifs = gifs.slice(0,10);
    console.log(topGifs);
    const randomIndex = Math.floor(Math.random() * topGifs.length);
    const randomGif = topGifs[randomIndex];

    const img = document.createElement('img');
    img.src = randomGif.images.fixed_width.url;
    img.classList.add('gif-item');
    gifContainer.appendChild(img);
  }
  
// })