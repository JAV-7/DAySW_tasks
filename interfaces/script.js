const toggler = document.querySelector(".toggler-btn");
toggler.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

function toggleFavorite(button) {
    const icon = button.querySelector('i');
    const isFavorited = button.getAttribute('data-favorited') === 'true';
  
    if (isFavorited) {
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
      button.setAttribute('data-favorited', 'false');
      alert('Removed from favorites!');
    } else {
      icon.classList.remove('bi-heart');
      icon.classList.add('bi-heart-fill');
      button.setAttribute('data-favorited', 'true');
      alert('Added to favorites!');
    }
  }

  async function fetchPets() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/pets', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch pets');
      
      const pets = await response.json();
      console.log('Pets:', pets);
      // Display pets...
    } catch (error) {
      console.error('Error:', error);
      // Redirect to login if token is invalid
      if (error.message.includes('401')) window.location.href = 'index.html';
    }
  }
  
  // Call when picks.html loads
  document.addEventListener('DOMContentLoaded', fetchPets);



//test
document.getElementById("registerForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const email = document.getElementById("create-user").value;
  
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token if using JWT
      localStorage.setItem('token', data.token);
      // Redirect to picks page
      window.location.href = './picks.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error');
  }
});
  