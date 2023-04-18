



const searchInput = document.getElementById('input');
const searchBtn = document.getElementById('search');
searchInput.addEventListener('submit', saveToLocalStorage);
searchBtn.addEventListener('click', saveToLocalStorage);

function saveToLocalStorage(event) {
  event.preventDefault();

  var inputValue = searchInput.value.trim();

  if (inputValue) {
    localStorage.setItem('searchQuery', inputValue);
    window.location.href = 'results.html';
  }
}
