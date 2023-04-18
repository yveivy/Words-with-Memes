document.addEventListener('DOMContentLoaded', function () {
var searchQuery = localStorage.getItem('searchQuery');
// const form = document.querySelector('#gif-container');
// const input = document.querySelector('#input');


// form.addEventListener('submit', (event) => {
//     event.preventDefault();

    const DictionaryApiKey = '42f40c1e-656e-47a8-9597-6b3c3c5fdbe0';
    const query = "voluminous"
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${DictionaryApiKey}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Do something with the data
      })
      .catch(error => {
        console.error(error);
      });

// });

// $(document).ready(function() {

//   const giphyApiKey = 'DQQk3Czth43tzR6goSHYIQXrKreMrWf2';

//   function fetchGifs() {
//     const query = 'dogs'; //!
//     if (query) {
//       fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}`)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(data) {
//         displayGifs(data.data);
//         console.log(data);
//       });
//     }
//   }  document.getElementById('clicky').addEventListener('click', fetchGifs);


//   function displayGifs(gifs) {
//     const gifContainer = document.getElementById('gif-container');
//     gifContainer.innerHTML = '';

//     const topGifs = gifs.slice(0,10);
//     const randomIndex = Math.floor(Math.random() * topGifs.length);
//     const randomGif = topGifs[randomIndex];

//     const img = document.createElement('img');
//     img.src = randomGif.images.fixed_width.url;
//     img.classList.add('gif-item');
//     gifContainer.appendChild(img);
//   };







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
  } 
  

  function displayGifs(gifs) {
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '';

    const topGifs = gifs.slice(0,10);
    console.log(topGifs);
    const randomIndex = Math.floor(Math.random() * topGifs.length);
    const randomGif = topGifs[randomIndex];
  
// });

// const DictionaryApiKey = '42f40c1e-656e-47a8-9597-6b3c3c5fdbe0';
// const giphyApiKey = 'DQQk3Czth43tzR6goSHYIQXrKreMrWf2';

// const form = document.querySelector('#gif-container');
// const input = document.querySelector('#input');

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
  
//   const query = input.value;
  
//   // Fetch data from Dictionary API
//   fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${DictionaryApiKey}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // Do something with the dictionary data
      
//       // Navigate to the second page and pass the dictionary data as a URL parameter
//       window.location.href = `results.html?dictionaryData=${encodeURIComponent(JSON.stringify(data))}`;
//     })
//     .catch(error => {
//       console.error(error);
//     });
  
//   // Fetch data from GIPHY API
//   fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // Do something with the GIPHY data
      
//       // Store GIPHY data in local storage
//       localStorage.setItem('giphyData', JSON.stringify(data));
//     })
//     .catch(error => {
//       console.error(error);
//     });
// });


    const img = document.createElement('img');
    img.src = randomGif.images.fixed_width.url;
    img.classList.add('gif-item');
    gifContainer.appendChild(img);
  }
  
})