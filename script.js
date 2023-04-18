const form = document.querySelector('.pure-form');
const input = document.querySelector('.pure-input-rounded');


form.addEventListener('submit', (event) => {
    event.preventDefault();

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



});

