// FRONTEND FUNCTIONALITY SCRIPTS

// Checking Authentication 
function checkAuth() {
  const token = localStorage.getItem('token'); // Checks token
  if (!token) {
    window.location.href = 'index.html'; // Redirect to login if no token
    return false;
  }
  return true;
}

// Nav bar toggler
const toggler = document.querySelector(".toggler-btn");
toggler.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

// Favorite button event
async function toggleFavorite(button) {
  const petId = button.getAttribute('data-pet-id');
  const isFavorited = button.getAttribute('data-favorited') === 'true';
  const icon = button.querySelector('i');
  const token = localStorage.getItem('token');

  try {
    const endpoint = isFavorited ? 
      `http://localhost:3000/api/favorites/${petId}` : 
      'http://localhost:3000/api/favorites';
    
    const method = isFavorited ? 'DELETE' : 'POST';
    
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: !isFavorited ? JSON.stringify({ petId }) : null
    });

    if (!response.ok) throw new Error('Failed to update favorite');

    if (isFavorited) {
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
      button.setAttribute('data-favorited', 'false');
    } else {
      icon.classList.remove('bi-heart');
      icon.classList.add('bi-heart-fill');
      button.setAttribute('data-favorited', 'true');
    }
    
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to update favorite. Please try again.');
  }
}

// Fetching Pets from backend
async function fetchPets() {
    try {
      const token = localStorage.getItem('token'); // requests token 
      const response = await fetch('http://localhost:3000/api/pets', {
        headers: {
          'Authorization': `Bearer ${token}` // gets token
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch pets'); // if token is not admin
      
      const pets = await response.json(); // else... await data and convert to json format
      console.log('Displayed Pets', pets); //debug
      
      // Display pets...
      displayPets(pets);
    } catch (error) {
      console.error('Error:', error);
      // Redirect to login if token is invalid
      if (error.message.includes('401') || error.message.includes('403')) {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
      }
    }
  }

// Display Pets on UI 
function displayPets(pets){
  const petsContainer = document.querySelector('.row.gy-3');
  
  if (!petsContainer) {
    console.error('Pets container not found');
    return;
  }
  
  petsContainer.innerHTML = ''; // Clear existing pet cards
  
  if (!pets || pets.length === 0) {
    petsContainer.innerHTML = '<div class="col-12 text-center"><h3>No pets available at the moment</h3></div>';
    return;
  }
  
  pets.forEach(pet => { // Create and append pet cards for each pet
    const petCard = `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card border-light">
          <img src="${pet.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${pet.name}">
          <div class="position-absolute top-0 start-0 p-2 text-white">
            <h4 class="card-title mb-0">${pet.name}</h4>
          </div>
          <div class="card-body">
            <h5 class="card-title">${pet.age}, ${pet.breed}</h5>
            <p class="card-text text-muted">${pet.place}</p>
            <button class="btn btn-sm btn-outline-primary favorite-btn" onclick="toggleFavorite(this)" data-pet-id="${pet._id}" data-favorited="false">
              <i class="bi bi-heart"></i>
            </button>
            <a href="selected_pick.html?id=${pet._id}" class="stretched-link"></a>
          </div>
        </div>
      </div>
    `;
    petsContainer.insertAdjacentHTML('beforeend', petCard);
  });
}

// Call when picks.html loads
document.addEventListener('DOMContentLoaded', function() {
// Check if we're on the picks page by looking for the pet container
  const petsContainer = document.querySelector('.row.gy-3');
  
  if (petsContainer && checkAuth()) {
    fetchPets();
  }
  // Check if signup form exists before adding event listener
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
});

// Signup event
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Client-side validation
  if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
  }

  if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
  }

  try {
      // Show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...';

      const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
          alert("Account created successfully! Please login.");
          document.getElementById("signupForm").reset();
          
          // Auto-open login modal after successful signup
          const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
          loginModal.show();
      } else {
          alert(data.error || "Signup failed. Please try again.");
      }
  } catch (error) {
      console.error("Signup error:", error);
      alert("Network error. Please check your connection.");
  } finally {
      // Reset button state
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign Up';
  }
});