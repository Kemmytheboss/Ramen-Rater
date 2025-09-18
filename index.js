// Our BASE URL
const BASE_URL = 'http://localhost:3000/ramens';

// Display all ramens
function displayRamens() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(ramens => {
      ramens.forEach(renderRamenMenuImage);

      // Advanced: Show first ramen's details by default
      if (ramens.length > 0) {
        showRamenDetails(ramens[0]);
      }
    });
}
function renderRamenMenuImage(ramen) {
  const menu = document.querySelector('#ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener('click', () => handleClick(ramen));

  menu.appendChild(img);
}
