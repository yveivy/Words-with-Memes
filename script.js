var query = localStorage.getItem('searchQuery');
const DictionaryApiKey = '42f40c1e-656e-47a8-9597-6b3c3c5fdbe0';
var filteredGifs;
const wordBox = document.getElementById('definition-display');

// This function is for tidiness.  It helps make sure that functions are called in the correct order and way.
// Additionally it checks local storage to see if needs to also call the quiz function based on a boolean flag we gave on the buttons back on the home page.
function fetchResults() {
  var query = localStorage.getItem('searchQuery');
  
  if (query) {
    fetchGifs(query);
    const showWord = localStorage.getItem('isRandomSearch') !== 'true';
    fetchDefinition(query, showWord);
    
    if (localStorage.getItem('isRandomSearch') === 'true') {
      displayQuiz(query);
      
    }
  }
}


function fetchDefinition(query, showWord) {
  const outputDiv = document.querySelector('.output');  
  
  
  
  if (query && outputDiv) {
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${DictionaryApiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const firstDefinition = data[0].shortdef[0];
        const defDisplay = data[0].hwi.hw
        console.log(defDisplay);
        wordBox.innerHTML = defDisplay;

        if (showWord) {
          wordBox.innerHTML = defDisplay;
        } else {
          wordBox.innerHTML = '';
        }
        
        
        
        const definitionNode = document.createTextNode(firstDefinition);
        
        outputDiv.innerHTML = '';
        
        outputDiv.appendChild(definitionNode);
       

        console.log(firstDefinition);
      })
      .catch(error => {
        console.error('Error fetching definition:', error);
      });
  }
  
};


// This API call uses the variable 'query' defined from local storage, gets the response and the filters out any responses with a rating of R.
// Then displayGifs is called using the filtered gifs variable we created.
function fetchGifs(query) {
  const giphyApiKey = 'DQQk3Czth43tzR6goSHYIQXrKreMrWf2';
  if (query) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const gifs = data.data;

        filteredGifs = gifs.filter(function (gif) {
          return gif.rating !== 'r';
        });
        console.log(data);
        displayGifs(filteredGifs);
      });
  }
}

// This function is what displays the gifs, we start by selecting where we want it and then making sure it is clear of any previous stuff.
function displayGifs(gifs) {
  const gifContainer = document.querySelector('.gif-container');
  gifContainer.innerHTML = '';
  
  // filter gifs with content rating of R
  const filteredGifs = gifs.filter(function (gif) {
    return gif.rating !== 'r';
  });
  
  // The giphy API sends back a 50 object array.  The farther down the list the more 'off-topic' the gifs get so we limited the results to the first 10.
  const topGifs = filteredGifs.slice(0, 10);
  console.log(topGifs);
  const randomIndex = Math.floor(Math.random() * topGifs.length);
  const randomGif = topGifs[randomIndex];
  
  const img = new Image();
  img.classList.add('gif-item');
  
  //Waits until the page is loaded before creating a new img (class stays the same for styling, but removed default img that we had placeholding on the HTML).
  //!This makes the page appear to jump and I think we can fix it with styling.  With the placeholder the size of the div stays the same but the first image we see is the placeholder
  img.addEventListener('load', function () {
    gifContainer.innerHTML = '';
    gifContainer.appendChild(img);
  });
  
  img.src = randomGif.images.fixed_width.url;
  document.getElementById('copyable-link').value = randomGif.images.fixed_width.url;
}

// This button will simply choose another random gif to display by calling displayGifs again
const nextGifBtn = document.getElementById('next-gif-button');
nextGifBtn.addEventListener('click', function (gifs) {
  displayGifs(filteredGifs);
  
  const copyLinkButton = document.getElementById('copy-link-button');
  const copyStatus = document.getElementById('copy-status');
  
  // uses the link uses data from the API to put a link on the screen that when the user clicks the button it copies it to clipboard
  copyLinkButton.addEventListener('click', function () {
    const copyableLink = document.getElementById('copyable-link');
    navigator.clipboard.writeText(copyableLink.value)
      .then(() => {
        copyStatus.textContent = 'Link copied to clipboard!';
        setTimeout(() => {
          copyStatus.textContent = '';
        }, 3000); // Remove the message after 3 seconds
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  });
  
  
  
});

//!!
// not sure if we needed this, but copy pasted it anyway. It works with this here
// EDIT:  We do need this so that the play again button will pick a new word.
const popularWords = [
  'love', 'happy', 'success', 'nature', 'education', 'technology', 'freedom', 'music', 'art', 'friendship',
  'family', 'beauty', 'travel', 'adventure', 'health', 'fun', 'inspiration', 'dream', 'wisdom', 'laughter',
  'compassion', 'creativity', 'peace', 'hope', 'knowledge', 'trust', 'faith', 'achievement', 'community',
  'kindness', 'strength', 'courage', 'innovation', 'imagination', 'happiness', 'equality', 'perseverance',
  'ambition', 'gratitude', 'harmony', 'mindfulness', 'exploration', 'passion', 'respect', 'balance',
  'curiosity', 'empowerment', 'optimism', 'serenity',
  'anger', 'sadness', 'failure', 'chaos', 'ignorance', 'conflict', 'fear', 'noise', 'hate', 'jealousy',
  'pain', 'suffering', 'loss', 'grief', 'despair', 'deception', 'loneliness', 'injustice', 'misery',
  'regret', 'stress', 'anxiety', 'neglect', 'war', 'envy', 'dishonesty', 'apathy', 'resentment', 'disappointment',
  'malice', 'cynicism', 'doubt', 'guilt', 'shame', 'insecurity', 'vulnerability', 'hostility', 'prejudice',
  'oppression', 'alienation', 'paranoia', 'distrust', 'frustration', 'gloom', 'melancholy', 'pessimism',
  'ennui', 'disillusionment', 'uncertainty', 'discontent', 'desolation', 'ephemeral', 'oblivion', 'entropic',
  'anomie', 'antipathy', 'capricious', 'enigmatic', 'ephemeral', 'labyrinthine', 'mercurial', 'paradoxical',
  'surreal', 'transient', 'vicissitudes', 'wistful'
];

// This function is called above using the query parameter.  Query was set in an earlier function and is what is reading the local storage data.  
//RandomWord is saved to local storage using the SAME key so randomWord the variable is functionally the same as query, but we need to use it for a different purpose. 
// This picks 4 words at random from the popularWords array.  If the choices variable (which is our displayed word) is not included
// in the 4 picked words it is pushed in.  Then the choices are sorted.  I don't fully understand what - 0.5 does but it helps it be more random.

function generateQuizChoices(randomWord) {
  const choices = [randomWord];
  while (choices.length < 4) {
    const randomIndex = Math.floor(Math.random() * popularWords.length);
    const randomChoice = popularWords[randomIndex];
    if (!choices.includes(randomChoice)) {
      choices.push(randomChoice);
    }
  }
  return choices.sort(() => Math.random() - 0.5);
}


// This function dynamically creates divs and buttons that contain the quiz contents as well as gives them classes for styling purposes.


function displayQuiz(randomWord) {
  const choices = generateQuizChoices(randomWord);
  const quizContainer = document.createElement('div');
  const quizQuestion = document.createElement('h4')
  const quizHolder = document.querySelector('.post-description');
  clearQuiz(quizHolder);
  quizContainer.classList.add('quiz-container');
  quizQuestion.innerHTML = 'Which word best describes the definition and GIF?';
  quizContainer.appendChild(quizQuestion);
  wordBox.innerHTML = '';


  
  
  choices.forEach(function(choice){
    const button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('quiz-choice');
    button.addEventListener('click', function(event){
      const buttonText = event.target.textContent;
      const resultText = document.createElement('p');
      resultText.classList.add('result-message');
      
      if (buttonText === randomWord) {
        resultText.textContent = 'CORRECT!';
        quizContainer.appendChild(resultText);
        disableButtons(quizContainer);

        const playAgain = document.createElement('button');
        playAgain.textContent = 'Play Again?'
        playAgain.classList.add('play-again');
        playAgain.addEventListener('click', function (){
          const randomIndex = Math.floor(Math.random() * popularWords.length);
          const newQuery = popularWords[randomIndex];
          localStorage.setItem('searchQuery', newQuery);
          localStorage.setItem('isRandomSearch', 'true');
          fetchResults(query);
        });
        quizContainer.appendChild(playAgain);
      } else {
        resultText.textContent = 'Incorrect, try again.';
        quizContainer.appendChild(resultText);
        
        setTimeout(function () {
          resultText.remove();
        }, 3000);
      }
    });
    
    quizContainer.appendChild(button);
  });
  
  quizHolder.appendChild(quizContainer);
}

// This is a helper function that turns buttons off if conditions are met
function disableButtons(quizContainer) {
  const buttons = quizContainer.querySelectorAll('.quiz-choice');
  buttons.forEach(function(button) {
    button.disabled = true;
  });
}

function clearQuiz(quizHolder) {
  const quizContainer = quizHolder.querySelector('.quiz-container');
  if (quizContainer) {
    quizHolder.removeChild(quizContainer);
  }
}
//!!






fetchResults();

