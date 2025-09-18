// Our BASE URL
const BASE_URL = 'http://localhost:3000/ramens';

// 1. Display all ramens
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
// 2. Display ramen details when clicked
function handleClick(ramen) {
  showRamenDetails(ramen);
}

function showRamenDetails(ramen) {
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const rating = document.querySelector('#rating-display');
  const comment = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;

  // Store currently selected ramen in a data attribute
  const ramenDetail = document.querySelector('#ramen-detail');
  ramenDetail.dataset.selectedRamenId = ramen.id;
}

// 3. Add new ramen
function addSubmitListener() {
  const form = document.querySelector('#new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target['new-comment'].value
    };

    renderRamenMenuImage(newRamen);

    // Optional: POST to server
    // fetch(BASE_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newRamen)
    // });

    form.reset();
  });
}

// 4. Edit ramen (Advanced)
function addEditListener() {
  const form = document.querySelector('#edit-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rating = e.target['new-rating'].value;
    const comment = e.target['new-comment'].value;
    const ramenDetail = document.querySelector('#ramen-detail');
    const ramenId = ramenDetail.dataset.selectedRamenId;

    document.querySelector('#rating-display').textContent = rating;
    document.querySelector('#comment-display').textContent = comment;

    // Optional: persist with PATCH
    // fetch(`${BASE_URL}/${ramenId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ rating, comment })
    // });

    form.reset();
  });
}