/**
 * products.js
 * Logic for product filtering and interactive AC capacity guide
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Capacity Guide Logic ---
  const capacityForm = document.getElementById('capacity-guide-form');
  const capacityResult = document.getElementById('capacity-result');
  
  if (capacityForm && capacityResult) {
    capacityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const roomSize = parseInt(document.getElementById('room-size').value);
      let suggestedCapacity = '1.0 Ton';
      
      if (roomSize > 400) suggestedCapacity = '3.0 Ton';
      else if (roomSize > 250) suggestedCapacity = '2.0 Ton';
      else if (roomSize > 150) suggestedCapacity = '1.5 Ton';
      
      capacityResult.innerHTML = `
        <div class="alert alert-info mt-3">
          <strong>Suggested Capacity:</strong> ${suggestedCapacity}<br>
          <small class="text-muted">Indicative estimate — final capacity should be confirmed after inspection.</small>
        </div>
      `;
    });
  }

  // --- Product Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-wrap');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
