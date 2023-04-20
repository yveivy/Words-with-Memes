
const searchForm =document.querySelector('form');
const searchInput = document.getElementById('input');
const searchBtn = document.getElementById('search');
searchInput.addEventListener('submit', saveToLocalStorage);
searchBtn.addEventListener('click', saveToLocalStorage);

function saveToLocalStorage(event) {
  event.preventDefault();

  var inputValue = searchInput.value.trim();

  if (inputValue) {
    localStorage.setItem('searchQuery', inputValue);
    localStorage.setItem('searchWord', inputValue);
    localStorage.removeItem('isRandomSearch');  //!!
    window.location.href = 'results.html';
  }
}


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

const randomizeButton = document.getElementById('randomize-button');
randomizeButton.addEventListener('click', function () {
  const randomWordIndex = Math.floor(Math.random() * popularWords.length);
  const randomWord = popularWords[randomWordIndex];

  // Save the random word in local storage
  localStorage.setItem('searchQuery', randomWord);
  localStorage.setItem('randomWord', randomWord);  //!!

  // Set a flag indicating that the search was triggered by the randomize button
  localStorage.setItem('isRandomSearch', 'true');  //!!

  // Navigate to the results.html page
  window.location.href = 'results.html';
});
