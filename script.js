document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.search-box'); // if 'search-box' is a class
  const input = form.querySelector('input[type="search"]');

  const resultContainer = document.querySelector('.results');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchTerm = input.value;

    if (searchTerm) {
      searchWikipedia(searchTerm);
    }
  });

  function searchWikipedia(searchTerm) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&format=json&origin=*&utf8=&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;
    fetch(url).then(response => response.json()).then(data => {
      displayResults(data.query.search);
    }).catch(error => console.log(error));
  }

  function displayResults(results) {
    resultContainer.innerHTML = '';
    resultContainer.textContent = `Results: ${results.length}`;
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.className = 'result';
      resultElement.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.snippet}</p>
      <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read more</a>
    `;
      resultContainer.appendChild(resultElement);
    })
  }
})