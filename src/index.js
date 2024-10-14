const fetchRamens = async () => {
  const response = await fetch('http://localhost:3000/ramens');
  return response.json();
};

// deletesramen from server
const deleteRamenFromAPI = async (id) => {
  await fetch(`http://localhost:3000/ramens/${id}`, {
    method: 'DELETE',
  });
};

// Displays ramen image
const displayRamens = async () => {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramens = await fetchRamens();

  // Add ramen image 
  ramenMenu.innerHTML = ''; 
  ramens.forEach((ramen) => {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.dataset.id = ramen.id; 
    img.addEventListener('click', () => handleClick(ramen)); 
    ramenMenu.appendChild(img);
  });


  if (ramens.length > 0) {
    handleClick(ramens[0]);
  }
};

// Displays ramen details when an image gets clicked
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  const ramenName = document.querySelector('.name');
  const ramenRestaurant = document.querySelector('.restaurant');
  const ramenImage = document.querySelector('.detail-image');
  const ramenRating = document.getElementById('rating-display');
  const ramenComment = document.getElementById('comment-display');
  const deleteBtn = document.getElementById('delete-ramen');


  ramenImage.src = ramen.image;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;

  // delete button to remove ramen
  deleteBtn.onclick = () => deleteRamen(ramen.id);
};

// Adds new ramen 
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();


    const newRamen = {
      name: form.name.value,
      restaurant: form.restaurant.value,
      image: form.image.value,
      rating: form.rating.value,
      comment: form['new-comment'].value,
    };

    // Display the new ramen 
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.dataset.id = newRamen.id; 
    img.addEventListener('click', () => handleClick(newRamen));
    document.getElementById('ramen-menu').appendChild(img);

  
    form.reset();
  });
};


const deleteRamen = async (id) => {

  await deleteRamenFromAPI(id);

  
  const ramenMenu = document.getElementById('ramen-menu');
  const imgToRemove = ramenMenu.querySelector(`img[data-id="${id}"]`);

  if (imgToRemove) {
    ramenMenu.removeChild(imgToRemove);
  }

  // Clears ramen details from the form 
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.querySelector('.detail-image').src = './assets/image-placeholder.jpg';
  ramenDetail.querySelector('.name').textContent = 'Insert Name Here';
  ramenDetail.querySelector('.restaurant').textContent = 'Insert Restaurant Here';
  document.getElementById('rating-display').textContent = 'Insert rating here';
  document.getElementById('comment-display').textContent = 'Insert comment here';
};

// Main function for starting the application
const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens(); 
    addSubmitListener(); 
    addEditListener(); 
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  deleteRamen,
  main,
};

